import Controller from '../Controllers/Controller';

export default class MainView {
    public controller: Controller;

    public headerHTML:HTMLElement;

    public mainHTML:HTMLElement;

    public footerHTML:HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.headerHTML = this.controller.createNewElement('header', ['header']);
        this.mainHTML = this.controller.createNewElement('main', ['main']);
        this.footerHTML = this.controller.createNewElement('footer', ['footer']);
        const body: HTMLElement = document.querySelector('body') as HTMLElement;
        body.appendChild(this.headerHTML);
        body.appendChild(this.mainHTML);
        body.appendChild(this.footerHTML);
    }

    addPagesContainer():HTMLElement {
        const pagesContainerHTML: HTMLElement = this.controller.createNewElement('div', ['pages_container'], this.mainHTML);
        return pagesContainerHTML;
    }
}
