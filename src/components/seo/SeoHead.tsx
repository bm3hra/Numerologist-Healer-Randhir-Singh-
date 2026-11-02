import React, { useEffect, useState } from 'react';
import { CMSPage, SiteSeoConfig } from '../../types';

interface SeoHeadProps {
  currentTab: string;
  lang: string;
  cmsPage?: CMSPage;
  pageTitle?: string;
  pageDescription?: string;
}

const DEFAULT_CONFIG: SiteSeoConfig = {
  siteName: 'DecodeYourDestiny - Numerologist & Healer Randhir Singh',
  siteTitle: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर -- A Numerologist and Healer · Randhir Singh Ji Jaipur',
  metaDescription: 'अपनी जन्मतिथि को समझें। अपने जीवन के पैटर्न को पहचानें। आत्मविश्वास के साथ आगे बढ़ें। वैदिक अंक ज्योतिष, वॉच थेरेपी, टैरो, प्राणिक हीलिंग, सॉल्ट क्लींजिंग और क्रिस्टल थेरेपी।',
  canonicalHost: 'https://decodeyourdestiny.in',
  defaultOgImage: '/Randhir Singh.png',
  googleVerificationCode: '',
  bingVerificationCode: '',
  ga4MeasurementId: '',
  gtmId: '',
  clarityId: '',
  indexNowKey: 'destiny-indexnow-key-2026'
};

