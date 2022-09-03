export type CoinInfo = {
    name: string;
    value: number;
};

export type TypeUser = {
    id: number,
    name: string,
    pass: string,
    email: string,
    lang: string,
    currency: string,
    avatar: string
}

export type Currency = {
    id: string,
    symbol: string
}

export type BackResponse = {
    ok: boolean,
    status: number,
    body: TypeUser
}

