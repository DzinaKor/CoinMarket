import { CoinMarketData } from '../api/apiRequestTypes';
import { getCoinMarketData } from '../api/apiRequest';
import { CoinOrder } from '../constants';

export default class CoinsList {

    public coinsListFromApi: Array<CoinMarketData>;

    public sortOption: CoinOrder;

    public currency: string;

    constructor() {
        this.coinsListFromApi = [];
        this.currency = 'USD';
        this.sortOption = CoinOrder.MARKET_CAP_DESC;
    }

    async apiReqArray() {
        this.coinsListFromApi = await getCoinMarketData(this.currency, this.sortOption);
        return this.coinsListFromApi;
    }

}
