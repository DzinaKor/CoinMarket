import { Collect } from "../App/types";
import { URL_BACKEND } from "../constants"
import Controller from "../Controllers/Controller";

export default class Portfolio {
	public controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }
}