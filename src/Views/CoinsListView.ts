import Controller from '../Controllers/Controller';
import { CoinMarketData } from '../api/apiRequestTypes';
import { addCoinDescriptionHTML, createNewElement, createOptionElement } from './BasicView';

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
            this.coinsListHTML.textContent = '';
            mainPage.appendChild(this.coinsListHTML);
            this.drawControlPanel();
            this.drawTableHeader();
            this.viewAllCoins();
        }
    }

    viewAllCoins() {
        const { symbol } = this.controller.mainData.selectedCurrency;
        document.querySelectorAll('.one_coin_container').forEach(element => element.remove());
        this.controller.coinsList.coinsListFromApi.forEach((oneCoin: CoinMarketData) => {
            const coinRow: HTMLElement = createNewElement('div', ['one_coin_container'], this.coinsListHTML);
            coinRow.addEventListener('click', () => {
                this.controller.drawOneCoinView(oneCoin.id);
            });
            addCoinDescriptionHTML((oneCoin.market_cap_rank) ? oneCoin.market_cap_rank : '-', coinRow);
            const coinTitleBlock = createNewElement('div', ['coin_description'], coinRow);
            const coinImage = createNewElement('img', ['coin-logo-img'], coinTitleBlock);
            coinImage.setAttribute('src', oneCoin.image);
            coinImage.setAttribute('alt', 'coin-logo');
            addCoinDescriptionHTML(`${oneCoin.name} - ${oneCoin.symbol.toUpperCase()}`, coinTitleBlock);
            addCoinDescriptionHTML(`${symbol} ${oneCoin.current_price.toLocaleString()}`, coinRow);
            addCoinDescriptionHTML((oneCoin.price_change_percentage_24h) ? `${oneCoin.price_change_percentage_24h}%` : '-', coinRow);
            addCoinDescriptionHTML(`${symbol} ${oneCoin.market_cap.toLocaleString()}`, coinRow);
            addCoinDescriptionHTML((oneCoin.market_cap_change_percentage_24h) ? `${oneCoin.market_cap_change_percentage_24h}%` : '-', coinRow);
            addCoinDescriptionHTML(`${symbol} ${oneCoin.total_volume.toLocaleString()}`, coinRow);
            addCoinDescriptionHTML(`${symbol} ${oneCoin.circulating_supply.toLocaleString()}`, coinRow);
        });
    }

    drawTableHeader() {
        const headerRow: HTMLElement = createNewElement('div', ['header_container'], this.coinsListHTML);
        const numberCoinHeader = createNewElement('div', ['coin-number-header'], headerRow);
        numberCoinHeader.textContent = '#';
        numberCoinHeader.id = 'market-cap';
        const nameCoinHeader = createNewElement('div', ['coin-name-header'], headerRow);
        nameCoinHeader.textContent = 'Наименование';
        nameCoinHeader.id = 'coin-id';
        const currentPriceHeader = createNewElement('div', ['coin-price-header'], headerRow);
        currentPriceHeader.textContent = 'Текущая цена';
        const changePriceHeader = createNewElement('div', ['coin-change-price-header'], headerRow);
        changePriceHeader.textContent = '24h %';
        const marketCupHeader = createNewElement('div', ['coin-market-cup-header'], headerRow);
        marketCupHeader.textContent = 'Рыночная капитализация';
        const changeMarketCupHeader = createNewElement('div', ['coin-change-market-cup-header'], headerRow);
        changeMarketCupHeader.textContent = 'Объём 24h %';
        const totalVolumeHeader = createNewElement('div', ['coin-total-volume-header'], headerRow);
        totalVolumeHeader.textContent = 'Объём сделок';
        totalVolumeHeader.id = 'total-volume-header';
        const circulatingSupplyHeader = createNewElement('div', ['coin-circulating-supply-header'], headerRow);
        circulatingSupplyHeader.textContent = 'Циркулирующее предложение';
    }

    drawControlPanel() {
        const panelBlock: HTMLElement = createNewElement('div', ['panel-block'], this.coinsListHTML);
        const paginationBlock: HTMLElement = createNewElement('div', ['pagination-block'], panelBlock);
        const prevPaginationBtn: HTMLElement = createNewElement('button', ['pagination-btn-prev'], paginationBlock);
        prevPaginationBtn.setAttribute('type', 'button');
        prevPaginationBtn.id = 'coins-prev';
        prevPaginationBtn.textContent = '<';
        const currentPage: HTMLElement = createNewElement('div', ['current-page'], paginationBlock);
        currentPage.textContent = this.controller.coinsList.currentPage.toString();
        const nextPaginationBtn: HTMLElement = createNewElement('button', ['pagination-btn-next'], paginationBlock);
        nextPaginationBtn.setAttribute('type', 'button');
        nextPaginationBtn.id = 'coins-next';
        nextPaginationBtn.textContent = '>';

        const coinsCount = createNewElement('select', ['coins-count'], panelBlock) as HTMLSelectElement;
        coinsCount.setAttribute('id', 'coins-count');

        this.controller.coinsList.coinsPerPageList.forEach((item) => {
            createOptionElement(item.toString(), item.toString(), coinsCount);
        });
        coinsCount.value = this.controller.coinsList.coinsPerPage.toString();
    }
}
