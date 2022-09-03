import ApexCharts from 'apexcharts';
import Controller from '../Controllers/Controller';
import { createNewElement, createOptionElement } from './BasicView';

export default class ChartView {
    public controller: Controller;

    public chartObject: ApexCharts | undefined;

    public chartHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.chartHTML = createNewElement('div', ['chart_container']);
    }

    viewChart() {
        this.chartHTML.innerHTML = '';
        this.chartHTML.classList.add('chart_main_container');
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.chartHTML);
    }

    viewMainPageChart() {
        const mainPage: HTMLElement | null = document.querySelector('.mainpage_container');
        this.chartHTML.classList.remove('chart_main_container');
        if (mainPage) {
            this.chartHTML.innerHTML = '';
            mainPage.appendChild(this.chartHTML);
            this.drawChart();
        }
    }

    drawChart() {
        const chartButton = createNewElement('button', ['chart-btn'], this.chartHTML);
        chartButton.id = 'chart-button';
        chartButton.textContent = this.controller.getLangValue('chart_line_chart');
        const daysCount = createNewElement('select', ['days-count'], this.chartHTML) as HTMLSelectElement;
        daysCount.setAttribute('id', 'days-count');
        this.controller.chart.days.forEach((item) => {
            createOptionElement(item.toString(), item.toString(), daysCount);
        });
        daysCount.value = this.controller.chart.selectedDaysOption;
        this.setChartListeners();
        const chartElement = createNewElement('div', [], this.chartHTML);
        chartElement.id = 'chart';
        this.controller.chart.getData().then(() => {
            const options = this.controller.chart.getOptions();
            this.chartObject = new ApexCharts(document.querySelector('#chart'), options.candlestick);
            this.chartObject.render();
        });
    }

    redrawChart() {
        this.controller.chart.getData().then((chartData) => {
            /* this.chartObject?.updateSeries([{
                data: chartData
            }], true); */
            const options = this.controller.chart.getOptions();
            this.chartObject?.updateOptions(
                (this.controller.chart.currentView === 'candlestick')
                    ? options.candlestick
                    : options.line);
        });
    }

    setChartListeners() {
        const daysSelector = document.querySelector('#days-count') as HTMLSelectElement;
        daysSelector.addEventListener('change', () => {
            this.controller.chart.selectedDaysOption = daysSelector.value;
            this.redrawChart();
        });
        const chartViewButton = document.querySelector('#chart-button') as HTMLSelectElement;

        chartViewButton.addEventListener('click', () => {
            if (this.controller.chart.currentView === 'candlestick') {
                this.controller.chart.currentView = 'line';
                this.chartObject?.updateOptions(this.controller.chart.getOptions().line, true);
                chartViewButton.textContent = this.controller.getLangValue('chart_candle_chart');
            } else {
                this.controller.chart.currentView = 'candlestick';
                this.chartObject?.updateOptions(this.controller.chart.getOptions().candlestick, true);
                chartViewButton.textContent = this.controller.getLangValue('chart_line_chart');
            }
        });
    }
}

