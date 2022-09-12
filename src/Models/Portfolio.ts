import { getCoinsNameList } from "../api/apiRequest";
import { BackResPort, Collect } from "../App/types";
import { URL_BACKEND } from "../constants"
import { CoinsNameList } from '../api/apiRequestTypes';
import Controller from "../Controllers/Controller";

export default class Portfolio {
    public controller: Controller;

    public portArray: Map<string, number>;

    constructor(controller: Controller) {
        this.controller = controller;
        this.portArray = new Map();
    }

    async addPortfolio(coinId: string, value: number): Promise<Map<string, number>> {
        if (coinId !== '' && coinId.length > 0 && value >= 0) {
            this.portArray.set(coinId, value);
            await this.putPortfolioDB();
        }
        return this.portArray;
    }

    async setPortfolio(coinId: string, value: number): Promise<Map<string, number>> {
        if (coinId !== '' && coinId.length > 0 && value >= 0) {
            const oldVal = Number(this.portArray.get(coinId));
            const newVal = oldVal + value;
            if(newVal > 0) {
                this.portArray.set(coinId, Math.round(newVal*10000)/10000);
                await this.putPortfolioDB();
            }
        }
        return this.portArray;
    }

    async deletePortfolio(coinId: string): Promise<Map<string, number>> {
        if (coinId !== '' && coinId.length > 0 ) {
            this.portArray.delete(coinId);
            await this.putPortfolioDB();
        }
        return this.portArray;
    }

    async getPortfolio(): Promise<Map<string, number>> {
        await this.getPortfolioDB();
        return this.portArray;
    }

    async putPortfolioDB(): Promise<boolean> {
        const pars: Collect = {
            email: this.controller.getUserData().email,
            portfolio: JSON.stringify(Object.fromEntries(this.portArray))
        }
        const response: BackResPort = await this.makeRequest('PUT', null, pars);
        if (response.ok) {
            // this.portArray = new Map(Object.entries({ 'bitcoin': 9, 'dogecoin': 90, 'shiba-inu': 900 }));
        }
        return response.ok;
    }

    async getPortfolioDB(): Promise<Map<string, number>> {
        const pars: Collect = {
            email: this.controller.getUserData().email
        }
        const response: BackResPort = await this.makeRequest('GET', null, pars);
        if (response.ok) {
            this.portArray = new Map(Object.entries(response.body));
            return this.portArray;
        }
        return new Map(Object.entries({}));
    }

    async makeRequest(method: string, body: Collect | null = null, params: Collect | null = null): Promise<BackResPort> {
        let queryURL: string;
        queryURL = '';
        const requestParams: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (method === 'POST' && body != null && this.portArray !== null) {
            requestParams.body = JSON.stringify(body);
        } else if (params != null && this.portArray !== null) {
            const searchParams: URLSearchParams = new URLSearchParams();
            Object.entries(params).forEach(([k, v]) => {
                searchParams.append(k, v);
            });
            queryURL = `?${searchParams}`;
        }

        const res: Response = await fetch(`${URL_BACKEND}/portfolio${queryURL}`, requestParams);
        const backRes: BackResPort = { ok: res.ok, status: res.status, body: await res.json() };
        return backRes;
    };

    async getCoinsList(): Promise<Array<CoinsNameList>> {
        let arrCoinsList: Array<CoinsNameList> = [];
        if (this.controller !== null) {
            arrCoinsList = await getCoinsNameList();
        }
        return arrCoinsList;
    }
}