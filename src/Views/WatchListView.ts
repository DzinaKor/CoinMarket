import Controller from '../Controllers/Controller';
import { addCoinDescriptionHTML, createNewElement } from './BasicView';
import { CoinData } from "../api/coinDataType";

export default class WatchListView {
    public controller: Controller;

    public watchHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.watchHTML = createNewElement('div', ['watchlist_container']);
    }

    viewWatchList() {
        this.watchHTML.innerHTML = '';
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.watchHTML);

		this.allWatchListView();
    }

	allWatchListView() {
		const coinsArray: Array<string> = this.controller.getWatchList();
		coinsArray.forEach((coinId: string) => {
			this.controller.coin.apiReqOneCoin(coinId).then((oneCoin: CoinData) => {
            const coinRow: HTMLElement = createNewElement('div', ['one_coin_container'], this.watchHTML);
            coinRow.addEventListener('click', () => {
                this.controller.drawOneCoinView(oneCoin.id);
            });
            addCoinDescriptionHTML((oneCoin.market_cap_rank) ? oneCoin.market_cap_rank : '-', coinRow, 'coin_desc');
            
            const coinTitleBlock = createNewElement('div', ['coin_description'], coinRow);
            const coinImage = createNewElement('img', ['coin-logo-img'], coinTitleBlock);
            coinImage.setAttribute('src', oneCoin.image.small);
            coinImage.setAttribute('alt', 'coin-logo');
            addCoinDescriptionHTML(`${oneCoin.name}`, coinTitleBlock, '');

		});
		});
	}
}
