import { documents } from "../data/documents.js";
import { createElement } from "../utils/dom.js";

const createDocumentLink = (label, className, path, download = false) => {
    const link = createElement("a", className, label);
    link.href = path;

    if (download) {
        link.download = "";
    } else {
        link.target = "_blank";
        link.rel = "noopener noreferrer";
    }

    return link;
};

const createDocumentCard = (document) => {
    const card = createElement("article", "document-card");
    const icon = createElement("div", "document-card__icon", "PDF");
    const content = createElement("div", "document-card__content");
    const actions = createElement("div", "document-card__actions");

    icon.setAttribute("aria-hidden", "true");
    actions.append(
        createDocumentLink("Visualizar", "button button--secondary", document.path),
        createDocumentLink("Descargar", "button button--primary", document.path, true),
    );
    content.append(
        createElement("h3", "document-card__title", document.title),
        createElement("p", "document-card__description", document.description),
        actions,
    );
    card.append(icon, content);

    return card;
};

export const initializeDocuments = () => {
    const container = document.querySelector("#documents-container");
    if (container) container.replaceChildren(...documents.map(createDocumentCard));
};
