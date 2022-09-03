import { BackResWatch, Collect } from "../App/types";
import { URL_BACKEND } from "../constants"
import Controller from "../Controllers/Controller";

export default class WatchList {
	public controller: Controller;

	public watchArray: Array<string>;

    constructor(controller: Controller) {
        this.controller = controller;
		this.watchArray = [];
    }

	changeWatchList(command: number, coin: string): Array<string> {
		if(command > 0) {
			if(this.watchArray.indexOf(String(coin)) < 0) {
				this.watchArray.push(coin);
			}
		} else if(this.watchArray.length > 0) {
			const ind: number = this.watchArray.indexOf(coin);
			if(ind >= 0) {
				this.watchArray.splice(ind, 1);
			}
		}
		this.putWatchList();
		return this.watchArray;
	}

	checkCoinWatchList(coin: string): boolean {
		return (this.watchArray.indexOf(coin) >= 0);
	}

	async putWatchList(): Promise<boolean> {
        const pars: Collect = {
            email: this.controller.getUserData().email,
            watchlist: JSON.stringify(this.watchArray)
        }
        const response: BackResWatch = await this.makeRequest('PUT', null, pars);
        if(response.ok) {
            console.log(`PUT watchList is OK! ${response.body}`);
        }
        return response.ok;
	}

	async getWatchList(): Promise<Array<string>> {
        const pars: Collect = {
            email: this.controller.getUserData().email
        }
        const response: BackResWatch = await this.makeRequest('GET', null, pars);
        if(response.ok) {
            console.log(`GET watchList is OK! ${response.body}`);
			this.watchArray = response.body;
			return this.watchArray;
        }
		return [];
	}

    async makeRequest(method: string, body: Collect|null = null, params: Collect|null = null): Promise<BackResWatch> {
        let queryURL: string;
            queryURL = '';
        const requestParams: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (method === 'POST' && body != null && this.watchArray !== null) {
            requestParams.body = JSON.stringify(body);
        } else if(params != null && this.watchArray !== null) {
            const searchParams: URLSearchParams = new URLSearchParams();
            Object.entries(params).forEach(([k, v]) => {
                searchParams.append(k, v);
            });
            queryURL = `?${searchParams}`;
            // console.log('request OK')
        } 

        const res: Response = await fetch(`${URL_BACKEND}/watchlist${queryURL}`, requestParams);
        const backRes: BackResWatch = {ok: res.ok, status: res.status, body: await res.json() };
        return backRes;
        // return await res;
    };
}
