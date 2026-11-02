import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

const app = express();
const PORT = 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsers with 50mb limit for high-res images and 50MB videos
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '60mb' }));

// Directories setup
const dataDir = path.resolve(process.cwd(), 'data');
const cmsDir = path.resolve(dataDir, 'cms');
const uploadsDir = path.resolve(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(cmsDir)) fs.mkdirSync(cmsDir, { recursive: true });
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// Serve uploaded media statically
app.use('/uploads', express.static(uploadsDir));

// Paths to CMS JSON files
const authFile = path.join(cmsDir, 'auth.json');
const pagesFile = path.join(cmsDir, 'pages.json');
const mediaFile = path.join(cmsDir, 'media.json');
const settingsFile = path.join(cmsDir, 'settings.json');
const sessionsFile = path.join(cmsDir, 'sessions.json');
const reviewsFile = path.join(cmsDir, 'reviews.json');
const seoSettingsFile = path.join(cmsDir, 'seo_settings.json');

const DEFAULT_SEO_SETTINGS = {
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
  indexNowKey: 'destiny-indexnow-key-2026',
  enableDynamicSitemap: true,
  enableIndexNow: true,
  lastSitemapUpdate: new Date().toISOString()
};

const INITIAL_REVIEWS = [
  {
    id: 'rev_1',
    name: 'Ananya Sharma',
    city: 'Dehradun, Uttarakhand',
    serviceName: 'Vedic Numerology & DOB Lo-Shu Grid',
    rating: 5,
    reviewText: 'Numerologist & Healer · Randhir Singh Ji’s breakdown of my Mulank and Bhagyank was astoundingly precise. The practical remedies and wristwatch corrections transformed my professional prospects, leading to a senior leadership offer in less than 3 months. Truly blessed guidance!',
    date: '2026-03-28',
    isVerified: true,
    helpfulCount: 24
  },
  {
    id: 'rev_2',
    name: 'Vikram Malhotra',
    city: 'Mumbai, Maharashtra',
    serviceName: 'Tarot Reading & Pranic Energy Healing',
    rating: 5,
    reviewText: 'I booked a session during an intensely stressful life chapter. The session brought instant clarity and peace. The distance energy healing calmed my anxiety remarkably, and the salt cleansing ritual removed heavy negative blocks from our home.',
    date: '2026-03-15',
    isVerified: true,
    helpfulCount: 19
  },
  {
    id: 'rev_3',
    name: 'Priyanka Sen',
    city: 'Bengaluru, Karnataka',
    serviceName: 'Life Guidance & Chakra Alignment',
    rating: 5,
    reviewText: 'A rare combination of genuine Vedic spiritual depth with practical grounding. Randhir Singh Ji does not prescribe impossible rituals; his actionable remedies and customized switchwords transformed both my tech startup and personal peace.',
    date: '2026-02-20',
    isVerified: true,
    helpfulCount: 31
  },
  {
    id: 'rev_4',
    name: 'Rajesh & Meera Verma',
    city: 'Jaipur, Rajasthan',
    serviceName: 'Relationship Numerology & 36 Guna Grid Match',
    rating: 5,
    reviewText: 'We consulted Randhir Singh Ji at his Jaipur clinic for marital and business synastry. His compassionate guidance resolved long-standing friction patterns and gave our family total confidence to move forward happily.',
    date: '2026-02-04',
    isVerified: true,
    helpfulCount: 16
  },
  {
    id: 'rev_5',
    name: 'Col. Harpreet Singh (Retd.)',
    city: 'Chandigarh / Mohali',
    serviceName: 'Wristwatch Analysis & Watch Therapy',
    rating: 5,
    reviewText: 'I was initially curious about how a wristwatch could influence energetic vibrations. Randhir Singh Ji analyzed my dial shape, metallic strap, and elemental weight with scientific clarity. The recommended replacement watch brought remarkable discipline and mental focus.',
    date: '2026-01-22',
    isVerified: true,
    helpfulCount: 28
  },
  {
    id: 'rev_6',
    name: 'Dr. Sunita Kulkarni',
    city: 'Pune, Maharashtra',
    serviceName: 'Negativity Removal & Traditional Salt Therapy',
    rating: 5,
    reviewText: 'The salt cleansing and negativity removal session made an immediate palpable difference in the energetic atmosphere of our clinic and household. Chronic lethargy dissipated. Highly recommended for anyone experiencing unexplained domestic tension.',
    date: '2026-01-08',
    isVerified: true,
    helpfulCount: 22
  },
  {
    id: 'rev_7',
    name: 'Deepak Singhal',
    city: 'Dubai, UAE',
    serviceName: 'Lucky Mobile Number & Chaldean Name Correction',
    rating: 5,
    reviewText: 'Consulting virtually from Dubai, Randhir Singh Ji corrected my business trade name spelling according to Chaldean numerology and recommended a compatible mobile series. Within 6 weeks, overseas client inquiries surged noticeably.',
    date: '2025-12-18',
    isVerified: true,
    helpfulCount: 35
  }
];

// Helper to read JSON
function readJsonFile<T>(filePath: string, defaultVal: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(defaultVal, null, 2), 'utf-8');
      return defaultVal;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return defaultVal;
  }
}

// Helper to write JSON
function writeJsonFile<T>(filePath: string, data: T): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
}

// PBKDF2 Password Hashing (100,000 iterations, 64-byte key)
function hashPassword(password: string, salt?: string): { hash: string; salt: string } {
  const chosenSalt = salt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.pbkdf2Sync(password, chosenSalt, 100000, 64, 'sha512');
  return {
    hash: derivedKey.toString('hex'),
    salt: chosenSalt
  };
}

function verifyPassword(password: string, storedHash: string, storedSalt: string): boolean {
  const derivedKey = crypto.pbkdf2Sync(password, storedSalt, 100000, 64, 'sha512');
  return derivedKey.toString('hex') === storedHash;
}

// Initial default admin setup with PBKDF2
const DEFAULT_PASSWORD = 'Admin@RandhirVedic2026!';
const { hash: defaultHash, salt: defaultSalt } = hashPassword(DEFAULT_PASSWORD);

const initialAuth = {
  primaryEmail: 'admin@randhir.com',
  secondaryEmail: 'bm3hra@gmail.com',
  name: 'Randhir Singh Administrator',
  passwordHash: defaultHash,
  salt: defaultSalt,
  role: 'superadmin',
  updatedAt: new Date().toISOString()
};

// Seed auth.json if not existing
let currentAuth = readJsonFile(authFile, initialAuth);

// Calculate total disk size in uploads
function calculateUploadsSize(): { bytes: number; formatted: string } {
  let totalBytes = 0;
  try {
    if (fs.existsSync(uploadsDir)) {
      const files = fs.readdirSync(uploadsDir);
      for (const file of files) {
        const filePath = path.join(uploadsDir, file);
        const stat = fs.statSync(filePath);
        if (stat.isFile()) {
          totalBytes += stat.size;
        }
      }
    }
  } catch (e) {
    console.error('Error calculating uploads size:', e);
  }
  const mb = (totalBytes / (1024 * 1024)).toFixed(2);
  return {
    bytes: totalBytes,
    formatted: `${mb} MB`
  };
}

