import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';
import { CoinData } from '../api/coinDataType';

export default class OneCoinView {
    public controller: Controller;

    public onecoinHTML: HTMLElement;

    public coinIdKeeper: string;

    public coinDataKeeper: CoinData | undefined;

    constructor(controller: Controller) {
        this.controller = controller;
        this.onecoinHTML = createNewElement('div', ['onecoin_container']);
        this.coinIdKeeper = 'Bitcoin';
        this.coinDataKeeper = undefined;
    }

    viewOneCoin(coinId: string) {
        this.coinIdKeeper = coinId;
        this.controller.oneCoinChart.setCryptoCurrency(coinId);
        const coinPage: HTMLElement = document.querySelector('.pages_container') as HTMLElement;
        if (coinPage) {
            coinPage.innerHTML = '';
            this.onecoinHTML.innerHTML = '';
            coinPage.appendChild(this.onecoinHTML);
            this.drawOneCoin();
        }
    }

    drawOneCoin() {
        this.controller.coin.apiReqOneCoin(this.coinIdKeeper).then((coinData: CoinData) => {
            const oneCoinImg: HTMLImageElement = createNewElement('img', ['one_coin_desc', 'coin_image'], this.onecoinHTML) as HTMLImageElement;
            oneCoinImg.src = coinData.image.large;
            const coinHTML: HTMLElement = createNewElement('div', ['single_coin_container'], this.onecoinHTML);
            OneCoinView.addOneCoinDescHTML(coinData.name, coinHTML);
            OneCoinView.addOneCoinDescHTML(coinData.market_cap_rank, coinHTML);
            OneCoinView.addOneCoinDescHTML(String(coinData.market_data.current_price[this.controller.mainData.selectedCurrency.id]), coinHTML);
            OneCoinView.addOneCoinDescHTML(String(coinData.market_data.market_cap_change_24h), coinHTML);
            OneCoinView.addOneCoinDescHTML(coinData.description.en, coinHTML);
            OneCoinView.addOneCoinDescHTML(coinData.country_origin, coinHTML);

            const chartHTML: HTMLElement = createNewElement('div', ['one_coin_chart'], coinHTML);
            this.controller.drawChart(chartHTML, this.controller.oneCoinChart);

            const coinLinkHTML: HTMLElement = createNewElement('div', ['one_coin_desc'], coinHTML);
            coinData.links.homepage.forEach((link: string) => {
                if (link !== '') {
                    const aElement: HTMLAnchorElement = createNewElement('a', ['one_coin_desc_link'], coinLinkHTML) as HTMLAnchorElement;
                    aElement.href = link;
                    aElement.textContent = link;
                }
            });
        });
    }

    static addOneCoinDescHTML(txt: string | number, parent: HTMLElement, cls = 'one_coin_desc'): HTMLElement {
        const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
        tempHTML.innerText = String(txt);
        return tempHTML;
    }
}