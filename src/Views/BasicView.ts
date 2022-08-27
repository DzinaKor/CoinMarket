export function createNewElement(type: string, classes: Array<string>, parent: HTMLElement | null = null): HTMLElement {
    const element: HTMLElement = document.createElement(type);
    if (classes.length > 0) {
        classes.forEach((cls: string) => {
            element.classList.add(cls);
        });
    }
    if (parent !== null) {
        parent.appendChild(element);
    }
    return element;
}

export function createOptionElement(value: string, texContent: string, parent: HTMLElement) {
    const element: HTMLElement = document.createElement('option');
    element.setAttribute('value', value);
    element.textContent = texContent;
    if (parent !== null) {
        parent.appendChild(element);
    }
    return element;
}

export function addCoinDescriptionHTML(txt: string | number, parent: HTMLElement, cls = 'coin_description'): HTMLElement {
    const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
    tempHTML.innerText = String(txt);
    return tempHTML;
}