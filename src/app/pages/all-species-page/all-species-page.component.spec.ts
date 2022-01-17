import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSpeciesPageComponent } from './all-species-page.component';

describe('AllSpeciesPageComponent', () => {
  let component: AllSpeciesPageComponent;
  let fixture: ComponentFixture<AllSpeciesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllSpeciesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSpeciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
