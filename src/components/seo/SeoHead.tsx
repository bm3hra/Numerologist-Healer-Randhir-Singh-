import React, { useEffect, useState } from 'react';
import { CMSPage, SiteSeoConfig } from '../../types';
import { ALL_LANGUAGES, getTranslation, isRtlLanguage } from '../../i18n/languages';

interface SeoHeadProps {
  currentTab: string;
  lang: string;
  cmsPage?: CMSPage;
  pageTitle?: string;
  pageDescription?: string;
}

const DEFAULT_CONFIG: SiteSeoConfig = {
  siteName: 'Numerologist & Healer Randhir Singh | Jaipur, India',
  siteTitle: 'Numerologist & Healer Randhir Singh | Jaipur, India',
  metaDescription: 'Explore Vedic Numerology, Lo Shu Grid Analysis, Tarot Guidance, Chakra Healing and spiritual wellness services with Randhir Singh in Jaipur, Rajasthan. Online consultations available worldwide.',
  canonicalHost: 'https://numerologist-randhir-singh.ai.studio',
  defaultOgImage: '/Randhir Singh.png',
  googleVerificationCode: 'WkzCjX77KiYZosK1_LrMXODFi-Gf7wT_ecx-TqeUO9A',
  bingVerificationCode: '',
  ga4MeasurementId: '',
  gtmId: '',
  clarityId: '',
  indexNowKey: 'destiny-indexnow-key-2026'
};

const LOCALE_MAP: Record<string, string> = {
  'en-us': 'en_US',
  en: 'en_US',
  'en-gb': 'en_GB',
  hi: 'hi_IN',
  bn: 'bn_IN',
  gu: 'gu_IN',
  mr: 'mr_IN',
  pa: 'pa_IN',
  ta: 'ta_IN',
  te: 'te_IN',
  kn: 'kn_IN',
  ml: 'ml_IN',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_PT',
  ar: 'ar_SA',
  ja: 'ja_JP'
};

