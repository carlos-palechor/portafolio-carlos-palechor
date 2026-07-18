const MOBILE_BREAKPOINT = 900;

export function initializeMenu() {
    const menuButton = document.querySelector(".navbar__menu-button");
    const navigationMenu = document.querySelector(".navbar__menu");
    const navigationLinks = document.querySelectorAll(".navbar__menu a");

    if (!menuButton || !navigationMenu) {
        return;
    }

    function isMenuOpen() {
        return menuButton.getAttribute("aria-expanded") === "true";
    }

    function openMenu() {
        navigationMenu.classList.add("navbar__menu--open");
        menuButton.setAttribute("aria-expanded", "true");
        menuButton.setAttribute("aria-label", "Cerrar menú");
    }

    function closeMenu() {
        navigationMenu.classList.remove("navbar__menu--open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menú");
    }

    function toggleMenu() {
        if (isMenuOpen()) {
            closeMenu();
            return;
        }

        openMenu();
    }

    menuButton.addEventListener("click", toggleMenu);

    navigationLinks.forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isMenuOpen()) {
            closeMenu();
            menuButton.focus();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > MOBILE_BREAKPOINT && isMenuOpen()) {
            closeMenu();
        }
    });
}
