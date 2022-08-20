import Controller from '../Controllers/Controller';

export default class Header {
    public conttroller: Controller;

    public headerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        this.headerHTML = document.querySelector('header') as HTMLElement;
        this.headerHTML.innerHTML = 'this is Header';
    }
}
