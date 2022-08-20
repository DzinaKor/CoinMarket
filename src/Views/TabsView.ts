import Controller from '../Controllers/Controller';

export default class TabsView {
    public conttroller: Controller;

    public tabsContainerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        const mainHTML: HTMLElement = this.conttroller.mainView.mainHTML as HTMLElement;
        this.tabsContainerHTML = this.conttroller.createNewElement('div', ['tabs_container'], mainHTML);
        this.tabsContainerHTML.innerHTML = 'this is Tabs';
        this.createButtons();
    }

    createButtons() {
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.mainPage', 'main'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.calcPage', 'calc'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.newsPage', 'news'));
        this.tabsContainerHTML.appendChild(this.addButton('LangJSON.chartPage', 'chart'));
    }

    addButton(name: string, com: string): HTMLButtonElement {
        const button:HTMLButtonElement = this.conttroller.createNewElement('button', ['tab_button']) as HTMLButtonElement;
        button.innerText = name;
        button.addEventListener('click', () => {
            this.conttroller.changePage(com);
        });
        return button;
    }
}
