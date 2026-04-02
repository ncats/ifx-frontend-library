import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatSidenavContainer,
  MatSidenavModule,
} from '@angular/material/sidenav';

import { provideRouter, RouterOutlet } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { RampCorePageComponent } from 'ramp-core-page';
import { RAMP_STORE_FEATURE_KEY, rampReducer } from 'ramp-store';
import { RampPageComponent } from './ramp-page.component';

describe('RampPageComponent', () => {
  let component: RampPageComponent<RampCorePageComponent>;
  let fixture: ComponentFixture<RampPageComponent<RampCorePageComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RampPageComponent,

        MatSidenavModule,
        MatSidenavContainer,
        RouterOutlet,
        StoreModule.forRoot({}),
        StoreModule.forFeature(RAMP_STORE_FEATURE_KEY, rampReducer),
      ],
      providers: [
        { provide: MatSidenavContainer, useValue: {} },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RampPageComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
