export type CoinInfo = {
    name: string;
    value: number;
};

export type typeUser = {
    id: number,
    name: string,
    pass: string,
    email: string,
    lang: string,
    currency: string
};

export type Currency = {
    id: string,
    symbol: string
};

export type BackResponse = {
    ok: boolean,
    status: number,
    body: TypeUser
};

export type Collect = { [key: string]: string };