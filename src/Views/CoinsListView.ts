import Controller from '../Controllers/Controller';
import { CoinMarketData } from '../api/apiRequestTypes';
import { addCoinDescriptionHTML, createNewElement, createOptionElement } from './BasicView';
import { IMG_FAV, IMG_NOFAV } from '../constants';
import '../css/coinList.css';

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
            addCoinDescriptionHTML((oneCoin.market_cap_rank) ? oneCoin.market_cap_rank : '-', coinRow, 'market_cap_rank');
            coinRow.appendChild(this.addWatchCoinHTML(oneCoin.id));
            const coinTitleBlock = createNewElement('div', ['coin_description', 'coin-list_header'], coinRow);
            const coinImage = createNewElement('img', ['coin-logo-img'], coinTitleBlock);
            coinImage.setAttribute('src', oneCoin.image);
            coinImage.setAttribute('alt', 'coin-logo');
            addCoinDescriptionHTML(`${oneCoin.name} - ${oneCoin.symbol.toUpperCase()}`, coinTitleBlock, 'coin-list_coin-name');
            addCoinDescriptionHTML(`${symbol} ${oneCoin.current_price.toLocaleString()}`, coinRow, 'coin-list_current-price');
            const priceChange = addCoinDescriptionHTML((oneCoin.price_change_percentage_24h) ? `${oneCoin.price_change_percentage_24h}%` : '-', coinRow, 'coin-list_percentage');
            if (oneCoin.price_change_percentage_24h >= 0 && oneCoin.price_change_percentage_24h) {
                priceChange.style.color = 'green';
            } else if (oneCoin.price_change_percentage_24h < 0 && oneCoin.price_change_percentage_24h) {
                priceChange.style.color = 'red';
            }
            addCoinDescriptionHTML(`${symbol} ${oneCoin.market_cap.toLocaleString()}`, coinRow, 'coin-list_market-cup');
            const marketChange = addCoinDescriptionHTML((oneCoin.market_cap_change_percentage_24h) ? `${oneCoin.market_cap_change_percentage_24h}%` : '-', coinRow, 'coin-list_percentage24h');
            if (oneCoin.market_cap_change_percentage_24h >= 0 && oneCoin.market_cap_change_percentage_24h) {
                marketChange.style.color = 'green';
            } else if (oneCoin.market_cap_change_percentage_24h < 0 && oneCoin.market_cap_change_percentage_24h) {
                marketChange.style.color = 'red';
            }
            addCoinDescriptionHTML(`${symbol} ${oneCoin.total_volume.toLocaleString()}`, coinRow, 'coin-list_volume');
            addCoinDescriptionHTML(`${symbol} ${oneCoin.circulating_supply.toLocaleString()}`, coinRow, 'coin-list_supply');
        });
    }

    drawTableHeader() {
        const headerRow: HTMLElement = createNewElement('div', ['header_container'], this.coinsListHTML);
        const numberCoinHeader = createNewElement('div', ['coin-number-header'], headerRow);
        numberCoinHeader.textContent = '#';
        numberCoinHeader.id = 'market-cap';
        const watchListCoinHeader = createNewElement('div', ['coin-watchlist-header'], headerRow);
        const nameCoinHeader = createNewElement('div', ['coin-name-header'], headerRow);
        nameCoinHeader.textContent = this.controller.getLangValue('coin_list_name');
        nameCoinHeader.id = 'coin-id';
        const currentPriceHeader = createNewElement('div', ['coin-price-header'], headerRow);
        currentPriceHeader.textContent = this.controller.getLangValue('coin_list_price');
        const changePriceHeader = createNewElement('div', ['coin-change-price-header'], headerRow);
        changePriceHeader.textContent = '24h %';
        const marketCupHeader = createNewElement('div', ['coin-market-cup-header'], headerRow);
        marketCupHeader.textContent = this.controller.getLangValue('coin_list_marketCup');
        const changeMarketCupHeader = createNewElement('div', ['coin-change-market-cup-header'], headerRow);
        changeMarketCupHeader.textContent = this.controller.getLangValue('coin_list_marketPercent');
        const totalVolumeHeader = createNewElement('div', ['coin-total-volume-header'], headerRow);
        totalVolumeHeader.textContent = this.controller.getLangValue('coin_list_totalVolume');
        totalVolumeHeader.id = 'total-volume-header';
        const circulatingSupplyHeader = createNewElement('div', ['coin-circulating-supply-header'], headerRow);
        circulatingSupplyHeader.textContent = this.controller.getLangValue('coin_list_circulatingSupply');
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

    addWatchCoinHTML(coinId: string): HTMLImageElement {
        const imageBox: HTMLImageElement = createNewElement('div', ['coin_list_watch']) as HTMLImageElement;

        const coinWatchImg: HTMLImageElement = createNewElement('img', ['coin_list_watch_img'], imageBox) as HTMLImageElement;
        coinWatchImg.alt = '';
        coinWatchImg.setAttribute('data-watch-coin-id', coinId);
        if (this.controller.checkCoinWatchList(coinId)) {
            coinWatchImg.setAttribute('data-watch', '1');
            coinWatchImg.src = IMG_FAV;
        } else {
            coinWatchImg.setAttribute('data-watch', '-1');
            coinWatchImg.src = IMG_NOFAV;
        }
        coinWatchImg.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleWatchCoinHTML(coinWatchImg, coinId);
        });

        return imageBox;
    }

    toggleWatchCoinHTML(coinWatchImg: HTMLImageElement, coinId: string) {
        if (coinWatchImg.getAttribute('data-watch') === '-1') {
            coinWatchImg.setAttribute('data-watch', '1');
            coinWatchImg.setAttribute('src', IMG_FAV);
            this.controller.addToWatchList(coinId);
        } else {
            coinWatchImg.setAttribute('data-watch', '-1');
            coinWatchImg.setAttribute('src', IMG_NOFAV);
            this.controller.deleteFromWatchList(coinId);
        }
    }

    reSetWatchCoinList(watchCoinArray: Array<string>) {
        // document.querySelectorAll('[data-watch]').forEach((coinWatchImg: HTMLImageElement) => {
        if (this.controller !== undefined) {
            watchCoinArray.forEach((coinId: string) => {
                const coinWatchImg: HTMLImageElement | null = document.querySelector(`[data-watch-coin-id=${coinId}]`);
                if (coinWatchImg !== null) {
                    coinWatchImg.setAttribute('data-watch', '1');
                    coinWatchImg.setAttribute('src', IMG_FAV);
                }
            });
        }
    }
}
