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
import { getExchangeData } from '../api/apiRequest';
import { CRYPTO_ROUND, FIAT_ROUND } from '../constants';

export default class Controller {
    //  Models
    public coin: Coin;

    public newsModel: News;

    public calculatorModel: Calculator;

    public chart: Chart;

    public coinsList: CoinsList;

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

    constructor() {
        this.coin = new Coin('Bitcoin');
        this.newsModel = new News();
        this.calculatorModel = new Calculator();
        this.chart = new Chart();
        this.coinsList = new CoinsList();

        this.mainView = new MainView(this);
        this.header = new Header(this);
        this.footer = new Footer(this);

        this.tabsView = new TabsView(this);
        this.pagesContainerHTML = this.mainView.addPagesContainer();

        this.newsMainPageView = new NewsMainView(this);

        this.newsView = new NewsView(this);
        this.calculatorView = new CalculatorView(this);
        this.chartView = new ChartView(this);
        this.coinsListView = new CoinsListView(this);

        // after all
        this.mainPageRedraw();
    }

    changePage(com: string) {
        if (com === 'calc') {
            this.drawCalculator();
        } else if (com === 'news') {
            this.newsView.viewNews();
        } else if (com === 'chart') {
            this.chartView.viewChart();
        } else {
            this.mainPageRedraw();
        }
    }

    mainPageRedraw() {
        this.coinsList.apiReqArray().then(() => {
            this.pagesContainerHTML.innerHTML = '';
            createNewElement('div', ['mainpage_container'], this.pagesContainerHTML);
            this.coinsListView.viewCoinsList();
            this.chartView.viewMainPageChart();
            this.newsMainPageView.viewNewsMain();
        });
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
}
