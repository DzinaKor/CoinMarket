import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';
import '../css/searchSuggestions.css';

export default class Header {
    public controller: Controller;

    public headerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.headerHTML = document.querySelector('header') as HTMLElement;
        this.headerHTML.innerHTML = 'this is Header';
        this.viewSearch();
    }

    viewSearch() {
        const searchAutocomplete = createNewElement('div', ['search-autocomplete'], this.headerHTML);
        const searchInput = createNewElement('input', [], searchAutocomplete);
        searchInput.id = 'search-input';
        searchInput.setAttribute('type', 'text');
        searchInput.setAttribute('name', 'searchField');
        searchInput.setAttribute('placeholder', 'Search...');
        this.controller.searchAutocomplete();
    }
}
