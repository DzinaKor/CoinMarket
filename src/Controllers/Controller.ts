import Calculator from '../Models/Calculator';
import Chart from '../Models/Chart';
import Coin from '../Models/Coin';
import CoinsList from '../Models/CoinsList';
import News from '../Models/News';
import CalculatorView from '../Views/CalculatorView';
import ChartView from '../Views/ChartView';
import CoinsListView from '../Views/CoinsListView';
import Footer from '../Views/Footer';
import Header from '../Views/Header';
import MainView from '../Views/MainView';
import NewsMainView from '../Views/NewsMainView';
import NewsView from '../Views/NewsView';
import TabsView from '../Views/TabsView';
import { createNewElement } from '../Views/BasicView';
import { getExchangeData, getTrendCoins } from '../api/apiRequest';
import { CoinOrder, CRYPTO_ROUND, FIAT_ROUND, SortOrder } from '../constants';
import Search from '../Models/Search';
import RunningLineView from '../Views/RunningLineView';
import RunningLine from '../Models/RunningLine';
import User from '../Models/User';
import AuthView from '../Views/AuthView';
import OneCoinView from '../Views/OneCoinView';
import MainData from '../Models/MainData';
import { NewsData } from '../api/apiRequestTypes';

export default class Controller {
    public mainData: MainData;

    public isPopUp: boolean;

    //  Models
    public coin: Coin;

    public newsModel: News;

    public calculatorModel: Calculator;

    public chart: Chart;

    public coinsList: CoinsList;

    public runningLine: RunningLine;

    public user: User;

    //  Views
    public mainView: MainView;

    public tabsView: TabsView;

    public header: Header;

    public footer: Footer;

    public pagesContainerHTML: HTMLElement;

    public newsMainPageView: NewsMainView;

    public newsView: NewsView;

    public calculatorView: CalculatorView;

    public chartView: ChartView;

    public coinsListView: CoinsListView;

    public oneCoinView: OneCoinView;

    public search: Search;

    public runningLineView: RunningLineView;

    public authView: AuthView;

    constructor() {
        this.mainData = new MainData();
        this.isPopUp = false;
        this.user = new User(this);
        this.coin = new Coin();
        this.newsModel = new News();
        this.calculatorModel = new Calculator();
        this.chart = new Chart(this);
        this.coinsList = new CoinsList();
        this.runningLine = new RunningLine();

        this.mainView = new MainView(this);
        this.header = new Header(this);

        this.footer = new Footer(this);
        this.search = new Search(this);
        this.tabsView = new TabsView(this);
        this.pagesContainerHTML = this.mainView.addPagesContainer();

        this.newsMainPageView = new NewsMainView(this);
        this.runningLineView = new RunningLineView(this);
        this.newsView = new NewsView(this);
        this.calculatorView = new CalculatorView(this);
        this.chartView = new ChartView(this);
        this.coinsListView = new CoinsListView(this);
        this.oneCoinView = new OneCoinView(this);
        this.authView = new AuthView(this);

        // after all
        this.mainPageRedraw();

        this.closePopUpForClick();
    }

    changePage(com: string) {
        if (com === 'calc') {
            this.drawCalculator();
        } else if (com === 'news') {
            this.newsView.viewNews();
        } else if (com === 'chart') {
            this.chartView.viewChart();
        } else if (com === 'onecoin') {
            this.oneCoinView.viewOneCoin();
        } else {
            this.mainPageRedraw();
        }
    }

    mainPageRedraw() {
        this.coinsList.apiReqArray(this.mainData.selectedCurrency.id).then(() => {
            this.pagesContainerHTML.innerHTML = '';
            createNewElement('div', ['mainpage_container'], this.pagesContainerHTML);
            this.coinsListView.viewCoinsList();
            this.setCoinsListListeners();
            this.chartView.viewMainPageChart();
            this.newsMainPageView.viewNewsMain();
            this.drawRunningLine();
        });
    }

    coinsUpdate() {
        this.coinsList.apiReqArray(this.mainData.selectedCurrency.id).then(() => {
            this.coinsListView.viewAllCoins();
        });
    }

    drawRunningLine() {
        getTrendCoins().then(async () => {
            this.runningLineView.viewRunningLine(await this.runningLine.getTrendCoinsData(this.mainData.selectedCurrency.id), this.runningLine.exchangeRate);
        });
    }

    setCoinsListListeners() {
        (document.querySelector('.panel-block') as HTMLElement).addEventListener('click', (event) => {
            const element = event.target as HTMLElement;
            if (element.id === 'coins-prev' && this.coinsList.currentPage !== 1) {
                this.coinsList.currentPage -= 1;
                this.coinsUpdate();
            } else if (element.id === 'coins-next' && this.coinsList.coinsListFromApi.length === this.coinsList.coinsPerPage) {
                this.coinsList.currentPage += 1;
                this.coinsUpdate();
            }
            (document.querySelector('.current-page') as HTMLElement).textContent = this.coinsList.currentPage.toString();
        });
        const coinsCount = document.querySelector('#coins-count') as HTMLSelectElement;
        coinsCount.addEventListener('change', () => {
            this.coinsList.coinsPerPage = parseInt(coinsCount.value, 10);
            this.coinsUpdate();
        });
        (document.querySelector('.header_container') as HTMLElement).addEventListener('click', (event) => {
            const element = event.target as HTMLElement;
            if (element.id === 'market-cap') {
                this.setSortAndOrder(CoinOrder.MARKET_CAP);
                this.coinsUpdate();
            } else if (element.id === 'coin-id') {
                this.setSortAndOrder(CoinOrder.ID);
                this.coinsUpdate();
            } else if (element.id === 'total-volume-header') {
                this.setSortAndOrder(CoinOrder.VOLUME);
                this.coinsUpdate();
            }
        });
    }

