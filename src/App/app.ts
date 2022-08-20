import Controller from '../Controllers/Controller';

export default class App {
    public mainController: Controller;

    constructor() {
        this.mainController = new Controller();
    }
}
