import { prefersReducedMotion } from "./motion.js";

const TYPING_SPEED = 65;

export function initializeTypingEffect() {
    const typingText = document.querySelector(".typing-text");

    if (!typingText || prefersReducedMotion()) {
        return;
    }

    const typingPhrase = typingText.textContent.trim();
    let characterIndex = 0;

    typingText.textContent = "";
    typingText.setAttribute("aria-label", typingPhrase);

    const typingInterval = window.setInterval(() => {
        typingText.textContent += typingPhrase[characterIndex];
        characterIndex += 1;

        if (characterIndex === typingPhrase.length) {
            window.clearInterval(typingInterval);
        }
    }, TYPING_SPEED);
}
