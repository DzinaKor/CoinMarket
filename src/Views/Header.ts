import Controller from '../Controllers/Controller';

export default class Header {
    public controller: Controller;

    public headerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.headerHTML = document.querySelector('header') as HTMLElement;
        this.headerHTML.innerHTML = 'this is Header';
    }
}
