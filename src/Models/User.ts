import { BackResponse, Collect, TypeUser } from "../App/types";
import { URL_BACKEND } from "../constants"
import Controller from "../Controllers/Controller";

export default class User {
    public controller: Controller;

    // user variable - include data about current user
    public data: TypeUser;

    // use for checking user authorization
    public isAuth: boolean;

    constructor(controller: Controller) {
        this.controller = controller;
        this.data = this.setEmptyData();
        this.isAuth = false;
        this.readUserDataFromLocalStorage();
        this.checkUserInDB();
    }

    // set empty user data by default
    setEmptyData(): TypeUser {
        this.isAuth = false;
        const newUser: TypeUser = {
            id: -1,
            name: '',
            pass: '',
            email: '',
            lang: 'EN',
            currency: 'USD',
            avatar: 'ava1'
        };
        return newUser;
    }

    getUserName(): string {
        let userName: string = this.data.name;
        if(this.data.name === '') {
            userName = this.data.email;
        }
        return userName;
    }

    async checkUserInDB(): Promise<boolean> {
        if(this.data.email !== '') {
            const pars: Collect = {
                email: this.data.email,
                pass: this.data.pass
            }
            const response: BackResponse = await this.makeRequest('GET', this.toJson(), pars);
            if(response.ok) {
                this.data.name = response.body.name;
                this.data.email = response.body.email;
                this.data.pass = response.body.pass;
                this.data.lang = response.body.lang;
                this.data.currency = response.body.currency;
                this.data.avatar = response.body.avatar;
            } else {
                this.data = this.setEmptyData();
            }
                this.controller.setAuth('login', this.data);
            return response.ok;
        }
        return false;
    }

    async setLang(lang: string): Promise<boolean> {
        this.data.lang = lang;
        return true;
    }

    async setCurrency(currency: string): Promise<boolean> {
        this.data.currency = currency;
        return true;
    }

    async signUp(): Promise<boolean> {
        const response: BackResponse = await this.makeRequest('POST', this.toJson());
        if(response.ok) {
            this.isAuth = true;
            this.saveUserDataToLocalStorage();
        } else {
            this.isAuth = false;
        }
        return response.ok;
    }

    async signIn(userData: TypeUser): Promise<boolean> {
        const email: string = (userData.email !== undefined && userData.email.length > 0)? userData.email : this.data.email;
        const pass: string = (userData.pass !== undefined && userData.pass.length > 5)? userData.pass : this.data.pass;
        const pars: Collect = {
            email: String(email),
            pass: String(pass)
        }
        const response: BackResponse = await this.makeRequest('GET', this.toJson(), pars);
        if(response.ok) {
            this.data.name = response.body.name;
            this.data.email = response.body.email;
            this.data.pass = response.body.pass;
            this.data.lang = response.body.lang;
            this.data.currency = response.body.currency;
            this.data.avatar = response.body.avatar;
            this.saveUserDataToLocalStorage();
            this.isAuth = true;
        } else {
            this.isAuth = false;
        }
        return response.ok;
    }

    async saveData(userData: TypeUser): Promise<boolean> {
        const userName: string = (userData.name !== undefined && userData.name.length > 0)? userData.name : this.data.name;
        const lang: string = (userData.lang !== undefined && userData.lang.length > 0)? userData.lang : this.data.lang;
        const currency: string = (userData.currency !== undefined && userData.currency.length > 0)? userData.currency : this.data.currency;
        const avatar: string = (userData.avatar !== undefined && userData.avatar.length > 0)? userData.avatar : this.data.avatar;
        const pars: Collect = {
            email: this.data.email,
            name: userName,
            lang: String(lang),
            currency: String(currency),
            avatar: String(avatar)
        }
        const response: BackResponse = await this.makeRequest('PUT', this.toJson(), pars);
        if(response.ok) {
            this.data.name = response.body.name;
            this.data.lang = response.body.lang;
            this.data.currency = response.body.currency;
            this.data.avatar = response.body.avatar;
            // console.log(`answer: ${response.body.name}`);
            // console.log(`answer: ${JSON.stringify(response.body)}`);
            this.saveUserDataToLocalStorage();
        }
        return response.ok;
    }

    saveUserDataToLocalStorage() {
        localStorage.setItem("user", JSON.stringify(this.toJson()));
    }

    readUserDataFromLocalStorage(): boolean {
        const tempUserSting: string|null = localStorage.getItem("user");
        let returnVar = false;
        if(tempUserSting !== null) {
            const jsonUser: TypeUser = JSON.parse(tempUserSting) as TypeUser;
            if (typeof jsonUser === "object" && jsonUser !== null) {
                this.data.name = jsonUser.name;
                this.data.pass = jsonUser.pass;
                this.data.email = jsonUser.email;
                this.data.lang = jsonUser.lang;
                this.data.currency = jsonUser.currency;
                this.data.avatar = jsonUser.avatar;
                this.isAuth = true;
                returnVar = true;
            } else {
                returnVar = false;
            }
        } else {
            returnVar = false;
        }
        return returnVar;
    }

    async makeRequest(method: string, body: TypeUser | null = null, params: Collect|null = null): Promise<BackResponse> {
        let queryURL: string;
            queryURL = '';
        const requestParams: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (method === 'POST' && body != null && this.data != null) {
            requestParams.body = JSON.stringify(body);
            // console.log(requestParams.body)
            // method === 'GET' && 
        } else if(params != null && this.data != null) {
            const searchParams: URLSearchParams = new URLSearchParams();
            Object.entries(params).forEach(([k, v]) => {
                searchParams.append(k, v);
            });
            queryURL = `?${searchParams}`;
            // console.log('request OK')
/*
        } else if(method === 'PUT' && params != null && this.data != null) {
            const formParams: FormData = new FormData();
            Object.entries(params).forEach(([k, v]) => {
                formParams.append(k, v);
            });
            requestParams.body = formParams;    */
        } 

        const res: Response = await fetch(`${URL_BACKEND}/user${queryURL}`, requestParams);
        // if (!res.ok) {

            // return new Error(`${res.status} - ${res.json()}`);
        // }
        const backRes: BackResponse = {ok: res.ok, status: res.status, body: await res.json() };
        return backRes;
        // return await res;
    };

    toJson(): TypeUser {
        return {
            "id": this.data.id,
            "email": this.data.email,
            "pass": this.data.pass,
            "name": this.data.name,
            "lang": this.data.lang,
            "currency": this.data.currency,
            "avatar": this.data.avatar
        };
    }
}