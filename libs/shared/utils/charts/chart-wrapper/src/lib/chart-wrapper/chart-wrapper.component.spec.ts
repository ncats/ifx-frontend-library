import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCategory } from 'utils-models';
import { PIEFILTERS } from '../../test-setup';
import { ChartWrapperComponent } from './chart-wrapper.component';

describe('ChartWrapperComponent', () => {
  let component: ChartWrapperComponent;
  let fixture: ComponentFixture<ChartWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartWrapperComponent);
    component = fixture.componentInstance;
    const filters = signal<FilterCategory[]>([PIEFILTERS as FilterCategory]);
    component.filters = filters as unknown as typeof component.filters;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