// Route-specific metadata mapping for instant client-side SEO
const ROUTE_SEO: Record<string, { titleEn: string; titleHi: string; descEn: string; descHi: string; ogImage?: string }> = {
  home: {
    titleEn: 'A Numerologist & Healer · Randhir Singh Ji Jaipur | Decode Your Destiny',
    titleHi: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर -- अपनी जन्मतिथि के रहस्यों को जानें',
    descEn: 'Recognize your life patterns and move forward with clarity. Authentic Vedic Numerology, Watch Therapy, Lo-Shu Grid, Salt Cleansing and Crystal Balancing in Jaipur & Worldwide Online.',
    descHi: 'अपनी जन्मतिथि को समझें। अपने जीवन के पैटर्न को पहचानें। आत्मविश्वास के साथ आगे बढ़ें। वैदिक अंक ज्योतिष, वॉच थेरेपी, टैरो, प्राणिक हीलिंग, सॉल्ट क्लींजिंग और क्रिस्टल थेरेपी।',
    ogImage: '/Randhir Singh.png'
  },
  'dob-calculator': {
    titleEn: 'DECODE YOUR DATE OF BIRTH · Driver, Conductor & Lo-Shu Grid Calculator | Randhir Singh',
    titleHi: 'अपनी जन्मतिथि डिकोड करें · मूलांक, भाग्यांक, कुआ नंबर व 3×3 लो-शू व वैदिक ग्रिड कैलकुलेटर',
    descEn: 'Decode your Date of Birth instantly. Calculate Driver (Mulank), Conductor (Bhagyank), Kua Number, 8 Planes of Destiny, and Authentic Vedic 3×3 Grid with century exclusion.',
    descHi: 'अपनी जन्मतिथि दर्ज करें और जानें अपना मूलांक, भाग्यांक, कुआ नंबर, 8 भाग्य तल तथा वैदिक अंक कुंडली। जीवन को नई दिशा दें।',
    ogImage: '/Randhir Singh.png'
  },
  'watch-analysis': {
    titleEn: 'Wristwatch Analysis & Horological Therapy · Victorinox Signature Watch | Randhir Singh',
    titleHi: 'कलाई घड़ी विश्लेषण एवं वॉच थेरेपी · विक्टोरिनॉक्स सिग्नेचर थेरेपी वॉच | रणधीर सिंह',
    descEn: 'Discover the profound vibrational connection between your wristwatch dial geometry, colors, and planetary energies. Explore the Randhir Singh Signature Victorinox Therapy Watch with consecrated Om mandala.',
    descHi: 'आपकी कलाई पर बंधी घड़ी आपके अवचेतन मन और भाग्य की दिशा तय करती है। डायल आकार, धातु और रंग का वैदिक विश्लेषण एवं विक्टोरिनॉक्स सिग्नेचर वॉच।',
    ogImage: '/Luxury Gold Numerology Watch.png'
  },
  'salt-therapy': {
    titleEn: 'Negativity Removal & Traditional Salt Therapy · Sacred Aura Cleansing | Randhir Singh',
    titleHi: 'नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी) | रणधीर सिंह जयपुर',
    descEn: 'Authentic Himalayan and sea salt cleansing rituals to dissolve heavy energies, evil eye, and chronic stagnation from your aura and living space.',
    descHi: 'सेंधा नमक एवं समुद्री नमक द्वारा सूक्ष्म आभामंडल (Aura) की गहरी शुद्धि एवं घर-परिवार में सकारात्मक ऊर्जा का संचार।',
    ogImage: '/Card-Back.jpg'
  },
  'crystal-therapy': {
    titleEn: 'Vedic Crystal Therapy & Gemstone Healing Vibrations | Randhir Singh Jaipur',
    titleHi: 'क्रिस्टल थेरेपी एवं ऊर्जा चक्र संतुलन | रणधीर सिंह जयपुर',
    descEn: 'Personalized crystal prescriptions matching your missing Lo-Shu numbers and chakra centers for emotional balance, abundance, and spiritual grounding.',
    descHi: 'अपनी जन्मतिथि एवं मिसिंग नंबर्स के अनुसार सही क्रिस्टल, ब्रेसलेट व रत्नों की पहचान एवं चक्र संतुलन।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  'tariff-about': {
    titleEn: 'Consultancy & Healing Services Fees | Transparent Tariff | Randhir Singh',
    titleHi: 'परामर्श एवं हीलिंग सेवा शुल्क (Consultancy & Healing Fees) | रणधीर सिंह जयपुर',
    descEn: 'Transparent tariff for 1-on-1 personal consultations, wristwatch analysis, and distance pranic healing sessions. Every Sunday first 5 consultations free.',
    descHi: 'व्यक्तिगत अंक ज्योतिष परामर्श, कलाई घड़ी विश्लेषण व ऊर्जा उपचार हेतु पारदर्शी शुल्क सूची। प्रत्येक रविवार प्रथम 5 परामर्श निःशुल्क।',
    ogImage: '/Certificate Celebration Ceremony.png'
  },
  reviews: {
    titleEn: 'Client Reviews & Transformational Stories | Numerologist & Healer Randhir Singh',
    titleHi: 'ग्राहकों के अनुभव एवं जीवन परिवर्तन की कहानियाँ (Client Reviews) | रणधीर सिंह',
    descEn: 'Verified client reviews and testimonials from across India and worldwide on Vedic Numerology readings, Watch Therapy adjustments, and Pranic Healing.',
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
    // Fetch latest configured SEO settings from server
    fetch('/api/seo/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setSeoConfig((prev) => ({ ...prev, ...data }));
      })
      .catch(() => {
        // Fallback to defaults
      });
  }, []);

  useEffect(() => {
    const isHi = lang === 'hi';
    const host = (seoConfig.canonicalHost || 'https://decodeyourdestiny.in').replace(/\/+$/, '');
    const cleanTab = currentTab.toLowerCase().trim().replace(/^pages\//, '').replace(/^#/, '');

    // 1. Determine Title & Description
    let finalTitle = seoConfig.siteTitle;
    let finalDesc = seoConfig.metaDescription;
    let ogImg = seoConfig.defaultOgImage || '/Randhir Singh.png';
    let canonicalUrl = `${host}/`;
    let isNoIndex = false;

    if (cleanTab === 'admin') {
      finalTitle = 'Admin CMS & SEO Portal | Decode Your Destiny';
      finalDesc = 'Administrative control panel and technical SEO management.';
      canonicalUrl = `${host}/admin`;
      isNoIndex = true;
    } else if (cmsPage) {
      finalTitle = cmsPage.seoTitle || (isHi ? cmsPage.titleHi || cmsPage.title : cmsPage.title) || seoConfig.siteTitle;
      finalDesc = cmsPage.seoDescription || cmsPage.description || seoConfig.metaDescription;
      ogImg = cmsPage.ogImage || cmsPage.featuredImage || ogImg;
      canonicalUrl = cmsPage.canonicalUrl || `${host}/pages/${cmsPage.slug}`;
      if (cmsPage.noIndex) isNoIndex = true;
    } else if (ROUTE_SEO[cleanTab]) {
      const r = ROUTE_SEO[cleanTab];
      finalTitle = isHi ? r.titleHi : r.titleEn;
      finalDesc = isHi ? r.descHi : r.descEn;
      if (r.ogImage) ogImg = r.ogImage;
      canonicalUrl = cleanTab === 'home' ? `${host}/` : `${host}/#${cleanTab}`;
    } else if (pageTitle) {
      finalTitle = `${pageTitle} | ${seoConfig.siteName}`;
      if (pageDescription) finalDesc = pageDescription;
    }

    // Ensure image has full URL if relative
    const fullOgImage = ogImg.startsWith('http') ? ogImg : `${host}${ogImg.startsWith('/') ? '' : '/'}${ogImg}`;

    // 2. Set Browser Tab Title
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

    // 4. Set Canonical Link Tag
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
    setMeta('property', 'og:site_name', seoConfig.siteName);
    setMeta('property', 'og:locale', isHi ? 'hi_IN' : 'en_US');

    // 6. Twitter / X Cards
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', finalTitle);
    setMeta('name', 'twitter:description', finalDesc);
    setMeta('name', 'twitter:image', fullOgImage);

    // 7. Search Console & Webmaster Verification Tags
    if (seoConfig.googleVerificationCode) {
      setMeta('name', 'google-site-verification', seoConfig.googleVerificationCode);
    }
    if (seoConfig.bingVerificationCode) {
      setMeta('name', 'msvalidate.01', seoConfig.bingVerificationCode);
    }

    // 8. Dynamic BreadcrumbList & Page Schema.org Injection
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
        name: seoConfig.siteName,
        description: seoConfig.metaDescription,
        inLanguage: ['hi', 'en'],
        publisher: {
          '@type': 'Organization',
          name: 'Numerology With Randhir Singh',
          url: host,
          logo: {
            '@type': 'ImageObject',
            url: `${host}/Randhir%20Singh.png`
          }
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: isHi ? 'मुख्य पृष्ठ (Home)' : 'Home',
            item: `${host}/`
          },
          ...(cleanTab !== 'home'
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
