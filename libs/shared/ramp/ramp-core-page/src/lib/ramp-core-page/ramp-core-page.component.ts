import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  signal,
  input,
  Signal,
} from '@angular/core'
import { CommonModule, DOCUMENT } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { MatTabChangeEvent } from '@angular/material/tabs'
import { DomSanitizer, Title } from '@angular/platform-browser'
import { ActivatedRoute } from '@angular/router';
import {
  DataMap,
  OpenApiPath,
  QueryResultsData,
  VisualizationMap,
} from '@ncats-frontend-library/models/utils'
import { Store } from '@ngrx/store'
import { DataProperty } from '@ncats-frontend-library/models/utils'
import { QuestionBase } from 'ncats-form-question'
import { FormSubsection, RampPage } from 'ramp'

@Component({
  selector: 'lib-ramp-core-page',
  imports: [CommonModule],
  template: '',
  styles: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RampCorePageComponent {
  protected readonly store = inject(Store)
  destroyRef = inject(DestroyRef)
  private titleService = inject(Title)
  private route = inject(ActivatedRoute)
  changeRef = inject(ChangeDetectorRef)
  protected dom = inject(DOCUMENT)
  readonly dialog = inject(MatDialog)
  readonly sanitizer: DomSanitizer = inject(DomSanitizer)

  loadedTracker = computed(() => {
    return {
      resultsLoaded: !!this.overviewMap(),
      dataLoaded: !!this.dataMap(),
      visualizationsLoaded: !!this.visualizationsMap(),
    }
  })

  title = input<string>()
  paths = input<OpenApiPath[]>()
  inputMap = input<Map<string, FormSubsection[]>>()
  filtersMap = input<Map<string, QuestionBase<string>[]>>()
  overviewMap = computed<{ [p: string]: QueryResultsData } | undefined>(
    () => undefined
  )
  visualizationsMap = computed<
    { [p: string]: Map<string, VisualizationMap[]> } | undefined
  >(() => undefined)
  dataMap: Signal<{ [p: string]: Map<string, DataMap> } | undefined> = computed<
    { [p: string]: Map<string, DataMap> } | undefined
  >(() => this.component?.dataMap() as { [p: string]: Map<string, DataMap> })

  activePath = computed(() => {
    const tabString = this.activeTab() || Array.from(this.inputMap()!.keys())[0]
    return this.paths()?.filter((path) => path.child === tabString)
  })
  activeTab = signal(<string>this._getActiveTab())

  mainPageMap = computed(() => {
    const fullMap: Map<string, RampPage> = new Map<string, RampPage>()
    if (this.inputMap() && this.inputMap()!.size) {
      const tabString =
        this.activeTab() || Array.from(this.inputMap()!.keys())[0]
      if (tabString != null) {
        Array.from(this.inputMap()!.entries()).forEach((keyValue) => {
          fullMap.set(keyValue[0], {
            inputMap: keyValue[1],
            overviewMap:
              this.overviewMap() && this.overviewMap()![<string>tabString]
                ? this.overviewMap()![<string>tabString]
                : undefined,
            visualizationsMap:
              this.visualizationsMap() &&
              this.visualizationsMap()![<string>(<unknown>tabString)]
                ? this.visualizationsMap()![<string>(<unknown>tabString)]
                : undefined,
            dataMap:
              this.dataMap() && this.dataMap()![<string>(<unknown>tabString)]
                ? this.dataMap()![<string>(<unknown>tabString)]
                : undefined,
          } as RampPage)
        })
      }
    }
    return fullMap
  })

  component!: RampCorePageComponent

  inputList: string[] = []
  dataColumns!: DataProperty[]

  fetchData(event: { [key: string]: unknown }, origin: string) {
    console.log(origin)
  }

  cleanLabel(label: string): string {
    return label.replace(/-/g, ' ')
  }

  _parseInput(input: string | string[]) {
    let retArr: string[] = []
    if (input && input.length > 0) {
      if (Array.isArray(input)) {
        retArr = input.map((val: string) => (val = val.trim()))
      } else {
        retArr = input
          .trim()
          .split(/[\t\n,;]+/)
          .map((val: string) => val.trim())
      }
    }
    return retArr
  }

  tabChanged(tab: MatTabChangeEvent) {
    const activeTab = <string>this._getActiveTab(tab.index)
    const title = this.route.snapshot.title
    const newTitle = title + ' - ' + activeTab.replaceAll('-', ' ')
    this.titleService.setTitle(newTitle)
    this.activeTab.set(activeTab)
  }

  protected _getActiveTab(index = 0) {
    if (this.inputMap() && this.inputMap()!.size) {
      return Array.from(this.inputMap()!.keys())[index] as string
    } else return null
  }

  protected _originalOrder = () => 0
}
