import ApexCharts from 'apexcharts';
import Controller from '../Controllers/Controller';
import { getChartData } from '../api/apiRequest';
import { ChartData } from '../api/apiRequestTypes';
import { ChartOption } from '../App/chartType';

export default class Chart {

    public days: string[] = ['1', '7', '14', '30', '90', '180', '365', 'max'];

    public chartView = ['candlestick', 'line'];

    public controller: Controller;

    public currentView: string;

    public selectedDaysOption: string;

    public cryptoCurrency: string;

    public chartData: ChartData[];

    public chartObject: ApexCharts | undefined;

    public chartModalObject: ApexCharts | undefined;

    constructor(controller: Controller, cryptoCurrency = 'bitcoin') {
        this.controller = controller;
        this.cryptoCurrency = cryptoCurrency;
        this.selectedDaysOption = '7';
        this.chartData = [];
        this.currentView = 'candlestick';
    }

    getOptions(): ChartOption {
        return {
            candlestick: {
                chart: {
                    type: 'candlestick'
                },
                stroke: {
                    width: 1
                },
                title: {
                    text: `${this.controller.getLangValue('chart_candle_chart')} ${this.cryptoCurrency.toUpperCase()}/${this.controller.mainData.selectedCurrency.id}`,
                    align: 'left'
                },
                series: [{
                    name: 'sales',
                    data: this.chartData
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
                        text: `${this.controller.getLangValue('chart_price')}, ${this.controller.mainData.selectedCurrency.symbol}`
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                fill: {
                    type: 'gradient'
                },
                plotOptions: {
                    candlestick: {
                        colors: {
                            upward: '#428ae7',
                            downward: '#5e5f62'
                        },
                        wick: {
                            useFillColor: true
                        }
                    }
                }
            },
            line: {
                chart: {
                    type: 'area',
                    zoom: {
                        autoScaleYaxis: true
                    }
                },
                markers: {
                    size: 0,
                    style: 'hollow'
                },
                stroke: {
                    width: 4,
                    curve: 'smooth',
                    colors: ['#287d91']
                },
                fill: {
                    type: 'gradient'
                },
                title: {
                    text: `${this.controller.getLangValue('chart_line_chart')} ${this.cryptoCurrency.toUpperCase()}/${this.controller.mainData.selectedCurrency.id}`,
                    align: 'left'
                },
                series: [{
                    name: 'sales',
                    data: this.chartData
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
                    },
                    tooltip: {
                        enabled: true
                    }
                },
                yaxis: {
                    title: {
                        text: `${this.controller.getLangValue('chart_price')}, ${this.controller.mainData.selectedCurrency.symbol}`
                    },
                    tooltip: {
                        enabled: true
                    },
                    label: {
                        show: true,
                        text: 'Support',
                        style: {
                            color: '#fff',
                            background: '#00E396'
                        }
                    }
                },
                tooltip: {
                    x: {
                        format: 'dd MMM yyyy'
                    }
                }
            }
        };
    }

    async getData(): Promise<ChartData[]> {
        this.chartData = await getChartData(this.cryptoCurrency, this.controller.mainData.selectedCurrency.id.toLowerCase(), this.selectedDaysOption);
        return this.chartData;
    }

    setSelectedDaysOption(selectedOption: string) {
        this.selectedDaysOption = selectedOption;
    }

    setCurrentView(currentView: string) {
        this.currentView = currentView;
    }

    setChartObject(chartObject: ApexCharts) {
        this.chartObject = chartObject;
    }

    setCryptoCurrency(cryptoCurrency: string) {
        this.cryptoCurrency = cryptoCurrency;
    }

    setChartModalObject(chartObject: ApexCharts) {
        this.chartModalObject = chartObject;
    }
}
