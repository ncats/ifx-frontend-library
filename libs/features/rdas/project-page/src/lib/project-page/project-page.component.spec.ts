import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ProjectEffects,
  PROJECTS_FEATURE_KEY,
  projectsReducer,
} from 'project-store';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { ProjectPageComponent } from './project-page.component';

describe('ProjectPageComponent', () => {
  let component: ProjectPageComponent;
  let fixture: ComponentFixture<ProjectPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ProjectPageComponent,
        StoreModule.forRoot({}),
        StoreModule.forFeature(PROJECTS_FEATURE_KEY, projectsReducer),
      ],
      providers: [provideStoreDevtools({ maxAge: 25, logOnly: false })],
    });
    fixture = TestBed.createComponent(ProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
