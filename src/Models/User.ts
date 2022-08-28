import { typeUser } from "../App/types";
import Controller from "../Controllers/Controller";

export default class User {
    public controller: Controller;

    // user variable - include data about current user
    public data: typeUser;

    // use for checking user authorization
    public isAuth: boolean;

    constructor(controller: Controller) {
        this.controller = controller;
        this.data = this.setEmptyData();
        this.isAuth = false;
    }

    // set empty user data by default
    setEmptyData(): typeUser {
        this.isAuth = false;
        const newUser: typeUser = {
            id: -1,
            name: '',
            pass: '',
            email: '',
            lang: 'EN',
            currency: 'USD'
        };
        return newUser;
    }

    async setLang(lang: string): Promise<boolean> {
        this.data.lang = lang;
        return true;
    }

    async setCurrency(currency: string): Promise<boolean> {
        this.data.currency = currency;
        return true;
    }
}