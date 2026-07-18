import { projects } from "../data/projects.js";
import { createElement, createList } from "../utils/dom.js";

const createProjectCard = (project) => {
    const card = createElement("article", "project-card");
    const visual = createElement("div", "project-card__visual");
    const image = createElement("img", "project-card__image");
    const content = createElement("div", "project-card__content");
    const header = createElement("div", "project-card__header");
    const actions = createElement("div", "project-card__actions");
    const repositoryLink = createElement("a", "button button--primary", "Ver repositorio");

    visual.setAttribute("aria-hidden", "true");
    image.src = project.image;
    image.alt = "";
    image.loading = "lazy";
    visual.append(
        image,
        createElement("span", "project-card__visual-label", project.category),
        createElement("strong", "", project.name),
    );

    header.append(
        createElement("span", "status-badge", project.status),
        createElement("span", "project-card__type", project.type),
    );

    repositoryLink.href = project.repositoryUrl;
    repositoryLink.target = "_blank";
    repositoryLink.rel = "noopener noreferrer";
    actions.append(repositoryLink);

    content.append(
        header,
        createElement("h3", "project-card__title", project.title),
        createElement("p", "project-card__description", project.description),
        createElement("h4", "project-card__subtitle", "Funcionalidades principales"),
        createList(project.features, "project-card__features"),
        createElement("h4", "project-card__subtitle", "Tecnologías"),
        createList(project.technologies, "technology-list", "Tecnologías utilizadas"),
        actions,
    );

    card.append(visual, content);
    return card;
};

export const initializeProjects = () => {
    const container = document.querySelector("#projects-container");

    if (!container) return;

    container.replaceChildren(...projects.map(createProjectCard));
};
