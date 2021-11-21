import { Component } from "@angular/core";
import { RouterService } from '../../core/services/router.service';


@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  constructor(private routerService: RouterService) {
  }

  public goToSearch ($query: string): void {
    this.routerService.search($query)
  }
}
