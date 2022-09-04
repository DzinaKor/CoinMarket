import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class TabsView {
    public controller: Controller;

    public tabsContainerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        const mainHTML: HTMLElement = this.controller.mainView.mainHTML as HTMLElement;
        this.tabsContainerHTML = createNewElement('div', ['tabs_container'], mainHTML);
        // this.tabsContainerHTML.innerHTML = 'this is Tabs';
        this.createButtons();
    }

    createButtons() {
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.mainPage', 'main'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.calcPage', 'calc'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.newsPage', 'news'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.chartPage', 'chart'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.watchPage', 'watchlist'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.portfolioPage', 'portfolio'));
    }

    addButton(name: string, com: string): HTMLButtonElement {
        const button: HTMLButtonElement = createNewElement('button', ['tab_button']) as HTMLButtonElement;
        button.innerText = name;
        button.addEventListener('click', () => {
            this.controller.changePage(com);
        });
        return button;
    }
}
