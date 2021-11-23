import { Component, Inject } from '@angular/core';
import { environment } from '../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private readonly lang: string | null;

  constructor(
    private translate: TranslateService,
  ) {
    this.translate.addLangs(environment.languages);

    if (localStorage.getItem('lang')) {
      this.lang = localStorage.getItem('lang');
    } else if (
      navigator.language.substring(0, 2) === ('en' || 'ru')
    ) {
      this.lang = navigator.language.substring(0, 2);
    } else {
      this.lang = environment.languages[1];
    }

    if (this.lang != null) {
      this.translate.use(this.lang);
    }
  }

}
