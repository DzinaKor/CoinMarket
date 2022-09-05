import { TypeUser } from '../App/types';
import Controller from '../Controllers/Controller';
import { createNewElement, addAuthTextHTML, createPopUp, createPopUpMove } from './BasicView';
import { USER_AVATAR } from '../constants';

export default class AuthView {
    public controller: Controller;

    public authHeader: HTMLElement;

    public loginHTML: HTMLElement;

    public avatarHTML: HTMLImageElement;

    public signInHTML: HTMLElement;

    public signUpHTML: HTMLElement;

    public changeUserDataHTML: HTMLElement;

    public userNameHTML: HTMLInputElement;

    public emailHTML: HTMLInputElement;

    public passHTML: HTMLInputElement;

    public avatar: string;

    constructor(controller: Controller) {
        this.controller = controller;

        this.signInHTML = createNewElement('div', ['signin_container']);
        this.signUpHTML = createNewElement('div', ['signup_container']);
        this.changeUserDataHTML = createNewElement('div', ['change_user_data_container']);

        this.authHeader = document.querySelector('.auth_header') as HTMLElement;

        const loginCont: HTMLElement = createNewElement('div', ['login_container'], this.authHeader);
        this.avatarHTML = createNewElement('img', ['login_avatar'], loginCont) as HTMLImageElement;
        this.loginHTML = createNewElement('div', ['login_button'], loginCont);
        if (this.controller.user.isAuth) {
            this.loginHTML.textContent = this.controller.user.getUserName();
            this.loginHTML.classList.add('auth_login');
            this.avatar = this.controller.getUserData().avatar;
            this.setLoginAvatar(true);
        } else {
            this.loginHTML.textContent = this.controller.getLangValue('auth_signin');
            this.loginHTML.classList.add('auth_sign_in');
            this.avatar = 'ava1';
            this.setLoginAvatar(false);
        }
        this.loginHTML.addEventListener('click', () => {
            this.changeUserDataView();
        });

        this.userNameHTML = createNewElement('input', ['auth_user_name']) as HTMLInputElement;
        this.emailHTML = createNewElement('input', ['auth_email']) as HTMLInputElement;
        this.passHTML = createNewElement('input', ['auth_pass']) as HTMLInputElement;
    }

    setLogin() {
        if (this.controller.user !== null && this.controller.user !== undefined) {
            const login: string = this.controller.getUserData().name;
            // if(login && login.length > 0) {
            if (this.controller.user.isAuth) {
                this.loginHTML.textContent = login;
                this.loginHTML.classList.remove('auth_sign_in');
                this.loginHTML.classList.add('auth_login');
                this.setLoginAvatar(true);
            } else {
                this.loginHTML.textContent = this.controller.getLangValue('auth_signin');
                this.loginHTML.classList.remove('auth_login');
                this.loginHTML.classList.add('auth_sign_in');
                this.setLoginAvatar(false);
            }
        }
    }

    setLoginAvatar(isSet: boolean) {
        if (isSet) {
            this.avatarHTML.alt = this.avatar;
            this.avatarHTML.src = String(USER_AVATAR.get(this.avatar));
            this.avatarHTML.width = 50;
        } else {
            this.avatarHTML.alt = '';
            this.avatarHTML.src = '';
            this.avatarHTML.width = 0;
        }

    }

    changeUserDataView() {
        if (!this.controller.isPopUp) {
            if (!this.controller.user.isAuth) {
                this.signInView();
            } else {
                this.changeUserData();
                // this.signInView();
            }
        } else {
            this.controller.closePopUp();
        }
    }

