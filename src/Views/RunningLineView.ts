import { createNewElement } from './BasicView';
import Controller from '../Controllers/Controller';
import { TrendCoin } from '../api/apiRequestTypes';
import '../css/runningLine.css';


export default class RunningLineView {
    public controller: Controller;

    public runningLineHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.runningLineHTML = createNewElement('div', ['marquee-line'], this.controller.mainView.runningLine);
        this.runningLineHTML.innerHTML = '';
        this.addListeners();
    }

    addListeners() {
        this.runningLineHTML.addEventListener('click', (event) => {
            const el = (event.target as HTMLElement).closest('.trend-coin') as HTMLElement;
            if (el.hasAttribute('coin-id')) {
                this.controller.drawOneCoinView(el.getAttribute('coin-id') as string);
            }
        })
    }

    viewRunningLine(coins: TrendCoin[], exchangeRate: number) {
        this.runningLineHTML.innerHTML = '';

        coins.forEach((coin) => {
            const trendCoin = createNewElement('div', ['trend-coin'], this.runningLineHTML);
            trendCoin.setAttribute('coin-id', coin.item.id)
            const coinScore = createNewElement('div', ['coin-score'], trendCoin);
            coinScore.textContent = `${coin.item.score + 1}`;
            const coinImg = createNewElement('img', ['coin-img'], trendCoin);
            coinImg.setAttribute('src', `${coin.item.small}`);
            coinImg.setAttribute('alt', `${coin.item.name} symbol`);
            const coinInfo = createNewElement('div', ['coin-column'], trendCoin);
            const coinName = createNewElement('div', ['coin-name'], coinInfo);
            coinName.textContent = `${coin.item.name}`;
            const marketCapRank = createNewElement('div', ['market-cap-rank'], coinInfo);
            marketCapRank.textContent = `${this.controller.getLangValue('marketCup_rank')} ${coin.item.market_cap_rank}`;
            const priceBtc = createNewElement('div', ['price-btc'], coinInfo);
            priceBtc.textContent = `${this.controller.mainData.selectedCurrency.symbol + (coin.item.price_btc * exchangeRate).toFixed(4)}`;
        });
    }
}