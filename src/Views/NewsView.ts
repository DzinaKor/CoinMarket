import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class NewsView {
    public controller: Controller;

    public newsHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.newsHTML = createNewElement('div', ['news_container']);
    }

    viewNews() {
        this.newsHTML.innerHTML = 'this is News';
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.newsHTML);
    }
}
