import { prefersReducedMotion } from "./motion.js";

const COUNTER_DURATION = 1200;

function animateCounter(element) {
    const endValue = Number(element.dataset.count);
    const startValue = Number(element.dataset.countStart ?? 0);
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / COUNTER_DURATION, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.round(
            startValue + (endValue - startValue) * easedProgress,
        );

        element.textContent = String(currentValue);

        if (progress < 1) {
            window.requestAnimationFrame(updateCounter);
        }
    }

    window.requestAnimationFrame(updateCounter);
}

export function initializeAboutCounters() {
    const counters = document.querySelectorAll("[data-count]");

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
        counters.forEach((counter) => {
            counter.textContent = counter.dataset.count;
        });
        return;
    }

    const counterObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.65 },
    );

    counters.forEach((counter) => {
        counterObserver.observe(counter);
    });
}
