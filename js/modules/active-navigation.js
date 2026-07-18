function setActiveLink(navigationLinks, activeLink) {
    navigationLinks.forEach((link) => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
    });

    activeLink.classList.add("active");
    activeLink.setAttribute("aria-current", "page");
}

export function initializeActiveNavigation() {
    const navigationLinks = document.querySelectorAll(".navbar__menu a");

    const sectionEntries = [...navigationLinks]
        .map((link) => {
            const sectionId = link.getAttribute("href")?.slice(1);
            const section = sectionId
                ? document.getElementById(sectionId)
                : null;

            return section ? { link, section } : null;
        })
        .filter(Boolean);

    if (sectionEntries.length === 0) {
        return;
    }

    setActiveLink(navigationLinks, sectionEntries[0].link);

    if (!("IntersectionObserver" in window)) {
        return;
    }

    const navigationObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const activeEntry = sectionEntries.find(
                    ({ section }) => section === entry.target,
                );

                if (activeEntry) {
                    setActiveLink(navigationLinks, activeEntry.link);
                }
            });
        },
        {
            rootMargin: "-35% 0px -60%",
        },
    );

    sectionEntries.forEach(({ section }) => {
        navigationObserver.observe(section);
    });
}
