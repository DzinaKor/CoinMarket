import { CoinMarketData } from '../api/apiRequestTypes';
import { getCoinMarketData } from '../api/apiRequest';
import { CoinOrder, SortOrder } from '../constants';

export default class CoinsList {

    public coinsListFromApi: Array<CoinMarketData>;

    public sortOption: CoinOrder;

    public sortOrder: SortOrder;

    public currency: string;

    public currentPage: number;

    public coinsPerPage: number;

    public coinsPerPageList: number[];

    constructor() {
        this.coinsListFromApi = [];
        this.currency = 'USD';
        this.sortOption = CoinOrder.MARKET_CAP;
        this.sortOrder = SortOrder.DESC;
        this.currentPage = 1;
        this.coinsPerPage = 25;
        this.coinsPerPageList = [25, 50, 100];
    }

    async apiReqArray() {
        this.coinsListFromApi = await getCoinMarketData(this.currency, this.sortOption, this.sortOrder, this.coinsPerPage, this.currentPage);
        return this.coinsListFromApi;
    }

}
