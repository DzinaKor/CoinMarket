import Controller from '../Controllers/Controller';

export default class ChartView {
    public conttroller: Controller;

    public chartHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        this.chartHTML = this.conttroller.createNewElement('div', ['chart_container']);
    }

    viewChart() {
        this.chartHTML.innerHTML = 'this is Chart';
        this.chartHTML.classList.add('chart_main_container');
        this.conttroller.pagesContainerHTML.innerHTML = '';
        this.conttroller.pagesContainerHTML.appendChild(this.chartHTML);
    }

    viewMainPageChart() {
        const mainPage: HTMLElement|null = document.querySelector('.main_page_container');
        this.chartHTML.classList.remove('chart_main_container');
        if (mainPage) {
            this.chartHTML.innerHTML = 'this is Main Page Chart';
            mainPage.appendChild(this.chartHTML);
        }
    }
}
