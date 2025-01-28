import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  InjectionToken,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core'
import { DataProperty } from '@ncats-frontend-library/models/utils'
import { BehaviorSubject } from 'rxjs'
import { NgClass } from '@angular/common'

export const STRUCTURE_VIEWER_COMPONENT = new InjectionToken<string>(
  'StructureViewerComponent'
)

@Component({
  selector: 'lib-structure-viewer',
  templateUrl: './structure-viewer.component.html',
  styleUrls: ['./structure-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass],
})
export class StructureViewerComponent implements OnInit {
  url = ''

  @Input() smiles!: string

  @Input() size = 150

  @Input() rounded = false

  @Input() ligandName!: string

  /**
   *   initialize a private variable _data, it's a BehaviorSubject
   */
  private _data = new BehaviorSubject<DataProperty | null>(null)

  /**
   * set the value of the data on change
   * @param {DataProperty} value
   */
  @Input()
  set data(value: DataProperty | null) {
    // set the latest value for _data BehaviorSubject
    this._data.next(value)
  }

  /**
   * get the data value
   * @return {DataProperty}
   */
  get data(): DataProperty | null {
    // get the latest value from _data BehaviorSubject
    return this._data.getValue()
  }

  /**
   * grab config to fetch the image urls
   * @param {ChangeDetectorRef} ref
   */
  constructor(private ref: ChangeDetectorRef) {}

  /**
   * get data from parent by subscription
   * set as smiles
   */
  ngOnInit() {
    this._data.subscribe((data) => {
      if (data && data.url) {
        this.url = data.url
        this.ligandName = data.value
        this.ref.detectChanges()
      }
    })
  }
}
