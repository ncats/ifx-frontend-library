import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedUtilsFilterPanelComponent } from './shared-utils-filter-panel.component';

describe('SharedUtilsFilterPanelComponent', () => {
  let component: SharedUtilsFilterPanelComponent;
  let fixture: ComponentFixture<SharedUtilsFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedUtilsFilterPanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedUtilsFilterPanelComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
