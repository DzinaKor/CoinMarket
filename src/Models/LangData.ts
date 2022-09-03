export type LangType = {
    [key: string]: string | LangType;
}

const lang: LangType = {
    'en': {
        calc_header: 'Cryptocurrency calculator and converter',
        calc_placeholder: 'Enter amount to convert',
        calc_popular_exchanges: 'Popular options for converting cryptocurrencies',
        chart_line_chart: 'Line Chart',
        chart_candle_chart: 'Candlestick Chart',
        chart_price: 'Price',
        coin_list_name: 'Name',
        coin_list_price: 'Price',
        coin_list_marketCup: 'Market Cup',
        coin_list_marketPercent:'Value (24h %)',
        coin_list_totalVolume: 'Total Volume',
        coin_list_circulatingSupply:'Circulating Supply',

    },
    'ru': {
        calc_header: 'Калькулятор и конвертер криптовалют',
        calc_placeholder: 'Введите сумму для конвертации',
        calc_popular_exchanges: 'Популярные варианты конвертации криптовалют',
        chart_line_chart: 'Линейный график',
        chart_candle_chart: 'Свечной график',
        chart_price: 'Цена:',
        coin_list_name: 'Наименование',
        coin_list_price: 'Текущая цена',
        coin_list_marketCup: 'Рыночная капитализация',
        coin_list_marketPercent:'Объём (24ч %)',
        coin_list_totalVolume: 'Объём сделок',
        coin_list_circulatingSupply: 'Циркулирующее предложение',



    },
    'by': {
        calc_header: '',
        calc_placeholder: '',
        calc_popular_exchanges: '',
        chart_line_chart: '',
        chart_candle_chart: '',
        chart_price: '',
        coin_list_name: '',
        coin_list_price: '',
        coin_list_marketCup: '',
        coin_list_totalVolume: '',
        coin_list_circulatingSupply: '',


    }
};

export default lang;