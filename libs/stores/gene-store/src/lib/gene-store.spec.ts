import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('GeneStore', () => {
  let component: GeneStore;
  let fixture: ComponentFixture<GeneStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneStore],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
