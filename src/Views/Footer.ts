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
        const footerContainer = createNewElement('div', ['footer_container'],this.footerHTML);

        const footerLogoContainer = createNewElement('div', ['logo_container'], footerContainer);
        const linkRSschool = createNewElement('a', ['logo_link'], footerLogoContainer);
        linkRSschool.setAttribute('href', 'https://rs.school/js/');
        const footerLogo = createNewElement('img', ['logo'], linkRSschool);
        footerLogo.setAttribute('src', 'https://rs.school/images/rs_school_js.svg');
        footerLogo.setAttribute('alt', 'RS school logo');

        const footerGitContainer = createNewElement('div', ['git_container'], footerContainer);
        const linkGitDzinaKor = createNewElement('a', ['git_link'], footerGitContainer);
        linkGitDzinaKor.setAttribute('href', 'https://github.com/DzinaKor');
        linkGitDzinaKor.textContent ='Dzina Korshunava';
        const linkGitKazus = createNewElement('a', ['git_link'], footerGitContainer);
        linkGitKazus.setAttribute('href', 'https://github.com/AKazus');
        linkGitKazus.textContent = 'Anastasiia Kazus';
        const linkGitKostyaLibertine = createNewElement('a', ['git_link'], footerGitContainer);
        linkGitKostyaLibertine.setAttribute('href', 'https://github.com/KostyaLibertine');
        linkGitKostyaLibertine.textContent = 'Konstantin Glushenkov';

        const yearText = createNewElement('p', ['year'], footerContainer);
        yearText.textContent = '2022';
    }
}
