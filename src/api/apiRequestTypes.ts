export type CoinMarketData = {
    id: string,
    symbol: string,
    name: string,
    image: string,
    current_price: number,
    market_cap: number,
    market_cap_rank: number,
    fully_diluted_valuation: number,
    total_volume: number,
    high_24h: number,
    low_24h: number,
    price_change_24h: number,
    price_change_percentage_24h: number,
    market_cap_change_24h: number,
    market_cap_change_percentage_24h: number,
    circulating_supply: number,
    total_supply: number,
    max_supply: number,
    ath: number,
    ath_change_percentage: number,
    ath_date: Date,
    atl: number,
    atl_change_percentage: number,
    atl_date: Date,
    roi: null,
    last_updated: Date
};

export type Coin = {
    id: string;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    large: string;
}

export type Exchange = {
    id: string;
    name: string;
    market_type: string;
    thumb: string;
    large: string;
}

export type Category = {
    id: number;
    name: string;
}

export type Nft = {
    id: string;
    name: string;
    symbol: string;
    thumb: string;
}

export type SearchCoinsData = {
    coins: Coin[];
    exchanges: Exchange[];
    icons: any[];                  // пустой массив
    categories: Category[];
    nft: Nft[];
}

export type MarketChartData = {
    prices: number[][];
    market_caps: number[][];
    total_volumes: number[][];
}

export interface Item {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
}

export interface TrendCoin {
    item: Item;
}

export interface TrendCoins {
    coins: TrendCoin[];
    exchanges: any[];     //пустой массив
}

//

export type Source = {
    uri: string;
    dataType: string;
    title: string;
}

export type Author = {
    uri: string;
    name: string;
    type: string;
    isAgency: boolean;
}

export type Result = {
    uri: string;
    lang: string;
    isDuplicate: boolean;
    date: string;
    time: string;
    dateTime: Date;
    dateTimePub: Date;
    dataType: string;
    sim: number;
    url: string;
    title: string;
    body: string;
    source: Source;
    authors: Author[];
    image: string;
    eventUri: string;
    sentiment?: number;
    wgt: number;
    relevance: number;
}

export type Articles = {
    results: Result[];
    totalResults: number;
    page: number;
    count: number;
    pages: number;
}

export interface NewsData {
    articles: Articles;
}
