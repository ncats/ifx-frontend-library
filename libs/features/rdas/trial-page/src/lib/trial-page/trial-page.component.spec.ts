import { ComponentFixture, TestBed } from '@angular/core/testing';
import { trialsReducer, TrialEffects } from 'trial-store';
import { provideEffects } from '@ngrx/effects';
import { provideStore, StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { TrialPageComponent } from './trial-page.component';

describe('TrialPageComponent', () => {
  let component: TrialPageComponent;
  let fixture: ComponentFixture<TrialPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TrialPageComponent, StoreModule],
      providers: [
        provideStore({
          trials: trialsReducer,
        }),
        provideEffects([TrialEffects]),
        provideStoreDevtools({ maxAge: 25, logOnly: false }),
      ],
    });
    fixture = TestBed.createComponent(TrialPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
