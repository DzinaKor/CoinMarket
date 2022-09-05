import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';
import { NewsData, Result } from '../api/apiRequestTypes';

export default class NewsView {

    public controller: Controller;

    public newsHTML: HTMLElement;

    public newsMainHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.newsHTML = createNewElement('div', ['news_container']);
        this.newsMainHTML = createNewElement('div', ['newsmain_container']);
    }

    viewNews() {
        this.newsHTML.innerHTML = '';
        this.controller.pagesContainerHTML.innerHTML = '';
        this.controller.pagesContainerHTML.appendChild(this.newsHTML);
        this.controller.drawNewsView();
    }

    viewNewsMain() {
        const mainPage: HTMLElement = document.querySelector('.mainpage_container') as HTMLElement;
        if (mainPage) {
            this.newsMainHTML.innerHTML = '';
            mainPage.appendChild(this.newsMainHTML);
            this.controller.drawNewsMainView();
        }
    }

    drawNewsView(news: NewsData) {
        news.articles.results.forEach((newsArticle: Result) => {
            const newsHTML: HTMLAnchorElement = createNewElement('a', ['one_news_container'], this.newsHTML) as HTMLAnchorElement;

            newsHTML.href = newsArticle.url;
            newsHTML.target = '_blank';
            const newsImg: HTMLImageElement = createNewElement('img', ['news_img', 'news_image'], newsHTML) as HTMLImageElement;
            newsImg.src = newsArticle.image;

            NewsView.addNewsDescHTML(newsArticle.title, newsHTML, 'news_title');
            NewsView.addNewsDescHTML(newsArticle.body, newsHTML);
            NewsView.addNewsDescHTML(newsArticle.date, newsHTML);
        });
    }

    drawNewsMainView(news: NewsData) {
        let maxNews = 10;
        news.articles.results.forEach((newsArticle: Result) => {
            if (maxNews > 0) {
                const newsHTML: HTMLAnchorElement = createNewElement('a', ['one_main_news_container'], this.newsMainHTML) as HTMLAnchorElement;

                newsHTML.href = newsArticle.url;
                newsHTML.target = '_blank';
                const newsImg: HTMLImageElement = createNewElement('img', ['news_img', 'news_image'], newsHTML) as HTMLImageElement;
                newsImg.src = newsArticle.image;

                NewsView.addNewsDescHTML(newsArticle.title, newsHTML, 'news_title');
                // NewsView.addNewsDescHTML(newsArticle.body, newsHTML);
                // NewsView.addNewsDescHTML(newsArticle.date, newsHTML);
                maxNews -= 1;
            }
        });
    }

    static addNewsDescHTML(txt: string, parent: HTMLElement, cls = ''): HTMLElement {
        const clsArray: Array<string> = (cls === '') ? ['news_desc'] : ['news_desc', cls];
        const tempHTML: HTMLElement = createNewElement('div', clsArray, parent);
        tempHTML.innerText = String(txt);
        return tempHTML;
    }

}
