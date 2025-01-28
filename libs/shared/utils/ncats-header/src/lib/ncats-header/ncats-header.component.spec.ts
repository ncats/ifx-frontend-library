import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ActivatedRoute } from '@angular/router'
import { NcatsHeaderComponent } from './ncats-header.component'

describe('NcatsHeaderComponent', () => {
  let component: NcatsHeaderComponent
  let fixture: ComponentFixture<NcatsHeaderComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NcatsHeaderComponent],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents()

    fixture = TestBed.createComponent(NcatsHeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