    changeUserData() {
        this.changeUserDataHTML.innerHTML = '';
        const changeCont: HTMLElement = createNewElement('div', ['auth_container'], this.changeUserDataHTML);

        changeCont.appendChild(this.avatarView());

        addAuthTextHTML(this.controller.getLangValue('auth_username'), changeCont);
        this.userNameHTML = createNewElement('input', ['auth_user_name'], changeCont) as HTMLInputElement;
        this.userNameHTML.type = 'text';
        this.userNameHTML.value = this.controller.getUserData().name;

        const signUpButton: HTMLElement = createNewElement('div', ['auth_button', 'auth_button_save'], changeCont);
        signUpButton.textContent = this.controller.getLangValue('auth_savebutton');
        signUpButton.addEventListener('click', () => {
            this.saveUserData('savedata');
        });

        const popUpView: HTMLElement = createPopUpMove(this.changeUserDataHTML, this.authHeader, -20);
        popUpView.style.width = '320px';

        setTimeout(() => {
            this.userNameHTML.focus();
            this.userNameHTML.select();
            this.controller.isPopUp = true;
        }, 100);
        this.changeUserDataHTML.style.display = 'flex';
        // console.log('change login name');
    }

    signInView() {
        this.signInHTML.innerHTML = '';

        const signInCont: HTMLElement = createNewElement('div', ['auth_container'], this.signInHTML);

        addAuthTextHTML(this.controller.getLangValue('auth_email'), signInCont);
        this.emailHTML = createNewElement('input', ['auth_email'], signInCont) as HTMLInputElement;
        this.emailHTML.type = 'email';
        this.emailHTML.placeholder = 'email@mail.com';
        this.emailHTML.addEventListener('keyup', () => {
            this.validateSignUp();
        });

        addAuthTextHTML(this.controller.getLangValue('auth_password'), signInCont);
        this.passHTML = createNewElement('input', ['auth_pass'], signInCont) as HTMLInputElement;
        this.passHTML.type = 'password';
        this.passHTML.placeholder = this.controller.getLangValue('auth_password_placeholder');
        this.passHTML.addEventListener('keyup', () => {
            this.validateSignUp();
        });

        const signInButton: HTMLElement = createNewElement('div', ['auth_button', 'auth_button_save'], signInCont);
        signInButton.textContent = this.controller.getLangValue('auth_signin');
        signInButton.addEventListener('click', () => {
            this.signIn();
        });

        addAuthTextHTML(' ', signInCont);
        const signUpButton: HTMLElement = createNewElement('div', ['signin_link'], signInCont);
        signUpButton.textContent = this.controller.getLangValue('auth_signup');
        signUpButton.addEventListener('click', () => {
            this.controller.closePopUp();
            this.signUpView();
        });

        const popUpView: HTMLElement = createPopUpMove(this.signInHTML, this.authHeader, -20);
        popUpView.style.width = '320px';

        setTimeout(() => {
            this.userNameHTML.focus();
            this.userNameHTML.select();
            this.controller.isPopUp = true;
        }, 100);
        this.signInHTML.style.display = 'flex';
    }

    signUpView() {
        this.signUpHTML.innerHTML = '';

        const signUpCont: HTMLElement = createNewElement('div', ['auth_container'], this.signUpHTML);

        signUpCont.appendChild(this.avatarView());

        addAuthTextHTML(this.controller.getLangValue('auth_username'), signUpCont);
        this.userNameHTML = createNewElement('input', ['auth_user_name'], signUpCont) as HTMLInputElement;
        this.userNameHTML.type = 'text';

        addAuthTextHTML(this.controller.getLangValue('auth_email'), signUpCont);
        this.emailHTML = createNewElement('input', ['auth_email'], signUpCont) as HTMLInputElement;
        this.emailHTML.type = 'email';
        this.emailHTML.placeholder = this.controller.getLangValue('auth_your_email');
        this.emailHTML.addEventListener('keyup', () => {
            this.validateSignUp();
        });

        addAuthTextHTML(this.controller.getLangValue('auth_password'), signUpCont);
        this.passHTML = createNewElement('input', ['auth_pass'], signUpCont) as HTMLInputElement;
        this.passHTML.type = 'password';
        this.passHTML.placeholder = this.controller.getLangValue('auth_your_password');
        this.passHTML.addEventListener('keyup', () => {
            this.validateSignUp();
        });

        const signUpButton: HTMLElement = createNewElement('div', ['auth_button', 'auth_button_disable'], signUpCont);
        signUpButton.textContent = this.controller.getLangValue('auth_signup');
        signUpButton.id = 'auth_sign_up_btn';
        signUpButton.addEventListener('click', () => {
            this.signUp();
        });

        const popUpView: HTMLElement = createPopUpMove(this.signUpHTML, this.authHeader, -20);
        popUpView.style.width = '320px';

        setTimeout(() => {
            this.emailHTML.focus();
            this.controller.isPopUp = true;
        }, 100);
        this.signUpHTML.style.display = 'flex';
    }