// Route-specific metadata mapping for client-side SEO
const ROUTE_SEO: Record<string, { titleEn: string; titleHi: string; descEn: string; descHi: string; ogImage?: string }> = {
  home: {
    titleEn: 'Numerologist & Healer Randhir Singh | Jaipur, India',
    titleHi: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर',
    descEn: 'Explore Vedic Numerology, Lo Shu Grid Analysis, Tarot Guidance, Chakra Healing and spiritual wellness services with Randhir Singh in Jaipur, Rajasthan. Online consultations available worldwide.',
    descHi: 'जयपुर में वैदिक अंक ज्योतिष, लो-शू ग्रिड, रिस्ट वॉच थेरेपी, सॉल्ट क्लींजिंग और क्रिस्टल हीलिंग विशेषज्ञ रणधीर सिंह जी से व्यक्तिगत व ऑनलाइन परामर्श प्राप्त करें।',
    ogImage: '/Randhir Singh.png'
  },
  'dob-calculator': {
    titleEn: 'Decode Your Date of Birth · Lucky Number, Destiny Number & Lo-Shu Grid | Randhir Singh',
    titleHi: 'अपनी जन्मतिथि डिकोड करें · मूलांक, भाग्यांक, कुआ नंबर व 3×3 लो-शू व वैदिक ग्रिड कैलकुलेटर',
    descEn: 'Calculate your Lucky Number (Birth Number), Destiny Number, Kua Number, and authentic 3x3 Lo-Shu Grid instantly.',
    descHi: 'अपनी जन्मतिथि दर्ज करें और जानें अपना मूलांक, भाग्यांक, कुआ नंबर, 8 भाग्य तल तथा वैदिक अंक कुंडली। जीवन को नई दिशा दें।',
    ogImage: '/Randhir Singh.png'
  },
  'watch-analysis': {
    titleEn: 'Wristwatch Analysis & Horological Therapy | Randhir Singh Jaipur',
    titleHi: 'कलाई घड़ी विश्लेषण एवं वॉच थेरेपी · विक्टोरिनॉक्स सिग्नेचर थेरेपी वॉच | रणधीर सिंह',
    descEn: 'Discover the profound vibrational connection between your wristwatch dial geometry, colors, and planetary energies.',
    descHi: 'आपकी कलाई पर बंधी घड़ी आपके अवचेतन मन और भाग्य की दिशा तय करती है। डायल आकार, धातु और रंग का वैदिक विश्लेषण।',
    ogImage: '/Luxury Gold Numerology Watch.png'
  },
  'salt-therapy': {
    titleEn: 'Negativity Removal & Traditional Salt Therapy · Sacred Aura Cleansing | Randhir Singh',
    titleHi: 'नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी) | रणधीर सिंह जयपुर',
    descEn: 'Authentic Himalayan and sea salt cleansing rituals to dissolve heavy energies and stagnation from your aura and living space.',
    descHi: 'सेंधा नमक एवं समुद्री नमक द्वारा सूक्ष्म आभामंडल (Aura) की गहरी शुद्धि एवं घर-परिवार में सकारात्मक ऊर्जा का संचार।',
    ogImage: '/Card-Back.jpg'
  },
  'crystal-therapy': {
    titleEn: 'Vedic Crystal Therapy & Gemstone Healing Vibrations | Randhir Singh Jaipur',
    titleHi: 'क्रिस्टल थेरेपी एवं ऊर्जा चक्र संतुलन | रणधीर सिंह जयपुर',
    descEn: 'Personalized crystal prescriptions matching your birth chart numbers and chakras for career growth and abundance.',
    descHi: 'अपनी जन्मतिथि एवं मिसिंग नंबर्स के अनुसार सही क्रिस्टल, ब्रेसलेट व रत्नों की पहचान एवं चक्र संतुलन।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  'all-services': {
    titleEn: 'ALL 16 DIVINE SERVICES & CONSULTANCY FEES | Randhir Singh Jaipur',
    titleHi: 'सभी 16 पवित्र सेवाएँ एवं परामर्श फीस | रणधीर सिंह जयपुर',
    descEn: 'Comprehensive catalog of all 16 divine services, horological watch therapy, Bhojpatra yantras, and transparent consultation fees.',
    descHi: 'रणधीर सिंह जी की सभी 16 प्रमाणित दिव्य सेवाओं एवं परामर्श फीस का संपूर्ण विवरण। प्रत्येक रविवार प्रथम 5 परामर्श निःशुल्क।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  'specialized-services': {
    titleEn: '11 Specialized Healing & Correction Services | Randhir Singh Jaipur',
    titleHi: '11 विशिष्ट हीलिंग एवं सुधार सेवाएं | रणधीर सिंह जयपुर',
    descEn: 'Targeted restorative sessions: Aura Cleaning (₹5,100), Chakra Alignment, Tibetan Sound Healing, and Chaldean Name Corrections.',
    descHi: 'औरा शुद्धि (₹5,100), 7-दिवसीय चक्र संतुलन, तिब्बती ध्वनि ध्यान, काल्डियन नाम संशोधन व पीएलआर चिकित्सा।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  reviews: {
    titleEn: 'Client Reviews & Transformational Stories | Numerologist & Healer Randhir Singh',
    titleHi: 'ग्राहकों के अनुभव एवं जीवन परिवर्तन की कहानियाँ (Client Reviews) | रणधीर सिंह',
    descEn: 'Verified client reviews and testimonials from across India and worldwide on Vedic Numerology, Watch Therapy, and Energy Healing.',
    descHi: 'जयपुर एवं विश्वभर से आए जातकों के वास्तविक अनुभव, समीक्षाएं एवं सफलता की प्रेरक कहानियाँ।',
    ogImage: '/Randhir Singh.png'
  },
  'about-randhir': {
    titleEn: 'About Randhir Singh · Renowned Vedic Numerologist & Spiritual Healer in Jaipur',
    titleHi: 'रणधीर सिंह जी का परिचय · सुप्रसिद्ध वैदिक अंक ज्योतिष विशेषज्ञ एवं हीलर',
    descEn: 'Learn about the sacred spiritual journey, certifications, and awards of Randhir Singh Ji, keynote speaker at Radisson Blu Mega Convocation.',
    descHi: 'जयपुर, राजस्थान के प्रमुख अंक ज्योतिष विशेषज्ञ एवं हीलर रणधीर सिंह जी की जीवन यात्रा, सम्मान एवं उपलब्धियाँ।',
    ogImage: '/Randhir Singh.png'
  },
  'yantra-healings': {
    titleEn: 'Sacred Yantra Healings & Geometric Vibrational Shields | Randhir Singh',
    titleHi: 'पवित्र यंत्र हीलिंग एवं ज्यामितीय ऊर्जा सुरक्षा चक्र | रणधीर सिंह',
    descEn: 'Consecrated 3×3 planetary yantras and sacred geometries for prosperity, protection, and planetary pacification.',
    descHi: 'वैदिक यंत्र साधना, ग्रहों के ज्यामितीय यंत्र एवं विशिष्ट मंत्रों द्वारा जीवन में शांति व समृद्धि।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  'special-yantras': {
    titleEn: 'Special Vedic Yantras & Custom Sacred Matrices | Randhir Singh',
    titleHi: 'विशिष्ट वैदिक यंत्र एवं सिद्ध यंत्र विन्यास | रणधीर सिंह',
    descEn: 'Rare and powerful Vedic yantra matrices consecrated according to your exact birth number alignments.',
    descHi: 'दुर्लभ व सिद्ध वैदिक यंत्र जो आपके जन्म अंकों के साथ तालमेल बिठाकर सफलता का मार्ग प्रशस्त करते हैं।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  'dob-yantras': {
    titleEn: 'Date of Birth Yantras · Personalized Numerological Matrices | Randhir Singh',
    titleHi: 'जन्मतिथि आधारित व्यक्तिगत यंत्र (Date of Birth Yantras) | रणधीर सिंह',
    descEn: 'Generate your bespoke Date of Birth Yantra matrix combining Mulank, Bhagyank, and missing plane remedies.',
    descHi: 'आपकी जन्मतिथि के अंकों से निर्मित शक्तिशाली व्यक्तिगत अंक यंत्र जो जीवन में संतुलन लाता है।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  'kundli-milan': {
    titleEn: 'Kundli Milan & 36 Guna Match Analysis | Randhir Singh Jaipur',
    titleHi: 'कुंडली मिलान एवं 36 गुण मिलान विश्लेषण | रणधीर सिंह जयपुर',
    descEn: 'Vedic Kundli Milan and 36 Guna synastry matching for marriage harmony, partnership longevity, and life compatibility.',
    descHi: 'वैदिक ज्योतिष एवं अंक शास्त्र के आधार पर विवाह व व्यापारिक साझेदारी हेतु समग्र 36 गुण मिलान विश्लेषण।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  'and-more': {
    titleEn: 'Holistic Spiritual Remedies & Switchwords | Randhir Singh Jaipur',
    titleHi: 'समग्र आध्यात्मिक उपाय एवं हीलिंग स्विचवर्ड्स | रणधीर सिंह जयपुर',
    descEn: 'Vedic switchwords, sacred numbers, and powerful energetic remedies for swift obstacle removal.',
    descHi: 'त्वरित बाधा निवारण एवं सकारात्मक ऊर्जा वृद्धि हेतु वैदिक स्विचवर्ड्स व विशिष्ट उपाय।',
    ogImage: '/Randhir Singh.png'
  }
};

