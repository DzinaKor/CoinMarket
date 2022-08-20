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

    createNewElement(type:string, classes:Array<string>, parent: HTMLElement | null = null): HTMLElement {
        const element: HTMLElement = document.createElement(type);
        if (classes.length > 0) {
            classes.forEach((cls:string) => {
                element.classList.add(cls);
            });
        }
        if (parent !== null) {
            parent.appendChild(element);
        }
        return element;
    }

    changePage(com:string) {
        if (com === 'calc') {
            this.calculatorView.viewCalculator();
        } else if (com === 'news') {
            this.newsView.viewNews();
        } else if (com === 'chart') {
            this.chartView.viewChart();
        } else {
            this.mainPageRedraw();
        }
    }

    mainPageRedraw() {
        this.pagesContainerHTML.innerHTML = ''; // this is Pages Container
        const mainPageHTML: HTMLElement = this.createNewElement('div', ['mainpage_container'], this.pagesContainerHTML);
        this.coinsListView.viewCoinsList();
        this.chartView.viewMainPageChart();
        this.newsMainPageView.viewNewsMain();
    }
}
