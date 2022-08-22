import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class ChartView {
    public controller: Controller;

    public chartHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.chartHTML = createNewElement('div', ['chart_container']);
    }

    viewChart() {
        this.chartHTML.innerHTML = 'this is Chart';
        this.chartHTML.classList.add('chart_main_container');
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.chartHTML);
    }

    viewMainPageChart() {
        const mainPage: HTMLElement | null = document.querySelector('.mainpage_container');
        this.chartHTML.classList.remove('chart_main_container');
        if (mainPage) {
            this.chartHTML.innerHTML = 'this is Main Page Chart';
            mainPage.appendChild(this.chartHTML);
        }
    }
}
