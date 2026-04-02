import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DISEASES_FEATURE_KEY, diseasesReducer } from 'disease-store';
import { USERS_FEATURE_KEY, usersReducer } from 'user-store';
import { StoreModule } from '@ngrx/store';

import { AboutSubscribeModalComponent } from './about-subscribe-modal.component';

describe('AboutSubscribeModalComponent', () => {
  let component: AboutSubscribeModalComponent;
  let fixture: ComponentFixture<AboutSubscribeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AboutSubscribeModalComponent,

        StoreModule.forRoot({}),
        StoreModule.forFeature(DISEASES_FEATURE_KEY, diseasesReducer),
        StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutSubscribeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
