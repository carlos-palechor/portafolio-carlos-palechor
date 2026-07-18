export const createElement = (tag, className = "", text = "") => {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== "") element.textContent = text;

    return element;
};

export const createList = (items, className, ariaLabel = "") => {
    const list = createElement("ul", className);

    if (ariaLabel) list.setAttribute("aria-label", ariaLabel);
    list.append(...items.map((item) => createElement("li", "", item)));

    return list;
};