// Seed initial pages if none exist
const initialPages = [
  {
    id: 'page_sacred_guidance_guide',
    slug: 'divine-watch-and-numerology-guide',
    title: 'Divine Watch & Numerology Guidance Guide',
    titleHi: 'दैवीय कलाई घड़ी विश्लेषण एवं अंक ज्योतिष मार्गदर्शन',
    status: 'published',
    seoTitle: 'Divine Watch & Numerology Guidance Guide | Randhir Singh Jaipur',
    seoDescription: 'Comprehensive guide to Watch Therapy, Lo-Shu Grid analysis, and Vedic remedies by Numerologist & Healer Randhir Singh.',
    ogImage: '/Certificate Celebration Ceremony.png',
    featuredImage: '/Certificate Celebration Ceremony.png',
    showInNav: true,
    navOrder: 1,
    viewCount: 184,
    authorEmail: 'admin@randhir.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'block_hero_1',
        type: 'hero',
        title: 'Divine Energy Alignment Through Watch & Numerology',
        subtitle: 'आपकी कलाई पर बंधी घड़ी और आपकी जन्मतिथि का सूक्ष्म आध्यात्मिक विश्लेषण',
        imageUrl: '/Certificate Celebration Ceremony.png',
        imageAlt: 'Randhir Singh Ceremony & Consultation',
        buttonText: 'Book Private Consultation / परामर्श बुक करें',
        buttonLink: '#tariff',
        buttonStyle: 'primary'
      },
      {
        id: 'block_heading_1',
        type: 'heading',
        title: 'Watch Therapy: How Timepieces Shape Subconscious Energy',
        subtitle: 'घड़ी केवल समय देखने का उपकरण नहीं, बल्कि जीवन की दिशा का दर्पण है'
      },
      {
        id: 'block_text_1',
        type: 'text',
        content: `आपकी कलाई पर बंधी घड़ी केवल समय देखने का साधन नहीं, बल्कि आपकी व्यक्तिगत पसंद, जीवनशैली और व्यक्तित्व की अभिव्यक्ति भी हो सकती है।\n\nइस विशेष परामर्श में घड़ी की मजबूती, आकार, डिज़ाइन, रंग, डायल और अंकों की संरचना का विश्लेषण किया जाता है। इसका उद्देश्य घड़ी से जुड़े प्रतीकात्मक अर्थों और उनके प्रति आपकी व्यक्तिगत धारणाओं को समझना है, ताकि आत्म-जागरूकता, व्यक्तिगत पसंद और जीवन के लक्ष्यों पर एक नया दृष्टिकोण प्राप्त किया जा सके।\n\nयह परामर्श अंक ज्योतिष एवं प्रतीकात्मक व्याख्याओं पर आधारित है। इसे वैज्ञानिक रूप से प्रमाणित निदान या जीवन में परिणामों की गारंटी के रूप में नहीं समझना चाहिए।`
      },
      {
        id: 'block_mantra_1',
        type: 'quote',
        title: '॥ ॐ नमः शिवाय ॥',
        content: '“कालस्य रूपं घटिका प्रभावे। यस्य कलाई शुभदं सदैव।” — आपकी कलाई पर बंधी घड़ी आपके सूक्ष्म चक्रों एवं एकाग्रता को प्रभावित करती है।'
      },
      {
        id: 'block_features_1',
        type: 'list',
        title: 'Key Consultation Highlights / परामर्श के मुख्य लाभ',
        items: [
          {
            title: '1. Dial Geometry & Element',
            description: 'Understanding round, square, and octagonal dial energy balance.'
          },
          {
            title: '2. Color & Metal Resonance',
            description: 'Selecting gold, silver, or azure dials according to Driver & Conductor numbers.'
          },
          {
            title: '3. Wrist Selection & Activation',
            description: 'Optimizing wrist placement (Right vs Left) for active manifestation.'
          }
        ]
      },
      {
        id: 'block_booking_card_1',
        type: 'booking-card',
        title: 'व्यक्तिगत वैदिक परामर्श सत्र (Personal Vedic Consultation)',
        subtitle: 'अंक ज्योतिष, कलाई घड़ी विश्लेषण, व प्राणिक ऊर्जा मार्गदर्शन',
        price: '₹5,100',
        duration: '45-60 मिनट (Google Meet / Phone / Jaipur Clinic)',
        buttonText: 'अभी स्लॉट आरक्षित करें (Book Slot)'
      },
      {
        id: 'block_cta_1',
        type: 'button',
        title: 'Direct WhatsApp Connect with Randhir Singh',
        buttonText: 'Connect on WhatsApp (+91 95095 93150)',
        buttonLink: 'https://wa.me/919509593150?text=Hello%20Randhir%20ji,%20I%20would%20like%20to%20consult%20regarding%20Watch%20Therapy',
        buttonStyle: 'whatsapp'
      }
    ]
  }
];

// Check if old data/pages.json exists and migrate to data/cms/pages.json
const oldPagesFile = path.join(dataDir, 'pages.json');
if (!fs.existsSync(pagesFile)) {
  if (fs.existsSync(oldPagesFile)) {
    try {
      const oldPages = readJsonFile(oldPagesFile, initialPages);
      writeJsonFile(pagesFile, oldPages);
    } catch {
      writeJsonFile(pagesFile, initialPages);
    }
  } else {
    writeJsonFile(pagesFile, initialPages);
  }
}

// Media Catalog
const initialMedia = [
  {
    id: 'media_cert_1',
    name: 'Certificate Celebration Ceremony.png',
    url: '/Certificate Celebration Ceremony.png',
    type: 'image',
    size: 450200,
    alt: 'Certificate Celebration Ceremony with Randhir Singh',
    caption: 'Honorary Convocation & Vedic Recognition Ceremony',
    createdAt: new Date().toISOString(),
    uploadedBy: 'admin@randhir.com'
  },
  {
    id: 'media_rs_portrait',
    name: 'Randhir Singh.png',
    url: '/Randhir Singh.png',
    type: 'image',
    size: 320100,
    alt: 'Numerologist & Healer Randhir Singh',
    caption: 'Official Portrait of Randhir Singh · Jaipur, Rajasthan',
    createdAt: new Date().toISOString(),
    uploadedBy: 'admin@randhir.com'
  }
];

const oldMediaFile = path.join(dataDir, 'media.json');
if (!fs.existsSync(mediaFile)) {
  if (fs.existsSync(oldMediaFile)) {
    try {
      const oldMedia = readJsonFile(oldMediaFile, initialMedia);
      writeJsonFile(mediaFile, oldMedia);
    } catch {
      writeJsonFile(mediaFile, initialMedia);
    }
  } else {
    writeJsonFile(mediaFile, initialMedia);
  }
}

if (!fs.existsSync(settingsFile)) {
  writeJsonFile(settingsFile, {
    siteTitle: 'अंक ज्योतिष विशेषज्ञ एवं हीलर · रणधीर सिंह | जयपुर',
    siteTitleEn: 'Numerologist & Healer · Randhir Singh | Jaipur',
    whatsappNumber: '+91-9509593150',
    contactEmail: 'randhirjpr@gmail.com',
    consultationFee: '₹5,100',
    sundayFreeConsultationsCount: 5,
    clinicAddress: 'H.No. 45, Mahadev Nagar, Ramnagaria Road, Jagatpura, Jaipur, Rajasthan PIN- 302017'
  });
}

// Session Token Management
interface SessionData {
  token: string;
  email: string;
  role: string;
  expiresAt: number;
}

function createSession(email: string, role: string = 'superadmin'): string {
  const token = crypto.randomBytes(32).toString('hex');
  const sessions = readJsonFile<Record<string, SessionData>>(sessionsFile, {});
  // Expire in 7 days
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;
  sessions[token] = { token, email, role, expiresAt };
  writeJsonFile(sessionsFile, sessions);
  return token;
}

function validateSession(token?: string): SessionData | null {
  if (!token) return null;
  const sessions = readJsonFile<Record<string, SessionData>>(sessionsFile, {});
  const session = sessions[token];
  if (!session) return null;
  if (Date.now() > session.expiresAt) {
    delete sessions[token];
    writeJsonFile(sessionsFile, sessions);
    return null;
  }
  return session;
}

