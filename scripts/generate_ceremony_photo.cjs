const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createCeremonyPhoto() {
  const width = 1920;
  const height = 1080;

  // Randhir Singh source photo
  const randhirSourcePath = path.join(__dirname, '../public/assets/about/Randhir_Singh.png');
  const hasRandhirPhoto = fs.existsSync(randhirSourcePath);

  // Crop & resize Randhir Singh face/bust for the right side
  let randhirBustBuffer;
  if (hasRandhirPhoto) {
    randhirBustBuffer = await sharp(randhirSourcePath)
      .extract({ left: 150, top: 0, width: 930, height: 1100 })
      .resize(460, 540, { fit: 'cover', position: 'top' })
      .toBuffer();
  }

  // Build the rich SVG scene with real photographic embedding and high realism
  const svgScene = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <!-- Stage Lighting & Backdrop Gradients -->
    <radialGradient id="stageSpotlight" cx="50%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fffbeb" stop-opacity="0.95" />
      <stop offset="25%" stop-color="#fef3c7" stop-opacity="0.9" />
      <stop offset="55%" stop-color="#d97706" stop-opacity="0.4" />
      <stop offset="85%" stop-color="#451a03" stop-opacity="0.95" />
      <stop offset="100%" stop-color="#1c1917" />
    </radialGradient>

    <linearGradient id="warmWall" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fefce8" />
      <stop offset="40%" stop-color="#fef3c7" />
      <stop offset="70%" stop-color="#fde68a" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>

    <linearGradient id="suitDarkNavy" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="40%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020617" />
    </linearGradient>

    <linearGradient id="suitForestGreen" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#166534" />
      <stop offset="50%" stop-color="#14532d" />
      <stop offset="100%" stop-color="#052e16" />
    </linearGradient>

    <linearGradient id="patternBlueTie" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="50%" stop-color="#1d4ed8" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>

    <linearGradient id="certFrame" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>

    <linearGradient id="goldGleam" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#d97706" />
      <stop offset="50%" stop-color="#fef08a" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>

    <radialGradient id="stageBlueGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#0284c7" stop-opacity="0.4" />
      <stop offset="100%" stop-color="#0284c7" stop-opacity="0" />
    </radialGradient>

    <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.45" />
    </filter>

    <filter id="photoGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- 1. Background Wall & Warm Ambient Auditorium Atmosphere -->
  <rect width="${width}" height="${height}" fill="#291404" />
  <rect width="${width}" height="${height}" fill="url(#stageSpotlight)" />

  <!-- 2. Decorative Tree of Knowledge Background Wall with Photo Frames -->
  <!-- Tree trunk silhouette in warm bronze -->
  <path d="M 960 1080 Q 940 700 880 500 Q 820 300 700 150 Q 850 250 960 320 Q 1100 220 1200 100 Q 1150 280 1060 450 Q 980 650 960 1080 Z" fill="#78350f" opacity="0.18" />

  <!-- 3. Giant White Circular Numerology Ring on Background Wall -->
  <circle cx="960" cy="380" r="340" fill="#f8fafc" opacity="0.92" filter="url(#cardShadow)" />
  <circle cx="960" cy="380" r="332" fill="none" stroke="#e2e8f0" stroke-width="4" />

  <!-- Clock numerals around the upper arch: 0 1 3 4 5 6 7 8 9 -->
  <text x="960" y="240" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="96" font-weight="900" fill="#cbd5e1" text-anchor="middle" letter-spacing="32" opacity="0.85">
    0 1 3 4 5 6 7 8 9
  </text>
  <!-- Mortarboard cap emblem in center arch -->
  <path d="M 960 270 L 1005 290 L 960 310 L 915 290 Z" fill="#64748b" opacity="0.6" />
  <path d="M 930 305 L 930 325 Q 960 340 990 325 L 990 305" fill="none" stroke="#64748b" stroke-width="4" opacity="0.6" />

  <!-- 4. Portrait Gallery on Wall (Young scholars, students, faculties in frames) -->
  <!-- Left Side Wall Photos -->
  <g opacity="0.92">
    <!-- Row 1 -->
    <rect x="180" y="80" width="130" height="150" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="190" y="90" width="110" height="130" fill="#475569" />
    <circle cx="245" cy="140" r="35" fill="#fbcfe8" />
    <path d="M 210 210 Q 245 175 280 210 Z" fill="#831843" />

    <rect x="340" y="100" width="130" height="150" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="350" y="110" width="110" height="130" fill="#334155" />
    <circle cx="405" cy="160" r="35" fill="#fed7aa" />
    <path d="M 370 230 Q 405 195 440 230 Z" fill="#1e3a8a" />

    <!-- Row 2 -->
    <rect x="160" y="260" width="135" height="155" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="170" y="270" width="115" height="135" fill="#475569" />
    <circle cx="227" cy="320" r="35" fill="#fde68a" />
    <path d="M 190 395 Q 227 360 265 395 Z" fill="#065f46" />

    <rect x="320" y="280" width="130" height="150" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="330" y="290" width="110" height="130" fill="#334155" />
    <circle cx="385" cy="340" r="35" fill="#fbcfe8" />
    <path d="M 350 410 Q 385 375 420 410 Z" fill="#701a75" />
  </g>

  <!-- Right Side Wall Photos -->
  <g opacity="0.92">
    <!-- Row 1 -->
    <rect x="1450" y="80" width="130" height="150" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="1460" y="90" width="110" height="130" fill="#334155" />
    <circle cx="1515" cy="140" r="35" fill="#fed7aa" />
    <path d="M 1480 210 Q 1515 175 1550 210 Z" fill="#1e3a8a" />

    <rect x="1610" y="100" width="130" height="150" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="1620" y="110" width="110" height="130" fill="#475569" />
    <circle cx="1675" cy="160" r="35" fill="#fbcfe8" />
    <path d="M 1640 230 Q 1675 195 1710 230 Z" fill="#831843" />

    <!-- Row 2 -->
    <rect x="1470" y="260" width="135" height="155" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="1480" y="270" width="115" height="135" fill="#334155" />
    <circle cx="1537" cy="320" r="35" fill="#fed7aa" />
    <path d="M 1500 395 Q 1537 360 1575 395 Z" fill="#047857" />

    <rect x="1630" y="280" width="130" height="150" rx="8" fill="#1e293b" stroke="#fcd34d" stroke-width="3" filter="url(#cardShadow)" />
    <rect x="1640" y="290" width="110" height="130" fill="#475569" />
    <circle cx="1695" cy="340" r="35" fill="#fde68a" />
    <path d="M 1660 410 Q 1695 375 1730 410 Z" fill="#991b1b" />
  </g>

  <!-- 5. Floral Bouquets on Stage (Left & Right) -->
  <!-- Left Floral Column -->
  <g id="flowerColumnLeft">
    <!-- Big Yellow Chrysanthemums -->
    <circle cx="70" cy="360" r="34" fill="#facc15" stroke="#ca8a04" stroke-width="3" />
    <circle cx="70" cy="360" r="16" fill="#ca8a04" />
    <circle cx="110" cy="440" r="38" fill="#facc15" stroke="#ca8a04" stroke-width="3" />
    <circle cx="110" cy="440" r="18" fill="#ca8a04" />
    <circle cx="50" cy="520" r="36" fill="#facc15" stroke="#ca8a04" stroke-width="3" />
    <circle cx="50" cy="520" r="17" fill="#ca8a04" />

    <!-- Red & Orange Gerberas -->
    <circle cx="100" cy="390" r="32" fill="#dc2626" stroke="#991b1b" stroke-width="3" />
    <circle cx="100" cy="390" r="14" fill="#7f1d1d" />
    <circle cx="60" cy="470" r="34" fill="#ea580c" stroke="#c2410c" stroke-width="3" />
    <circle cx="60" cy="470" r="15" fill="#9a3412" />
    <circle cx="90" cy="560" r="35" fill="#dc2626" stroke="#991b1b" stroke-width="3" />
    <circle cx="90" cy="560" r="16" fill="#7f1d1d" />

    <!-- Lush Fern & Palm Fronds -->
    <path d="M 20 600 Q 100 500 130 380 Q 80 440 20 600 Z" fill="#15803d" />
    <path d="M 10 480 Q 90 400 110 320 Q 60 380 10 480 Z" fill="#166534" />
    <path d="M 30 720 Q 120 620 140 480 Q 80 560 30 720 Z" fill="#14532d" />
  </g>

  <!-- Right Floral Column -->
  <g id="flowerColumnRight">
    <!-- Big Yellow Chrysanthemums -->
    <circle cx="1850" cy="360" r="34" fill="#facc15" stroke="#ca8a04" stroke-width="3" />
    <circle cx="1850" cy="360" r="16" fill="#ca8a04" />
    <circle cx="1810" cy="440" r="38" fill="#facc15" stroke="#ca8a04" stroke-width="3" />
    <circle cx="1810" cy="440" r="18" fill="#ca8a04" />
    <circle cx="1870" cy="520" r="36" fill="#facc15" stroke="#ca8a04" stroke-width="3" />
    <circle cx="1870" cy="520" r="17" fill="#ca8a04" />

    <!-- Red & Orange Gerberas -->
    <circle cx="1820" cy="390" r="32" fill="#dc2626" stroke="#991b1b" stroke-width="3" />
    <circle cx="1820" cy="390" r="14" fill="#7f1d1d" />
    <circle cx="1860" cy="470" r="34" fill="#ea580c" stroke="#c2410c" stroke-width="3" />
    <circle cx="1860" cy="470" r="15" fill="#9a3412" />
    <circle cx="1830" cy="560" r="35" fill="#dc2626" stroke="#991b1b" stroke-width="3" />
    <circle cx="1830" cy="560" r="16" fill="#7f1d1d" />

    <!-- Lush Ferns -->
    <path d="M 1900 600 Q 1820 500 1790 380 Q 1840 440 1900 600 Z" fill="#15803d" />
    <path d="M 1910 480 Q 1830 400 1810 320 Q 1860 380 1910 480 Z" fill="#166534" />
    <path d="M 1890 720 Q 1800 620 1780 480 Q 1840 560 1890 720 Z" fill="#14532d" />
  </g>

  <!-- 6. Left Dignitary: Young Professional in Green Suit with Glasses -->
  <g id="achieverLeft">
    <!-- Suit Body -->
    <path d="M 160 1080 L 220 520 L 480 390 L 780 470 L 820 1080 Z" fill="url(#suitForestGreen)" filter="url(#cardShadow)" />
    <!-- White Dress Shirt Collar -->
    <polygon points="460,390 520,390 500,560 470,560" fill="#ffffff" />
    <!-- Lapels -->
    <polygon points="480,390 440,540 510,680 540,500" fill="#14532d" stroke="#052e16" stroke-width="2" />
    <polygon points="520,390 560,540 490,680 460,500" fill="#166534" stroke="#052e16" stroke-width="2" />
    <!-- Name Badge (DDU-GKY) on left lapel -->
    <rect x="680" y="540" width="75" height="24" rx="3" fill="#0f172a" stroke="#d97706" stroke-width="1.5" />
    <text x="717" y="556" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="900" fill="#fef08a" text-anchor="middle">
      DDU-GKY
    </text>

    <!-- Head & Face -->
    <ellipse cx="530" cy="240" rx="100" ry="125" fill="#fbd38d" />
    <!-- Hair -->
    <path d="M 430 210 Q 530 110 630 210 Q 610 135 530 130 Q 450 135 430 210 Z" fill="#18181b" />
    <!-- Eyeglasses (Rectangular Wireframe) -->
    <rect x="445" y="195" width="70" height="36" rx="6" fill="none" stroke="#0f172a" stroke-width="4" />
    <rect x="545" y="195" width="70" height="36" rx="6" fill="none" stroke="#0f172a" stroke-width="4" />
    <line x1="515" y1="213" x2="545" y2="213" stroke="#0f172a" stroke-width="4" />
    <!-- Eyes -->
    <circle cx="480" cy="213" r="8" fill="#18181b" />
    <circle cx="483" cy="210" r="3" fill="#ffffff" />
    <circle cx="580" cy="213" r="8" fill="#18181b" />
    <circle cx="583" cy="210" r="3" fill="#ffffff" />
    <!-- Confident Warm Smile -->
    <path d="M 490 280 Q 530 315 570 280" stroke="#991b1b" stroke-width="5" fill="none" stroke-linecap="round" />
    <!-- Hands holding left side of certificate frame -->
    <path d="M 580 950 Q 620 900 660 880 Q 675 885 690 910 Q 660 960 610 990 Z" fill="#fbd38d" stroke="#d97706" stroke-width="2" />
  </g>

  <!-- 7. Center Colleague in Background -->
  <g id="mentorCenter">
    <ellipse cx="880" cy="380" rx="85" ry="110" fill="#fbd38d" opacity="0.95" />
    <path d="M 800 350 Q 880 260 960 350 Q 940 280 880 270 Q 820 280 800 350 Z" fill="#18181b" />
    <circle cx="850" cy="365" r="7" fill="#18181b" />
    <circle cx="910" cy="365" r="7" fill="#18181b" />
    <path d="M 860 420 Q 880 435 900 420" stroke="#991b1b" stroke-width="3" fill="none" stroke-linecap="round" />
    <path d="M 760 480 L 880 460 L 1000 480 L 1030 750 L 730 750 Z" fill="#1e1b4b" opacity="0.9" />
  </g>

  <!-- 8. Right Dignitary: Randhir Singh (Numerologist & Healer) -->
  <g id="randhirSinghRight">
    <!-- Tailored Dark Navy 3-Piece Suit -->
    <path d="M 1120 1080 L 1160 480 L 1460 380 L 1760 520 L 1800 1080 Z" fill="url(#suitDarkNavy)" filter="url(#cardShadow)" />

    <!-- Crisp White Shirt & Silk Patterned Blue Tie -->
    <polygon points="1440,380 1500,380 1480,580 1450,580" fill="#ffffff" />
    <polygon points="1455,420 1485,420 1475,640 1465,640" fill="url(#patternBlueTie)" stroke="#60a5fa" stroke-width="1.5" />
    <!-- Shiny Silver/Gold Tie Clip -->
    <rect x="1460" y="520" width="28" height="6" rx="2" fill="url(#goldGleam)" stroke="#78350f" stroke-width="1" />

    <!-- Lapels -->
    <polygon points="1460,380 1400,540 1490,700 1520,490" fill="#0f172a" stroke="#334155" stroke-width="2" />
    <polygon points="1480,380 1540,540 1450,700 1420,490" fill="#1e293b" stroke="#334155" stroke-width="2" />

    <!-- Gold Nameplate Badge & Emblem on Left Lapel -->
    <rect x="1310" y="540" width="48" height="28" rx="4" fill="url(#goldGleam)" stroke="#78350f" stroke-width="2" />
    <circle cx="1325" cy="554" r="8" fill="#b45309" />
    <rect x="1338" y="549" width="14" height="10" fill="#78350f" rx="1" />

    <!-- Pocket Square in Blue Silk -->
    <polygon points="1380,540 1400,520 1410,540" fill="#38bdf8" />

    <!-- Head & Realistic Features -->
    <ellipse cx="1410" cy="260" rx="110" ry="135" fill="#fbd38d" />
    <!-- Hair with realistic wave & brown/auburn undertones -->
    <path d="M 1300 230 Q 1410 110 1520 230 Q 1500 140 1410 130 Q 1320 140 1300 230 Z" fill="#451a03" />

    <!-- Kind, Intelligent Eyes -->
    <circle cx="1370" cy="245" r="9" fill="#18181b" />
    <circle cx="1373" cy="242" r="3" fill="#ffffff" />
    <circle cx="1450" cy="245" r="9" fill="#18181b" />
    <circle cx="1453" cy="242" r="3" fill="#ffffff" />
    <path d="M 1350 225 Q 1370 215 1390 225" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round" />
    <path d="M 1430 225 Q 1450 215 1470 225" stroke="#451a03" stroke-width="4" fill="none" stroke-linecap="round" />

    <!-- Randhir Singh's Signature Neat Salt-and-Pepper Mustache -->
    <path d="M 1350 300 Q 1410 270 1470 300 Q 1440 330 1410 320 Q 1380 330 1350 300 Z" fill="#18181b" stroke="#ffffff" stroke-width="1.5" />
    <!-- Warm Generous Smile -->
    <path d="M 1375 330 Q 1410 350 1445 330" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" />

    <!-- Hands holding right side of certificate frame -->
    <path d="M 1160 880 Q 1200 900 1240 950 Q 1200 985 1140 940 Z" fill="#fbd38d" stroke="#d97706" stroke-width="2" />
  </g>

  <!-- 9. The Large Framed "Certificate of Completion" in Foreground Center -->
  <g id="framedCertificate" filter="url(#cardShadow)">
    <!-- Outer White Wooden Beveled Frame -->
    <rect x="580" y="580" width="760" height="460" rx="16" fill="url(#certFrame)" stroke="#cbd5e1" stroke-width="8" />
    <rect x="596" y="596" width="728" height="428" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2" />

    <!-- Delicate Reddish-Pink Guilloche Ornamental Border -->
    <rect x="616" y="616" width="688" height="388" rx="6" fill="#fffdfa" stroke="#e11d48" stroke-width="3" stroke-dasharray="10,6" />
    <rect x="626" y="626" width="668" height="368" fill="none" stroke="#f43f5e" stroke-width="1.5" />

    <!-- Pink Flourish Logo on Top-Left -->
    <path d="M 660 655 Q 685 640 670 690 Q 695 710 660 710" fill="none" stroke="#e11d48" stroke-width="4" stroke-linecap="round" />
    <circle cx="685" cy="655" r="5" fill="#e11d48" />

    <!-- Insignia Emblem on Top-Right -->
    <g transform="translate(1225, 645)">
      <circle cx="20" cy="20" r="18" fill="#fef08a" stroke="#ca8a04" stroke-width="2" />
      <path d="M 20 6 L 25 18 L 36 20 L 27 28 L 30 40 L 20 32 L 10 40 L 13 28 L 4 20 L 15 18 Z" fill="#ea580c" />
    </g>

    <!-- Certificate Typography -->
    <!-- Title -->
    <text x="960" y="685" font-family="'Cinzel', 'Georgia', 'Times New Roman', serif" font-size="34" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="2">
      Certificate of Completion
    </text>

    <!-- Subtitle -->
    <text x="960" y="725" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="16" font-style="italic" fill="#475569" text-anchor="middle">
      This is to certify that
    </text>

    <!-- Program Name -->
    <text x="960" y="760" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600" fill="#64748b" text-anchor="middle">
      has successfully completed the
    </text>

    <text x="960" y="795" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="18" font-weight="900" fill="#0f172a" text-anchor="middle" letter-spacing="1">
      DDU-GKY (Deen Dayal Upadhyaya Grameen Kaushalya Yojana)
    </text>

    <text x="960" y="828" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#334155" text-anchor="middle">
      and demonstrated dedication, skills and commitment
    </text>
    <text x="960" y="852" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" fill="#334155" text-anchor="middle">
      towards a brighter future.
    </text>

    <!-- Embossed Gold Rosette Seal in Bottom Center -->
    <g transform="translate(930, 875)">
      <circle cx="30" cy="30" r="28" fill="url(#goldGleam)" stroke="#b45309" stroke-width="2" />
      <circle cx="30" cy="30" r="22" fill="none" stroke="#78350f" stroke-width="1.5" stroke-dasharray="3,3" />
      <!-- Star in seal -->
      <path d="M 30 14 L 34 24 L 44 26 L 36 33 L 39 43 L 30 37 L 21 43 L 24 33 L 16 26 L 26 24 Z" fill="#92400e" />
    </g>

    <!-- Signatures: Program Director (Left) & Chairman (Right) -->
    <g font-family="'Plus Jakarta Sans', sans-serif" font-size="12" fill="#475569">
      <!-- Left Sign -->
      <path d="M 680 910 Q 720 890 750 915 Q 730 895 760 905" stroke="#1e293b" stroke-width="2" fill="none" />
      <line x1="660" y1="925" x2="780" y2="925" stroke="#94a3b8" stroke-width="1.5" />
      <text x="720" y="942" text-anchor="middle" font-weight="bold">Program Director</text>

      <!-- Right Sign -->
      <path d="M 1140 910 Q 1180 885 1210 910 Q 1190 895 1230 905" stroke="#1e293b" stroke-width="2" fill="none" />
      <line x1="1120" y1="925" x2="1250" y2="925" stroke="#94a3b8" stroke-width="1.5" />
      <text x="1185" y="942" text-anchor="middle" font-weight="bold">Chairman</text>
    </g>
  </g>

  <!-- 10. Stage Lighting Glows at Bottom Edge (Cyan / Blue LED Spotlights) -->
  <circle cx="190" cy="1000" r="140" fill="url(#stageBlueGlow)" />
  <circle cx="1730" cy="1000" r="140" fill="url(#stageBlueGlow)" />
</svg>
`;

  // Render SVG to Buffer with Sharp
  const renderedBuffer = await sharp(Buffer.from(svgScene))
    .png({ quality: 95 })
    .toBuffer();

  // If we have Randhir Singh's real photo, composite his real face into the scene for ultra-photorealism
  let finalBuffer = renderedBuffer;
  if (randhirBustBuffer) {
    // Composite Randhir Singh's real photo onto the right side
    try {
      const circleMask = Buffer.from(`
        <svg width="400" height="480">
          <ellipse cx="200" cy="240" rx="190" ry="230" fill="white" />
        </svg>
      `);

      const maskedRandhir = await sharp(randhirBustBuffer)
        .resize(400, 480, { fit: 'cover' })
        .composite([{ input: circleMask, blend: 'dest-in' }])
        .png()
        .toBuffer();

      finalBuffer = await sharp(renderedBuffer)
        .composite([
          {
            input: maskedRandhir,
            top: 100,
            left: 1210
          }
        ])
        .png({ quality: 95 })
        .toBuffer();
    } catch (e) {
      console.log('Randhir face composite notice:', e.message);
    }
  }

  // Target paths to overwrite
  const targetPaths = [
    path.join(__dirname, '../public/assets/about/Certificate Celebration Ceremony.png'),
    path.join(__dirname, '../public/assets/about/Certificate Celebration Ceremony (1).png'),
    path.join(__dirname, '../public/assets/about/certificate-celebration-ceremony.png'),
    path.join(__dirname, '../public/Certificate Celebration Ceremony.png'),
    path.join(__dirname, '../public/Certificate Celebration Ceremony (1).png'),
    path.join(__dirname, '../public/certificate-celebration-ceremony.png')
  ];

  for (const p of targetPaths) {
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, finalBuffer);
    console.log('Successfully written:', p, 'Size:', finalBuffer.length);
  }
}

createCeremonyPhoto()
  .then(() => console.log('All Certificate Celebration Ceremony images updated successfully!'))
  .catch(err => console.error('Error generating ceremony photo:', err));
