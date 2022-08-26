import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class Header {
    public controller: Controller;

    public headerHTML: HTMLElement;
    public darkmodeHeader: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.headerHTML = document.querySelector('header') as HTMLElement;
        this.darkmodeHeader = createNewElement('div', ['darkmode_container']);
        this.viewHeader();
    }

    viewHeader() {
        const headerContainer: HTMLElement = createNewElement('div', ['header_container'], this.headerHTML);

        const logoNameHeader: HTMLElement = createNewElement('div', ['logoname_container'], headerContainer);
        const logoHeader: HTMLImageElement = createNewElement('img', ['logo_header'], logoNameHeader) as HTMLImageElement;
        logoHeader.alt = 'logo';
        logoHeader.src = '' /// add logo 
        const nameHeader: HTMLElement = createNewElement('h1', ['name_header'], logoNameHeader);
        nameHeader.textContent = 'CoinMarket';

        const controlHeader: HTMLElement = createNewElement('div', ['control_header'], headerContainer);

        const langHeader: HTMLElement = createNewElement('div', ['lang_container'], controlHeader);
        const ulLang: HTMLElement = createNewElement('ul', ['ul_lang'], langHeader);
        const liLangEn: HTMLElement = createNewElement('li', ['lang_li'], ulLang);
        liLangEn.textContent = 'EN';
        const liLangBy: HTMLElement = createNewElement('li', ['lang_li'], ulLang);
        liLangBy.textContent = 'BY';
        const liLangRu: HTMLElement = createNewElement('li', ['lang_li'], ulLang);
        liLangRu.textContent = 'RU';

        const currencyChangeHeader: HTMLElement = createNewElement('div', ['currency_header'], controlHeader);
        const ulCurrency: HTMLElement = createNewElement('ul', ['ul_currency'], currencyChangeHeader);
        const liCurrUsd: HTMLElement = createNewElement('li', ['currency_li'], ulCurrency);
        liCurrUsd.textContent = 'USD';
        const liCurrEur: HTMLElement = createNewElement('li', ['currency_li'], ulCurrency);
        liCurrEur.textContent = 'EUR';

        controlHeader.appendChild(this.darkmodeHeader);

        const authHeader: HTMLElement = createNewElement('div', ['auth_header'], controlHeader);
    }
}