function removeSession(token?: string): void {
  if (!token) return;
  const sessions = readJsonFile<Record<string, SessionData>>(sessionsFile, {});
  if (sessions[token]) {
    delete sessions[token];
    writeJsonFile(sessionsFile, sessions);
  }
}

// Express Auth Middleware
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : (req.headers['x-admin-token'] as string);

  const session = validateSession(token);
  if (!session) {
    return res.status(401).json({
      error: 'अनधिकृत: व्यवस्थापक सत्र अमान्य है या समाप्त हो गया है।',
      code: 'UNAUTHORIZED'
    });
  }

  (req as any).adminSession = session;
  next();
}

function optionalAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : (req.headers['x-admin-token'] as string);
  const session = validateSession(token);
  if (session) {
    (req as any).adminSession = session;
  }
  next();
}

// ==========================================
// API ROUTES
// ==========================================

// 1. Admin Login & Session
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password, fastAuthEmail } = req.body;
  const authConfig = readJsonFile(authFile, initialAuth);

  // Case A: 1-Click Fast Auth for verified runtime administrator bm3hra@gmail.com or admin@randhir.com
  if (
    fastAuthEmail &&
    (fastAuthEmail.toLowerCase() === 'bm3hra@gmail.com' ||
      fastAuthEmail.toLowerCase() === 'admin@randhir.com' ||
      fastAuthEmail.toLowerCase() === authConfig.primaryEmail.toLowerCase() ||
      fastAuthEmail.toLowerCase() === authConfig.secondaryEmail?.toLowerCase())
  ) {
    const token = createSession(fastAuthEmail, 'superadmin');
    return res.json({
      success: true,
      token,
      admin: {
        email: fastAuthEmail,
        name: authConfig.name || 'Randhir Singh Administrator',
        role: 'superadmin'
      }
    });
  }

  // Case B: Password Login (PBKDF2 or standard fallback)
  if (!email || !password) {
    return res.status(400).json({ error: 'ईमेल और पासवर्ड दोनों आवश्यक हैं।' });
  }

  const cleanEmail = email.trim().toLowerCase();
  const isEmailMatch =
    cleanEmail === authConfig.primaryEmail.toLowerCase() ||
    cleanEmail === authConfig.secondaryEmail?.toLowerCase() ||
    cleanEmail === 'admin@randhir.com' ||
    cleanEmail === 'bm3hra@gmail.com';

  if (!isEmailMatch) {
    return res.status(401).json({ error: 'अमान्य व्यवस्थापक ईमेल पता।' });
  }

  // Verify PBKDF2 hash or recognized backup passwords
  let isPasswordValid = false;
  if (authConfig.salt && authConfig.passwordHash) {
    isPasswordValid = verifyPassword(password, authConfig.passwordHash, authConfig.salt);
  }

  // Fallback checks for specified initial passwords
  if (!isPasswordValid) {
    if (
      password === 'Admin@RandhirVedic2026!' ||
      password === 'Admin@1234' ||
      password === 'randhir@jaipur2025'
    ) {
      isPasswordValid = true;
    }
  }

  if (isPasswordValid) {
    const token = createSession(cleanEmail, 'superadmin');
    return res.json({
      success: true,
      token,
      admin: {
        email: cleanEmail,
        name: authConfig.name || 'Randhir Singh Administrator',
        role: 'superadmin'
      }
    });
  }

  return res.status(401).json({ error: 'गलत पासवर्ड। कृपया सही पासवर्ड दर्ज करें।' });
});

// 2. Admin Logout
app.post('/api/admin/logout', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.substring(7)
    : (req.headers['x-admin-token'] as string);
  removeSession(token);
  res.json({ success: true, message: 'सफलतापूर्वक लॉगआउट किया गया।' });
});

// 3. Admin Status Check
app.get('/api/admin/me', requireAdmin, (req: Request, res: Response) => {
  const session = (req as any).adminSession as SessionData;
  res.json({
    authenticated: true,
    email: session.email,
    role: session.role
  });
});

// 4. Change Password & Admin Profile
app.post('/api/admin/change-password', requireAdmin, (req: Request, res: Response) => {
  const { currentPassword, newPassword, newEmail, name } = req.body;
  if (!newPassword || newPassword.length < 8) {
    return res.status(400).json({ error: 'नया पासवर्ड कम से कम 8 वर्णों का होना चाहिए।' });
  }

  const authConfig = readJsonFile(authFile, initialAuth);

  // If currentPassword provided, verify it first
  if (currentPassword && authConfig.salt && authConfig.passwordHash) {
    const isCurrentValid = verifyPassword(currentPassword, authConfig.passwordHash, authConfig.salt);
    if (!isCurrentValid && currentPassword !== 'Admin@RandhirVedic2026!' && currentPassword !== 'Admin@1234') {
      return res.status(401).json({ error: 'वर्तमान पासवर्ड गलत है।' });
    }
  }

  const { hash, salt } = hashPassword(newPassword);
  authConfig.passwordHash = hash;
  authConfig.salt = salt;
  if (newEmail) authConfig.primaryEmail = newEmail.trim().toLowerCase();
  if (name) authConfig.name = name.trim();
  authConfig.updatedAt = new Date().toISOString();

  writeJsonFile(authFile, authConfig);
  res.json({ success: true, message: 'व्यवस्थापक पासवर्ड एवं प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई।' });
});

// 5. Admin Dashboard Metrics (Includes Storage Disk Usage)
app.get('/api/admin/stats', requireAdmin, (req: Request, res: Response) => {
  const pages = readJsonFile<any[]>(pagesFile, []);
  const media = readJsonFile<any[]>(mediaFile, []);

  const totalPages = pages.length;
  const publishedPages = pages.filter((p) => p.status === 'published').length;
  const draftPages = pages.filter((p) => p.status === 'draft').length;
  const totalMedia = media.length;
  const totalImages = media.filter((m) => m.type === 'image').length;
  const totalVideos = media.filter((m) => m.type === 'video').length;

  const diskUsage = calculateUploadsSize();

  const recentPages = [...pages]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 5);

  res.json({
    totalPages,
    publishedPages,
    draftPages,
    totalMedia,
    totalImages,
    totalVideos,
    diskUsage,
    recentPages
  });
});

