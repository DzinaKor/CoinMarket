import Controller from '../Controllers/Controller';
import { CoinMarketData } from '../api/apiRequestTypes';
import { createNewElement } from './BasicView';

export default class CoinsListView {
    public controller: Controller;

    public coinsListHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.coinsListHTML = createNewElement('div', ['coins_list_container']);
    }

    viewCoinsList() {
        const mainPage: HTMLElement = document.querySelector('.mainpage_container') as HTMLElement;
        if (mainPage) {
            mainPage.appendChild(this.coinsListHTML);

            this.viewAllCoins();
        }
    }

    viewAllCoins() {
        this.controller.coinsList.coinsListFromApi.forEach((oneCoin: CoinMarketData) => {
            const coinHTML: HTMLElement = createNewElement('div', ['one_coin_container'], this.coinsListHTML);

            const coinImg: HTMLImageElement = createNewElement('img', ['coin_description', 'coin_image'], coinHTML) as HTMLImageElement;
            coinImg.src = oneCoin.image;
            CoinsListView.addCoinDesctiptionHTML(oneCoin.name, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.current_price, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.price_change_24h, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.market_cap, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.total_volume, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.circulating_supply, coinHTML);
        });
    }

    static addCoinDesctiptionHTML(txt: string | number, parent: HTMLElement, cls = 'coin_description'): HTMLElement {
        const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
        tempHTML.innerText = String(txt);
        return tempHTML;
    }
}
