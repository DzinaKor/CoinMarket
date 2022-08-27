import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class MainView {
    public controller: Controller;

    public headerHTML: HTMLElement;

    public mainHTML: HTMLElement;

    public footerHTML: HTMLElement;

    public runningLine: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.headerHTML = createNewElement('header', ['header']);
        this.mainHTML = createNewElement('main', ['main']);
        this.runningLine = createNewElement('div', ['running-line']);
        this.footerHTML = createNewElement('footer', ['footer']);
        const body: HTMLElement = document.querySelector('body') as HTMLElement;
        body.appendChild(this.headerHTML);
        body.appendChild(this.mainHTML);
        body.appendChild(this.runningLine);
        body.appendChild(this.footerHTML);
    }

    addPagesContainer(): HTMLElement {
        return createNewElement('div', ['pages_container'], this.mainHTML);
    }
}
