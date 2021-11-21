import { Component } from "@angular/core";
import { RouterService } from '../../core/services/router.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  public searchForm: FormGroup;
  public query : String ='';

  constructor(
    private routerService: RouterService,
  ) {
    this.searchForm = new FormGroup({
      searchField: new FormControl(''),
    });
  }

  public goToSearch ($query: string): void {
    this.routerService.search($query)
  }
}
