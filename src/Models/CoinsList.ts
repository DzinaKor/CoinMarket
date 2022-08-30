import { CoinMarketData } from '../api/apiRequestTypes';
import { getCoinMarketData } from '../api/apiRequest';
import { CoinOrder, SortOrder } from '../constants';

export default class CoinsList {

    public coinsListFromApi: Array<CoinMarketData>;

    public sortOption: CoinOrder;

    public sortOrder: SortOrder;

    public currentPage: number;

    public coinsPerPage: number;

    public coinsPerPageList: number[];

    public currencyUnit: string;

    constructor() {
        this.coinsListFromApi = [];
        this.currencyUnit = '$';
        this.sortOption = CoinOrder.MARKET_CAP;
        this.sortOrder = SortOrder.DESC;
        this.currentPage = 1;
        this.coinsPerPage = 25;
        this.coinsPerPageList = [25, 50, 100];
    }

    async apiReqArray(currency: string) {
        this.coinsListFromApi = await getCoinMarketData(currency, this.sortOption, this.sortOrder, this.coinsPerPage, this.currentPage);
        return this.coinsListFromApi;
    }

}
