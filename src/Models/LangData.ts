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
        placeholder_searchInput: 'Enter currency name...',
        marketCup_rank: 'Rank:',
        tab_mainPage: 'Main Page',
        tab_calcPage: 'Calculator',
        tab_newsPage: 'News Page',
        tab_chartPage: 'Chart Page',
        tab_watchPage: 'Watch Page',
        tab_portfolioPage: 'Portfolio',


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
        placeholder_searchInput: 'Введите название валюты...',
        marketCup_rank: 'Ранг:',
        tab_mainPage: 'Главная',
        tab_calcPage: 'Калькулятор валют',
        tab_newsPage: 'Новости',
        tab_chartPage: 'График',
        tab_watchPage: 'Просмотренные валюты',
        tab_portfolioPage: 'Портфолио',





    },
    'by': {
        calc_header: 'Калькулятар і канвэртар крыптавалют',
        calc_placeholder: 'Увядзіце суму для канвертавання',
        calc_popular_exchanges: 'Папулярныя варыянты канвертавання крыптавалют',
        chart_line_chart: 'Лінейны графік',
        chart_candle_chart: 'Свячны графік',
        chart_price: 'Кошт',
        coin_list_name: '',
        coin_list_price: '',
        coin_list_marketCup: '',
        coin_list_totalVolume: '',
        coin_list_circulatingSupply: '',
        placeholder_searchInput: '',
        marketCup_rank: '',
        tab_mainPage: '',
        tab_calcPage: '',
        tab_newsPage: '',
        tab_chartPage: '',
        tab_watchPage: '',
        tab_portfolioPage: '',



    }
};

export default lang;