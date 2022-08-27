import { TrendCoin } from '../api/apiRequestTypes';
import { getExchangeData, getTrendCoins } from '../api/apiRequest';

export default class RunningLine {

    public trendCoins: TrendCoin[];

    public exchangeRate: number;

    constructor() {
        this.trendCoins = [];
        this.exchangeRate = 1;
    }

    async getTrendCoinsData(baseCurrency: string) {
        this.exchangeRate = (await getExchangeData()).rates[baseCurrency.toLowerCase()].value;
        this.trendCoins = (await getTrendCoins()).coins;
        return this.trendCoins;
    }
}
