import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';
import { NewsData, Result } from '../api/apiRequestTypes';


export default class NewsView {
    public controller: Controller;

    public newsHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.newsHTML = createNewElement('div', ['news_container']);
    }

    viewNews() {
        this.newsHTML.innerHTML = 'this is News';
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.newsHTML);
        //this.drawNewsView();
    }

    drawNewsView(news: NewsData) {
        news.articles.results.forEach((newsArticle: Result) => {

        })
    }

    static addNewsDescHTML(txt: string, parent: HTMLElement, cls = 'news_desc'): HTMLElement {
        const tempHTML: HTMLElement = createNewElement('div', [cls], parent);
        tempHTML.innerText = String(txt);
        return tempHTML;
    }
}
