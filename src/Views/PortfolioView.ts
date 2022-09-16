import { CoinsNameList } from '../api/apiRequestTypes';
import { CoinData } from '../api/coinDataType';
import Controller from '../Controllers/Controller';
import { createNewElement, createOptionElement } from './BasicView';

export default class PortfolioView {
    public controller: Controller;

    public portData: Map<string, number>;

    public arrCoinsList: Array<CoinsNameList>;

    public portHTML: HTMLElement;

    public portEditHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.portData = new Map();
        this.portHTML = createNewElement('div', ['portfolio_container']);
        this.portEditHTML = createNewElement('div', ['portfolio_edit']);
        this.arrCoinsList = [];
        this.controller.getAllCoinsList().then((arrCoins: Array<CoinsNameList>) => {
            this.arrCoinsList = arrCoins;
        });
    }

    viewPortfolio() {
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.portHTML);
        this.reDrawList();
    }

    reDrawList() {
        this.portHTML.innerHTML = '';
        const mainRow: HTMLElement = createNewElement('div', ['portfolio_main_container'], this.portHTML);
        const mainEditHTML = createNewElement('div', ['portfolio_coin_edit'], mainRow);

        const coinAddHTML = createNewElement('div', ['portfolio_button', 'portfolio_coin_add', 'portfolio_main_button'], mainRow);
            coinAddHTML.textContent = this.controller.getLangValue('port_add');
            coinAddHTML.addEventListener('click', () => {
                mainEditHTML.innerHTML = '';
                this.editMain(mainEditHTML);
            });

        this.controller.changePortfolio('').then((tempPort: Map<string, number>) => {
            this.portData = tempPort;
            this.portData.forEach((value, coinId) => {
                this.controller.coin.apiReqOneCoin(coinId).then((oneCoin: CoinData) => {
                    const coinRow: HTMLElement = createNewElement('div', ['portfolio_coin_container'], this.portHTML);
                    const coinImage = createNewElement('img', ['port-coin-logo-img'], coinRow);
                    coinImage.setAttribute('src', oneCoin.image.small);
                    coinImage.setAttribute('alt', 'coin-logo');

                    const coinNameHTML = createNewElement('div', ['portfolio_coin_name'], coinRow);
                    coinNameHTML.textContent = oneCoin.name;

                    const coinValueHTML = createNewElement('div', ['portfolio_coin_value'], coinRow);
                    coinValueHTML.textContent = String(value);

                    const coinEditHTML = createNewElement('div', ['portfolio_coin_edit'], coinRow);

                    const coinBuyHTML = createNewElement('div', ['portfolio_button', 'portfolio_coin_buy'], coinRow);
                    coinBuyHTML.textContent = this.controller.getLangValue('port_buy');
                    coinBuyHTML.addEventListener('click', () => {
                        this.editCoin(coinId, true);
                        coinEditHTML.appendChild(this.portEditHTML);
                    });

                    const coinSellHTML = createNewElement('div', ['portfolio_button', 'portfolio_coin_sell'], coinRow);
                    coinSellHTML.textContent = this.controller.getLangValue('port_sell');
                    coinSellHTML.addEventListener('click', () => {
                        this.editCoin(coinId, false);
                        coinEditHTML.appendChild(this.portEditHTML);
                    });

                    const coinDelHTML = createNewElement('div', ['portfolio_button', 'portfolio_coin_delete'], coinRow);
                    coinDelHTML.textContent = this.controller.getLangValue('port_delete');
                    coinDelHTML.addEventListener('click', () => {
                        this.controller.changePortfolio('delete', coinId).then((newPort: Map<string, number>) => {
                            this.portData = newPort;
                            this.reDrawList();
                        });
                    });
                });
            });
        }); 
    }

    editCoin(coinId: string, isAdd: boolean): HTMLElement {
        this.portEditHTML.innerHTML = '';
        const valueHTML: HTMLInputElement = createNewElement('input', ['portfolio_value'], this.portEditHTML) as HTMLInputElement;
        valueHTML.type = 'number';
        valueHTML.value = '0';
        valueHTML.min = '0';
        setTimeout(() => {
            valueHTML.focus();
            valueHTML.select();
        }, 300);
        const saveHTML: HTMLElement = createNewElement('div', ['portfolio_button', 'portfolio_save'], this.portEditHTML);
        saveHTML.textContent = this.controller.getLangValue('port_ok');
        saveHTML.addEventListener('click', () => {
            const value = Number(valueHTML.value);
            if(value > 0 && isAdd) {
                this.controller.changePortfolio('set', coinId, value).then((newPort: Map<string, number>) => {
                    this.portData = newPort;
                    this.reDrawList();
                });
                this.portEditHTML.innerHTML = '';
            }else if(value > 0 && !isAdd) {
                this.controller.changePortfolio('set', coinId, -1 * value).then((newPort: Map<string, number>) => {
                    this.portData = newPort;
                    this.reDrawList();
                });
                this.portEditHTML.innerHTML = '';
            }
        });
        return this.portEditHTML;
    }

    editMain(mainEditHTML: HTMLElement): HTMLElement {
        const coinSelectInp: HTMLInputElement = createNewElement('input', ['portfolio_coin_select'], mainEditHTML) as HTMLInputElement;
        coinSelectInp.setAttribute('list', 'CoinNameList');
        coinSelectInp.setAttribute('name', 'CoinNameList');

        const valueHTML: HTMLInputElement = createNewElement('input', ['portfolio_value'], mainEditHTML) as HTMLInputElement;
        valueHTML.type = 'number';
        valueHTML.value = '0';
        valueHTML.min = '0';

        const coinSelectDList = createNewElement('datalist', ['portfolio_coin_select'], mainEditHTML);
        coinSelectDList.id = 'CoinNameList';
        this.arrCoinsList.forEach((item) => {
            createOptionElement(item.id, item.name, coinSelectDList);
        });
        const saveHTML: HTMLElement = createNewElement('div', ['portfolio_button', 'portfolio_save', 'portfolio_main_button'], mainEditHTML);
        saveHTML.textContent = this.controller.getLangValue('port_ok');
        saveHTML.addEventListener('click', () => {
            const newCoin: string = coinSelectInp.value;
            const newValue = Number(valueHTML.value);
            this.controller.changePortfolio('add', newCoin, newValue).then((newPort: Map<string, number>) => {
                this.portData = newPort;
                this.reDrawList();
            });
            mainEditHTML.remove();
        });
        return mainEditHTML;
        // return this.portEditHTML;
    }
}
