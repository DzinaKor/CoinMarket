import Controller from '../Controllers/Controller';
import { getChartData } from '../api/apiRequest';
import { ChartData } from '../api/apiRequestTypes';

export default class Chart {

    public days: string[] = ['1', '7', '14', '30', '90', '180', '365', 'max'];

    public controller: Controller;

    public selectedDaysOption: string;

    public cryptoCurrency: string;

    public chartData: ChartData[];

    constructor(controller: Controller) {
        this.controller = controller;
        this.cryptoCurrency = 'bitcoin';
        this.selectedDaysOption = '7';
        this.chartData = [];
    }

    async getData(): Promise<ChartData[]> {
        this.chartData = await getChartData(this.cryptoCurrency, this.controller.mainData.selectedCurrency.id.toLowerCase(), this.selectedDaysOption);
        return this.chartData;
    }


}
