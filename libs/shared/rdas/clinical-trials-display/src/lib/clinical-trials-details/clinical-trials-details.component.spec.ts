import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalTrialsDetailsComponent } from './clinical-trials-details.component';

describe('ClinicalTrialsDetailsComponent', () => {
  let component: ClinicalTrialsDetailsComponent;
  let fixture: ComponentFixture<ClinicalTrialsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ClinicalTrialsDetailsComponent],
    });
    fixture = TestBed.createComponent(ClinicalTrialsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
