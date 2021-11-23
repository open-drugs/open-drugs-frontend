import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
  public searchForm: FormGroup;
  public searchQuery: string = '';
  @Output() query: EventEmitter<string> = new EventEmitter<string>();

  constructor(
  ) {
    this.searchForm = new FormGroup({
      searchField: new FormControl(''),
    });
  }

  public emitSearchQuery($event: string): void {
    if ($event.length !== 0) {
      this.query.emit($event);
    }
  }
}
