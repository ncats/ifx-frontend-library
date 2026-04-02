import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreProject, Project } from 'rdas-models';

import { ProjectListCardComponent } from './project-list-card.component';

describe('ProjectListCardComponent', () => {
  let component: ProjectListCardComponent;
  let fixture: ComponentFixture<ProjectListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ProjectListCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListCardComponent);
    component = fixture.componentInstance;
    component.grant = new CoreProject({ core_project_num: 'sdgsgsgs' });
    component.latestGrant = new Project({ title: 'sdgsgsgs' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
