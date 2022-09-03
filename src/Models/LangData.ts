
export type LangType = {
    [key: string]: string | LangType ;
}

const lang: LangType = {
    'en': {
        calc_header: 'Cryptocurrency calculator and converter',
        calc_placeholder: 'Enter amount to convert',
        calc_popular_exchanges: 'Popular options for converting cryptocurrencies',

    },
    'ru': {
        calc_header: 'Калькулятор и конвертер криптовалют',
        calc_placeholder: 'Введите сумму для конвертации',
        calc_popular_exchanges: 'Популярные варианты конвертации криптовалют'
    },
    'by': {
        calc_header: '',
        calc_placeholder: '',
        calc_popular_exchanges: '',
    }
};

export default lang;