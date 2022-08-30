import { CoinData } from "../api/coinDataType";
import { getCoinData } from "../api/apiRequest";

export default class Coin {
    public oneCoinFromApi: CoinData | undefined;

    public coinId: string;

    constructor() {
        this.oneCoinFromApi = undefined;
        this.coinId = 'Bitcoin';
    }

    async apiReqOneCoin(id: string): Promise<CoinData> {
        this.coinId = id;
        this.oneCoinFromApi = await getCoinData(this.coinId);
        return this.oneCoinFromApi;
    }
}