    avatarView(): HTMLElement {
        this.avatar = this.controller.getUserData().avatar;
        const avaContainer: HTMLElement = createNewElement('div', ['avatar_container']);
        USER_AVATAR.forEach((v, k) => {
            const imgAva: HTMLImageElement = createNewElement('img', ['avatar_image'], avaContainer) as HTMLImageElement;
            imgAva.alt = k;
            imgAva.src = v;
            // console.log(this.avatar);
            if (this.avatar === k) {
                imgAva.classList.add('avatar_image_select');
            }
            imgAva.addEventListener('click', () => {
                this.deselectAvatarsHTML(k);
                imgAva.classList.add('avatar_image_select');
                // this.avatar = k;
            });
        });
        return avaContainer;
    }

    deselectAvatarsHTML(setAva: string) {
        const allAvaHTML: NodeListOf<HTMLElement> = document.querySelectorAll('.avatar_image');
        allAvaHTML.forEach(element => {
            element.classList.remove('avatar_image_select');
        });
        this.avatar = setAva;
    }

    validateSignUp() {
        let isValid = false;
        if (this.controller.isPopUp) {
            // const okHTML: HTMLElement|null = document.querySelector('.auth_button');
            const okHTML: HTMLElement | null = document.getElementById('auth_sign_up_btn');
            if (this.emailHTML !== null && this.passHTML !== null && okHTML !== null) {
                const email: string = this.emailHTML.value;
                const pass: string = this.passHTML.value;
                const emailMatch: boolean = /^([-_A-Za-z0-9]+)@([A-Za-z]+)\.([A-Za-z]+)$/.test(email);
                const passMatch: boolean = (pass.length >= 6);

                if (emailMatch) {
                    this.emailHTML.classList.add('match');
                    this.emailHTML.classList.remove('no_match');
                } else if (email === '') {
                    this.emailHTML.classList.remove('no_match');
                    this.emailHTML.classList.remove('match');
                } else {
                    this.emailHTML.classList.remove('match');
                    this.emailHTML.classList.add('no_match');
                }

                if (passMatch) {
                    this.passHTML.classList.add('match');
                    this.passHTML.classList.remove('no_match');
                } else if (pass === '') {
                    this.passHTML.classList.remove('no_match');
                    this.passHTML.classList.remove('match');
                } else {
                    this.passHTML.classList.remove('match');
                    this.passHTML.classList.add('no_match');
                }

                if (emailMatch && passMatch) {
                    okHTML.classList.remove('auth_button_disable');
                    isValid = true;
                } else {
                    okHTML.classList.add('auth_button_disable');
                }
            }
        }
        return isValid;
    }

    signIn() {
        this.saveUserData('signin');
    }

    signUp() {
        if (this.validateSignUp()) {
            this.saveUserData('signup');
        } else {
            // TODO No valid data
            console.log('Authorization data is not valid!');
        }
    }

    saveUserData(com: string) {
        const userData: TypeUser = {
            id: -1,
            name: this.userNameHTML.value,
            pass: this.passHTML.value,
            email: this.emailHTML.value,
            lang: this.controller.getCurrentLang(),
            currency: this.controller.getCurrentCurrency(),
            avatar: this.avatar
        };
        this.controller.setAuth(com, userData);
    }
}
