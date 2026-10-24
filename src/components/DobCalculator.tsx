import React, { useState } from 'react';
import { Calendar, Compass, Sparkles, CheckCircle2, AlertCircle, Share2, MessageCircle, RefreshCw, Star } from 'lucide-react';
import { calculateNumerologyProfile, LOSHU_PLANES_INFO, MISSING_NUMBER_REMEDIES, PLANETARY_ARCHETYPES } from '../data/numerologyData';
import { Language, NumerologyProfile } from '../types';

interface DobCalculatorProps {
  lang: Language;
  onBookPersonalizedReading: (profile: NumerologyProfile) => void;
}

export const DobCalculator: React.FC<DobCalculatorProps> = ({
  lang,
  onBookPersonalizedReading
}) => {
  const [day, setDay] = useState<number>(14);
  const [month, setMonth] = useState<number>(9);
  const [year, setYear] = useState<number>(1972);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [includeKua, setIncludeKua] = useState<boolean>(false);

  const [profile, setProfile] = useState<NumerologyProfile>(() =>
    calculateNumerologyProfile(14, 9, 1972, 'male', false)
  );

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const result = calculateNumerologyProfile(day, month, year, gender, includeKua);
    setProfile(result);
  };

  // 3x3 Loshu layout positions:
  // [4, 9, 2]
  // [3, 5, 7]
  // [8, 1, 6]
  const loshuPositions = [
    [4, 9, 2],
    [3, 5, 7],
    [8, 1, 6]
  ];

  const getPlaneCompletion = (numbers: number[]) => {
    const presentCount = numbers.filter((n) => (profile.loShuCounts[n] || 0) > 0).length;
    const percentage = Math.round((presentCount / numbers.length) * 100);
    return { presentCount, percentage, isFull: percentage === 100 };
  };

  const handleWhatsAppShare = () => {
    const text = `Namaste Randhir Ji, I calculated my Date of Birth (${day}/${month}/${year}) on DecodeYourDestiny:\n- Driver (Mulank): ${profile.driverNumber}\n- Conductor (Bhagyank): ${profile.conductorNumber}\n- Kua Number: ${profile.kuaNumber}\n- Missing Numbers: ${profile.missingNumbers.join(', ')}\nI would like to consult with you for personal remedies and watch analysis.`;
    const link = document.createElement('a');
    link.href = `https://wa.me/919509593150?text=${encodeURIComponent(text)}`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="dob-calculator" className="relative py-12 sm:py-16 bg-[#fbf9f4] border-b border-amber-200/80">
      {/* Target anchor for direct #dob URL navigation */}
      <div id="dob" className="absolute -top-20 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-900 font-bold bg-amber-100/90 px-3 py-1 rounded-md mb-3 border border-amber-300">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>{lang === 'hi' ? 'इंटरएक्टिव वैदिक व लो-शू मैजिक ग्रिड' : 'Interactive Vedic & Lo-Shu Magic Grid Engine'}</span>
          </div>

          <h2 className="font-sacred text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {lang === 'hi' ? 'अपनी जन्मतिथि के रहस्यों को जानें' : 'DECODE YOUR DATE OF BIRTH'}
          </h2>
          <p className="font-medium text-amber-900 text-sm sm:text-base mt-2 font-sacred font-bold">
            {lang === 'hi' ? 'अपने जीवन को समझें और अपने भविष्य को नई दिशा दें।' : 'CHANGE YOUR LIFE AND DESTINY.'}
          </p>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl mx-auto">
            {lang === 'hi'
              ? 'अपनी जन्म तिथि दर्ज करें और तुरंत अपना मूलांक (Driver), भाग्यांक (Conductor), कुआ अंक एवं 3x3 लो-शू ग्रिड की ऊर्जा का संपूर्ण विश्लेषण प्राप्त करें।'
              : 'Enter your exact date of birth to reveal your Driver (Mulank), Conductor (Bhagyank), Kua Number, 8 Planes of Destiny, and Missing Number remedies.'}
          </p>
        </div>

        {/* Input Form Card */}
        <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md max-w-4xl mx-auto mb-12">
          <form onSubmit={handleCalculate} className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-end">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {lang === 'hi' ? 'दिन (Day)' : 'Day (दिन)'}
              </label>
              <select
                value={day}
                onChange={(e) => setDay(parseInt(e.target.value, 10))}
                className="w-full text-sm p-2.5 rounded-lg border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-amber-500"
              >
                {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {lang === 'hi' ? 'माह (Month)' : 'Month (माह)'}
              </label>
              <select
                value={month}
                onChange={(e) => setMonth(parseInt(e.target.value, 10))}
                className="w-full text-sm p-2.5 rounded-lg border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-amber-500"
              >
                {[
                  'Jan (1)', 'Feb (2)', 'Mar (3)', 'Apr (4)', 'May (5)', 'Jun (6)',
                  'Jul (7)', 'Aug (8)', 'Sep (9)', 'Oct (10)', 'Nov (11)', 'Dec (12)'
                ].map((m, idx) => (
                  <option key={idx + 1} value={idx + 1}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {lang === 'hi' ? 'वर्ष (Year)' : 'Year (वर्ष)'}
              </label>
              <input
                type="number"
                min="1920"
                max="2035"
                value={year}
                onChange={(e) => setYear(parseInt(e.target.value, 10) || 1995)}
                className="w-full text-sm p-2.5 rounded-lg border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                {lang === 'hi' ? 'लिंग (Gender)' : 'Gender (लिंग)'}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full text-sm p-2.5 rounded-lg border border-stone-300 bg-stone-50 font-medium focus:ring-2 focus:ring-amber-500"
              >
                <option value="male">{lang === 'hi' ? 'पुरुष (Male)' : 'Male (पुरुष)'}</option>
                <option value="female">{lang === 'hi' ? 'महिला (Female)' : 'Female (महिला)'}</option>
              </select>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white font-bold p-2.5 rounded-lg shadow-sm text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{lang === 'hi' ? 'गणना करें' : 'Calculate'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Container */}
        <div className="space-y-8">
          {/* Top 3 Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Driver / Mulank */}
            <div className="bg-white rounded-xl p-6 border-2 border-amber-300/80 shadow-md flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-800 text-white flex items-center justify-center text-3xl font-black font-sacred shadow-sm shrink-0">
                {profile.driverNumber}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {lang === 'hi' ? 'मूलांक (Driver Number)' : 'Driver / Mulank (मूलांक)'}
                </span>
                <h3 className="font-sacred font-bold text-stone-900 text-lg mt-1">
                  {PLANETARY_ARCHETYPES[profile.driverNumber].planet}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi' 
                    ? 'जन्मजात स्वभाव, आंतरिक दृष्टिकोण और विचार शैली का संचालन करता है।' 
                    : 'Governs innate personality, initial mindset, and self-expression.'}
                </p>
              </div>
            </div>

            {/* Conductor / Bhagyank */}
            <div className="bg-white rounded-xl p-6 border-2 border-amber-300/80 shadow-md flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-stone-800 to-stone-950 text-amber-300 flex items-center justify-center text-3xl font-black font-sacred shadow-sm shrink-0">
                {profile.conductorNumber}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {lang === 'hi' ? 'भाग्यांक (Conductor Number)' : 'Conductor / Bhagyank (भाग्यांक)'}
                </span>
                <h3 className="font-sacred font-bold text-stone-900 text-lg mt-1">
                  {PLANETARY_ARCHETYPES[profile.conductorNumber].planet}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi'
                    ? 'जीवन लक्ष्य, करियर में सफलता के पड़ाव और कर्म पथ का संचालन करता है।'
                    : 'Governs life purpose, career milestones, and overarching karmic path.'}
                </p>
              </div>
            </div>

            {/* Kua Number */}
            <div className="bg-white rounded-xl p-6 border-2 border-amber-300/80 shadow-md flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-700 to-amber-900 text-white flex items-center justify-center text-3xl font-black font-sacred shadow-sm shrink-0">
                {profile.kuaNumber}
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {lang === 'hi' ? 'कुआ अंक (Kua Number)' : 'Kua Number (कुआ अंक)'}
                </span>
                <h3 className="font-sacred font-bold text-stone-900 text-lg mt-1">
                  {lang === 'hi' ? 'दिशात्मक ऊर्जा आधार' : 'Directional Energy Pillar'}
                </h3>
                <p className="text-xs text-stone-600 mt-1">
                  {lang === 'hi'
                    ? 'सोने की सिरहाना दिशा, अध्ययन कक्ष और कार्यालय वास्तु का मार्गदर्शन करता है।'
                    : 'Guides ideal sleeping head direction, study facing, and office desk Vastu.'}
                </p>
              </div>
            </div>
          </div>

          {/* Lo-Shu Magic Grid 3x3 Visualization & Planes Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual 3x3 Lo-Shu Grid */}
            <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-amber-300/90 p-6 sm:p-8 shadow-md">
              <div className="flex items-center justify-between border-b border-amber-100 pb-3 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {lang === 'hi' ? 'पवित्र ज्यामितीय ग्रिड' : 'Sacred Geometric Matrix'}
                  </span>
                  <h3 className="font-sacred text-xl font-bold text-stone-900">
                    {lang === 'hi' ? 'आपका 3×3 लो-शू ग्रिड' : 'Your 3×3 Lo-Shu Grid'}
                  </h3>
                </div>
                <div className="text-right text-xs text-stone-500">
                  {lang === 'hi' ? 'पंक्ति/कॉलम योग = 15' : 'Sum of any row/col = 15'}
                </div>
              </div>

              {/* 3x3 Grid Box */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3 bg-amber-50/60 rounded-xl border-2 border-amber-400 max-w-sm mx-auto shadow-inner">
                {loshuPositions.map((row, rowIdx) =>
                  row.map((cellNum) => {
                    const count = profile.loShuCounts[cellNum] || 0;
                    const isPresent = count > 0;
                    const isDriver = cellNum === profile.driverNumber;
                    const isConductor = cellNum === profile.conductorNumber;
                    const isKua = Boolean(includeKua && cellNum === profile.kuaNumber);

                    return (
                      <div
                        key={cellNum}
                        className={`aspect-square rounded-xl flex flex-col items-center justify-center p-1.5 sm:p-2 text-center transition-all relative overflow-hidden ${
                          isPresent
                            ? 'bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 text-white shadow-md scale-[1.02] border border-amber-400'
                            : 'bg-stone-100/80 text-stone-400 border border-dashed border-stone-300'
                        }`}
                      >
                        <span className="text-[10px] sm:text-xs text-amber-200/90 font-mono font-medium">
                          {lang === 'hi' ? `स्थान ${cellNum}` : `Pos ${cellNum}`}
                        </span>
                        <div className="text-2xl sm:text-3xl font-black font-sacred my-0.5 leading-none">
                          {isPresent ? (
                            <span>
                              {Array.from({ length: count }, () => cellNum).join('')}
                            </span>
                          ) : (
                            <span className="text-stone-300 text-lg">-</span>
                          )}
                        </div>
                        <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-tight opacity-90 truncate max-w-full">
                          {isPresent 
                            ? (lang === 'hi' ? `${count} बार सक्रिय` : `${count}x Active`)
                            : (lang === 'hi' ? 'अनुपस्थित' : 'Missing')}
                        </span>

                        {/* Special Role Badges */}
                        {isPresent && (
                          <div className="flex flex-wrap items-center justify-center gap-0.5 mt-1">
                            {isDriver && isConductor ? (
                              <span className="text-[8px] font-bold bg-amber-300 text-amber-950 px-1 py-0.2 rounded-full leading-none shadow-2xs">
                                ★ {lang === 'hi' ? 'मूलांक व भाग्यांक' : 'Driver & Conductor'}
                              </span>
                            ) : isDriver ? (
                              <span className="text-[8px] font-bold bg-amber-300 text-amber-950 px-1 py-0.2 rounded-full leading-none shadow-2xs">
                                ★ {lang === 'hi' ? 'मूलांक' : 'Driver (मूलांक)'}
                              </span>
                            ) : isConductor ? (
                              <span className="text-[8px] font-bold bg-stone-900/80 text-amber-200 px-1 py-0.2 rounded-full leading-none border border-amber-400/40">
                                ✦ {lang === 'hi' ? 'भाग्यांक' : 'Conductor'}
                              </span>
                            ) : isKua ? (
                              <span className="text-[8px] font-bold bg-amber-800 text-amber-100 px-1 py-0.2 rounded-full leading-none">
                                ▲ {lang === 'hi' ? 'कुआ अंक' : 'Kua'}
                              </span>
                            ) : null}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>

              {/* Grid Legend */}
              <div className="mt-5 pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-3 h-3 rounded bg-amber-700 inline-block" />
                  {lang === 'hi' ? 'उपस्थित अंक: ' : 'Present Numbers: '}{profile.presentNumbers.join(', ')}
                </span>
                <span className="flex items-center gap-1.5 font-medium text-amber-900">
                  <span className="w-3 h-3 rounded bg-stone-200 border border-dashed border-stone-400 inline-block" />
                  {lang === 'hi' ? 'अनुपस्थित अंक: ' : 'Missing Numbers: '}{profile.missingNumbers.join(', ')}
                </span>
              </div>

              {/* Optional Kua Toggle */}
              <div className="mt-4 p-2.5 bg-stone-50 rounded-lg border border-stone-200 flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-700 select-none">
                  <input
                    type="checkbox"
                    checked={includeKua}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setIncludeKua(checked);
                      setProfile(calculateNumerologyProfile(day, month, year, gender, checked));
                    }}
                    className="rounded text-amber-700 focus:ring-amber-500 w-4 h-4 cursor-pointer"
                  />
                  <span>
                    {lang === 'hi'
                      ? `कुआ अंक (${profile.kuaNumber}) को 3×3 ग्रिड में शामिल करें`
                      : `Include Kua Number (${profile.kuaNumber}) in 3x3 Grid Matrix`}
                  </span>
                </label>
                <span className="text-[10px] text-stone-500 hidden sm:inline">
                  {lang === 'hi' ? 'वास्तु दिशा स्तंभ' : 'Vastu Energy Pillar'}
                </span>
              </div>

              {/* Vedic Grid Energy Composition Breakdown */}
              <div className="mt-4 p-3.5 bg-amber-50/90 rounded-xl border border-amber-300 text-xs text-stone-700 space-y-2">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    {lang === 'hi' ? 'वैदिक ग्रिड संयोजन एवं मूलांक सत्यापन:' : 'Vedic Grid Energy Origin & Verification:'}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1 text-[11px] font-sans">
                  <div>
                    <span className="text-stone-500">{lang === 'hi' ? '• जन्मतिथि अंक:' : '• DOB Digits:'}</span>{' '}
                    <strong className="text-stone-800">{day}/{month}/{year}</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">{lang === 'hi' ? '• मूलांक (Driver):' : '• Driver (Mulank):'}</span>{' '}
                    <strong className="text-amber-900 font-bold">{profile.driverNumber} ({PLANETARY_ARCHETYPES[profile.driverNumber].planet.split(' ')[0]})</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">{lang === 'hi' ? '• भाग्यांक (Conductor):' : '• Conductor (Bhagyank):'}</span>{' '}
                    <strong className="text-amber-900 font-bold">{profile.conductorNumber} ({PLANETARY_ARCHETYPES[profile.conductorNumber].planet.split(' ')[0]})</strong>
                  </div>
                  <div>
                    <span className="text-stone-500">{lang === 'hi' ? '• कुआ अंक (Kua):' : '• Kua Direction:'}</span>{' '}
                    <strong className="text-amber-900">{profile.kuaNumber}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-200/80 text-[11px] leading-relaxed text-amber-950">
                  {lang === 'hi' ? (
                    <span>
                      ✓ <strong>मूलांक {profile.driverNumber} सत्यापन:</strong> आपकी जन्म तारीख {day} ({Math.floor(day / 10)}+{day % 10} = {profile.driverNumber}) के अनुसार आपका मूलांक <strong>{profile.driverNumber}</strong> है। यह अंक 3×3 लो-शू ग्रिड में <strong>सक्रिय (Active)</strong> स्थान प्राप्त करता है और <strong>अनुपस्थित (Missing) नहीं</strong> है।
                    </span>
                  ) : (
                    <span>
                      ✓ <strong>Driver {profile.driverNumber} Verified:</strong> For Day {day} ({Math.floor(day / 10)}+{day % 10} = {profile.driverNumber}), your Driver (Mulank) is <strong>{profile.driverNumber}</strong>. It is placed directly in your 3×3 Lo-Shu Grid as an <strong>Active</strong> soul frequency, so <strong>{profile.driverNumber} is NOT missing</strong>!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 8 Planes Analysis */}
            <div className="lg:col-span-6 bg-white rounded-2xl border-2 border-amber-200 p-6 sm:p-8 shadow-md">
              <div className="border-b border-amber-100 pb-3 mb-5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {lang === 'hi' ? 'चेतना के 8 तल' : 'Planes of Consciousness'}
                </span>
                <h3 className="font-sacred text-xl font-bold text-stone-900">
                  {lang === 'hi' ? '8 भाग्य तल एवं राजयोग' : 'The 8 Destiny Planes & Raj Yogas'}
                </h3>
              </div>

              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {LOSHU_PLANES_INFO.map((plane, idx) => {
                  const status = getPlaneCompletion(plane.numbers);
                  const isRajyoga = plane.name.includes('Raj Yoga');
                  return (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        status.isFull
                          ? 'bg-amber-50/90 border-amber-400 shadow-2xs'
                          : status.presentCount > 0
                          ? 'bg-stone-50/80 border-stone-200'
                          : 'bg-stone-50/40 border-stone-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-stone-900 flex items-center gap-1.5">
                          {status.isFull && <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />}
                          {plane.name}
                        </span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                            status.isFull
                              ? 'bg-amber-600 text-white'
                              : status.presentCount > 0
                              ? 'bg-stone-200 text-stone-800'
                              : 'bg-stone-100 text-stone-500'
                          }`}
                        >
                          {lang === 'hi'
                            ? `${status.percentage}% पूर्णता (${status.presentCount}/${plane.numbers.length})`
                            : `${status.percentage}% Strength (${status.presentCount}/${plane.numbers.length})`}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600">{plane.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Missing Numbers & Tailored Remedies */}
          <div className="bg-white rounded-2xl border-2 border-amber-300 p-6 sm:p-8 shadow-md">
            <div className="border-b border-amber-100 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  {lang === 'hi' ? 'वैदिक एवं व्यावहारिक समाधान' : 'Vedic & Practical Remedies'}
                </span>
                <h3 className="font-sacred text-xl sm:text-2xl font-bold text-stone-900">
                  {lang === 'hi' ? 'अनुपस्थित अंकों के प्रभावी वैदिक उपाय' : 'Targeted Remedies for Missing Numbers'}
                </h3>
              </div>
              <span className="text-xs text-amber-900 bg-amber-50 px-3 py-1 rounded-md border border-amber-200 font-medium">
                {lang === 'hi' ? 'रणधीर सिंह जी द्वारा अनुशंसित' : 'Prescribed by Randhir Singh'}
              </span>
            </div>

            {profile.missingNumbers.length === 0 ? (
              <div className="bg-emerald-50 text-emerald-900 p-4 rounded-xl border border-emerald-200 text-xs">
                {lang === 'hi'
                  ? 'हार्दिक बधाई! आपकी जन्म तिथि में सभी 9 अंक उपस्थित हैं, जो एक पूर्ण ऊर्जा परिपथ बनाते हैं। नियमित साधना व अनुकूल घड़ी इसे स्थायी बनाए रखेगी।'
                  : 'Congratulations! All 9 numbers are present in your date of birth, forming a complete energetic circuit. Regular spiritual grounding and watch therapy will sustain your prosperity.'}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.missingNumbers.map((mNum) => {
                  const rem = MISSING_NUMBER_REMEDIES[mNum];
                  if (!rem) return null;
                  return (
                    <div
                      key={mNum}
                      className="p-4 rounded-xl border border-amber-200/80 bg-[#fdfbf7] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                            {mNum}
                          </span>
                          <h4 className="font-bold text-xs text-stone-900 leading-snug">
                            {rem.title}
                          </h4>
                        </div>
                        <ul className="space-y-1.5 text-xs text-stone-700 pl-4 list-disc mb-3">
                          {rem.remedies.map((r, i) => (
                            <li key={i}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Actions Bar */}
            <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-600">
                <strong>{lang === 'hi' ? 'शुभ दिन:' : 'Lucky Days:'}</strong> {profile.luckyDays.join(', ')} ·{' '}
                <strong>{lang === 'hi' ? 'शुभ रंग:' : 'Lucky Colors:'}</strong> {profile.luckyColors.join(' / ')}
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleWhatsAppShare}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-lg text-xs shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>{lang === 'hi' ? 'रणधीर सिंह जी को चार्ट भेजें' : 'Send Chart to Randhir Ji on WhatsApp'}</span>
                </button>

                <button
                  onClick={() => onBookPersonalizedReading(profile)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-800 text-white font-bold py-2.5 px-4 rounded-lg text-xs shadow-xs transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'hi' ? 'व्यक्तिगत 1-on-1 परामर्श बुक करें' : 'Book Detailed 1-on-1 Consultation'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
