import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { DISEASES_FEATURE_KEY, reducer } from 'disease-store';
import { StoreModule } from '@ngrx/store';

import { RdasSearchComponent } from './rdas-search.component';

describe('RdasSearchComponent', () => {
  let component: RdasSearchComponent;
  let fixture: ComponentFixture<RdasSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        RdasSearchComponent,

        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule,
        MatIconModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(DISEASES_FEATURE_KEY, reducer),
      ],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(RdasSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
