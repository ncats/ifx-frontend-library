import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
  viewChild,
  ViewEncapsulation,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocomplete,
  MatAutocompleteModule,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter, FilterCategory } from 'utils-models';
import { HighlightPipe } from 'highlight-pipe';
import { SharedUtilsListFilterRowComponent } from 'list-filter-row';
import { LoadingSpinnerComponent } from 'loading-spinner';
import { Store } from '@ngrx/store';
import { ResolverForm } from 'ifx';
import { ResolverDataViewerComponent } from 'resolver-data-viewer';
import {
  LoadResolverOptionsActions,
  ResolveQueryActions,
  ResolverSelectors,
} from 'resolver-store';

@Component({
  selector: 'lib-resolver-main',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatIconModule,
    SharedUtilsListFilterRowComponent,
    MatRadioModule,
    MatButtonModule,
    ResolverDataViewerComponent,
    HighlightPipe,
    LoadingSpinnerComponent,
    MatMenuTrigger,
  ],
  templateUrl: './resolver-main.component.html',
  styleUrl: './resolver-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ResolverMainComponent implements OnInit, AfterViewInit {
  private readonly store = inject(Store);
  private router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  autocompleteTrigger = viewChild<MatAutocompleteTrigger>(
    MatAutocompleteTrigger,
  );

  destroyRef = inject(DestroyRef);
  changeRef = inject(ChangeDetectorRef);

  optsList = computed(() =>
    this.store.selectSignal(ResolverSelectors.selectResolverOptions)(),
  );

  optionCategories: Signal<FilterCategory[]> = computed(() =>
    this._mapFilterCategoriesFromArray(
      this.store.selectSignal(ResolverSelectors.selectResolverOptions)(),
    ),
  );

  filteredSearchOptions: WritableSignal<FilterCategory[]> = signal(
    this.optionCategories(),
  );

  selectedFilters: Signal<{ [key: string]: Filter[] }> = computed(() =>
    this._mapFilterArrayToObject(
      this.store.selectSignal(ResolverSelectors.fetchSelectedOptions)(),
    ),
  );

  selectedFiltersSignal = signal(this.selectedFilters());

  resolvedData = this.store.selectSignal(ResolverSelectors.selectAllResolver);

  filteredResolvedData = computed(() => {
    return this.resolvedData().filter((obj) => obj.response);
  });

  badData = computed(() => {
    return this.resolvedData().filter((obj) => !obj.response);
  });

  resolveCtrl = new FormControl<string>('LARGEST');
  inputCtrl = new FormControl();
  filterSearchCtrl = new FormControl();
  loading = computed(
    () => !!(this.resolvedData().length || this.badData().length),
  );
  clicked = signal(false);

  /*  subscriptionSelection = new SelectionModel<Filter>(
    true,
    this.store.selectSignal(ResolverSelectors.fetchSelectedOptions)(),
  );*/

  subscriptionSelectionSignal = computed(() => {
    return new SelectionModel<string>(
      true,
      this.store.selectSignal(ResolverSelectors.fetchPreviousFilters)(),
    );
  });

  sortedSelection = computed(() => {
    return this.subscriptionSelectionSignal()
      .selected // .map((filter) => filter.value)
      .sort((a, b) => a.localeCompare(b));
  });

  ngOnInit() {
    if (this.route.snapshot && this.route.snapshot.queryParams) {
      const params = this.route.snapshot.queryParamMap;
      const optsString: string = <string>params.get('options');
      if (optsString) {
        const optsArr: string[] = optsString.split(';');
        this.store.dispatch(
          LoadResolverOptionsActions.setPreviousFilters({ filters: optsArr }),
        );
      }
      this.resolveCtrl.setValue(params.get('standardize'));
      this.inputCtrl.setValue(params.get('params'));
    }

    this.filterSearchCtrl.valueChanges.subscribe(() => this.searchFilters());

    this.subscriptionSelectionSignal()
      .changed.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        const selected: string[] = this.subscriptionSelectionSignal().selected;
        const filters = this.optsList().filter((opt) =>
          selected.includes(opt.value),
        );
        this.selectedFiltersSignal.set(this._mapFilterArrayToObject(filters));
      });
    this.selectedFiltersSignal.set(this.selectedFilters());
    this.filteredSearchOptions.set(this.optionCategories());
  }

  ngAfterViewInit() {
    this.autocompleteTrigger()?.openPanel();
  }

  resolve() {
    this.clicked.set(true);

    const formData: ResolverForm = new ResolverForm({
      structure: this.inputCtrl.value,
      format: 'json',
      standardize: this.resolveCtrl.value || 'LARGEST',
    });

    // localStorage.removeItem('previouslyUsedOptions');
    /* localStorage.setItem(
      'previouslyUsedOptions',
      JSON.stringify(
        this.subscriptionSelection().selected.map((fil) => fil.value),
      ),
    );*/
    this.store.dispatch(
      ResolveQueryActions.resolveQuery({
        urlStub: '/' + this.sortedSelection().join('/'),
        form: formData,
      }),
    );

    this.router.navigate([], {
      queryParams: {
        params: this.inputCtrl.value,
        options: this.sortedSelection().join(';'),
        standardize: this.resolveCtrl.value,
      },
      queryParamsHandling: 'merge',
    });
  }

  selectValue(value: Filter) {
    this.subscriptionSelectionSignal().toggle(value.value);
  }

  searchFilters() {
    if (this.filterSearchCtrl.value) {
      const searchCategories = this.optionCategories()
        .flat()
        .map((category) => category.values)
        .flat();
      const retArr = searchCategories.filter((filter) => {
        const search: string = this.filterSearchCtrl.value.toLowerCase();
        if (
          filter.term?.toLowerCase().includes(search) ||
          filter.description?.toLowerCase().includes(search)
        ) {
          return filter;
        } else {
          return;
        }
      });
      this.filteredSearchOptions.set(
        this._mapFilterCategoriesFromArray(retArr),
      );
    } else {
      this.filteredSearchOptions.set(this.optionCategories());
    }
  }

  removeChip(filter: Filter) {
    this.subscriptionSelectionSignal().deselect(filter.value);
  }

  clearParams() {
    this.subscriptionSelectionSignal().clear();
    this.router.navigate([]);
  }

  searchDisabled() {
    return (
      !this.inputCtrl.value || this.subscriptionSelectionSignal().isEmpty()
    );
  }

  _mapFilterCategoriesFromArray(
    filterArr: Filter[] | undefined,
  ): FilterCategory[] {
    if (filterArr && filterArr.length) {
      const retMap: Map<string, FilterCategory> = new Map<
        string,
        FilterCategory
      >();
      filterArr.forEach((opt: Filter) => {
        if (opt.tags) {
          opt.tags.forEach((tag: string) => {
            const parentArr: FilterCategory | undefined = retMap.get(tag);
            if (parentArr) {
              parentArr.values.push(opt);
              retMap.set(tag, parentArr);
            } else {
              retMap.set(
                tag,
                new FilterCategory({ parent: tag, values: [opt] }),
              );
            }
          });
        }
      });
      return Array.from(retMap.values());
    } else return [];
  }

  _mapFilterArrayToObject(filters: Filter[] | undefined) {
    const tempObj: { [key: string]: Filter[] } = {};
    if (filters) {
      filters.forEach((filter: Filter) => {
        if (filter.tags) {
          const field = filter.tags[0];
          if (tempObj[field] && tempObj[field].length) {
            tempObj[field].push(filter);
            tempObj[field] = tempObj[field].sort((a, b) =>
              a.term.toString().localeCompare(b.term.toString()),
            );
          } else {
            tempObj[field] = [filter];
          }
        }
      });
    }
    return tempObj;
  }
}
