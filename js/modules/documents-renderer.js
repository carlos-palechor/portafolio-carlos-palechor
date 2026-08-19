import { documents } from "../data/documents.js";
import { createElement } from "../utils/dom.js";

const PDF_ICON_PATH = "assets/icons/pdf.svg";

const createDocumentViewer = () => {
    const dialog = createElement("dialog", "document-viewer");
    const header = createElement("div", "document-viewer__header");
    const title = createElement("h3", "document-viewer__title");
    const closeButton = createElement("button", "document-viewer__close", "×");
    const pages = createElement("div", "document-viewer__pages");

    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Cerrar documento");
    closeButton.addEventListener("click", () => dialog.close());
    dialog.addEventListener("contextmenu", (event) => event.preventDefault());
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener("close", () => pages.replaceChildren());

    header.append(title, closeButton);
    dialog.append(header, pages);
    document.body.append(dialog);

    return { dialog, pages, title };
};

const createDocumentCard = (document, openDocument) => {
    const card = createElement("article", "document-card");
    const icon = createElement("div", "document-card__icon");
    const iconImage = createElement("img", "document-card__icon-image");
    const content = createElement("div", "document-card__content");
    const actions = createElement("div", "document-card__actions");
    const viewButton = createElement("button", "button button--secondary", "Visualizar");

    icon.setAttribute("aria-hidden", "true");
    iconImage.src = PDF_ICON_PATH;
    iconImage.alt = "";
    viewButton.type = "button";
    viewButton.addEventListener("click", () => openDocument(document));

    icon.append(iconImage);
    actions.append(viewButton);
    content.append(
        createElement("h3", "document-card__title", document.title),
        createElement("p", "document-card__description", document.description),
        actions,
    );
    card.append(icon, content);

    return card;
};

const initializeCarousel = (container, cards) => {
    const previousButton = document.querySelector(".documents-carousel__button--previous");
    const nextButton = document.querySelector(".documents-carousel__button--next");
    const indicators = document.querySelector(".documents-carousel__indicators");

    if (!previousButton || !nextButton || !indicators || cards.length === 0) return;

    const getVisibleCards = () => (window.matchMedia("(max-width: 760px)").matches ? 1 : 2);
    const getCurrentIndex = () => {
        const step = cards[1]
            ? cards[1].offsetLeft - cards[0].offsetLeft
            : cards[0].getBoundingClientRect().width;
        return step ? Math.round(container.scrollLeft / step) : 0;
    };
    const scrollToCard = (index) => {
        const safeIndex = Math.max(0, Math.min(index, cards.length - 1));
        const target = cards[safeIndex];
        container.scrollTo({ left: target.offsetLeft - container.offsetLeft, behavior: "smooth" });
    };
    let indicatorButtons = [];
    const createIndicators = () => {
        const pageCount = Math.max(1, cards.length - getVisibleCards() + 1);

        indicatorButtons = Array.from({ length: pageCount }, (_, index) => {
            const button = createElement("button", "documents-carousel__indicator");
            button.type = "button";
            button.setAttribute("aria-label", `Ver grupo de documentos ${index + 1}`);
            button.addEventListener("click", () => scrollToCard(index));
            return button;
        });
        indicators.replaceChildren(...indicatorButtons);
    };
    const updateControls = () => {
        const currentIndex = getCurrentIndex();
        const lastStartIndex = Math.max(0, cards.length - getVisibleCards());

        previousButton.disabled = currentIndex <= 0;
        nextButton.disabled = currentIndex >= lastStartIndex;
        indicatorButtons.forEach((button, index) => {
            const isActive = index === currentIndex;
            button.classList.toggle("is-active", isActive);
            button.setAttribute("aria-current", isActive ? "true" : "false");
        });
    };

    previousButton.addEventListener("click", () => scrollToCard(getCurrentIndex() - 1));
    nextButton.addEventListener("click", () => scrollToCard(getCurrentIndex() + 1));
    container.addEventListener("scroll", updateControls, { passive: true });
    window.addEventListener("resize", () => {
        createIndicators();
        updateControls();
    });
    createIndicators();
    updateControls();
};

export const initializeDocuments = () => {
    const container = document.querySelector("#documents-container");
    if (!container) return;

    const viewer = createDocumentViewer();
    const openDocument = (document) => {
        viewer.title.textContent = document.title;
        const pageImages = document.pages.map((page, index) => {
            const image = createElement("img", "document-viewer__page");
            image.src = page;
            image.alt = `${document.title}, página ${index + 1}`;
            image.draggable = false;
            return image;
        });

        viewer.pages.replaceChildren(...pageImages);
        viewer.dialog.showModal();
    };
    const cards = documents.map((document) => createDocumentCard(document, openDocument));

    container.replaceChildren(...cards);
    initializeCarousel(container, cards);
};
