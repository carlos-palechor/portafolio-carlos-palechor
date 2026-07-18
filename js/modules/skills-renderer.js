import { skillGroups, softSkills } from "../data/skills.js";
import { createElement, createList } from "../utils/dom.js";

const createSkillGroup = (group) => {
    const card = createElement("article", "skill-group");
    card.append(
        createElement("h3", "skill-group__title", group.title),
        createList(group.items, "skill-list"),
    );
    return card;
};

export const initializeSkills = () => {
    const groupsContainer = document.querySelector("#skills-container");
    const softSkillsContainer = document.querySelector("#soft-skills-container");

    if (groupsContainer) groupsContainer.replaceChildren(...skillGroups.map(createSkillGroup));
    if (softSkillsContainer) {
        softSkillsContainer.replaceChildren(...softSkills.map((skill) => createElement("li", "", skill)));
    }
};
