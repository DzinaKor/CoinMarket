export const URL_COIN_DATA = 'https://api.coingecko.com/api/v3';
export const URL_NEWS_DATA = 'https://eventregistry.org/api/v1/article/getArticles?';
// export const URL_BACKEND = 'http://127.0.0.1:8000';
export const URL_BACKEND = 'https://deploy-coinmarket.herokuapp.com';
export const IMG_FAV = './assets/images/fav.svg';
export const IMG_NOFAV = './assets/images/nofav.svg';
export const FIAT_ROUND = 2;
export const CRYPTO_ROUND = 8;

export const enum CoinOrder {
    MARKET_CAP = 'market_cap',
    VOLUME = 'volume',
    ID = 'id'
}

export const enum SortOrder {
    ASC = 'asc',
    DESC = 'desc'
}

export const USER_AVATAR: Map<string, string> = new Map(
    Object.entries({
        ava1: './assets/avatars/ava1.svg',
        ava2: './assets/avatars/ava4.svg',
        ava3: './assets/avatars/ava3.svg',
        ava4: './assets/avatars/ava5.svg',
        ava5: './assets/avatars/ava6.svg',
    }));