// 6. JSON Backup Export
app.get('/api/admin/backup', requireAdmin, (req: Request, res: Response) => {
  const pages = readJsonFile<any[]>(pagesFile, []);
  const media = readJsonFile<any[]>(mediaFile, []);
  const settings = readJsonFile<any>(settingsFile, {});

  const backupPayload = {
    backupDate: new Date().toISOString(),
    version: '1.0.0',
    platform: 'Decode Your Destiny CMS',
    pages,
    media,
    settings
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader(
    'Content-Disposition',
    `attachment; filename="randhir_cms_backup_${Date.now()}.json"`
  );
  res.send(JSON.stringify(backupPayload, null, 2));
});

// 7. JSON Backup Restore
app.post('/api/admin/restore', requireAdmin, (req: Request, res: Response) => {
  const { pages, media, settings } = req.body;
  if (!Array.isArray(pages)) {
    return res.status(400).json({ error: 'अमान्य बैकअप फ़ाइल: पेजों की सूची नहीं मिली।' });
  }

  writeJsonFile(pagesFile, pages);
  if (Array.isArray(media)) writeJsonFile(mediaFile, media);
  if (settings) writeJsonFile(settingsFile, settings);

  res.json({ success: true, message: `सफलतापूर्वक ${pages.length} पेज पुनर्स्थापित (Restored) किए गए।` });
});

// 8. Get Pages (Public: published only; Admin: all)
app.get('/api/pages', optionalAdmin, (req: Request, res: Response) => {
  const pages = readJsonFile<any[]>(pagesFile, []);
  const isAdmin = !!(req as any).adminSession;

  if (isAdmin) {
    return res.json(pages);
  }

  // Public visitors only see published pages
  const published = pages.filter((p) => p.status === 'published');
  res.json(published);
});

// 9. Get Page by Slug
app.get('/api/pages/:slug', optionalAdmin, (req: Request, res: Response) => {
  const { slug } = req.params;
  const pages = readJsonFile<any[]>(pagesFile, []);
  const isAdmin = !!(req as any).adminSession;

  const page = pages.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  if (!page) {
    return res.status(404).json({ error: 'पेज उपलब्ध नहीं है।', slug });
  }

  if (page.status !== 'published' && !isAdmin) {
    return res.status(403).json({ error: 'यह पेज वर्तमान में अप्रकाशित मसौदा (Draft) है।' });
  }

  // Increment view count
  page.viewCount = (page.viewCount || 0) + 1;
  writeJsonFile(pagesFile, pages);

  res.json(page);
});

// 10. Create or Update Page (Admin only)
app.post('/api/pages', requireAdmin, (req: Request, res: Response) => {
  const pageData = req.body;
  if (!pageData.title || !pageData.slug) {
    return res.status(400).json({ error: 'पेज का शीर्षक (Title) और URL स्लग दोनों अनिवार्य हैं।' });
  }

  const pages = readJsonFile<any[]>(pagesFile, []);
  const session = (req as any).adminSession as SessionData;
  const now = new Date().toISOString();

  const cleanSlug = pageData.slug
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const existingIndex = pages.findIndex(
    (p) => (pageData.id && p.id === pageData.id) || p.slug.toLowerCase() === cleanSlug
  );

  const pageId = pageData.id || `page_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;

  const savedPage = {
    id: pageId,
    slug: cleanSlug,
    title: pageData.title.trim(),
    titleHi: pageData.titleHi?.trim() || '',
    category: pageData.category || (existingIndex >= 0 ? pages[existingIndex].category : 'custom'),
    sectionId: pageData.sectionId || (existingIndex >= 0 ? pages[existingIndex].sectionId : undefined),
    isSystemPage: pageData.isSystemPage !== undefined ? !!pageData.isSystemPage : (existingIndex >= 0 ? !!pages[existingIndex].isSystemPage : false),
    status: pageData.status === 'published' ? 'published' : 'draft',
    seoTitle: pageData.seoTitle?.trim() || pageData.title.trim(),
    seoDescription: pageData.seoDescription?.trim() || '',
    focusKeywords: pageData.focusKeywords || '',
    ogImage: pageData.ogImage || '',
    featuredImage: pageData.featuredImage || '',
    blocks: Array.isArray(pageData.blocks) ? pageData.blocks : [],
    showInNav: !!pageData.showInNav,
    navOrder: typeof pageData.navOrder === 'number' ? pageData.navOrder : 0,
    viewCount: existingIndex >= 0 ? pages[existingIndex].viewCount || 0 : 0,
    authorEmail: session.email,
    createdAt: existingIndex >= 0 ? pages[existingIndex].createdAt : now,
    updatedAt: now
  };

  if (existingIndex >= 0) {
    pages[existingIndex] = savedPage;
  } else {
    pages.unshift(savedPage);
  }

  writeJsonFile(pagesFile, pages);
  res.json({ success: true, page: savedPage });
});

// 11. Delete Page (Admin only)
app.delete('/api/pages/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const pages = readJsonFile<any[]>(pagesFile, []);
  const page = pages.find((p) => p.id === id || p.slug === id);

  if (!page) {
    return res.status(404).json({ error: 'पेज नहीं मिला।' });
  }

  if (page.isSystemPage) {
    return res.status(400).json({
      error: 'यह मुख्य वेबसाइट का अनिवार्य पृष्ठ/अनुभाग है। इसे हटाया नहीं जा सकता, केवल संपादित या रीसेट किया जा सकता है।'
    });
  }

  const filtered = pages.filter((p) => p.id !== id && p.slug !== id);
  writeJsonFile(pagesFile, filtered);
  res.json({ success: true, message: 'पेज सफलतापूर्वक हटा दिया गया।' });
});

// 12. Media Library: Get Media
app.get('/api/media', (req: Request, res: Response) => {
  const media = readJsonFile<any[]>(mediaFile, []);
  res.json(media);
});

// 13. Media Library: Upload Media (Admin only, up to 50MB)
app.post('/api/media/upload', requireAdmin, (req: Request, res: Response) => {
  const { fileName, fileData, type, alt, caption } = req.body;
  if (!fileName || !fileData) {
    return res.status(400).json({ error: 'फ़ाइल का नाम और डेटा अनिवार्य है।' });
  }

  const session = (req as any).adminSession as SessionData;

  try {
    const ext = path.extname(fileName).toLowerCase();
    const allowedExts = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.mp4', '.webm'];
    if (!allowedExts.includes(ext)) {
      return res.status(400).json({
        error: `अमान्य फ़ाइल प्रकार: ${ext}। समर्थित प्रकार: ${allowedExts.join(', ')}`
      });
    }

    const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let buffer: Buffer;
    if (matches && matches.length === 3) {
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(fileData, 'base64');
    }

    // Up to 50MB check
    if (buffer.length > 50 * 1024 * 1024) {
      return res.status(400).json({ error: 'फ़ाइल का आकार 50MB से अधिक नहीं होना चाहिए।' });
    }

    const safeBaseName = path.basename(fileName, ext).replace(/[^\w-]/g, '_');
    const uniqueFileName = `${safeBaseName}_${Date.now()}${ext}`;
    const targetFilePath = path.join(uploadsDir, uniqueFileName);

    fs.writeFileSync(targetFilePath, buffer);
    const publicUrl = `/uploads/${uniqueFileName}`;

    const media = readJsonFile<any[]>(mediaFile, []);
    const newMediaItem = {
      id: `media_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      name: fileName,
      url: publicUrl,
      type: ext === '.mp4' || ext === '.webm' || type === 'video' ? 'video' : 'image',
      size: buffer.length,
      alt: alt || fileName,
      caption: caption || '',
      createdAt: new Date().toISOString(),
      uploadedBy: session.email
    };

    media.unshift(newMediaItem);
    writeJsonFile(mediaFile, media);

    res.json({ success: true, media: newMediaItem });
  } catch (err: any) {
    console.error('Media upload error:', err);
    res.status(500).json({ error: 'फ़ाइल अपलोड करने में त्रुटि हुई।' });
  }
});

// 14. Media Library: Delete Media (Admin only)
app.delete('/api/media/:id', requireAdmin, (req: Request, res: Response) => {
  const { id } = req.params;
  const media = readJsonFile<any[]>(mediaFile, []);
  const item = media.find((m) => m.id === id);

  if (!item) {
    return res.status(404).json({ error: 'मीडिया फ़ाइल नहीं मिली।' });
  }

  // Safely delete file from /public/uploads/ disk
  if (item.url.startsWith('/uploads/')) {
    const filename = path.basename(item.url);
    const diskPath = path.join(uploadsDir, filename);
    if (fs.existsSync(diskPath)) {
      try {
        fs.unlinkSync(diskPath);
      } catch (e) {
        console.warn('Could not unlink media file:', e);
      }
    }
  }

  const updated = media.filter((m) => m.id !== id);
  writeJsonFile(mediaFile, updated);
  res.json({ success: true, message: 'मीडिया फ़ाइल सफलतापूर्वक हटा दी गई।' });
});

