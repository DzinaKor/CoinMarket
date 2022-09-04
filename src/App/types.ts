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

export type BackResWatch = {
    ok: boolean,
    status: number,
    body: Array<string>
}

export type BackResPort = {
    ok: boolean,
    status: number,
    body: Map<string, number>
}

export type Collect = { [key: string]: string };
export type CollectPlus = { [key: string]: string | Array<string> | Collect };
