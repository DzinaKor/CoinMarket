import Controller from '../Controllers/Controller';

export default class NewsView {
    public conttroller: Controller;

    public newsHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        this.newsHTML = this.conttroller.createNewElement('div', ['news_container']);
    }

    viewNews() {
        this.newsHTML.innerHTML = 'this is News';
        this.conttroller.pagesContainerHTML.innerHTML = '';
        this.conttroller.pagesContainerHTML.appendChild(this.newsHTML);
    }
}
