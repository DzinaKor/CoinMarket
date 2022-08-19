import {
    SearchCoinsData, CoinMarketData, MarketChartData, TrendCoins, NewsData,
} from './apiRequestTypes';
import { CoinData } from './coinDataType';
import {
    CoinOrder, URL_COIN_DATA, URL_NEWS_DATA,
} from '../constants';
import NEWS_API_KEY from '../credentials';

const makeRequest = async (
    url: string,
    method: string,
    headers: HeadersInit,
) => {
    const res = await fetch(url, {
        method,
        headers,
    });
    if (res.ok) {
        return res.json();
    }
    return undefined;
};

export const getCoinMarketData = async (
    vsCurrency: string,
    order = CoinOrder.MARKET_CAP_DESC,
    count = 100,
    page = 1,
) : Promise<CoinMarketData | undefined> => {
    const url = `${URL_COIN_DATA}/coins/markets?vs_currency=${vsCurrency}&order=${order}&per_page=${count}&page=${page}`;
    const headers : HeadersInit = {
        accept: 'application/json',
    };
    return await makeRequest(url, 'GET', headers) as CoinMarketData;
};

export const searchCoins = async (
    coin: string,
) : Promise<SearchCoinsData | undefined> => {
    const url = `${URL_COIN_DATA}/search?query=${coin}`;
    const headers : HeadersInit = {
        accept: 'application/json',
    };
    return await makeRequest(url, 'GET', headers) as SearchCoinsData;
};

export const getCoinData = async (
    coinId : string,
    localization = false,
    tickers = true,
): Promise<CoinData | undefined> => {
    const url = `${URL_COIN_DATA}/coins/${coinId}?localization=${localization}&tickers=${tickers}`;
    const headers : HeadersInit = {
        accept: 'application/json',
    };
    return await makeRequest(url, 'GET', headers) as CoinData;
};

export const getMarketChart = async (
    coinId : string,
    vsCurrency = 'usd',
    days = 1,
    interval = 'daily',
): Promise<MarketChartData | undefined> => {
    const url = `${URL_COIN_DATA}/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=${interval}`;
    const headers : HeadersInit = {
        accept: 'application/json',
    };
    return await makeRequest(url, 'GET', headers) as MarketChartData;
};

export const getTrendCoins = async (): Promise<TrendCoins | undefined> => {
    const url = `${URL_COIN_DATA}/search/trending`;
    const headers : HeadersInit = {
        accept: 'application/json',
    };
    return await makeRequest(url, 'GET', headers) as TrendCoins;
};

export const getNewsData = async (): Promise<NewsData | undefined> => {
    const url = `${URL_NEWS_DATA}apiKey=${NEWS_API_KEY}&keyword=crypto`;
    const headers : HeadersInit = {
        accept: 'application/json',
    };
    return await makeRequest(url, 'GET', headers) as NewsData;
};
