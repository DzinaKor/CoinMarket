import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';
import { CoinData } from '../api/coinDataType';
import '../css/oneCoin.css';

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

            const oneCoinContainer = createNewElement('div', ['one-coin-container'], this.onecoinHTML);
            const oneCoinNameRow = createNewElement('div', ['onecoin-row'], oneCoinContainer);
            const oneCoinImg = createNewElement('img', ['one_coin_desc', 'coin_image'], oneCoinNameRow);
            oneCoinImg.setAttribute('src', `${coinData.image.large}`);
            const oneCoinName = createNewElement('div', ['onecoin-name'], oneCoinNameRow);
            oneCoinName.textContent = coinData.name;
            const oneCoinAbbr = createNewElement('div', ['onecoin-abbr'], oneCoinNameRow);
            oneCoinAbbr.textContent = coinData.symbol.toUpperCase();
            const oneCoinRank = createNewElement('div', ['onecoin-rank'], oneCoinContainer);
            oneCoinRank.textContent = `Rank: ${coinData.coingecko_rank}`;
            const oneCoinLinks = createNewElement('div', ['onecoin-links'], oneCoinContainer);

            const coinLinkHome: HTMLElement = createNewElement('div', ['one_coin_desc'], oneCoinLinks);
            for (let i = 0; i < 3; i += 1) {
                const link = coinData.links.homepage[i];
                if (link !== '') {
                    const aElement: HTMLAnchorElement = createNewElement('a', ['one_coin_desc_link'], coinLinkHome) as HTMLAnchorElement;
                    aElement.href = link;
                    aElement.textContent = link.match(/\w+\.[\w.]+/)?.[0] as string;
                }
            }
            // coinData.links.homepage.forEach((link: string) => {
            //     if (link !== '') {
            //         const aElement: HTMLAnchorElement = createNewElement('a', ['one_coin_desc_link'], coinLinkHome) as HTMLAnchorElement;
            //         aElement.href = link;
            //         aElement.textContent = link;
            //     }
            // })

            const coinLinkWeb: HTMLElement = createNewElement('div', ['one_coin_desc'], oneCoinLinks);
            // coinData.links.blockchain_site.forEach((link: string) => {
            //     if (link !== '') {
            //         const aElement: HTMLAnchorElement = createNewElement('a', ['one_coin_desc_link'], coinLinkWeb) as HTMLAnchorElement;
            //         aElement.href = link;
            //         aElement.textContent = link;
            //     }
            // });
            for (let i = 0; i < 3; i += 1) {
                const link = coinData.links.blockchain_site[i];
                if (link !== '') {
                    const aElement: HTMLAnchorElement = createNewElement('a', ['one_coin_desc_link'], coinLinkWeb) as HTMLAnchorElement;
                    aElement.href = link;
                    aElement.textContent = link.match(/\w+\.[\w.]+/)?.[0] as string;
                }
            }

            const priceBox = createNewElement('div', ['onecoin-container'], this.onecoinHTML);
            const oneCoinPrice = createNewElement('div', ['onecoin-price'], priceBox);
            oneCoinPrice.textContent = `Price: ${coinData.market_data.current_price[this.controller.mainData.selectedCurrency.id.toLowerCase()]} ${this.controller.mainData.selectedCurrency.symbol}`;
            const oneCoinChangePrice = createNewElement('div', ['onecoin-change-price'], priceBox);
            oneCoinChangePrice.textContent = `Change price: `;
            const changePriceValue = createNewElement('div', [], oneCoinChangePrice);
            if (coinData.market_data.price_change_percentage_24h >= 0 && coinData.market_data.price_change_percentage_24h) {
                changePriceValue.style.color = 'green';
                changePriceValue.textContent = `${coinData.market_data.price_change_percentage_24h} %`;
            } else if (coinData.market_data.price_change_percentage_24h < 0 && coinData.market_data.price_change_percentage_24h) {
                changePriceValue.style.color = 'red';
                changePriceValue.textContent = `${coinData.market_data.price_change_percentage_24h} %`;
            } else {
                changePriceValue.textContent = '-';
            }
            const oneCoinPriceRow = createNewElement('div', ['onecoin-price-row'], priceBox);
            const oneCoinMarketCup = createNewElement('div', ['onecoin-market-cup'], oneCoinPriceRow);
            oneCoinMarketCup.textContent = `Market cup: ${coinData.market_data.market_cap[this.controller.mainData.selectedCurrency.id.toLowerCase()]} ${this.controller.mainData.selectedCurrency.symbol}`;
            const oneCoinVolume = createNewElement('div', ['onecoin-volume'], oneCoinPriceRow);
            oneCoinVolume.textContent = `Total volume: ${coinData.market_data.total_volume[this.controller.mainData.selectedCurrency.id.toLowerCase()]} ${this.controller.mainData.selectedCurrency.symbol}`;
            const oneCoinSupply = createNewElement('div', ['onecoin-supply'], oneCoinPriceRow);
            oneCoinSupply.textContent = `Circulating supply: ${coinData.market_data.circulating_supply} ${this.controller.mainData.selectedCurrency.symbol}`;

            const oneCoinDescript = createNewElement('div', ['onecoin-descript'], this.onecoinHTML);
            oneCoinDescript.innerHTML = `${coinData.description.en}`;


            const chartHTML: HTMLElement = createNewElement('div', ['one_coin_chart'], this.onecoinHTML);
            this.controller.drawChart(chartHTML, this.controller.oneCoinChart);


        });
    }

    static addOneCoinDescHTML(txt: string | number, parent: HTMLElement, cls = 'one_coin_desc'): HTMLElement {
        const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
        tempHTML.innerText = String(txt);
        return tempHTML;
    }
}