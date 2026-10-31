import { CMSPage } from '../types';
import { SERVICES_DETAIL_DATA } from './servicesDetailData';

export const INITIAL_ALL_WEBSITE_PAGES: CMSPage[] = [
  // ==========================================
  // 1. HOMEPAGE SECTIONS (16 Sections)
  // ==========================================
  {
    id: 'page_hero_section',
    slug: 'hero-section',
    title: 'Discover Your Path. Transform Your Life.',
    titleHi: 'अपनी सही राह पहचानें। अपने जीवन को नई दिशा दें।',
    category: 'homepage',
    sectionId: 'home',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'A Numerologist and Healer · Randhir Singh Ji Jaipur',
    seoDescription: 'Decode your Date of Birth. Recognize your life patterns. Move forward with confidence.',
    ogImage: '/Randhir Singh.png',
    featuredImage: '/Randhir Singh.png',
    showInNav: false,
    navOrder: 1,
    viewCount: 1420,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'hero_blk_1',
        type: 'hero',
        title: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर',
        subtitle: 'अपनी सही राह पहचानें। अपने जीवन को नई दिशा दें। अपनी जन्मतिथि को समझें। अपने जीवन के पैटर्न को पहचानें। आत्मविश्वास के साथ आगे बढ़ें।',
        imageUrl: '/Randhir Singh.png',
        imageAlt: 'Randhir Singh Jaipur',
        buttonText: 'परामर्श बुक करें (Book Consultation)',
        buttonLink: '#tariff',
        buttonStyle: 'primary'
      },
      {
        id: 'hero_blk_2',
        type: 'text',
        title: 'वैदिक दृष्टि एवं समग्र समाधान',
        content: 'वैदिक अंक ज्योतिष (न्यूमेरोलॉजी), कलाई घड़ी विश्लेषण (वॉच थेरेपी), टैरो रीडिंग, प्राणिक हीलिंग, सॉल्ट क्लींजिंग और क्रिस्टल थेरेपी का एक समग्र अनुभव।\n\nअपने व्यक्तित्व, जीवन की प्राथमिकताओं और व्यक्तिगत लक्ष्यों को बेहतर ढंग से समझने की दिशा में कदम बढ़ाएँ।\n\nरणधीर सिंह · जयपुर, राजस्थान · ऑनलाइन परामर्श उपलब्ध।'
      },
      {
        id: 'hero_blk_3',
        type: 'features',
        title: 'त्वरित सुविधाएँ एवं विशेषताएँ',
        items: [
          { title: 'रविवार 5 फ्री कंसल्टेशन', description: 'प्रत्येक रविवार प्रथम 5 आगंतुकों हेतु निःशुल्क अंक ज्योतिष विश्लेषण।' },
          { title: 'जयपुर क्लिनिक व ऑनलाइन', description: 'जगतपुरा, जयपुर क्लिनिक में प्रत्यक्ष अथवा विश्वभर से ऑनलाइन परामर्श।' },
          { title: '₹5,100 व्यक्तिगत परामर्श', description: '45-60 मिनट का गहन विश्लेषणात्मक व्यक्तिगत सत्र।' }
        ]
      }
    ]
  },
  {
    id: 'page_watch_analysis',
    slug: 'watch-analysis',
    title: 'Watch Analysis & Horological Therapy',
    titleHi: 'कलाई घड़ी विश्लेषण एवं वॉच थेरेपी (Watch Therapy)',
    category: 'homepage',
    sectionId: 'watch-analysis',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Watch Analysis & Horological Therapy | Randhir Singh Jaipur',
    seoDescription: 'आपकी कलाई पर बंधी घड़ी केवल समय देखने का साधन नहीं, बल्कि आपकी व्यक्तिगत पसंद, जीवनशैली और व्यक्तित्व की अभिव्यक्ति भी हो सकती है।',
    ogImage: '/Luxury_Gold_Numerology_Watch_0e113989.png',
    featuredImage: '/Luxury_Gold_Numerology_Watch_0e113989.png',
    showInNav: true,
    navOrder: 2,
    viewCount: 1150,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'watch_blk_1',
        type: 'heading',
        title: 'घड़ी विश्लेषण एवं चिकित्सीय घड़ी परामर्श',
        subtitle: 'आपकी कलाई पर बंधी घड़ी केवल समय देखने का साधन नहीं, बल्कि आपकी व्यक्तिगत पसंद, जीवनशैली और व्यक्तित्व की अभिव्यक्ति भी हो सकती है।'
      },
      {
        id: 'watch_blk_2',
        type: 'image',
        imageUrl: '/Luxury_Gold_Numerology_Watch_0e113989.png',
        imageAlt: 'Luxury Gold Numerology Watch',
        title: 'लक्ज़री गोल्ड न्यूमेरोलॉजी वॉच',
        subtitle: 'डायल आकार, अंक संरचना और धातु की तरंगों का सूक्ष्म संतुलन',
        alignment: 'center'
      },
      {
        id: 'watch_blk_3',
        type: 'text',
        title: 'वॉच थेरेपी का वैज्ञानिक एवं प्रतीकात्मक आधार',
        content: 'इस विशेष परामर्श में घड़ी की मजबूती, आकार, डिज़ाइन, रंग, डायल और अंकों की संरचना का विश्लेषण किया जाता है। इसका उद्देश्य घड़ी से जुड़े प्रतीकात्मक अर्थों और उनके प्रति आपकी व्यक्तिगत धारणाओं को समझना है, ताकि आत्म-जागरूकता, व्यक्तिगत पसंद और जीवन के लक्ष्यों पर एक नया दृष्टिकोण प्राप्त किया जा सके।\n\nयह परामर्श अंक ज्योतिष एवं प्रतीकात्मक व्याख्याओं पर आधारित है। इसे वैज्ञानिक रूप से प्रमाणित निदान या जीवन में परिणामों की गारंटी के रूप में नहीं समझना चाहिए।'
      },
      {
        id: 'watch_blk_4',
        type: 'gallery',
        title: 'अनुशंसित वैदिक घड़ियाँ',
        images: [
          { url: '/Luxury_Gold_Numerology_Watch_0e113989.png', caption: 'स्वर्ण फ्रेम एवं अंक संरेखण घड़ी' },
          { url: '/Luxury_Gold-and-Blue_Numerology_Watch_e1bbd5f5.png', caption: 'नीला डायल एवं जल तत्व संतुलन घड़ी' }
        ],
        columns: 2
      },
      {
        id: 'watch_blk_5',
        type: 'consultation',
        title: 'घड़ी विश्लेषण परामर्श बुक करें',
        subtitle: 'अपनी वर्तमान घड़ी की फोटो भेजें और ड्राइवर/कंडक्टर अनुसार सही घड़ी जानें।',
        price: '₹5,100',
        duration: '45 मिनट (फोन / वीडियो कॉल)',
        buttonText: 'परामर्श बुक करें'
      }
    ]
  },
  {
    id: 'page_salt_therapy',
    slug: 'salt-therapy',
    title: 'Salt Therapy & Aura Cleansing',
    titleHi: 'नमक चिकित्सा एवं नकारात्मक ऊर्जा शुद्धि (Salt Therapy)',
    category: 'homepage',
    sectionId: 'salt-therapy',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Salt Therapy for Evil Eye & Heavy Negativity | Randhir Singh Jaipur',
    seoDescription: 'वैदिक सेंधा नमक एवं समुद्री नमक द्वारा नकारात्मकता, मानसिक भारीपन और तनाव से मुक्ति के प्रामाणिक उपाय।',
    ogImage: '/Card-Back.jpg',
    featuredImage: '/Card-Back.jpg',
    showInNav: true,
    navOrder: 3,
    viewCount: 890,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'salt_blk_1',
        type: 'heading',
        title: 'नकारात्मक ऊर्जा से मुक्ति एवं नमक चिकित्सा (सॉल्ट थेरेपी)',
        subtitle: 'प्राकृतिक सेंधा नमक एवं समुद्री लवण द्वारा सूक्ष्म आभामंडल (Aura) की गहरी सफाई'
      },
      {
        id: 'salt_blk_2',
        type: 'text',
        title: 'नमक चिकित्सा के सिद्ध वैदिक नियम',
        content: 'सेंधा नमक और खड़ा समुद्री नमक प्राकृतिक नकारात्मक आयन (Negative Ions) उत्सर्जित करते हैं। यह घर के कोनों, कार्यस्थल और व्यक्तिगत शरीर में जमी भारी ऊर्जा को खींचकर नष्ट कर देते हैं।\n\n1. कटोरी में समुद्री नमक रखकर घर के दक्षिण-पश्चिम कोने में स्थापित करें।\n2. स्नान के जल में एक चुटकी सेंधा नमक मिलाकर शनिवार अथवा मंगलवार को स्नान करें।\n3. पोछे के पानी में नमक का प्रयोग कर भूमि की नकारात्मकता को शांत करें।'
      },
      {
        id: 'salt_blk_3',
        type: 'button',
        title: 'सॉल्ट थेरेपी व्यक्तिगत मार्गदर्शन',
        buttonText: 'व्हाट्सएप पर संपर्क करें (+91 95095 93150)',
        buttonLink: 'https://wa.me/919509593150?text=Hello%20Randhir%20ji,%20I%20want%20to%20consult%20about%20Salt%20Therapy',
        buttonStyle: 'whatsapp'
      }
    ]
  },
  {
    id: 'page_crystal_therapy',
    slug: 'crystal-therapy',
    title: 'Crystal & Gemstone Healing',
    titleHi: 'क्रिस्टल थेरेपी एवं ऊर्जा चक्र संतुलन (Crystal Therapy)',
    category: 'homepage',
    sectionId: 'crystal-therapy',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Crystal Therapy & Gemstone Healing | Randhir Singh Jaipur',
    seoDescription: 'अपनी जन्मतिथि एवं मिसिंग नंबर्स के अनुसार सही क्रिस्टल, ब्रेसलेट व रत्नों की पहचान।',
    ogImage: '/Certificate Celebration Ceremony.png',
    featuredImage: '/Certificate Celebration Ceremony.png',
    showInNav: true,
    navOrder: 4,
    viewCount: 780,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'crys_blk_1',
        type: 'heading',
        title: 'क्रिस्टल थेरेपी एवं रत्न ऊर्जा संतुलन',
        subtitle: 'प्राकृतिक क्वार्ट्ज, पायराइट, टाइगर आई एवं एमेथिस्ट द्वारा ग्रहों का शुभ स्पंदन'
      },
      {
        id: 'crys_blk_2',
        type: 'text',
        content: 'हर क्रिस्टल का अपना विशिष्ट आवृत्ति स्पंदन (Frequency Vibration) होता है। जब आप अपनी जन्मतिथि के अनुकूल क्रिस्टल धारण करते हैं, तो आपका आभामंडल सशक्त होता है और मानसिक एकाग्रता बढ़ती है।'
      }
    ]
  },
  {
    id: 'page_lunar_numerology',
    slug: 'lunar-numerology',
    title: 'Lunar Numerology & Moon Phases',
    titleHi: 'चंद्र अंक ज्योतिष एवं मानसिक शांति (Lunar Numerology)',
    category: 'homepage',
    sectionId: 'lunar-numerology',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Lunar Numerology & Moon Phases | Randhir Singh Jaipur',
    seoDescription: 'पूर्णिमा, अमावस्या और चंद्र तिथियों का आपके मूलांक एवं भावनाओं पर प्रभाव।',
    showInNav: true,
    navOrder: 5,
    viewCount: 650,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'lunar_blk_1',
        type: 'heading',
        title: 'चंद्रमा का अंक ज्योतिष एवं मानसिक शांति',
        subtitle: 'चंद्रमा मन का कारक है। चंद्र कलाओं के साथ अपने निर्णयों का तालमेल बिठाएँ।'
      }
    ]
  },
  {
    id: 'page_dob_calculator',
    slug: 'dob-calculator',
    title: 'Date of Birth (Lo-Shu Grid) Calculator',
    titleHi: 'जन्मतिथि एवं लो-शू ग्रिड कैलकुलेटर (DOB Calculator)',
    category: 'homepage',
    sectionId: 'dob-calculator',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Lo-Shu Grid Calculator | Decode Your Date of Birth',
    seoDescription: 'अपनी जन्मतिथि दर्ज करें और मूलांक, भाग्यांक, 8 योग एवं मिसिंग नंबर्स जानें।',
    showInNav: true,
    navOrder: 6,
    viewCount: 2850,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'dob_blk_1',
        type: 'heading',
        title: 'जन्मतिथि विश्लेषण (Lo-Shu Magic Grid)',
        subtitle: 'अपनी जन्मतिथि के अंकों से जानें अपना मूलांक, भाग्यांक और 8 जीवन विमान (Planes)'
      }
    ]
  },
  {
    id: 'page_mobile_name',
    slug: 'mobile-name',
    title: 'Mobile & Name Vibration Analyzer',
    titleHi: 'लकी मोबाइल नंबर व नामांक विश्लेषण (Mobile & Name)',
    category: 'homepage',
    sectionId: 'mobile-name',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Lucky Mobile Number & Name Correction | Randhir Singh',
    seoDescription: 'अपने मोबाइल नंबर का कुल योग और स्पेलिंग की सकारात्मक आवृत्ति की जाँच करें।',
    showInNav: true,
    navOrder: 7,
    viewCount: 1640,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'mob_blk_1',
        type: 'heading',
        title: 'मोबाइल नंबर एवं नाम विश्लेषण टूल',
        subtitle: 'प्रतिदिन बोले और डायल किए जाने वाले अंकों का आपके भाग्य पर सीधा प्रभाव पड़ता है।'
      }
    ]
  },
  {
    id: 'page_grid_matching',
    slug: 'grid-matching',
    title: 'Lo-Shu Grid Matching & Compatibility',
    titleHi: 'अंक ज्योतिष ग्रिड मिलान टूल (Grid Matching)',
    category: 'homepage',
    sectionId: 'grid-matching',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Lo-Shu Grid Matching & Couple Compatibility | Randhir Singh',
    seoDescription: 'दो जन्मतिथियों का मिलान कर मानसिक, भावनात्मक और व्यावहारिक अनुकूलता जानें।',
    showInNav: false,
    navOrder: 8,
    viewCount: 920,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'grid_blk_1',
        type: 'heading',
        title: 'ग्रिड मिलान एवं अनुकूलता परीक्षण',
        subtitle: 'विवाह, व्यापारिक साझेदारी एवं पारिवारिक सामंजस्य हेतु लो-शू ग्रिड मिलान'
      }
    ]
  },
  {
    id: 'page_switchwords_yantras',
    slug: 'switchwords-yantras',
    title: 'Switchwords & Sacred Yantras',
    titleHi: 'दैवीय स्विचवर्ड्स एवं यंत्र (Switchwords & Yantras)',
    category: 'homepage',
    sectionId: 'yantras-codes',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Divine Switchwords & Sacred Yantras | Randhir Singh',
    seoDescription: 'ऊर्जा चक्र (Energy Circles), जादुई स्विचवर्ड्स और सिद्ध यंत्रों का खजाना।',
    showInNav: true,
    navOrder: 9,
    viewCount: 1330,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'sw_blk_1',
        type: 'heading',
        title: 'दैवीय स्विचवर्ड्स एवं सिद्ध यंत्र',
        subtitle: 'तुरंत अवचेतन मन को सक्रिय करने वाले शब्द एवं ज्यामितीय ऊर्जा यंत्र'
      }
    ]
  },
  {
    id: 'page_all_services',
    slug: 'all-services',
    title: 'All 16 Divine Services Overview',
    titleHi: 'सभी 16 दिव्य सेवाएँ (All 16 Services)',
    category: 'homepage',
    sectionId: 'all-services',
    isSystemPage: true,
    status: 'published',
    seoTitle: '16 Divine Numerology & Healing Services | Randhir Singh Jaipur',
    seoDescription: 'अंक ज्योतिष, वॉच थेरेपी, कुंडली, वास्तु, प्राणिक हीलिंग और समस्त 16 सेवाएँ।',
    showInNav: true,
    navOrder: 10,
    viewCount: 2100,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'srv_blk_1',
        type: 'heading',
        title: 'अंक ज्योतिष एवं उपचारात्मक 16 विशिष्ट सेवाएँ',
        subtitle: 'जीवन के हर पहलू — स्वास्थ्य, करियर, विवाह, धन एवं सुरक्षा का समग्र वैदिक समाधान'
      }
    ]
  },
  {
    id: 'page_about_randhir',
    slug: 'about-randhir',
    title: 'About Randhir Singh & Philosophy',
    titleHi: 'रणधीर सिंह जी का परिचय एवं दर्शन (About Randhir Singh)',
    category: 'homepage',
    sectionId: 'about-randhir',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'About Randhir Singh | Numerologist & Healer Jaipur Rajasthan',
    seoDescription: 'रणधीर सिंह जी का जीवन परिचय, शोध, अंतरराष्ट्रीय मान्यताएँ एवं जयपुर क्लिनिक।',
    ogImage: '/Randhir Singh.png',
    featuredImage: '/Randhir Singh.png',
    showInNav: true,
    navOrder: 11,
    viewCount: 3400,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'abt_blk_1',
        type: 'hero',
        title: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर',
        subtitle: 'वैदिक ज्ञान, वैज्ञानिक विश्लेषण और निस्वार्थ सेवा का अनूठा संगम',
        imageUrl: '/Randhir Singh.png',
        imageAlt: 'Randhir Singh Jaipur'
      },
      {
        id: 'abt_blk_2',
        type: 'text',
        title: 'आध्यात्मिक यात्रा एवं सिद्धांत',
        content: 'रणधीर सिंह जी ने वर्षों के गहन अनुसंधान, हजारों कुंडलियों एवं कलाई घड़ियों के व्यावहारिक अध्ययन के आधार पर वैदिक अंक ज्योतिष को आधुनिक जीवनशैली के साथ जोड़ा है।'
      }
    ]
  },
  {
    id: 'page_tariff_about',
    slug: 'tariff-about',
    title: 'Consultation Tariff, Fees & Bank Details',
    titleHi: 'परामर्श शुल्क, बुकिंग व बैंक विवरण (Tariff & Fees)',
    category: 'homepage',
    sectionId: 'tariff-about',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Tariff & Consultation Fees (₹5,100) | Randhir Singh Jaipur',
    seoDescription: 'व्यक्तिगत परामर्श शुल्क ₹5,100, रविवार 5 फ्री कंसल्टेशन, और अधिकृत UPI/बैंक विवरण।',
    showInNav: true,
    navOrder: 12,
    viewCount: 1980,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'trf_blk_1',
        type: 'consultation',
        title: 'व्यक्तिगत पूर्ण अंक ज्योतिष एवं हीलिंग परामर्श',
        subtitle: 'मूलांक, भाग्यांक, वॉच थेरेपी, नाम संशोधन एवं जीवन के प्रश्नों का संपूर्ण समाधान',
        price: '₹5,100',
        duration: '45-60 मिनट (Google Meet / Phone / Jaipur Clinic)',
        buttonText: 'परामर्श बुक करें (+91 95095 93150)'
      },
      {
        id: 'trf_blk_2',
        type: 'text',
        title: 'रविवार विशेष: प्रथम 5 परामर्श निःशुल्क',
        content: 'समाज सेवा एवं जरूरतमंदों के कल्याण हेतु प्रत्येक रविवार को सुबह 10:00 बजे से पहले आने वाले 5 लोगों को निःशुल्क मार्गदर्शन प्रदान किया जाता है।'
      }
    ]
  },
  {
    id: 'page_awards_recognition',
    slug: 'awards-recognition',
    title: '40+ National Honors & Awards',
    titleHi: '40+ राष्ट्रीय पुरस्कार एवं सम्मान (Awards & Honors)',
    category: 'homepage',
    sectionId: 'awards-recognition',
    isSystemPage: true,
    status: 'published',
    seoTitle: '40+ National Awards & Honors | Randhir Singh Jaipur',
    seoDescription: 'राष्ट्रीय ज्योतिष रत्न, महा दीक्षांत समारोह एवं 40 से अधिक प्रतिष्ठित सम्मान।',
    ogImage: '/Certificate Celebration Ceremony.png',
    featuredImage: '/Certificate Celebration Ceremony.png',
    showInNav: true,
    navOrder: 13,
    viewCount: 1450,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'awd_blk_1',
        type: 'heading',
        title: 'राष्ट्रीय एवं अंतरराष्ट्रीय सम्मान व उपलब्धियाँ',
        subtitle: 'वैदिक ज्ञान और निःस्वार्थ जनसेवा हेतु 40 से अधिक प्रतिष्ठित मंचों द्वारा सम्मानित'
      },
      {
        id: 'awd_blk_2',
        type: 'gallery',
        title: 'सम्मान एवं दीक्षांत समारोह',
        images: [
          { url: '/Certificate Celebration Ceremony.png', caption: 'सर्टिफिकेट दीक्षांत समारोह सम्मान' }
        ],
        columns: 2
      }
    ]
  },
  {
    id: 'page_assets_certificates',
    slug: 'assets-certificates',
    title: 'Certificates Celebration Ceremony',
    titleHi: 'सर्टिफिकेट दीक्षांत समारोह एवं मान्यताएँ (Certificates)',
    category: 'homepage',
    sectionId: 'assets-certificates',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Official Certificates & Accreditations | Randhir Singh Jaipur',
    seoDescription: 'Advance Numerology, Wrist Watch Therapy एवं Advance Placement अधिकृत प्रमाण पत्र।',
    ogImage: '/Certificate Celebration Ceremony.png',
    featuredImage: '/Certificate Celebration Ceremony.png',
    showInNav: true,
    navOrder: 14,
    viewCount: 1250,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'cert_blk_1',
        type: 'heading',
        title: 'प्रमाणित शैक्षिक योग्यता एवं आधिकारिक मान्यताएँ',
        subtitle: 'ISO 9001:2015 एवं UDYAM अधिकृत राष्ट्रीय अंक ज्योतिष प्रमाण पत्र'
      },
      {
        id: 'cert_blk_2',
        type: 'image',
        imageUrl: '/Certificate Celebration Ceremony.png',
        imageAlt: 'Certificate Celebration Ceremony with Randhir Singh',
        title: 'Certificate Celebration Ceremony',
        subtitle: 'दीक्षांत समारोह में सम्मान एवं प्रमाण पत्र वितरण क्षण',
        alignment: 'center'
      }
    ]
  },
  {
    id: 'page_faq_section',
    slug: 'faq-section',
    title: 'Frequently Asked Questions (FAQs)',
    titleHi: 'अक्सर पूछे जाने वाले सवाल (FAQ Section)',
    category: 'homepage',
    sectionId: 'faq-section',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Frequently Asked Questions | Numerologist Randhir Singh',
    seoDescription: 'अंक ज्योतिष, परामर्श प्रक्रिया, अपॉइंटमेंट और उपचारात्मक विधियों के स्पष्ट उत्तर।',
    showInNav: true,
    navOrder: 15,
    viewCount: 970,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'faq_blk_1',
        type: 'heading',
        title: 'जिज्ञासा एवं समाधान — अक्सर पूछे जाने वाले सवाल',
        subtitle: 'परामर्श की प्रक्रिया, गोपनीयता और ज्योतिषीय समाधानों से संबंधित स्पष्टीकरण'
      }
    ]
  },
  {
    id: 'page_client_reviews',
    slug: 'client-reviews-stories',
    title: 'Client Reviews & Stories',
    titleHi: 'संतुष्ट ग्राहकों के अनुभव एवं समीक्षाएँ (Reviews)',
    category: 'homepage',
    sectionId: 'reviews',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Client Reviews & Stories | Randhir Singh Jaipur',
    seoDescription: '1,450+ संतुष्ट ग्राहकों के वास्तविक अनुभव, समीक्षाएं और जीवन परिवर्तन की सच्ची कहानियां।',
    ogImage: '/Randhir Singh.png',
    featuredImage: '/Randhir Singh.png',
    showInNav: true,
    navOrder: 17,
    viewCount: 1980,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-31T00:00:00.000Z',
    updatedAt: '2026-10-31T00:00:00.000Z',
    blocks: [
      {
        id: 'rev_blk_1',
        type: 'heading',
        title: 'संतुष्ट ग्राहकों के अनुभव एवं समीक्षाएँ',
        subtitle: 'अंक ज्योतिष, वॉच थेरेपी, और ऊर्जा उपचार से जीवन में सकारात्मक परिवर्तन'
      }
    ]
  },
  {
    id: 'page_media_gallery',
    slug: 'media-gallery',
    title: 'Media Gallery, Videos & Press',
    titleHi: 'फोटो, वीडियो एवं मीडिया गैलरी (Media Gallery)',
    category: 'homepage',
    sectionId: 'media-gallery',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Media Gallery & Videos | Randhir Singh Jaipur',
    seoDescription: 'दीक्षांत समारोह, टीवी साक्षात्कार, यूट्यूब पॉडकास्ट और प्रेस कवरेज।',
    ogImage: '/Certificate Celebration Ceremony.png',
    featuredImage: '/Certificate Celebration Ceremony.png',
    showInNav: true,
    navOrder: 16,
    viewCount: 1540,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'med_blk_1',
        type: 'heading',
        title: 'मीडिया, वीडियो एवं दीक्षांत समारोह गैलरी',
        subtitle: 'विभिन्न सम्मेलनों, कार्यशालाओं और समारोहों के ऐतिहासिक दृश्य'
      },
      {
        id: 'med_blk_2',
        type: 'gallery',
        title: 'समारोह छायाचित्र',
        images: [
          { url: '/Certificate Celebration Ceremony.png', caption: 'सर्टिफिकेट दीक्षांत समारोह' },
          { url: '/Randhir Singh.png', caption: 'रणधीर सिंह जी का आधिकारिक पोर्ट्रेट' }
        ],
        columns: 2
      }
    ]
  },

  // ==========================================
  // 2. 5 DEDICATED FULL PAGES
  // ==========================================
  {
    id: 'page_yantra_healings',
    slug: 'yantra-healings',
    title: 'Yantra Healings & Sacred Energy Shields',
    titleHi: 'यंत्र चिकित्सा एवं ऊर्जा कवच (Yantra Healings)',
    category: 'dedicated',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Yantra Healings & Sacred Energy Shields | Randhir Singh Jaipur',
    seoDescription: 'वैदिक ज्यामिति और सिद्ध यंत्रों द्वारा आभामंडल सुरक्षा एवं ऊर्जा संतुलन।',
    ogImage: '/Card-Back.jpg',
    featuredImage: '/Card-Back.jpg',
    showInNav: true,
    navOrder: 17,
    viewCount: 1890,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'yh_blk_1',
        type: 'hero',
        title: 'सिद्ध यंत्र चिकित्सा एवं सुरक्षा कवच',
        subtitle: 'प्राचीन वैदिक ज्यामिति से जीवन में सकारात्मक ऊर्जा और सुरक्षा का संचार',
        imageUrl: '/Card-Back.jpg'
      },
      {
        id: 'yh_blk_2',
        type: 'text',
        title: 'यंत्र क्या हैं और कैसे कार्य करते हैं?',
        content: 'यंत्र ब्रह्मांडीय ऊर्जा के वैज्ञानिक रिसीवर (Receivers) हैं। सही दिशा, धातु और प्राण-प्रतिष्ठा के साथ स्थापित किया गया यंत्र घर व कार्यस्थल से नकारात्मक तरंगों को तुरंत दूर करता है।'
      }
    ]
  },
  {
    id: 'page_special_yantras',
    slug: 'special-yantras',
    title: 'Special Vedic Yantras (Wealth, Protection)',
    titleHi: 'विशेष वैदिक यंत्र (Special Yantras)',
    category: 'dedicated',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Special Vedic Yantras for Wealth & Business | Randhir Singh',
    seoDescription: 'कुबेर यंत्र, महालक्ष्मी यंत्र, व्यापार वृद्धि यंत्र और सुरक्षा कवच।',
    ogImage: '/Card-Back.jpg',
    featuredImage: '/Card-Back.jpg',
    showInNav: true,
    navOrder: 18,
    viewCount: 1650,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'sy_blk_1',
        type: 'heading',
        title: 'विशेष एवं दुर्लभ वैदिक यंत्र',
        subtitle: 'धन, व्यापारिक समृद्धि और घर की सुरक्षा हेतु अभिमंत्रित यंत्र'
      }
    ]
  },
  {
    id: 'page_and_more',
    slug: 'and-more',
    title: 'And More Remedies (Daily Vedic Rules)',
    titleHi: 'अन्य महत्वपूर्ण वैदिक उपाय एवं नियम (And More)',
    category: 'dedicated',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Daily Vedic Numerology Remedies & Rules | Randhir Singh',
    seoDescription: 'दैनिक जीवन में छोटे-छोटे अचूक वैदिक नियम जो भाग्योदय करते हैं।',
    showInNav: true,
    navOrder: 19,
    viewCount: 1220,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'am_blk_1',
        type: 'heading',
        title: 'अन्य सरल एवं प्रभावशाली वैदिक उपाय',
        subtitle: 'जल के नियम, भोजन की दिशा, तिजोरी का स्थान और कलाई घड़ी पहनने के नियम'
      }
    ]
  },
  {
    id: 'page_dob_yantras',
    slug: 'dob-yantras',
    title: 'DOB-based Auspicious Yantras',
    titleHi: 'जन्मतिथि अनुसार लकी यंत्र (DOB Yantras)',
    category: 'dedicated',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'DOB-based Personalized Yantras | Randhir Singh Jaipur',
    seoDescription: 'आपके मूलांक और भाग्यांक के अनुसार विशेष रूप से तैयार किए जाने वाले यंत्र।',
    showInNav: true,
    navOrder: 20,
    viewCount: 1410,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'dy_blk_1',
        type: 'heading',
        title: 'जन्मतिथि आधारित व्यक्तिगत यंत्र',
        subtitle: 'मूलांक 1 से 9 तक के जातकों के लिए ग्रहों के अनुकूल सिद्ध यंत्र'
      }
    ]
  },
  {
    id: 'page_kundli_milan',
    slug: 'kundli-milan',
    title: 'Kundli Milan & Marriage Compatibility',
    titleHi: 'कुंडली मिलान एवं विवाह अनुकूलता (Kundli Milan)',
    category: 'dedicated',
    isSystemPage: true,
    status: 'published',
    seoTitle: 'Kundli Milan & Numerological Compatibility | Randhir Singh',
    seoDescription: 'वैदिक अष्टकूट मिलान और अंक ज्योतिष अनुकूलता का संपूर्ण अध्ययन।',
    showInNav: true,
    navOrder: 21,
    viewCount: 2200,
    authorEmail: 'admin@randhir.com',
    createdAt: '2026-10-29T00:00:00.000Z',
    updatedAt: '2026-10-29T00:00:00.000Z',
    blocks: [
      {
        id: 'km_blk_1',
        type: 'heading',
        title: 'कुंडली मिलान एवं विवाह अनुकूलता विश्लेषण',
        subtitle: 'सुखी वैवाहिक जीवन हेतु वर-वधू के गुणों, ग्रहों एवं भाग्यांकों का सटीक मिलान'
      }
    ]
  },

  // ==========================================
  // 3. 16 INDIVIDUAL DIVINE SERVICE PAGES
  // ==========================================
  ...Object.keys(SERVICES_DETAIL_DATA).map((key) => {
    const numKey = Number(key);
    const svc = SERVICES_DETAIL_DATA[numKey];
    return {
      id: `page_service_${svc.id}`,
      slug: `service-${svc.id}`,
      title: svc.titleEn,
      titleHi: svc.titleHi,
      category: 'service' as const,
      isSystemPage: true,
      status: 'published' as const,
      seoTitle: `${svc.titleEn} | Randhir Singh Jaipur`,
      seoDescription: svc.shortDesc || svc.taglineEn,
      ogImage: '/Randhir Singh.png',
      featuredImage: '/Randhir Singh.png',
      showInNav: true,
      navOrder: 30 + svc.id,
      viewCount: 450 + svc.id * 35,
      authorEmail: 'admin@randhir.com',
      createdAt: '2026-10-29T00:00:00.000Z',
      updatedAt: '2026-10-29T00:00:00.000Z',
      blocks: [
        {
          id: `svc_hero_${svc.id}`,
          type: 'hero' as const,
          title: svc.titleHi,
          subtitle: svc.taglineHi,
          imageUrl: svc.id === 2 ? '/Luxury_Gold_Numerology_Watch_0e113989.png' : '/Randhir Singh.png',
          buttonText: `परामर्श बुक करें (${svc.suggestedTariff})`,
          buttonLink: '#tariff',
          buttonStyle: 'primary' as const
        },
        {
          id: `svc_desc_${svc.id}`,
          type: 'text' as const,
          title: 'विस्तृत विवरण एवं विश्लेषण',
          content: `${svc.fullDescHi}\n\n${svc.fullDescEn}`
        },
        {
          id: `svc_card_${svc.id}`,
          type: 'consultation' as const,
          title: svc.titleHi,
          subtitle: svc.taglineHi,
          price: svc.suggestedTariff || '₹5,100',
          duration: '45-60 मिनट',
          buttonText: 'अभी स्लॉट आरक्षित करें'
        }
      ]
    };
  })
];
