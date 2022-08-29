import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';
import '../css/searchSuggestions.css';

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
        logoHeader.src = 'https://img.icons8.com/pastel-glyph/64/000000/coin-flame.png'
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

        const langContainer: HTMLElement = createNewElement('div', ['lang_container'], controlHeader);
        const langBtn: HTMLElement = createNewElement('button', ['lang_btn'], langContainer);
        langBtn.textContent = 'Language';
        const langDropdownContent: HTMLElement = createNewElement('div', ['lang_dropdown'], langBtn);
        const aLangEn: HTMLElement = createNewElement('a', [], langDropdownContent);
        aLangEn.id = 'lang_en';
        aLangEn.textContent = 'EN';
        const aLangEnHref = document.getElementById('lang_en') as HTMLAnchorElement;
        aLangEnHref.href = '#';
        const aLangBy: HTMLElement = createNewElement('a', [], langDropdownContent);
        aLangBy.id = 'lang_by';
        aLangBy.textContent = 'BY';
        const aLangByHref = document.getElementById('lang_by') as HTMLAnchorElement;
        aLangByHref.href = '#';
        const aLangRu: HTMLElement = createNewElement('a', [], langDropdownContent);
        aLangRu.id = 'lang_ru';
        aLangRu.textContent = 'RU';
        const aLangRuHref = document.getElementById('lang_ru') as HTMLAnchorElement;
        aLangRuHref.href = '#';
        
        const currContainer: HTMLElement = createNewElement('div', ['curr_container'], controlHeader);
        const currBtn: HTMLElement = createNewElement('button', ['curr_btn'], currContainer);
        currBtn.textContent = 'Currency';
        const currDropdownContent: HTMLElement = createNewElement('div', ['curr_dropdown'], currBtn);
        const aCurrUsd: HTMLElement = createNewElement('a', [], currDropdownContent);
        aCurrUsd.id = 'curr_usd';
        aCurrUsd.textContent = 'USD';
        const aCurrUsdHref = document.getElementById('curr_usd') as HTMLAnchorElement;
        aCurrUsdHref.href = '#';
        const aCurrEur: HTMLElement = createNewElement('a', [], currDropdownContent);
        aCurrEur.id = 'curr_eur';
        aCurrEur.textContent = 'EUR';
        const aCurrEurHref = document.getElementById('curr_eur') as HTMLAnchorElement;
        aCurrEurHref.href = '#';

        controlHeader.appendChild(this.darkmodeHeader);

        const authHeader: HTMLElement = createNewElement('div', ['auth_header'], controlHeader);
        authHeader.textContent = 'Authorization'
    }
}
