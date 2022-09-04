import ApexCharts from 'apexcharts';
import Controller from '../Controllers/Controller';
import { createNewElement, createOptionElement } from './BasicView';
import Chart from '../Models/Chart';

export default class ChartView {
    public controller: Controller;

    constructor(controller: Controller) {
        this.controller = controller;
    }

    drawChart(rootElement: HTMLElement, chartModel: Chart) {
        const chartButton = createNewElement('button', ['chart-btn'], rootElement);
        chartButton.id = 'chart-button';
        chartButton.textContent = this.controller.getLangValue('chart_line_chart');
        const daysCount = createNewElement('select', ['days-count'], rootElement) as HTMLSelectElement;
        daysCount.setAttribute('id', 'days-count');
        chartModel.days.forEach((item) => {
            createOptionElement(item.toString(), item.toString(), daysCount);
        });
        daysCount.value = chartModel.selectedDaysOption;
        const chartElement = createNewElement('div', [], rootElement);
        chartElement.id = 'chart';
        chartModel.setChartObject(new ApexCharts(document.querySelector('#chart'), chartModel.getOptions().candlestick));
        chartModel.chartObject!.render();
    }

    static redrawChart(chartModel: Chart) {
        chartModel.getData().then(() => {
            chartModel.chartObject!.updateOptions(
                (chartModel.currentView === 'candlestick')
                    ? chartModel.getOptions().candlestick
                    : chartModel.getOptions().line);
        });
    }
}

