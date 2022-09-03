export type LangType = {
    [key: string]: string | LangType;
}

const lang: LangType = {
    'en': {
        calc_header: 'Cryptocurrency calculator and converter',
        calc_placeholder: 'Enter amount to convert',
        calc_popular_exchanges: 'Popular options for converting cryptocurrencies',
        chart_line_chart: 'Line Chart',
        chart_candle_chart: 'Candle Chart',
        chart_price: 'Price'
    },
    'ru': {
        calc_header: 'Калькулятор и конвертер криптовалют',
        calc_placeholder: 'Введите сумму для конвертации',
        calc_popular_exchanges: 'Популярные варианты конвертации криптовалют',
        chart_line_chart: 'Линейный график',
        chart_candle_chart: 'Свечной график',
        chart_price: 'Цена:'

    },
    'by': {
        calc_header: '',
        calc_placeholder: '',
        calc_popular_exchanges: '',
        chart_line_chart: '',
        chart_candle_chart: '',
        chart_price: ''
    }
};

export default lang;