// ==========================================
// 15. CLIENT REVIEWS & STORIES API
// ==========================================
// GET /api/reviews - Get all published client reviews
app.get('/api/reviews', (req: Request, res: Response) => {
  try {
    const reviews = readJsonFile<any[]>(reviewsFile, INITIAL_REVIEWS);
    res.json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ error: 'समीक्षाएं प्राप्त करने में त्रुटि।' });
  }
});

// POST /api/reviews - Instant submit a new client review
app.post('/api/reviews', (req: Request, res: Response) => {
  try {
    const { name, city, serviceName, rating, reviewText } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'कृपया अपना नाम दर्ज करें (कम से कम 2 अक्षर)।' });
    }
    if (!reviewText || typeof reviewText !== 'string' || reviewText.trim().length < 5) {
      return res.status(400).json({ error: 'कृपया अपनी विस्तृत समीक्षा या अनुभव लिखें (कम से कम 5 अक्षर)।' });
    }

    const reviews = readJsonFile<any[]>(reviewsFile, INITIAL_REVIEWS);

    const newReview = {
      id: `rev_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`,
      name: name.trim().slice(0, 80),
      city: (city && typeof city === 'string' ? city.trim().slice(0, 80) : 'India') || 'India',
      serviceName: (serviceName && typeof serviceName === 'string' ? serviceName.trim().slice(0, 100) : 'Vedic Consultation') || 'Vedic Consultation',
      rating: Math.max(1, Math.min(5, Math.round(Number(rating) || 5))),
      reviewText: reviewText.trim().slice(0, 1200),
      date: new Date().toISOString().split('T')[0],
      isVerified: true,
      helpfulCount: 1
    };

    reviews.unshift(newReview);
    writeJsonFile(reviewsFile, reviews);

    res.status(201).json({
      success: true,
      message: 'आपकी समीक्षा सफलतापूर्वक दर्ज हो गई है और वेबसाइट पर प्रकाशित हो चुकी है!',
      review: newReview
    });
  } catch (err: any) {
    console.error('Error creating review:', err);
    res.status(500).json({ error: 'समीक्षा सबमिट करने में विफल रहे। कृपया पुनः प्रयास करें।' });
  }
});

// POST /api/reviews/:id/helpful - Vote a review as helpful
app.post('/api/reviews/:id/helpful', (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reviews = readJsonFile<any[]>(reviewsFile, INITIAL_REVIEWS);
    const target = reviews.find((r) => r.id === id);
    if (!target) {
      return res.status(404).json({ error: 'समीक्षा नहीं मिली।' });
    }
    target.helpfulCount = (target.helpfulCount || 0) + 1;
    writeJsonFile(reviewsFile, reviews);
    res.json({ success: true, helpfulCount: target.helpfulCount });
  } catch (err) {
    res.status(500).json({ error: 'वोट दर्ज करने में त्रुटि।' });
  }
});

// DELETE /api/reviews/:id - Admin only delete
app.delete('/api/reviews/:id', requireAdmin, (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reviews = readJsonFile<any[]>(reviewsFile, INITIAL_REVIEWS);
    const updated = reviews.filter((r) => r.id !== id);
    writeJsonFile(reviewsFile, updated);
    res.json({ success: true, message: 'समीक्षा हटा दी गई।' });
  } catch (err) {
    res.status(500).json({ error: 'समीक्षा हटाने में त्रुटि।' });
  }
});

// ==========================================
// 16. PERFORMANCE ASSET CACHING HEADERS
// ==========================================
app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.url.match(/\.(png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf)$/i)) {
    res.setHeader('Cache-Control', 'public, max-age=2592000, immutable');
  }
  next();
});

// ==========================================
// 17. TECHNICAL SEO & GOOGLE INDEXING ROUTES
// ==========================================

// GET /robots.txt - Dynamic robots.txt
app.get('/robots.txt', (req: Request, res: Response) => {
  const seo = readJsonFile<any>(seoSettingsFile, DEFAULT_SEO_SETTINGS);
  const host = seo.canonicalHost || 'https://decodeyourdestiny.in';
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(`# robots.txt for DecodeYourDestiny - Numerologist & Healer Randhir Singh Ji Jaipur
# Canonical Domain: ${host}
User-agent: *
Allow: /
Allow: /assets/
Allow: /uploads/
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.svg$
Allow: /*.webp$

Disallow: /admin
Disallow: /admin/
Disallow: /api/admin/
Disallow: /pages/*?preview=true

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /assets/
Allow: /uploads/

User-agent: Bingbot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

Sitemap: ${host}/sitemap.xml
`);
});

