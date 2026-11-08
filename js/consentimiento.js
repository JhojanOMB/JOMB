(() => {
  const CONSENT_KEY = 'jomb-cookie-consent-v1';

  function readConsent() {
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('No se pudo leer el consentimiento de cookies:', error);
      return null;
    }
  }

  function saveConsent(choice) {
    const consent = {
      necessary: true,
      optional: choice === 'all',
      choice,
      updatedAt: new Date().toISOString()
    };
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    } catch (error) {
      console.error('No se pudo guardar el consentimiento de cookies:', error);
      return null;
    }
    return consent;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const panel = document.getElementById('cookie-consent');
    const settings = document.getElementById('cookie-settings');
    if (!panel) return;
    const saveError = panel.querySelector('[data-consent-error]');
    let opener = null;

    const open = () => {
      if (saveError) saveError.hidden = true;
      panel.hidden = false;
      panel.classList.add('is-visible');
      panel.querySelector('[data-consent]')?.focus();
    };
    const close = () => {
      panel.classList.remove('is-visible');
      panel.hidden = true;
      if (opener?.isConnected) opener.focus();
      opener = null;
    };

    if (!readConsent()) open();

    panel.querySelectorAll('[data-consent]').forEach((button) => {
      button.addEventListener('click', () => {
        const choice = button.dataset.consent;
        if (choice === 'all' || choice === 'necessary' || choice === 'reject') {
          if (saveConsent(choice)) close();
          else if (saveError) saveError.hidden = false;
        }
      });
    });

    settings?.addEventListener('click', () => {
      opener = settings;
      open();
    });
    window.JOMBConsent = {
      open,
      get: readConsent,
      save: saveConsent
    };
  });
})();
