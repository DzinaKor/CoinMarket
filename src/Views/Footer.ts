import Controller from '../Controllers/Controller';

export default class Footer {
    public conttroller: Controller;

    public footerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        this.footerHTML = document.querySelector('footer') as HTMLElement;
        this.footerHTML.innerHTML = 'this is Footer';
    }
}