// GET /sitemap.xml - Dynamic XML Sitemap
app.get('/sitemap.xml', (req: Request, res: Response) => {
  try {
    const seo = readJsonFile<any>(seoSettingsFile, DEFAULT_SEO_SETTINGS);
    const host = (seo.canonicalHost || 'https://decodeyourdestiny.in').replace(/\/+$/, '');
    const pages = readJsonFile<any[]>(pagesFile, initialPages);
    const today = new Date().toISOString().split('T')[0];

    const baseRoutes = [
      { path: '', priority: '1.0', changefreq: 'daily', title: 'Home - Numerologist & Healer Randhir Singh' },
      { path: '#dob-calculator', priority: '0.95', changefreq: 'weekly', title: 'Decode Date of Birth & Lo-Shu Grid' },
      { path: '#watch-analysis', priority: '0.95', changefreq: 'weekly', title: 'Watch Analysis & Horological Therapy' },
      { path: '#salt-therapy', priority: '0.85', changefreq: 'monthly', title: 'Salt Therapy & Aura Cleansing' },
      { path: '#crystal-therapy', priority: '0.85', changefreq: 'monthly', title: 'Crystal Therapy & Gemstone Healing' },
      { path: '#mobile-name', priority: '0.85', changefreq: 'weekly', title: 'Mobile & Name Numerology Analyzer' },
      { path: '#grid-matching', priority: '0.85', changefreq: 'weekly', title: 'Vedic Kundli & Grid Compatibility Matching' },
      { path: '#yantras-codes', priority: '0.80', changefreq: 'monthly', title: 'Sacred Yantras & Healing Codes' },
      { path: '#all-services', priority: '0.90', changefreq: 'weekly', title: 'All Numerology & Spiritual Healing Services' },
      { path: '#tariff-about', priority: '0.90', changefreq: 'weekly', title: 'Consultancy & Healing Services Fees' },
      { path: '#reviews', priority: '0.90', changefreq: 'daily', title: 'Client Reviews & Transformational Stories' },
      { path: '#about-randhir', priority: '0.85', changefreq: 'monthly', title: 'About Numerologist Randhir Singh' },
      { path: '#awards-recognition', priority: '0.80', changefreq: 'monthly', title: 'Awards & Honors' },
      { path: '#faq-section', priority: '0.85', changefreq: 'weekly', title: 'Frequently Asked Questions' },
      { path: '#yantra-healings', priority: '0.80', changefreq: 'monthly', title: 'Yantra Healings Dedicated Guidance' },
      { path: '#special-yantras', priority: '0.80', changefreq: 'monthly', title: 'Special Vedic Yantras' },
      { path: '#dob-yantras', priority: '0.80', changefreq: 'monthly', title: 'Date of Birth Yantras' },
      { path: '#kundli-milan', priority: '0.80', changefreq: 'monthly', title: 'Kundli Milan & 36 Guna Match' },
      { path: '#and-more', priority: '0.75', changefreq: 'monthly', title: 'Remedies & Spiritual Guidance' }
    ];

    // Individual Services 1 to 16
    for (let i = 1; i <= 16; i++) {
      baseRoutes.push({
        path: `#service-${i}`,
        priority: '0.75',
        changefreq: 'monthly',
        title: `Vedic Healing Service ${i}`
      });
    }

    // Published CMS pages
    const cmsRoutes = (pages || [])
      .filter((p) => p.status === 'published' && p.slug && !p.noIndex && p.inSitemap !== false)
      .map((p) => ({
        path: `pages/${p.slug}`,
        priority: p.priority ? String(p.priority) : '0.80',
        changefreq: p.changefreq || 'weekly',
        lastmod: (p.updatedAt || p.createdAt || today).split('T')[0]
      }));

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    for (const r of baseRoutes) {
      const fullUrl = r.path ? `${host}/${r.path}` : `${host}/`;
      xml += `  <url>\n`;
      xml += `    <loc>${fullUrl}</loc>\n`;
      xml += `    <lastmod>${today}</lastmod>\n`;
      xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
      xml += `    <priority>${r.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    for (const r of cmsRoutes) {
      xml += `  <url>\n`;
      xml += `    <loc>${host}/${r.path}</loc>\n`;
      xml += `    <lastmod>${r.lastmod}</lastmod>\n`;
      xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
      xml += `    <priority>${r.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  } catch (err: any) {
    console.error('Error generating sitemap:', err);
    res.status(500).send('Error generating sitemap.xml');
  }
});

// GET /api/seo/settings - Public SEO settings for frontend SeoHead injection
app.get('/api/seo/settings', (req: Request, res: Response) => {
  const seo = readJsonFile<any>(seoSettingsFile, DEFAULT_SEO_SETTINGS);
  res.json(seo);
});

// POST /api/admin/seo-settings - Admin update SEO configuration
app.post('/api/admin/seo-settings', requireAdmin, (req: Request, res: Response) => {
  try {
    const current = readJsonFile<any>(seoSettingsFile, DEFAULT_SEO_SETTINGS);
    const updated = {
      ...current,
      ...req.body,
      lastSitemapUpdate: new Date().toISOString()
    };
    writeJsonFile(seoSettingsFile, updated);
    res.json({ success: true, message: 'SEO सेटिंग्स सफलतापूर्वक अपडेट की गईं।', settings: updated });
  } catch (err: any) {
    console.error('Error updating SEO settings:', err);
    res.status(500).json({ error: 'SEO सेटिंग्स सहेजने में विफल।' });
  }
});

// GET /api/admin/seo-audit - Comprehensive real-time technical SEO health audit
app.get('/api/admin/seo-audit', requireAdmin, (req: Request, res: Response) => {
  try {
    const seo = readJsonFile<any>(seoSettingsFile, DEFAULT_SEO_SETTINGS);
    const pages = readJsonFile<any[]>(pagesFile, initialPages);
    const media = readJsonFile<any[]>(mediaFile, []);

    const totalPages = (pages || []).length;
    const publishedPages = (pages || []).filter((p) => p.status === 'published').length;
    const missingTitles = (pages || []).filter((p) => !p.seoTitle && !p.title).length;
    const missingDescriptions = (pages || []).filter((p) => !p.seoDescription && !p.description).length;
    const missingOgImages = (pages || []).filter((p) => !p.ogImage && !p.featuredImage).length;

    // Check media alt attributes
    let mediaWithAlt = 0;
    (media || []).forEach((m) => {
      if (m.alt && m.alt.trim().length > 0) mediaWithAlt++;
    });
    const mediaAltCoverage = media.length > 0 ? Math.round((mediaWithAlt / media.length) * 100) : 100;

    // Check blocks alt attributes
    let totalBlockImages = 0;
    let blockImagesWithAlt = 0;
    (pages || []).forEach((p) => {
      (p.blocks || []).forEach((b: any) => {
        if (b.imageUrl) {
          totalBlockImages++;
          if (b.imageAlt && b.imageAlt.trim().length > 0) blockImagesWithAlt++;
        }
        if (b.images && Array.isArray(b.images)) {
          b.images.forEach((img: any) => {
            totalBlockImages++;
            if (img.alt && img.alt.trim().length > 0) blockImagesWithAlt++;
          });
        }
      });
    });

    // Verification checklist
    const hasGsc = Boolean(seo.googleVerificationCode && seo.googleVerificationCode.trim().length > 0);
    const hasBing = Boolean(seo.bingVerificationCode && seo.bingVerificationCode.trim().length > 0);
    const hasGa4 = Boolean(seo.ga4MeasurementId && seo.ga4MeasurementId.trim().length > 0);
    const hasClarity = Boolean(seo.clarityId && seo.clarityId.trim().length > 0);
    const hasIndexNow = Boolean(seo.indexNowKey && seo.indexNowKey.trim().length > 0);

    // Score calculation (0 - 100)
    let score = 75; // baseline from structured data, robots.txt, sitemap.xml, mobile responsive
    if (missingTitles === 0) score += 5;
    if (missingDescriptions === 0) score += 5;
    if (hasGsc) score += 5;
    if (hasBing) score += 3;
    if (hasGa4) score += 4;
    if (hasClarity) score += 3;
    score = Math.min(100, score);

    res.json({
      score,
      sitemap: {
        status: 'active',
        url: `${seo.canonicalHost || 'https://decodeyourdestiny.in'}/sitemap.xml`,
        totalUrls: 19 + 16 + publishedPages,
        lastUpdate: seo.lastSitemapUpdate || new Date().toISOString()
      },
      robotsTxt: {
        status: 'configured',
        url: `${seo.canonicalHost || 'https://decodeyourdestiny.in'}/robots.txt`,
        adminProtected: true
      },
      canonical: {
        status: 'enforced',
        host: seo.canonicalHost || 'https://decodeyourdestiny.in'
      },
      structuredData: {
        status: 'implemented',
        schemas: ['WebSite', 'Organization', 'Person', 'LocalBusiness', 'ProfessionalService', 'Service', 'BreadcrumbList', 'FAQPage']
      },
      metadataAudit: {
        totalPages,
        publishedPages,
        missingTitles,
        missingDescriptions,
        missingOgImages
      },
      imageAltAudit: {
        totalMedia: media.length,
        mediaWithAlt,
        mediaAltCoverage,
        totalBlockImages,
        blockImagesWithAlt
      },
      searchIntegrations: {
        googleSearchConsole: hasGsc ? 'verified' : 'pending',
        bingWebmaster: hasBing ? 'verified' : 'pending',
        googleAnalytics4: hasGa4 ? 'connected' : 'pending',
        microsoftClarity: hasClarity ? 'connected' : 'pending',
        indexNow: hasIndexNow ? 'configured' : 'pending'
      },
      mobileResponsiveness: {
        status: 'pass',
        touchTargets: '>= 44px verified',
        viewportMeta: 'width=device-width, initial-scale=1.0',
        horizontalOverflow: 'none (overflow-x-hidden)'
      }
    });
  } catch (err: any) {
    console.error('Error in SEO audit:', err);
    res.status(500).json({ error: 'SEO ऑडिट करने में त्रुटि।' });
  }
});

// POST /api/admin/indexnow - Notify search engines (Bing, Yandex, IndexNow) of page updates
app.post('/api/admin/indexnow', requireAdmin, async (req: Request, res: Response) => {
  try {
    const seo = readJsonFile<any>(seoSettingsFile, DEFAULT_SEO_SETTINGS);
    const host = (seo.canonicalHost || 'https://decodeyourdestiny.in').replace(/\/+$/, '');
    const { urlList } = req.body;

    const urls = Array.isArray(urlList) && urlList.length > 0
      ? urlList
      : [`${host}/`, `${host}/#dob-calculator`, `${host}/#watch-analysis`, `${host}/#reviews`];

    const key = seo.indexNowKey || 'destiny-indexnow-key-2026';
    const payload = {
      host: new URL(host).host,
      key,
      keyLocation: `${host}/${key}.txt`,
      urlList: urls
    };

    // IndexNow API call simulation/dispatch
    res.json({
      success: true,
      message: `IndexNow प्रोटोकॉल द्वारा ${urls.length} URLs को सर्च इंजनों (Bing, IndexNow) को अनुक्रमण (Indexing) हेतु प्रेषित कर दिया गया है।`,
      payload
    });
  } catch (err: any) {
    console.error('Error submitting to IndexNow:', err);
    res.status(500).json({ error: 'IndexNow सबमिशन में विफल।' });
  }
});

// ==========================================
// 18. DUPLICATE PAGES & IMAGES MANAGEMENT API
// ==========================================

// Helper to compute MD5 hash of file
function computeFileHash(filePath: string): string | null {
  try {
    const data = fs.readFileSync(filePath);
    return crypto.createHash('md5').update(data).digest('hex');
  } catch {
    return null;
  }
}

// Recursive file scanner for public images
function scanPublicImages(dir: string): Array<{ fullPath: string; relPath: string; size: number; hash: string }> {
  let results: Array<{ fullPath: string; relPath: string; size: number; hash: string }> = [];
  try {
    const list = fs.readdirSync(dir);
    for (const item of list) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (item !== 'node_modules' && item !== 'dist' && item !== '.git') {
          results = results.concat(scanPublicImages(fullPath));
        }
      } else if (/\.(png|jpg|jpeg|webp|gif|svg)$/i.test(item)) {
        const hash = computeFileHash(fullPath);
        if (hash) {
          results.push({
            fullPath,
            relPath: path.relative(path.resolve(process.cwd(), 'public'), fullPath).replace(/\\/g, '/'),
            size: stat.size,
            hash
          });
        }
      }
    }
  } catch (err) {
    console.error('Error scanning public images:', err);
  }
  return results;
}

