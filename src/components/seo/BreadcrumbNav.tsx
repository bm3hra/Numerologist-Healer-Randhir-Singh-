import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  lang?: string;
  onNavigate?: (sectionId: string) => void;
  className?: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  items,
  lang = 'en',
  onNavigate,
  className = ''
}) => {
  const handleClick = (e: React.MouseEvent, href?: string) => {
    if (!href) return;
    if (onNavigate) {
      e.preventDefault();
      const clean = href.replace(/^#/, '').replace(/^\//, '');
      onNavigate(clean || 'home');
    }
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`py-2 px-3 sm:px-4 rounded-xl bg-amber-950/20 border border-amber-500/20 backdrop-blur-xs text-xs text-stone-400 inline-flex items-center flex-wrap gap-1.5 ${className}`}
    >
      <ol className="flex items-center flex-wrap gap-1.5 list-none p-0 m-0" itemScope itemType="https://schema.org/BreadcrumbList">
        {/* Home Item */}
        <li
          className="inline-flex items-center gap-1"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <a
            href="/"
            onClick={(e) => handleClick(e, 'home')}
            className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors font-medium cursor-pointer"
            itemProp="item"
          >
            <Home className="w-3.5 h-3.5 text-amber-500" />
            <span itemProp="name">{lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home'}</span>
          </a>
          <meta itemProp="position" content="1" />
        </li>

        {/* Trail Items */}
        {items.map((item, index) => {
          const position = index + 2;
          return (
            <li
              key={index}
              className="inline-flex items-center gap-1.5"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3 h-3 text-stone-600 shrink-0" aria-hidden="true" />
              {item.isCurrent || !item.href ? (
                <span
                  className="text-stone-200 font-semibold truncate max-w-[200px] sm:max-w-xs"
                  aria-current="page"
                  itemProp="name"
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className="text-stone-400 hover:text-amber-400 transition-colors truncate max-w-[180px] sm:max-w-xs cursor-pointer"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </a>
              )}
              <meta itemProp="position" content={String(position)} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
