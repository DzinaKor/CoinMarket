import Controller from '../Controllers/Controller';

export default class Footer {
    public controller: Controller;

    public footerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.footerHTML = document.querySelector('footer') as HTMLElement;
        this.footerHTML.innerHTML = 'this is Footer';
    }
}
