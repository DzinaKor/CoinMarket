import { ExchangeBtcCoin, ExchangeCoinData, ExchangeRates } from '../api/apiRequestTypes';
import '../css/calculator.css';

export default class Calculator {
    public exchangeData: ExchangeCoinData;

    public currencyList: string[];

    public cryptoList: string[] = ['btc', 'eth', 'ltc', 'bch', 'bnb', 'eos'];

    public featList: string[] = ['usd', 'eur', 'cny', 'cad', 'rub', 'uah', 'gbp', 'thb', 'try', 'sar'];

    constructor() {
        this.exchangeData = {
            '': {
                'name': '',
                'unit': '',
                'value': 1,
                'type': ''
            }
        };
        this.currencyList = [];
    }

    setData(data: ExchangeRates) {
        this.exchangeData = data.rates;
        this.currencyList = Object.keys(data.rates);
    }

    getExchangeRate(originalCurrency: string, receivedCurrency: string): number {
        const currency1: ExchangeBtcCoin = this.exchangeData[originalCurrency];
        const currency2: ExchangeBtcCoin = this.exchangeData[receivedCurrency];

        return currency2.value / currency1.value;
    }
}
