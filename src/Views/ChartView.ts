import ApexCharts from 'apexcharts';
import Controller from '../Controllers/Controller';
import { createNewElement, createOptionElement } from './BasicView';
import Chart from '../Models/Chart';
import '../css/modalWindowChart.css';

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
        const modalBtn = createNewElement('button', ['btn-modal-window'], rootElement);
        modalBtn.id = 'btn_modal-window';
        modalBtn.textContent = 'Fullscreen mode';
        const chartElement = createNewElement('div', [], rootElement);
        chartElement.id = 'chart';
        chartModel.setChartObject(new ApexCharts(document.querySelector('#chart'), chartModel.getOptions().candlestick));
        chartModel.chartObject!.render();

        const chartModalRoot = createNewElement('div', ['modal-chart'], rootElement);
        chartModalRoot.id = 'chart_modal';
        ChartView.createChartModalWindow(modalBtn, chartModel);
    }

    static redrawChart(chartModel: Chart) {
        chartModel.getData().then(() => {
            if (chartModel.currentView === 'candlestick') {
                chartModel.chartObject?.destroy();
                chartModel.setChartObject(new ApexCharts(document.querySelector('#chart'), chartModel.getOptions().candlestick));
                chartModel.chartObject?.render();

                chartModel.chartModalObject?.destroy();
                chartModel.setChartModalObject(new ApexCharts(document.querySelector('#modal_chart'), chartModel.getOptions().candlestick));
                chartModel.chartModalObject?.render();
            } else {
                chartModel.chartObject?.destroy();
                chartModel.setChartObject(new ApexCharts(document.querySelector('#chart'), chartModel.getOptions().line));
                chartModel.chartObject?.render();

                chartModel.chartModalObject?.destroy();
                chartModel.setChartModalObject(new ApexCharts(document.querySelector('#modal_chart'), chartModel.getOptions().line));
                chartModel.chartModalObject?.render();
            }
        });
    }

    static createChartModalWindow(modalBtn: HTMLElement, chartModel: Chart) {
        const chartModal = document.querySelector('#chart_modal') as HTMLElement;
        const modalContent = createNewElement('div', ['modal-content'], chartModal);
        const closeBtnModal = createNewElement('button', ['close-modal-window'], modalContent);
        closeBtnModal.textContent = 'X';
        const modalChart = createNewElement('div', [], modalContent);
        modalChart.id = 'modal_chart';

        chartModel.setChartModalObject(new ApexCharts(document.querySelector('#modal_chart'), chartModel.getOptions().candlestick));
        chartModel.chartModalObject!.render();
        modalBtn.addEventListener('click', () => {
            chartModal.style.display = 'block';
        });
        closeBtnModal.addEventListener('click', () => {
            chartModal.style.display = 'none';
        });
        window.addEventListener('click', (event) => {
            if (event.target === chartModal) {
                chartModal.style.display = 'none';
            }
        });
    }

}

