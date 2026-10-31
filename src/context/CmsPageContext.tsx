import React, { createContext, useContext, useState, useEffect } from 'react';
import { CMSPage, PageBlock } from '../types';
import { getAllPages } from '../lib/cmsService';
import { INITIAL_ALL_WEBSITE_PAGES } from '../data/allWebsitePages';

interface CmsPageContextType {
  pages: CMSPage[];
  loading: boolean;
  getPage: (slugOrId: string) => CMSPage | undefined;
  getPageBySlug: (slug: string) => CMSPage | undefined;
  getPageBySectionId: (sectionId: string) => CMSPage | undefined;
  getBlock: (pageSlug: string, blockType: string) => PageBlock | undefined;
  refreshPages: () => Promise<void>;
  updateLocalPage: (updatedPage: CMSPage) => void;
}

const CmsPageContext = createContext<CmsPageContextType | undefined>(undefined);

export const CmsPageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pages, setPages] = useState<CMSPage[]>(() => INITIAL_ALL_WEBSITE_PAGES);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPages = async () => {
    try {
      const serverPages = await getAllPages();
      if (serverPages && serverPages.length > 0) {
        // Merge server pages with initial pages so nothing is ever missing
        const serverMap = new Map<string, CMSPage>();
        for (const sp of serverPages) {
          if (sp.slug) serverMap.set(sp.slug, sp);
        }

        const merged: CMSPage[] = [];
        for (const initPage of INITIAL_ALL_WEBSITE_PAGES) {
          if (serverMap.has(initPage.slug)) {
            merged.push({
              ...initPage,
              ...serverMap.get(initPage.slug)!
            });
            serverMap.delete(initPage.slug);
          } else {
            merged.push(initPage);
          }
        }
        for (const customPage of serverMap.values()) {
          merged.push(customPage);
        }

        setPages(merged);
      }
    } catch (err) {
      console.warn('Could not load dynamic CMS pages from API, using cached data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const getPage = (slugOrId: string): CMSPage | undefined => {
    const clean = slugOrId.toLowerCase().trim().replace(/^pages\//, '').replace(/^\//, '');
    return pages.find(
      (p) =>
        p.slug.toLowerCase() === clean ||
        p.id.toLowerCase() === clean ||
        (p.sectionId && p.sectionId.toLowerCase() === clean)
    );
  };

  const getPageBySlug = (slug: string): CMSPage | undefined => {
    const clean = slug.toLowerCase().trim().replace(/^pages\//, '').replace(/^\//, '');
    return pages.find((p) => p.slug.toLowerCase() === clean);
  };

  const getPageBySectionId = (sectionId: string): CMSPage | undefined => {
    const clean = sectionId.toLowerCase().trim();
    return pages.find((p) => (p.sectionId && p.sectionId.toLowerCase() === clean) || p.slug.toLowerCase() === clean);
  };

  const getBlock = (pageSlug: string, blockType: string): PageBlock | undefined => {
    const page = getPage(pageSlug);
    if (!page || !page.blocks) return undefined;
    const blocksList = Array.isArray(page.blocks)
      ? page.blocks
      : typeof (page.blocks as any) === 'string'
      ? JSON.parse(page.blocks as any)
      : [];
    return blocksList.find((b: PageBlock) => b.type === blockType);
  };

  const updateLocalPage = (updatedPage: CMSPage) => {
    setPages((prev) => {
      const idx = prev.findIndex((p) => p.slug === updatedPage.slug || p.id === updatedPage.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = updatedPage;
        return copy;
      }
      return [updatedPage, ...prev];
    });
  };

  return (
    <CmsPageContext.Provider
      value={{
        pages,
        loading,
        getPage,
        getPageBySlug,
        getPageBySectionId,
        getBlock,
        refreshPages: fetchPages,
        updateLocalPage
      }}
    >
      {children}
    </CmsPageContext.Provider>
  );
};

export const useCmsPages = (): CmsPageContextType => {
  const context = useContext(CmsPageContext);
  if (!context) {
    throw new Error('useCmsPages must be used within a CmsPageProvider');
  }
  return context;
};
