import {
  Component,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  public searchForm: FormGroup;
  public searchQuery: string = '';

  @Input() data: string;
  @Output() query: EventEmitter<string> = new EventEmitter;


  constructor(
  ) {
    this.searchForm = new FormGroup({
      searchField: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)]),
    });
  }

  ngOnInit(): void {
    this.searchQuery = this.data;
  }

  public emitSearchQuery($event: string): void {
    if (this.searchForm.valid) {
      this.query.emit($event);
      this.searchQuery = this.searchForm.controls.searchField.value;
    }
  }
}
