import Controller from '../Controllers/Controller';

export default class CalculatorView {
    public conttroller: Controller;

    public calculatorHTML: HTMLElement;

    constructor(controller: Controller) {
        this.conttroller = controller;
        this.calculatorHTML = this.conttroller.createNewElement('div', ['calculator_container']);
    }

    viewCalculator() {
        this.calculatorHTML.innerHTML = 'this is Calculator';
        this.conttroller.pagesContainerHTML.innerHTML = '';
        this.conttroller.pagesContainerHTML.appendChild(this.calculatorHTML);
    }
}