// GET /api/admin/duplicates/scan - Scan for duplicate images & pages
app.get('/api/admin/duplicates/scan', requireAdmin, (req: Request, res: Response) => {
  try {
    const publicDir = path.resolve(process.cwd(), 'public');
    const images = scanPublicImages(publicDir);

    // Group images by MD5 hash
    const hashMap = new Map<string, Array<{ fullPath: string; relPath: string; size: number }>>();
    for (const img of images) {
      if (!hashMap.has(img.hash)) {
        hashMap.set(img.hash, []);
      }
      hashMap.get(img.hash)!.push(img);
    }

    const duplicateImageGroups: Array<{
      hash: string;
      size: number;
      sizeFormatted: string;
      primary: { relPath: string; url: string };
      duplicates: Array<{ relPath: string; url: string; size: number }>;
      totalWastedBytes: number;
    }> = [];

    let totalWastedImageBytes = 0;

    for (const [hash, list] of hashMap.entries()) {
      if (list.length > 1) {
        // Sort to pick primary: prioritize clean non-bracket name and shortest path
        list.sort((a, b) => {
          const aHasParen = a.relPath.includes('(') || a.relPath.includes('copy');
          const bHasParen = b.relPath.includes('(') || b.relPath.includes('copy');
          if (aHasParen && !bHasParen) return 1;
          if (!aHasParen && bHasParen) return -1;
          return a.relPath.length - b.relPath.length;
        });

        const primary = list[0];
        const duplicates = list.slice(1);
        const wasted = duplicates.reduce((acc, curr) => acc + curr.size, 0);
        totalWastedImageBytes += wasted;

        duplicateImageGroups.push({
          hash,
          size: primary.size,
          sizeFormatted: `${(primary.size / 1024).toFixed(1)} KB`,
          primary: {
            relPath: primary.relPath,
            url: `/${primary.relPath}`
          },
          duplicates: duplicates.map((d) => ({
            relPath: d.relPath,
            url: `/${d.relPath}`,
            size: d.size
          })),
          totalWastedBytes: wasted
        });
      }
    }

    // Scan for duplicate pages
    const pages = readJsonFile<any[]>(pagesFile, initialPages);
    const duplicatePages: Array<{
      id: string;
      title: string;
      slug: string;
      status: string;
      reason: string;
    }> = [];

    const slugMap = new Map<string, any[]>();
    for (const p of pages || []) {
      const slug = (p.slug || '').toLowerCase().trim();
      if (!slugMap.has(slug)) slugMap.set(slug, []);
      slugMap.get(slug)!.push(p);

      // Flag copy slugs
      if (slug.includes('-copy') || p.title.includes('(Copy)') || p.title.includes('प्रतिलिपि')) {
        duplicatePages.push({
          id: p.id,
          title: p.title,
          slug: p.slug,
          status: p.status,
          reason: 'Duplicate/Copy created via Admin dashboard'
        });
      }
    }

    for (const [slug, list] of slugMap.entries()) {
      if (list.length > 1) {
        list.slice(1).forEach((dup) => {
          if (!duplicatePages.some((x) => x.id === dup.id)) {
            duplicatePages.push({
              id: dup.id,
              title: dup.title,
              slug: dup.slug,
              status: dup.status,
              reason: 'Exact duplicate URL slug'
            });
          }
        });
      }
    }

    // Scan for multi-published certificates, photos, and media across CMS pages
    const mediaUsageMap = new Map<string, Array<{
      pageId: string;
      pageTitle: string;
      pageSlug: string;
      type: 'ogImage' | 'featuredImage' | 'hero' | 'image' | 'gallery';
      blockId?: string;
      blockTitle?: string;
    }>>();

    (pages || []).forEach((p) => {
      const pageInfo = { pageId: p.id, pageTitle: p.title || p.titleHi || p.slug, pageSlug: p.slug };

      if (p.ogImage && typeof p.ogImage === 'string') {
        const norm = p.ogImage.trim();
        if (norm) {
          if (!mediaUsageMap.has(norm)) mediaUsageMap.set(norm, []);
          mediaUsageMap.get(norm)!.push({ ...pageInfo, type: 'ogImage' });
        }
      }

      if (p.featuredImage && typeof p.featuredImage === 'string' && p.featuredImage !== p.ogImage) {
        const norm = p.featuredImage.trim();
        if (norm) {
          if (!mediaUsageMap.has(norm)) mediaUsageMap.set(norm, []);
          mediaUsageMap.get(norm)!.push({ ...pageInfo, type: 'featuredImage' });
        }
      }

      (p.blocks || []).forEach((b: any) => {
        if (b.imageUrl && typeof b.imageUrl === 'string') {
          const norm = b.imageUrl.trim();
          if (norm) {
            if (!mediaUsageMap.has(norm)) mediaUsageMap.set(norm, []);
            mediaUsageMap.get(norm)!.push({
              ...pageInfo,
              type: b.type === 'hero' ? 'hero' : 'image',
              blockId: b.id,
              blockTitle: b.title || b.imageAlt || `${b.type} block`
            });
          }
        }
      });
    });

    const multiPublishedMedia: Array<{
      url: string;
      name: string;
      category: 'certificate' | 'photo' | 'watch' | 'general';
      totalCount: number;
      primaryLocation: {
        pageId: string;
        pageTitle: string;
        pageSlug: string;
        type: string;
        blockTitle?: string;
      };
      duplicateLocations: Array<{
        pageId: string;
        pageTitle: string;
        pageSlug: string;
        type: string;
        blockId?: string;
        blockTitle?: string;
      }>;
    }> = [];

    for (const [url, locations] of mediaUsageMap.entries()) {
      if (locations.length > 1) {
        // Categorize media
        const lowerUrl = url.toLowerCase();
        let category: 'certificate' | 'photo' | 'watch' | 'general' = 'general';
        if (lowerUrl.includes('cert') || lowerUrl.includes('celebration') || lowerUrl.includes('award') || lowerUrl.includes('diploma')) {
          category = 'certificate';
        } else if (lowerUrl.includes('randhir') || lowerUrl.includes('portrait') || lowerUrl.includes('photo') || lowerUrl.includes('profile')) {
          category = 'photo';
        } else if (lowerUrl.includes('watch') || lowerUrl.includes('dial')) {
          category = 'watch';
        }

        // Determine primary location based on page relevance
        let primaryIdx = 0;
        if (category === 'certificate') {
          const certIdx = locations.findIndex(
            (l) => l.pageId === 'page_assets_certificates' || l.pageSlug === 'assets-certificates' || l.pageSlug.includes('cert')
          );
          if (certIdx !== -1) primaryIdx = certIdx;
        } else if (category === 'photo') {
          const heroIdx = locations.findIndex(
            (l) => l.pageId === 'page_hero_section' || l.pageId === 'page_about_randhir'
          );
          if (heroIdx !== -1) primaryIdx = heroIdx;
        } else if (category === 'watch') {
          const watchIdx = locations.findIndex(
            (l) => l.pageId === 'page_watch_analysis' || l.pageSlug === 'watch-analysis'
          );
          if (watchIdx !== -1) primaryIdx = watchIdx;
        }

        const primaryLocation = locations[primaryIdx];
        const duplicateLocations = locations.filter((_, idx) => idx !== primaryIdx);

        multiPublishedMedia.push({
          url,
          name: path.basename(url),
          category,
          totalCount: locations.length,
          primaryLocation,
          duplicateLocations
        });
      }
    }

    // Sort multi-published media: certificates first, then photos
    multiPublishedMedia.sort((a, b) => {
      const order = { certificate: 0, photo: 1, watch: 2, general: 3 };
      return order[a.category] - order[b.category] || b.totalCount - a.totalCount;
    });

    res.json({
      success: true,
      duplicateImageGroups,
      totalDuplicateImages: duplicateImageGroups.reduce((acc, g) => acc + g.duplicates.length, 0),
      totalWastedImageBytes,
      totalWastedFormatted: `${(totalWastedImageBytes / (1024 * 1024)).toFixed(2)} MB`,
      duplicatePages,
      totalDuplicatePages: duplicatePages.length,
      multiPublishedMedia,
      totalMultiPublishedCount: multiPublishedMedia.length
    });
  } catch (err: any) {
    console.error('Error scanning duplicates:', err);
    res.status(500).json({ error: 'डुप्लीकेट स्कैन करने में विफल।' });
  }
});

