import { ChartData } from '../api/apiRequestTypes';

export type ChartDataRow = (number | number[])[]

export type ChartOption = {
    candlestick: {
        theme: {
            mode: string
        },
        plotOptions: {
            candlestick: {
                wick: {
                    useFillColor: boolean;
                };
                colors: {
                    downward: string;
                    upward: string;
                }
            }
        };
        xaxis: {
            fillColor: string;
            borderColor: string;
            tickPlacement: string;
            type: string;
            opacity: number;
            labels: {
                datetimeFormatter: {
                    month: string;
                    hour: string;
                    year: string;
                    day: string;
                };
                hideOverlappingLabels: boolean;
            }
        };
        series: [{
            data: ChartData[];
            name: string;
        }],
        title: {
            text: string;
            align: string;
        };
        fill: {
            type: string;
        };
        chart: {
            type: string;
            background: string;
        };
        stroke: {
            width: number;
        };
        yaxis: {
            tooltip: {
                enabled: boolean;
            };
            title: {
                text: string;
            }
        }
    };
    line: {
        theme: {
            mode: string;
        },
        xaxis: {
            fillColor: string;
            borderColor: string;
            tickPlacement: string;
            type: string;
            opacity: number;
            labels: {
                datetimeFormatter: {
                    month: string;
                    hour: string;
                    year: string;
                    day: string;
                };
                hideOverlappingLabels: boolean;
            }
            tooltip: {
                enabled: boolean;
            }
        };
        series: [{
            data: ChartData[];
            name: string;
        }],
        tooltip: {
            x: {
                format: string;
            }
        };
        markers: {
            size: number;
            style: string;
        };
        fill: {
            type: string;
        };
        title: {
            text: string;
            align: string;
        };
        chart: {
            zoom: {
                autoScaleYaxis: boolean;
            };
            type: string;
            background: string;
        };
        stroke: {
            curve: string;
            width: number;
            colors: string[];
        };
        yaxis: {
            tooltip: {
                enabled: boolean;
            };
            label: {
                show: boolean;
                style: {
                    color: string;
                    background: string;
                };
                text: string;
            };
            title: {
                text: string;
            }
        }
    }
}