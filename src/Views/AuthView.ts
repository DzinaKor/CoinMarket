import Controller from "../Controllers/Controller";
import { createNewElement } from "./BasicView";

export default class AuthView {
    public controller: Controller;

    public loginHTML: HTMLElement;

    public signInHTML: HTMLElement;

    public signUpHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;

        this.loginHTML = createNewElement('div', ['login_button']);
        this.loginHTML.addEventListener('click', () => {
            this.changeUserDataView();
        });
        this.signInHTML = createNewElement('div', ['signin_container']);
        this.signUpHTML = createNewElement('div', ['signup_container']);
    }

    changeUserDataView() {
        this.signInHTML.style.display = 'flex';
    }

    signInView() {
        this.signInHTML.style.display = 'flex';
    }

    signUpView() {
        this.signUpHTML.style.display = 'flex';
    }
}
