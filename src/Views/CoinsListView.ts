import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class CoinsListView {
    public controller: Controller;

    public coinsListHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.coinsListHTML = createNewElement('div', ['coins_list_container']);
    }

    viewCoinsList() {
        const mainPage: HTMLElement | null = document.querySelector('.main_page_container');
        if (mainPage) {
            this.coinsListHTML.innerHTML = 'this is Coins List';
            mainPage.appendChild(this.coinsListHTML);
        }
    }
}
