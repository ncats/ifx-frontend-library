import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatButtonModule } from '@angular/material/button'
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import {
  DISEASES_FEATURE_KEY,
  diseasesReducer,
} from '@ncats-frontend-library/stores/disease-store'
import {
  USERS_FEATURE_KEY,
  usersReducer,
} from '@ncats-frontend-library/stores/user-store'
import { StoreModule } from '@ngrx/store'
import { UnsubscribeModalComponent } from './unsubscribe-modal.component'

describe('UnsubscribeModalComponent', () => {
  let component: UnsubscribeModalComponent
  let fixture: ComponentFixture<UnsubscribeModalComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        UnsubscribeModalComponent,
        NoopAnimationsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature(DISEASES_FEATURE_KEY, diseasesReducer),
        StoreModule.forFeature(USERS_FEATURE_KEY, usersReducer),
      ],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: {} }],
    }).compileComponents()

    fixture = TestBed.createComponent(UnsubscribeModalComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
