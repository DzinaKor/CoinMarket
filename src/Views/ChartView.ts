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
        this.chartHTML.innerHTML = 'this is Chart';
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
        const daysCount = createNewElement('select', ['days-count'], this.chartHTML) as HTMLSelectElement;
        daysCount.setAttribute('id', 'days-count');
        this.controller.chart.days.forEach((item) => {
            createOptionElement(item.toString(), item.toString(), daysCount);
        });
        daysCount.value = this.controller.chart.selectedDaysOption;
        this.setChartListeners();

        const chartElement = createNewElement('div', [], this.chartHTML);
        chartElement.id = 'chart';
        this.controller.chart.getData().then((chartData) => {
            const options = {
                chart: {
                    type: 'candlestick'
                },
                title: {
                    text: 'CandleStick Chart',
                    align: 'left'
                },
                series: [{
                    name: 'sales',
                    data: chartData
                }],
                xaxis: {
                    type: 'datetime',
                    tickPlacement: 'on',
                    borderColor: '#c2c2c2',
                    fillColor: '#c2c2c2',
                    opacity: 0.3,
                    labels: {
                        hideOverlappingLabels: true,
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: 'MMM \'yy',
                            day: 'dd MMM',
                            hour: 'HH:mm'
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: 'Price'
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            };
            this.chartObject = new ApexCharts(document.querySelector('#chart'), options);
            this.chartObject.render();
        });
    }

    redrawChart() {
        this.controller.chart.getData().then((chartData) => {
            this.chartObject?.updateSeries([{
                data: chartData
            }], true);
        });
    }

    setChartListeners() {
        const daysSelector = document.querySelector('#days-count') as HTMLSelectElement;
        daysSelector.addEventListener('change', () => {
            this.controller.chart.selectedDaysOption = daysSelector.value;
            this.redrawChart();
        });
    }
}

