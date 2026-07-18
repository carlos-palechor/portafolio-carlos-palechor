import { experiences } from "../data/experience.js";
import { createElement, createList } from "../utils/dom.js";

const createDate = ({ start, end }) => {
    const date = createElement("p", "timeline__date");
    const startTime = createElement("time", "", start.label);
    const endTime = createElement("time", "", end.label);
    const separator = createElement("span", "", "—");

    startTime.dateTime = start.datetime;
    endTime.dateTime = end.datetime;
    separator.setAttribute("aria-hidden", "true");
    date.append(startTime, separator, endTime);

    return date;
};

const createExperience = (experience) => {
    const item = createElement("article", "timeline__item");
    const marker = createElement("div", "timeline__marker");
    const content = createElement("div", "timeline__content");
    const header = createElement("div", "timeline__header");
    const identity = createElement("div");

    marker.setAttribute("aria-hidden", "true");
    identity.append(
        createElement("h3", "timeline__role", experience.role),
        createElement("p", "timeline__company", experience.company),
        createElement("p", "timeline__area", experience.area),
    );
    header.append(identity, createDate(experience));
    content.append(
        header,
        createElement("p", "timeline__description", experience.description),
        createElement("h4", "timeline__subtitle", "Principales responsabilidades"),
        createList(experience.responsibilities, "timeline__responsibilities"),
    );
    item.append(marker, content);

    return item;
};

export const initializeExperience = () => {
    const container = document.querySelector("#experience-container");
    if (container) container.replaceChildren(...experiences.map(createExperience));
};
