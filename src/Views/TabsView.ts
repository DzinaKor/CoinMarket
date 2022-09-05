import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class TabsView {
    public controller: Controller;

    public tabsContainerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        const {mainHTML} = this.controller.mainView;
        this.tabsContainerHTML = createNewElement('div', ['tabs_container'], mainHTML);
        this.tabsContainerHTML.innerHTML = '';
        this.createButtons();
    }

    createButtons() {
        this.tabsContainerHTML.appendChild(this.addButton('tab_mainPage', 'main'));
        this.tabsContainerHTML.appendChild(this.addButton('tab_calcPage', 'calc'));
        this.tabsContainerHTML.appendChild(this.addButton('tab_newsPage', 'news'));
        this.tabsContainerHTML.appendChild(this.addButton('tab_chartPage', 'chart'));
        this.tabsContainerHTML.appendChild(this.addButton('tab_watchPage', 'watchlist'));
        this.tabsContainerHTML.appendChild(this.addButton('tab_portfolioPage', 'portfolio'));
    }

    addButton(name: string, com: string): HTMLButtonElement {
        const button: HTMLButtonElement = createNewElement('button', ['tab_button']) as HTMLButtonElement;
        button.innerText = this.controller.getLangValue(name);
        button.addEventListener('click', () => {
            this.controller.changePage(com);
        });
        return button;
    }
}