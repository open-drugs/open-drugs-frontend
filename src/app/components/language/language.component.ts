import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  @Input() theme: 'light' | 'dark' = 'dark';

  public currentIndex = environment.languages.indexOf(this.translate.currentLang);

  constructor(
    public translate: TranslateService,
  ) {
  }

  changeLanguage(language: string): void {
    const currentIndex = environment.languages.indexOf(this.translate.currentLang);
    const nextIndex = (currentIndex + 1) % environment.languages.length;
    const nextLang = environment.languages[nextIndex];

    const languageSelector = (lang: string) => {
      if (lang === 'ru') {
        return environment.languages[0];
      }

      if (lang === 'en') {
        return environment.languages[1];
      }

      if (lang === 'zh') {
        return environment.languages[2];
      }

      return nextLang;
    };

    const languageSet = languageSelector(language);

    this.translate.use(languageSet);
    localStorage.setItem('lang', languageSet);
    window.location.reload();
  }
}

