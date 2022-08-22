import Controller from '../Controllers/Controller';

export default class CoinsListView {
    public conttroller: Controller;

    public coinsListHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        this.coinsListHTML = this.conttroller.createNewElement('div', ['coins_list_container']);
    }

    viewCoinsList() {
        const mainPage: HTMLElement|null = document.querySelector('.mainpage_container');
        if (mainPage) {
            this.coinsListHTML.innerHTML = 'this is Coins List';
            mainPage.appendChild(this.coinsListHTML);
        }
    }
}
