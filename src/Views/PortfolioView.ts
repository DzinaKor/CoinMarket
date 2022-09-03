import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class PortfolioView {
    public controller: Controller;

    public portHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.portHTML = createNewElement('div', ['portfolio_container']);
    }

    viewPortfolio() {
        this.portHTML.innerHTML = 'this is Portfolio';
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.portHTML);
    }
}