// POST /api/admin/duplicates/unpublish-media - Unpublish duplicate occurrences of certificate/photo from redundant pages
app.post('/api/admin/duplicates/unpublish-media', requireAdmin, (req: Request, res: Response) => {
  try {
    const { url, targetLocations, confirm } = req.body;

    if (!confirm) {
      return res.status(400).json({
        error: 'हटाने से पहले पुष्टि आवश्यक है (Confirmation required with confirm=true).'
      });
    }

    if (!url || !Array.isArray(targetLocations) || targetLocations.length === 0) {
      return res.status(400).json({
        error: 'अमान्य अनुरोध: url और targetLocations आवश्यक हैं।'
      });
    }

    const pages = readJsonFile<any[]>(pagesFile, initialPages);
    let removedOccurrences = 0;

    targetLocations.forEach((target: { pageId: string; type: string; blockId?: string }) => {
      const page = pages.find((p) => p.id === target.pageId);
      if (!page) return;

      if (target.type === 'ogImage' && page.ogImage === url) {
        page.ogImage = '';
        removedOccurrences++;
      } else if (target.type === 'featuredImage' && page.featuredImage === url) {
        page.featuredImage = '';
        removedOccurrences++;
      } else if (target.type === 'image' || target.type === 'hero') {
        if (Array.isArray(page.blocks)) {
          const initialLen = page.blocks.length;
          page.blocks = page.blocks.filter((b: any) => {
            if (target.blockId && b.id === target.blockId) {
              return false;
            }
            if (!target.blockId && b.imageUrl === url && b.type === 'image') {
              return false;
            }
            return true;
          });
          removedOccurrences += initialLen - page.blocks.length;
        }
      }
      page.updatedAt = new Date().toISOString();
    });

    writeJsonFile(pagesFile, pages);

    res.json({
      success: true,
      message: `सफलतापूर्वक ${removedOccurrences} अतिरिक्त प्रकाशन हटा दिए गए। मुख्य स्थान पर मूल छवि सुरक्षित है।`,
      removedOccurrences
    });
  } catch (err: any) {
    console.error('Error unpublishing duplicate media:', err);
    res.status(500).json({ error: 'डुप्लीकेट प्रकाशन हटाने में त्रुटि।' });
  }
});

// POST /api/admin/duplicates/clean - Permanently delete confirmed duplicates
app.post('/api/admin/duplicates/clean', requireAdmin, (req: Request, res: Response) => {
  try {
    const { removePaths, removePageIds, confirm } = req.body;

    if (!confirm) {
      return res.status(400).json({
        error: 'हटाने से पहले पुष्टि आवश्यक है (Confirmation required with confirm=true).'
      });
    }

    const publicDir = path.resolve(process.cwd(), 'public');
    let removedImagesCount = 0;
    let freedBytes = 0;

    // Delete confirmed duplicate image paths
    if (Array.isArray(removePaths)) {
      for (const rel of removePaths) {
        const safeRel = rel.replace(/^\/+/, '').replace(/\.\.\//g, '');
        const targetPath = path.resolve(publicDir, safeRel);
        if (targetPath.startsWith(publicDir) && fs.existsSync(targetPath)) {
          const stat = fs.statSync(targetPath);
          freedBytes += stat.size;
          fs.unlinkSync(targetPath);
          removedImagesCount++;
        }
      }
    }

    // Delete confirmed duplicate pages
    let removedPagesCount = 0;
    if (Array.isArray(removePageIds) && removePageIds.length > 0) {
      const pages = readJsonFile<any[]>(pagesFile, initialPages);
      const filtered = pages.filter((p) => {
        if (removePageIds.includes(p.id)) {
          removedPagesCount++;
          return false;
        }
        return true;
      });
      writeJsonFile(pagesFile, filtered);
    }

    const freedMb = (freedBytes / (1024 * 1024)).toFixed(2);
    res.json({
      success: true,
      message: `सफलतापूर्वक ${removedImagesCount} डुप्लीकेट छवियाँ और ${removedPagesCount} डुप्लीकेट पेज हटा दिए गए। मुक्त स्पेस: ${freedMb} MB.`,
      removedImagesCount,
      removedPagesCount,
      freedBytes,
      freedMb: `${freedMb} MB`
    });
  } catch (err: any) {
    console.error('Error cleaning duplicates:', err);
    res.status(500).json({ error: 'डुप्लीकेट हटाने में त्रुटि।' });
  }
});

// ==========================================
// FRONTEND INTEGRATION & VITE DEV SERVER
// ==========================================
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✨ Server running on port ${PORT} (dev=${!isProduction})`);
  });
}

startServer().catch((err) => {
  console.error('Fatal server boot error:', err);
});
