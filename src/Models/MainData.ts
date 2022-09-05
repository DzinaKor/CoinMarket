import { Currency } from '../App/types';

export default class MainData {

    public currencyList: Currency[] = [{ id: 'USD', symbol: '$' }, { id: 'EUR', symbol: '€' }];

    public langList = ['EN', 'RU', 'BY'];

    public selectedCurrency: Currency;

    public selectedLang: string;

    public currentPage: string;

    public currentOneCoin: string;

    public isDarkMode: boolean;

    constructor() {
        this.selectedCurrency = { id: 'USD', symbol: '$' };
        this.selectedLang = 'EN';
        this.currentPage = 'main';
        this.currentOneCoin = 'bitcoin';
        this.isDarkMode = false;
    }

    setDarkMode(isDarkMode: boolean) {
        this.isDarkMode = isDarkMode;
    }

    setSelectedCurrency(currency: string) {
        this.selectedCurrency = this.currencyList.find(el => el.id === currency.toUpperCase()) as Currency;
    }

    setSelectedLang(lang: string) {
        this.selectedLang = this.langList.find(el => el === lang.toUpperCase()) as string;
    }

    setCurrentOneCoin(coin: string) {
        this.currentOneCoin = coin;
    }
}
