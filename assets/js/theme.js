// Theme switcher
(function() {
    const themeToggle = document.getElementById('themeToggle');
    const docEl = document.documentElement;
    const store = window.localStorage;
    const key = 'theme';
    const currentTheme = store.getItem(key);

    if (currentTheme) {
        docEl.setAttribute('data-theme', currentTheme);
    } else {
        // Default to light if no preference is stored (prioritize light)
        docEl.setAttribute('data-theme', 'light');
    }

    if (!themeToggle) return;
    themeToggle.addEventListener('click', () => {
        const current = docEl.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        docEl.setAttribute('data-theme', next);
        store.setItem(key, next);
    });
})();
