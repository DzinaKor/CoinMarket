import { DATA_IMAGE } from '../constants';
import Controller from '../Controllers/Controller';
import { createNewElement, createPopUp } from './BasicView';
import '../css/searchSuggestions.css';

export default class Header {
    public controller: Controller;

    public headerHTML: HTMLElement;

    public darkmodeHeader: HTMLImageElement;

    public langHeader: HTMLElement;

    public currencyChangeHeader: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.headerHTML = document.querySelector('header') as HTMLElement;
        this.darkmodeHeader = createNewElement('img', ['darkmode_container']) as HTMLImageElement;
        this.langHeader = createNewElement('div', ['lang_container']);
        this.currencyChangeHeader = createNewElement('div', ['currency_header']);
        this.viewHeader();
    }

    viewHeader() {
        const headerContainer: HTMLElement = createNewElement('div', ['header_container'], this.headerHTML);

        const logoNameHeader: HTMLElement = createNewElement('div', ['logoname_container'], headerContainer);
        const logoHeader: HTMLImageElement = createNewElement('img', ['logo_header'], logoNameHeader) as HTMLImageElement;
        logoHeader.alt = 'logo';
        logoHeader.src = '' /// TODO add logo 
        const nameHeader: HTMLElement = createNewElement('h1', ['name_header'], logoNameHeader);
        nameHeader.textContent = 'CoinMarket';

        const controlHeader: HTMLElement = createNewElement('div', ['control_header'], headerContainer);

        const searchAutocomplete = createNewElement('div', ['search-autocomplete'], controlHeader);
        const searchInput = createNewElement('input', [], searchAutocomplete);
        searchInput.id = 'search-input';
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('name', 'searchField');
        searchInput.setAttribute('placeholder', 'Search...');
        this.controller.searchAutocomplete();

        controlHeader.appendChild(this.langHeader);
        this.langHeader.innerText = this.controller.getCurrentLang();
        this.langHeader.addEventListener('click', (event) => {
            this.drawPopUpLang(event.target as HTMLElement);
        });

        controlHeader.appendChild(this.currencyChangeHeader);
        this.currencyChangeHeader.innerText = this.controller.getCurrentCurrency();
        this.currencyChangeHeader.addEventListener('click', (event) => {
            this.drawPopUpCurrency(event.target as HTMLElement);
        });

        controlHeader.appendChild(this.darkmodeHeader);
        this.darkmodeHeader.alt = 'light/dark mode switch';
        this.darkmodeHeader.src = DATA_IMAGE;

        const authHeader: HTMLElement = createNewElement('div', ['auth_header'], controlHeader);
        authHeader.textContent = 'Authorization'
    }

    drawPopUpLang(target: HTMLElement) {
        if (document.querySelector('.popup_view')) {
            const tempLang: string | null = target.getAttribute('data-lang');
            if (tempLang !== null) {
                this.controller.setCurrentLang(tempLang);
            }
            this.controller.closePopUp();
        } else {
            const ulLang: HTMLElement = createNewElement('ul', ['ul_lang']);
            const liLangEn: HTMLElement = createNewElement('li', ['lang_li'], ulLang);
            liLangEn.textContent = 'EN';
            liLangEn.setAttribute('data-lang', 'EN');
            const liLangBy: HTMLElement = createNewElement('li', ['lang_li'], ulLang);
            liLangBy.textContent = 'BY';
            liLangBy.setAttribute('data-lang', 'BY');
            const liLangRu: HTMLElement = createNewElement('li', ['lang_li'], ulLang);
            liLangRu.textContent = 'RU';
            liLangRu.setAttribute('data-lang', 'RU');

            const popUpView: HTMLElement = createPopUp(ulLang, this.langHeader);
            setTimeout(() => {
                this.controller.isPopUp = true;
            }, 100);
        }
    }

    drawPopUpCurrency(target: HTMLElement) {
        if (document.querySelector('.popup_view')) {
            const tempCurrency: string | null = target.getAttribute('data-curr');
            if (tempCurrency !== null) {
                this.controller.setCurrentCurrency(tempCurrency);
            }
            this.controller.closePopUp();
        } else {
            const ulCurrency: HTMLElement = createNewElement('ul', ['ul_currency'], this.currencyChangeHeader);
            const liCurrUsd: HTMLElement = createNewElement('li', ['currency_li'], ulCurrency);
            liCurrUsd.textContent = 'USD';
            liCurrUsd.setAttribute('data-curr', 'USD');
            const liCurrEur: HTMLElement = createNewElement('li', ['currency_li'], ulCurrency);
            liCurrEur.textContent = 'EUR';
            liCurrEur.setAttribute('data-curr', 'EUR');
            const popUpView: HTMLElement = createPopUp(ulCurrency, this.currencyChangeHeader);
            setTimeout(() => {
                this.controller.isPopUp = true;
            }, 100);
        }
    }
}
