import Controller from '../Controllers/Controller';
import { createNewElement } from './BasicView';

export default class Footer {
    public controller: Controller;

    public footerHTML: HTMLElement;

    constructor(controller: Controller) {
        this.controller = controller;
        this.footerHTML = document.querySelector('footer') as HTMLElement;
        this.footerHTML.innerHTML = '';
        this.drawFooter();
    }

    drawFooter() {
        const footerContainer = createNewElement('div', ['footer-container'],this.footerHTML);
        const footerLogoContainer = createNewElement('div', ['footer-logo-container'], footerContainer);
        const footerLogo = createNewElement('img', ['footer-logo'], footerLogoContainer);
        footerLogo.setAttribute('src', 'https://rs.school/images/rs_school_js.svg');
        footerLogo.setAttribute('alt', 'RS school logo');
        const linkRSschool = createNewElement('a', ['footer-link', 'rs-link'], footerLogoContainer);
        linkRSschool.setAttribute('href', 'https://rs.school/js/');
        linkRSschool.textContent = 'RS School';
        const footerGitContainer = createNewElement('div', ['footer-git-container'], footerContainer);
        const linkGitDzinaKor = createNewElement('a', ['git-link'], footerGitContainer);
        linkGitDzinaKor.setAttribute('href', 'https://github.com/DzinaKor');
        linkGitDzinaKor.textContent ='Dzina Kor GitHub';
        const linkGitKazus = createNewElement('a', ['git-link'], footerGitContainer);
        linkGitKazus.setAttribute('href', 'https://github.com/AKazus');
        linkGitKazus.textContent = 'Anastasiia Kazus GitHub';
        const linkGitKostyaLibertine = createNewElement('a', ['git-link'], footerGitContainer);
        linkGitKostyaLibertine.setAttribute('href', 'https://github.com/KostyaLibertine');
        linkGitKostyaLibertine.textContent = 'Kostya Libertine GitHub';
        const yearText = createNewElement('p', ['footer-year-text'], footerContainer);
        yearText.textContent = '2022';
    }
}
