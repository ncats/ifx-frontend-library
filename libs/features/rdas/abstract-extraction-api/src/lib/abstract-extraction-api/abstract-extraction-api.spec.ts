import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractExtractionApi } from './abstract-extraction-api';

describe('AbstractExtractionApi', () => {
  let component: AbstractExtractionApi;
  let fixture: ComponentFixture<AbstractExtractionApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractExtractionApi],
    }).compileComponents();

    fixture = TestBed.createComponent(AbstractExtractionApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
