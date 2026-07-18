import { educationItems } from "../data/education.js";
import { createElement } from "../utils/dom.js";

const createEducationCard = (education) => {
    const card = createElement("article", "education-card");
    const icon = createElement("div", "education-card__icon", education.icon);
    const information = createElement("div", "education-card__information");
    const date = createElement("p", "education-card__date", `${education.datePrefix} `);
    const time = createElement("time", "", education.date.label);

    icon.setAttribute("aria-hidden", "true");
    time.dateTime = education.date.datetime;
    date.append(time);
    information.append(
        createElement("span", "education-card__status", education.status),
        createElement("h3", "education-card__title", education.title),
        createElement("p", "education-card__institution", education.institution),
        createElement("p", "education-card__description", education.description),
        date,
    );
    card.append(icon, information);

    return card;
};

export const initializeEducation = () => {
    const container = document.querySelector("#education-container");
    if (container) container.replaceChildren(...educationItems.map(createEducationCard));
};
