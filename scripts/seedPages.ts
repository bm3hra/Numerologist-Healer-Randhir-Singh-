import fs from 'fs';
import path from 'path';
import { INITIAL_ALL_WEBSITE_PAGES } from '../src/data/allWebsitePages';

const cmsDir = path.resolve(process.cwd(), 'data', 'cms');
const pagesFile = path.join(cmsDir, 'pages.json');

if (!fs.existsSync(cmsDir)) {
  fs.mkdirSync(cmsDir, { recursive: true });
}

let existingPages: any[] = [];
if (fs.existsSync(pagesFile)) {
  try {
    existingPages = JSON.parse(fs.readFileSync(pagesFile, 'utf-8'));
  } catch {
    existingPages = [];
  }
}

// Preserve existing customized pages
const existingMap = new Map<string, any>();
for (const p of existingPages) {
  if (p.slug) {
    existingMap.set(p.slug, p);
  }
}

const mergedPages: any[] = [];

// 1. First add the initial master pages (or their existing customized versions)
for (const masterPage of INITIAL_ALL_WEBSITE_PAGES) {
  if (existingMap.has(masterPage.slug)) {
    const existing = existingMap.get(masterPage.slug);
    mergedPages.push({
      ...masterPage,
      ...existing,
      category: masterPage.category || existing.category,
      sectionId: masterPage.sectionId || existing.sectionId,
      isSystemPage: masterPage.isSystemPage ?? existing.isSystemPage
    });
    existingMap.delete(masterPage.slug);
  } else {
    mergedPages.push(masterPage);
  }
}

// 2. Add any other custom pages created by user
for (const customPage of existingMap.values()) {
  mergedPages.push({
    ...customPage,
    category: customPage.category || 'custom'
  });
}

fs.writeFileSync(pagesFile, JSON.stringify(mergedPages, null, 2), 'utf-8');
console.log(`✅ Successfully seeded ${mergedPages.length} website pages to ${pagesFile}`);
