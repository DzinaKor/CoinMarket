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
        const headerRow: HTMLElement = createNewElement('div', ['header_container'], this.coinsListHTML);

        const numberCoinHeader = createNewElement('div', ['coin-number-header'], headerRow);
        numberCoinHeader.textContent = '#';
        const nameCoinHeader = createNewElement('div', ['coin-name-header'], headerRow);
        nameCoinHeader.textContent = 'Наименование';
        const currentPriceHeader = createNewElement('div', ['coin-price-header'], headerRow);
        currentPriceHeader.textContent = 'Цена';
        const changePriceHeader = createNewElement('div', ['coin-change-price-header'], headerRow);
        changePriceHeader.textContent = '24h %';
        const marketCupHeader = createNewElement('div', ['coin-market-cup-header'], headerRow);
        marketCupHeader.textContent = 'Объём';
        const changeMarketCupHeader = createNewElement('div', ['coin-change-market-cup-header'], headerRow);
        changeMarketCupHeader.textContent = 'Объём 24h %';

        this.controller.coinsList.coinsListFromApi.forEach((oneCoin: CoinMarketData) => {
            const coinRow: HTMLElement = createNewElement('div', ['one_coin_container'], this.coinsListHTML);

            const coinImg: HTMLImageElement = createNewElement('img', ['coin_description', 'coin_image'], coinHTML) as HTMLImageElement;
            coinImg.src = oneCoin.image;
            CoinsListView.addCoinDesctiptionHTML(oneCoin.name, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.current_price, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.price_change_24h, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.market_cap, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.total_volume, coinHTML);
            CoinsListView.addCoinDesctiptionHTML(oneCoin.circulating_supply, coinHTML);
            CoinsListView.addCoinDescriptionHTML(oneCoin.market_cap_rank, coinRow);
            const coinTitleBlock = createNewElement('div',['coin_description'], coinRow);
            const coinImage = createNewElement('img',['coin-logo-img'],coinTitleBlock);
            coinImage.setAttribute('src', oneCoin.image);
            coinImage.setAttribute('alt', 'coin-logo');
            CoinsListView.addCoinDescriptionHTML(`${oneCoin.name} - ${oneCoin.symbol.toUpperCase()}`, coinTitleBlock);
            CoinsListView.addCoinDescriptionHTML(`$${oneCoin.current_price.toLocaleString()}`, coinRow);
            CoinsListView.addCoinDescriptionHTML(`${oneCoin.price_change_percentage_24h}%`, coinRow);
            CoinsListView.addCoinDescriptionHTML(`$${oneCoin.market_cap.toLocaleString()}`, coinRow);
            CoinsListView.addCoinDescriptionHTML(`${oneCoin.market_cap_change_percentage_24h}%`, coinRow);
        });
    }

    static addCoinDescriptionHTML(txt: string | number, parent: HTMLElement, cls = 'coin_description') {
        const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
        tempHTML.innerText = String(txt);
        return tempHTML;
    }
}
