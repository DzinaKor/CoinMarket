import { CoinMarketData } from '../api/apiRequestTypes';
import { getCoinMarketData } from '../api/apiRequest';

export default class CoinsList {

    public coinsListFromApi: Array<CoinMarketData>;

    public currency: string;

    constructor() {
        this.coinsListFromApi = [];
        this.currency = 'USD';
    }

    async apiReqArray() {
        this.coinsListFromApi = await getCoinMarketData(this.currency);
        return this.coinsListFromApi;
    }

}