export const SeoHead: React.FC<SeoHeadProps> = ({
  currentTab,
  lang,
  cmsPage,
  pageTitle,
  pageDescription
}) => {
  const [seoConfig, setSeoConfig] = useState<SiteSeoConfig>(DEFAULT_CONFIG);

  useEffect(() => {
    fetch('/api/seo/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSeoConfig((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cleanLang = (lang || 'en-us').toLowerCase().trim();
    const isRtl = isRtlLanguage(cleanLang);
    const host = (seoConfig.canonicalHost || 'https://numerologist-randhir-singh.ai.studio').replace(/\/+$/, '');
    const cleanTab = currentTab.toLowerCase().trim().replace(/^pages\//, '').replace(/^#/, '');

    // Set HTML lang and dir attributes
    document.documentElement.lang = cleanLang;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';

    // 1. Determine Title & Description
    const t = getTranslation(cleanLang);
    let finalTitle = DEFAULT_CONFIG.siteTitle;
    let finalDesc = DEFAULT_CONFIG.metaDescription;
    let ogImg = seoConfig.defaultOgImage || '/Randhir Singh.png';
    let isNoIndex = false;

    // Build URL subpath
    let subpath = '';
    if (cleanTab === 'admin') {
      finalTitle = 'Admin CMS & SEO Portal | Numerologist Randhir Singh';
      finalDesc = 'Administrative control panel and technical SEO management.';
      subpath = 'admin';
      isNoIndex = true;
    } else if (cmsPage) {
      finalTitle = cmsPage.seoTitle || (cleanLang === 'hi' ? cmsPage.titleHi || cmsPage.title : cmsPage.title) || DEFAULT_CONFIG.siteTitle;
      finalDesc = cmsPage.seoDescription || cmsPage.description || DEFAULT_CONFIG.metaDescription;
      ogImg = cmsPage.ogImage || cmsPage.featuredImage || ogImg;
      subpath = `pages/${cmsPage.slug}`;
      if (cmsPage.noIndex) isNoIndex = true;
    } else if (ROUTE_SEO[cleanTab]) {
      const r = ROUTE_SEO[cleanTab];
      finalTitle = cleanLang === 'hi' ? r.titleHi : r.titleEn;
      finalDesc = cleanLang === 'hi' ? r.descHi : r.descEn;
      if (r.ogImage) ogImg = r.ogImage;
      subpath = cleanTab === 'home' ? '' : `#${cleanTab}`;
    } else if (pageTitle) {
      finalTitle = `${pageTitle} | Numerologist & Healer Randhir Singh`;
      if (pageDescription) finalDesc = pageDescription;
    }

    const canonicalUrl = subpath
      ? `${host}/${cleanLang}/${subpath}`
      : `${host}/${cleanLang}/`;

    // Ensure full image URL
    const fullOgImage = ogImg.startsWith('http') ? ogImg : `${host}${ogImg.startsWith('/') ? '' : '/'}${ogImg}`;

    // 2. Set Document Title
    document.title = finalTitle;

    // Helper to safely set or create meta tags
    const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    // 3. Set Primary Meta Tags
    setMeta('name', 'description', finalDesc);
    setMeta('name', 'title', finalTitle);
    setMeta('name', 'robots', isNoIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setMeta('name', 'author', 'Randhir Singh');
    setMeta('name', 'keywords', 'Vedic Numerologist India, Numerologist in Jaipur, Numerology Consultation, Lucky Number Analysis, Destiny Number Analysis, Lo Shu Grid Numerology, Name Numerology, Tarot Guidance, Chakra Meditation, Spiritual Wellness, Wristwatch Analysis, Online Numerology Consultation');

    // 4. Set Canonical Link
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    canonicalTag.setAttribute('href', canonicalUrl);

    // 5. OpenGraph Tags
    setMeta('property', 'og:title', finalTitle);
    setMeta('property', 'og:description', finalDesc);
    setMeta('property', 'og:url', canonicalUrl);
    setMeta('property', 'og:image', fullOgImage);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', 'Numerologist & Healer Randhir Singh');
    setMeta('property', 'og:locale', LOCALE_MAP[cleanLang] || 'en_US');

    // 6. Twitter / X Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDesc);
    setMeta('name', 'twitter:image', fullOgImage);

    // 7. Inject Reciprocal hreflang tags for all 17 languages + x-default
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    ALL_LANGUAGES.forEach((l) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l.code;
      link.href = subpath ? `${host}/${l.code}/${subpath}` : `${host}/${l.code}/`;
      document.head.appendChild(link);
    });
    // Add x-default pointing to default master language root
    const xDefaultLink = document.createElement('link');
    xDefaultLink.rel = 'alternate';
    xDefaultLink.hreflang = 'x-default';
    xDefaultLink.href = subpath ? `${host}/${subpath}` : `${host}/`;
    document.head.appendChild(xDefaultLink);

    // 8. Search Console & Webmaster Verification
    if (seoConfig.googleVerificationCode) {
      setMeta('name', 'google-site-verification', seoConfig.googleVerificationCode);
    }
    if (seoConfig.bingVerificationCode) {
      setMeta('name', 'msvalidate.01', seoConfig.bingVerificationCode);
    }

    // 9. Schema.org JSON-LD Structured Data
    const schemaId = 'dynamic-seo-schema-script';
    let scriptEl = document.getElementById(schemaId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = schemaId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const dynamicGraph = [
      {
        '@type': 'WebSite',
        '@id': `${host}/#website`,
        url: host,
        name: 'Numerologist & Healer Randhir Singh',
        description: DEFAULT_CONFIG.metaDescription,
        inLanguage: ALL_LANGUAGES.map((l) => l.code),
        potentialAction: {
          '@type': 'SearchAction',
          target: `${host}/#dob-calculator`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'Person',
        '@id': `${host}/#person`,
        name: 'Randhir Singh',
        jobTitle: 'Vedic Numerologist & Spiritual Healer',
        telephone: '+91-9509593150',
        email: 'randhirjpr@gmail.com',
        image: `${host}/Randhir%20Singh.png`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          postalCode: '302017',
          addressCountry: 'IN'
        },
        award: [
          'Keynote Speaker at 2nd Mega Convocation, Radisson Blu, Jaipur',
          'Certificate of Excellence in Vedic Numerology',
          'DDU-GKY Jyotish Skill Certification'
        ]
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${host}/#service`,
        name: 'Numerologist & Healer Randhir Singh Sanctuary',
        url: host,
        telephone: '+91-9509593150',
        email: 'randhirjpr@gmail.com',
        priceRange: '₹₹',
        image: `${host}/Randhir%20Singh.png`,
        description: 'Vedic Numerology, Lo Shu Grid Analysis, Watch Therapy, Salt Cleansing, and Divine Yantras in Jaipur, Rajasthan.',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          postalCode: '302017',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 26.9124,
          longitude: 75.7873
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:00',
            closes: '18:00'
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday'],
            opens: '09:00',
            closes: '14:00'
          }
        ]
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${host}/${cleanLang}/`
          },
          ...(subpath
            ? [
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: finalTitle.split('·')[0].split('|')[0].trim(),
                  item: canonicalUrl
                }
              ]
            : [])
        ]
      }
    ];

    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': dynamicGraph
    });
  }, [currentTab, lang, cmsPage, pageTitle, pageDescription, seoConfig]);

  return null;
};
