import { Component } from "@angular/core";
import { SearchService } from '../../core/services/search.service';


@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent {
  constructor(private searchService: SearchService) {
  }

  public goToSearch ($query: string): void {
    this.searchService.search($query)
  }
}
