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

    updateHeaderLanguage() {
        const searchInput = document.querySelector('#search-input') as HTMLElement;
        searchInput.setAttribute('placeholder', this.controller.getLangValue('placeholder_searchInput'));
    }

    viewHeader() {
        this.headerHTML.innerHTML = '';
        const headerContainer: HTMLElement = createNewElement('div', ['header_container'], this.headerHTML);

        const logoNameHeader: HTMLElement = createNewElement('div', ['logoname_container'], headerContainer);
        const logoHeader: HTMLImageElement = createNewElement('img', ['logo_header'], logoNameHeader) as HTMLImageElement;
        logoHeader.alt = 'logo';
        logoHeader.src = './assets/images/ava2.svg';
        const nameHeader: HTMLElement = createNewElement('h1', ['name_header'], logoNameHeader);
        nameHeader.textContent = 'CoinMarket';

        const controlHeader: HTMLElement = createNewElement('div', ['control_header'], headerContainer);

        const searchAutocomplete = createNewElement('div', ['search-autocomplete'], controlHeader);
        const searchInput = createNewElement('input', [], searchAutocomplete);
        searchInput.id = 'search-input';
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('name', 'searchField');
        searchInput.setAttribute('placeholder', this.controller.getLangValue('placeholder_searchInput'));
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
        this.darkmodeHeader.src = './assets/images/moon_dark.svg';

        this.darkmodeHeader.addEventListener('click', () => {
            const body = document.querySelector('body') as HTMLElement;
            if (this.controller.mainData.isDarkMode) {
                this.darkmodeHeader.src = './assets/images/moon_dark.svg';
                this.controller.mainData.setDarkMode(false);
                body.classList.remove('dark-mode');
                this.controller.changePage(this.controller.mainData.currentPage);
            } else {
                this.darkmodeHeader.src = './assets/images/sun_light.svg';
                this.controller.mainData.setDarkMode(true);
                body.classList.add('dark-mode');
                this.controller.changePage(this.controller.mainData.currentPage);
            }
        });

        createNewElement('div', ['auth_header'], controlHeader);
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
            this.controller.mainData.langList.forEach(lang => {
                const liLangEn: HTMLElement = createNewElement('li', ['lang_li'], ulLang);
                liLangEn.textContent = lang;
                liLangEn.setAttribute('data-lang', lang);
            });
            const popUpView: HTMLElement = createPopUp(ulLang, this.langHeader);
            setTimeout(() => {
                this.controller.isPopUp = true;
            }, 100);

            popUpView.addEventListener('click', (event) => {
                const element = event.target as HTMLElement;
                if (element.hasAttribute('data-lang')) {
                    this.controller.setCurrentLang(element.getAttribute('data-lang') as string);
                    this.updateHeaderLanguage();
                    this.controller.tabsView.reDrawButtons();
                    this.controller.changePage(this.controller.mainData.currentPage);
                }
            });
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
            this.controller.mainData.currencyList.forEach(currency => {
                const liCurr: HTMLElement = createNewElement('li', ['currency_li'], ulCurrency);
                liCurr.textContent = currency.id;
                liCurr.setAttribute('data-curr', currency.id);
            });
            const popUpView: HTMLElement = createPopUp(ulCurrency, this.currencyChangeHeader);
            setTimeout(() => {
                this.controller.isPopUp = true;
            }, 100);

            popUpView.addEventListener('click', (event) => {
                const element = event.target as HTMLElement;
                if (element.hasAttribute('data-curr')) {
                    this.controller.setCurrentCurrency(element.getAttribute('data-curr') as string);
                    this.controller.changePage(this.controller.mainData.currentPage);
                }
            });
        }
    }
}
