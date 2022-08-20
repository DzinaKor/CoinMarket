import Controller from '../Controllers/Controller';

export default class NewsMainView {
    public conttroller: Controller;

    public newsMainHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        this.newsMainHTML = this.conttroller.createNewElement('div', ['newsmain_container']);
    }

    viewNewsMain() {
        const mainPage: HTMLElement|null = document.querySelector('.main_page_container');
        if (mainPage) {
            this.newsMainHTML.innerHTML = 'this is Main Page News';
            mainPage.appendChild(this.newsMainHTML);
        }
    }
}
