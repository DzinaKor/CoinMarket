import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class NewsMainView {
    public controller: Controller;

    public newsMainHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.newsMainHTML = createNewElement('div', ['newsmain_container']);
    }

    viewNewsMain() {
        const mainPage: HTMLElement = document.querySelector('.mainpage_container') as HTMLElement;
        if (mainPage) {
            this.newsMainHTML.innerHTML = 'this is Main Page News';
            mainPage.appendChild(this.newsMainHTML);
        }
    }
}
