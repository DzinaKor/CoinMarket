import Controller from '../Controllers/Controller';
import { CoinMarketData } from "../api/apiRequestTypes";
import { createNewElement } from './BasicView';

export default class CoinsListView {
    public controller: Controller;

    public coinsList: Array<CoinMarketData> | undefined;

    public coinsListHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.coinsListHTML = createNewElement('div', ['coins_list_container']);

        this.coinsList = undefined;
    }

    viewCoinsList() {
        const mainPage: HTMLElement | null = document.querySelector('.mainpage_container');
        if (mainPage) {
            mainPage.appendChild(this.coinsListHTML);

            this.viewAllCoins();
        }
    }

    viewAllCoins() {
        if (this.coinsList !== undefined) {
            this.coinsList.forEach((oneCoin: CoinMarketData) => {
                const coinHTML: HTMLElement = createNewElement('div', ['one_coin_container'], this.coinsListHTML);

                this.addCoinDesctiptionHTML(oneCoin.name, coinHTML);
                this.addCoinDesctiptionHTML(oneCoin.current_price, coinHTML);
                this.addCoinDesctiptionHTML(oneCoin.price_change_24h, coinHTML);
            });
        }
    }

    addCoinDesctiptionHTML(txt: string | number, parent: HTMLElement, cls = 'coin_description') {
        const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
        tempHTML.innerText = String(txt);
    }
}
