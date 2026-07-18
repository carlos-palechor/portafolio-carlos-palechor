import { prefersReducedMotion } from "./motion.js";

const MAX_ROTATION_X = 5;
const MAX_ROTATION_Y = 7;

export function initializeHeroInteractions() {
    const heroVisual = document.querySelector(".hero__visual");
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

    if (!heroVisual || !hasFinePointer || prefersReducedMotion()) {
        return;
    }

    heroVisual.addEventListener("pointermove", (event) => {
        const bounds = heroVisual.getBoundingClientRect();
        const horizontalPosition = (event.clientX - bounds.left) / bounds.width;
        const verticalPosition = (event.clientY - bounds.top) / bounds.height;

        const rotateY = (horizontalPosition - 0.5) * MAX_ROTATION_Y * 2;
        const rotateX = (0.5 - verticalPosition) * MAX_ROTATION_X * 2;

        heroVisual.style.transform =
            `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroVisual.addEventListener("pointerleave", () => {
        heroVisual.style.transform = "";
    });
}
