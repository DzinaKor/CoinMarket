import {
    SearchCoinsData, CoinMarketData, MarketChartData, TrendCoins, NewsData, ExchangeRates, ChartData, CoinsNameList
} from './apiRequestTypes';
import { CoinData } from './coinDataType';
import {
    CoinOrder, SortOrder, URL_COIN_DATA, URL_NEWS_DATA
} from '../constants';
import NEWS_API_KEY from '../credentials';

const makeRequest = async (
    url: string,
    method: string,
    headers: HeadersInit
) => {
    const res = await fetch(url, {
        method,
        headers
    });
    if (!res.ok) {
        return new Error(`${res.status} - ${res.statusText}`);
    }
    return res.json();
};

export const getCoinMarketData = async (
    vsCurrency: string,
    sortOption = CoinOrder.MARKET_CAP,
    sortOrder = SortOrder.DESC,
    count = 100,
    page = 1
): Promise<Array<CoinMarketData>> => {
    const url = `${URL_COIN_DATA}/coins/markets?vs_currency=${vsCurrency}&order=${sortOption}_${sortOrder}&per_page=${count}&page=${page}`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as CoinMarketData[];
};

export const searchCoins = async (
    coin: string
): Promise<SearchCoinsData> => {
    const url = `${URL_COIN_DATA}/search?query=${coin}`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as SearchCoinsData;
};

export const getCoinData = async (
    coinId: string,
    localization = false,
    tickers = true
): Promise<CoinData> => {
    const url = `${URL_COIN_DATA}/coins/${coinId}?localization=${localization}&tickers=${tickers}`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as CoinData;
};

export const getMarketChart = async (
    coinId: string,
    vsCurrency = 'usd',
    days = 1,
    interval = 'daily'
): Promise<MarketChartData> => {
    const url = `${URL_COIN_DATA}/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}&interval=${interval}`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as MarketChartData;
};

export const getTrendCoins = async (): Promise<TrendCoins> => {
    const url = `${URL_COIN_DATA}/search/trending`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as TrendCoins;
};

export const getExchangeData = async (): Promise<ExchangeRates> => {
    const url = `${URL_COIN_DATA}/exchange_rates`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as ExchangeRates;
};

export const getChartData = async (
    coinId = 'bitcoin',
    vsCurrency = 'usd',
    days = '7'
): Promise<ChartData[]> => {
    const url = `${URL_COIN_DATA}/coins/${coinId}/ohlc?vs_currency=${vsCurrency}&days=${days}`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as ChartData[];
};

export const getNewsData = async (): Promise<NewsData> => {
    const url = `${URL_NEWS_DATA}apiKey=${NEWS_API_KEY}&keyword=crypto`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as NewsData;
};

export const getCoinsNameList = async (
): Promise<Array<CoinsNameList>> => {
    const url = `${URL_COIN_DATA}/coins/list`;
    const headers: HeadersInit = {
        accept: 'application/json'
    };
    return await makeRequest(url, 'GET', headers) as Array<CoinsNameList>;
};