    setSortAndOrder(sortOption: CoinOrder) {
        if (this.coinsList.sortOption === sortOption) {
            if (this.coinsList.sortOrder === SortOrder.ASC) {
                this.coinsList.sortOrder = SortOrder.DESC;
            } else {
                this.coinsList.sortOrder = SortOrder.ASC;
            }
        } else {
            this.coinsList.sortOption = sortOption;
            this.coinsList.sortOrder = SortOrder.DESC;
        }
    }

    async drawCalculator() {
        this.calculatorModel.setData(await getExchangeData());
        this.calculatorView.viewCalculator();
        this.calculate();
        this.setCalcListener();
    }

    setCalcListener() {
        document.querySelectorAll('.calc-control').forEach((element) => {
            element.addEventListener('change', () => {
                this.calculate();
            });
        });
        (document.querySelector('.calc-exchange-btn') as HTMLElement).addEventListener('click', () => {
            const originalCurrency = document.querySelector('#select-original-currency') as HTMLSelectElement;
            const receivedCurrency = document.querySelector('#select-received-currency') as HTMLSelectElement;
            const bubbleString = originalCurrency.value;
            originalCurrency.value = receivedCurrency.value;
            receivedCurrency.value = bubbleString;
            this.calculate();
        });
        (document.querySelector('.calc-exchange-block') as HTMLElement).addEventListener('click', (event) => {
            const element = event.target as HTMLElement;
            if (element.classList.contains('exchange-pair')) {
                const originalCurrency = document.querySelector('#select-original-currency') as HTMLSelectElement;
                originalCurrency.value = element.getAttribute('crypto') as string;
                const receivedCurrency = document.querySelector('#select-received-currency') as HTMLSelectElement;
                receivedCurrency.value = element.getAttribute('fiat') as string;
                this.calculate();
            }
        });
    }

    calculate() {
        const amount = parseFloat((document.querySelector('.calc-amount') as HTMLInputElement).value);
        if (Number.isNaN(amount)) return;

        const originalCurrency = (document.querySelector('#select-original-currency') as HTMLSelectElement).value;
        const receivedCurrency = (document.querySelector('#select-received-currency') as HTMLSelectElement).value;

        const exchangeRate = this.calculatorModel.getExchangeRate(originalCurrency, receivedCurrency);
        const receivedAmount = (this.calculatorModel.exchangeData[receivedCurrency].type !== 'fiat')
            ? parseFloat((exchangeRate * amount).toFixed(CRYPTO_ROUND))
            : parseFloat((exchangeRate * amount).toFixed(FIAT_ROUND));

        (document.querySelector('#calc-result') as HTMLElement).textContent =
            `${amount} ${this.calculatorModel.exchangeData[originalCurrency].unit} = ` +
            `${receivedAmount} ${this.calculatorModel.exchangeData[receivedCurrency].unit}`;
    }

    searchAutocomplete() {
        const autocomplete = document.querySelector('.search-autocomplete') as HTMLElement;
        const input = document.querySelector('#search-input') as HTMLInputElement;
        input.addEventListener('input', () => {
            const inputText = input.value;
            Controller.closeAllLists();
            if (inputText) {
                this.search.getSearchSuggestions(inputText).then((arr) => {
                    const itemsContainer = createNewElement('div', ['autocomplete-items'], autocomplete);
                    arr.forEach((suggestion) => {
                        const element = createNewElement('div', ['suggestion'], itemsContainer);
                        element.setAttribute('coin-id', suggestion.id);
                        const coinImage = createNewElement('img', ['coin-logo-img'], element);
                        coinImage.setAttribute('src', suggestion.thumb);
                        coinImage.setAttribute('alt', 'coin-logo');
                        const text = createNewElement('div', [], element);
                        text.textContent = `${suggestion.name} - ${suggestion.id.toUpperCase()}`;
                        element.addEventListener('click', () => {
                            // TODO add link to one coin with coin-id attribute
                            Controller.closeAllLists();
                        });
                    });
                });
            }
        });
    }

    static closeAllLists() {
        document.querySelectorAll('.autocomplete-items').forEach(element => {
            element.remove();
        });
    }

    getCurrentLang(): string {
        return this.user.data.lang;
    }

    setCurrentLang(lang: string) {
        this.user.setLang(lang).then(() => {
            this.header.langHeader.innerText = this.getCurrentLang();
        });
    }

    getCurrentCurrency(): string {
        return this.user.data.currency;
    }

    setCurrentCurrency(currency: string) {
        this.user.setCurrency(currency).then(() => {
            this.header.currencyChangeHeader.innerText = this.getCurrentCurrency();
        });
    }

    closePopUp() {
        this.isPopUp = false;
        const popUpView: HTMLElement | null = document.querySelector('.popup_view');
        if (popUpView) {
            popUpView.remove();
        }
    }

    closePopUpForClick() {
        window.addEventListener('click', (event) => {
            if (this.isPopUp) {
                const elClick = event.target as HTMLElement;
                let elParent: HTMLElement = elClick;
                let closePopUp = true;
                while (!(elParent.nodeName === 'BODY' || elParent.nodeName === 'body')) {
                    elParent = elParent.parentElement as HTMLElement;
                    if (elParent.classList.contains('popup_view')) {
                        closePopUp = false;
                    }
                }
                if (closePopUp) {
                    this.closePopUp();
                }
            }
        });
    }

    drawOneCoinView(coinId: string) {
        this.oneCoinView.viewOneCoin(coinId);
    }

    drawNewsView() {
        this.newsModel.apiReqNews().then((news: NewsData) => {
            this.newsView.drawNewsView(news);
        })
    }
}
