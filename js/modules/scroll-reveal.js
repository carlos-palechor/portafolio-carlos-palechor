import { prefersReducedMotion } from "./motion.js";

const REVEAL_SELECTORS = [
    ".section__heading",
    ".about__text",
    ".highlight-card",
    ".timeline__content",
    ".project-card",
    ".skill-group",
    ".soft-skills",
    ".education-card",
    ".document-card",
    ".contact__message",
    ".contact-card",
];

function showElement(element) {
    element.classList.add("is-visible");
}

export function initializeScrollReveal() {
    const revealElements = document.querySelectorAll(
        REVEAL_SELECTORS.join(","),
    );

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        revealElements.forEach(showElement);
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                showElement(entry.target);
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -60px",
        },
    );

    revealElements.forEach((element) => {
        element.classList.add("reveal-ready");
        revealObserver.observe(element);
    });
}
