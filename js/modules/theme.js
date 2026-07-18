const THEME_STORAGE_KEY = "portfolio-theme";
const THEME_HINT_DURATION = 4000;

const THEMES = Object.freeze({
    DARK: "dark",
    LIGHT: "light",
});

function getSavedTheme() {
    try {
        return localStorage.getItem(THEME_STORAGE_KEY);
    } catch {
        return null;
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
        // El tema sigue funcionando aunque el navegador bloquee localStorage.
    }
}

function getInitialTheme() {
    const savedTheme = getSavedTheme();

    if (Object.values(THEMES).includes(savedTheme)) {
        return savedTheme;
    }

    const prefersLightTheme = window.matchMedia(
        "(prefers-color-scheme: light)",
    ).matches;

    return prefersLightTheme ? THEMES.LIGHT : THEMES.DARK;
}

function applyTheme(theme, themeButton) {
    const isDarkTheme = theme === THEMES.DARK;
    const nextThemeLabel = isDarkTheme ? "claro" : "oscuro";

    document.documentElement.dataset.theme = theme;

    themeButton.setAttribute(
        "aria-label",
        `Cambiar al tema ${nextThemeLabel}`,
    );
}

export function initializeTheme() {
    const themeButton = document.querySelector(".theme-button");
    const themeHint = document.querySelector(".theme-hint");

    if (!themeButton) {
        return;
    }

    applyTheme(getInitialTheme(), themeButton);

    window.setInterval(() => {
        themeHint?.classList.toggle("theme-hint--hidden");
    }, THEME_HINT_DURATION);

    themeButton.addEventListener("click", () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme =
            currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;

        applyTheme(newTheme, themeButton);
        saveTheme(newTheme);
    });
}
