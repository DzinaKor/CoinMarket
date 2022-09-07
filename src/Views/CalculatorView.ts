import { createNewElement, createOptionElement } from './BasicView';
import Controller from '../Controllers/Controller';


export default class CalculatorView {
    private controller: Controller;

    public calculatorHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.calculatorHTML = createNewElement('div', ['calc_container']);
    }

    viewCalculator() {
        this.calculatorHTML.innerHTML = '';
        const calcHeader = createNewElement('h2', ['calc-h2'], this.calculatorHTML);
        calcHeader.textContent = this.controller.getLangValue('calc_header');
        const calcWrapper = createNewElement('div', ['calc-wrapper'], this.calculatorHTML);
        const currentAmountWrapper = createNewElement('div', ['calc-flex-row'], calcWrapper);
        const currentAmount = createNewElement('input', ['calc-amount', 'calc-control'], currentAmountWrapper);

        currentAmount.setAttribute('type', 'number');
        currentAmount.setAttribute('placeholder', this.controller.getLangValue('calc_placeholder'));
        currentAmount.setAttribute('min', '0');

        const currencyBlock = createNewElement('div', ['calc-flex-row'], calcWrapper);
        const originalCurrencySelect = createNewElement('select', ['calc-control'], currencyBlock);
        originalCurrencySelect.setAttribute('id', 'select-original-currency');
        const exchangeCurrencyButton = createNewElement('button', ['calc-exchange-btn'], currencyBlock);
        exchangeCurrencyButton.setAttribute('type', 'button');
        exchangeCurrencyButton.textContent = '⇆';
        const receivedCurrencySelect = createNewElement('select', ['calc-control'], currencyBlock);
        receivedCurrencySelect.setAttribute('id', 'select-received-currency');

        this.controller.calculatorModel.currencyList.forEach((item) => {
            const currencyData = this.controller.calculatorModel.exchangeData[item];
            createOptionElement(item, `${currencyData.name} - ${currencyData.unit}`, originalCurrencySelect);
            createOptionElement(item, `${currencyData.name} - ${currencyData.unit}`, receivedCurrencySelect);
        });

        const exchangeDescription = createNewElement('div', ['calc-flex-row'], calcWrapper);
        const textExchangeDescription = createNewElement('p', ['calc-result'], exchangeDescription);
        textExchangeDescription.id = 'calc-result';
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.calculatorHTML);

        const calcExchangeBlock = createNewElement('div', ['calc-exchange-block'], this.calculatorHTML);
        const calcExchangeBlockHeader = createNewElement('h2', [], calcExchangeBlock);
        calcExchangeBlockHeader.textContent = this.controller.getLangValue('calc_popular_exchanges');
        const calcExchangeContent = createNewElement('div', ['calc-exchange-content'], calcExchangeBlock);

        this.controller.calculatorModel.cryptoList.forEach(crypto => {
            const calcColumn = createNewElement('div', ['calc-column'], calcExchangeContent);
            this.controller.calculatorModel.featList.forEach(fiat => {
                const element = document.createElement('div');
                element.classList.add('exchange-pair');
                element.setAttribute('crypto', crypto);
                element.setAttribute('fiat', fiat);
                element.textContent = `${crypto.toUpperCase()} ➞ ${fiat.toUpperCase()}`;
                calcColumn.appendChild(element);
            });
            calcExchangeContent.appendChild(calcColumn);
        });

    }
}
