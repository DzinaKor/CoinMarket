import Controller from '../Controllers/Controller';
import { searchCoins } from '../api/apiRequest';
import { Coin } from '../api/apiRequestTypes';


export default class Search {
    private controller: Controller;

    public searchSuggestions: Coin[];

    constructor(controller: Controller) {
        this.controller = controller;
        this.searchSuggestions = [];
    }

    async getSearchSuggestions(text: string) {
        this.searchSuggestions = (await searchCoins(text)).coins;
        return this.searchSuggestions;
    }
}