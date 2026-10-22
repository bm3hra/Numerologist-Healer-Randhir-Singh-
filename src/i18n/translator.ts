/**
 * Translation Bridge: Handles whole-site language conversion
 * Combines React state, localized dictionaries, and Google Website Translator.
 */

export function triggerFullSiteTranslation(targetLang: string) {
  try {
    localStorage.setItem('dyd_lang', targetLang);
    document.documentElement.lang = targetLang;

    // Google Translate language mapping
    const googleLangMap: Record<string, string> = {
      zh: 'zh-CN',
      or: 'or',
      pa: 'pa',
      as: 'as'
    };
    const mappedCode = googleLangMap[targetLang] || targetLang;

    // Cookie value: /source_language/target_language
    const cookieString = `/en/${mappedCode}`;
    const host = window.location.hostname;

    // Set cookies for current path
    document.cookie = `googtrans=${cookieString}; path=/; max-age=31536000;`;
    
    // Also try domain cookie if on a subdomain
    if (host && host.includes('.')) {
      document.cookie = `googtrans=${cookieString}; domain=.${host}; path=/; max-age=31536000;`;
    }

    // Try finding and triggering the Google Translate combo element
    const triggerCombo = () => {
      const selectElem = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (selectElem) {
        selectElem.value = mappedCode;
        selectElem.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      return false;
    };

    if (!triggerCombo()) {
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (triggerCombo() || attempts > 20) {
          clearInterval(interval);
        }
      }, 200);
    }
  } catch (err) {
    console.warn('Language switch notice:', err);
  }
}
