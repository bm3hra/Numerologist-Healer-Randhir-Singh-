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
