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

export function addAuthTextHTML(txt: string, parent: HTMLElement, cls = 'auth_text'): HTMLElement {
    const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
    tempHTML.innerText = String(txt);
    return tempHTML;
}

export function createPopUp(popUpBody: HTMLElement, popUpParent: HTMLElement): HTMLElement {
    const popUpView: HTMLElement = createNewElement('div', ['popup_view']);
    popUpView.id = 'popup';
    popUpView.appendChild(popUpBody);
    popUpParent.appendChild(popUpView);
    return popUpView;
}

export function createPopUpMove(popUpBody: HTMLElement, popUpParent: HTMLElement, deltaLeft: number, deltaTop = 0): HTMLElement {
    const popUp: HTMLElement = createPopUp(popUpBody, popUpParent);
    const rect = popUp.getBoundingClientRect();
    const newLeft: number = rect.left + deltaLeft;
    const newTop: number = rect.top + deltaTop;
    popUp.style.left = `${String(newLeft)}px`;
    popUp.style.top = `${String(newTop)}px`;
    return popUp;
}
