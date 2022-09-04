import { Currency } from '../App/types';

export default class MainData {

    public currencyList: Currency[] = [{ id: 'USD', symbol: '$' }, { id: 'EUR', symbol: '€' }];

    public langList = ['EN', 'RU', 'BY'];

    public selectedCurrency: Currency;

    public selectedLang: string;

    public currentPage: string;

    constructor() {
        this.selectedCurrency = { id: 'USD', symbol: '$' };
        this.selectedLang = 'EN';
        this.currentPage = 'main';
    }

    setSelectedCurrency(currency: string) {
        this.selectedCurrency = this.currencyList.find(el => el.id === currency.toUpperCase()) as Currency;
    }

    setSelectedLang(lang: string) {
        this.selectedLang = this.langList.find(el => el === lang.toUpperCase()) as string;
    }
}
