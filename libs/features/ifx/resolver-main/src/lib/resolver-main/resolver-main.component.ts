import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatAutocompleteModule
} from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Filter } from 'utils-models';
import { HighlightPipe } from 'highlight-pipe';
import { LoadingSpinnerComponent } from 'loading-spinner';
import { ResolverForm } from 'ifx';
import { ResolverDataViewerComponent } from 'resolver-data-viewer';
import {
  ResolverStore,
} from 'resolver-store';
import { debounceTime } from 'rxjs';

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
    MatRadioModule,
    MatButtonModule,
    ResolverDataViewerComponent,
    HighlightPipe,
    LoadingSpinnerComponent,
  ],
  templateUrl: './resolver-main.component.html',
  styleUrl: './resolver-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ResolverMainComponent {
  private readonly resolverStore = inject(ResolverStore);
  private router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  filteredSearchOptions = this.resolverStore.filteredOptionCategories;
  selectedSearchOptions = this.resolverStore.selectedOptions;
  loading = this.resolverStore.isLoading;

  resolvedData = this.resolverStore.data;

  filteredResolvedData = computed(() => {
    return this.resolvedData().filter((obj) => obj.response);
  });

  badData = computed(() => {
    return this.resolvedData().filter((obj) => !obj.response);
  });

  resolveCtrl = new FormControl<string>('LARGEST');
  inputCtrl = new FormControl<string>('');
  filterSearchCtrl = new FormControl<string>('');

  subscriptionSelection = new SelectionModel<Filter>(
    true,
    this.resolverStore.selectedOptionsList(),
  );

  sortedSelection = computed(() => {
    return this.subscriptionSelection.selected
      .map((filter) => <string>filter.value)
      .sort((a, b) => a.toString().localeCompare(b.toString()));
  });

  ngOnInit() {
    this.filterSearchCtrl.valueChanges.subscribe(() => this.searchFilters());
    if (this.route.snapshot && this.route.snapshot.queryParams) {
      const params = this.route.snapshot.queryParamMap;
      this.resolveCtrl.setValue(params.get('standardize'));
      this.inputCtrl.setValue(params.get('params'));
    }
    this.subscriptionSelection.changed.pipe().subscribe(() => {
      this.resolverStore.setSelectedOptions(
        this.subscriptionSelection.selected,
      );
    });
  }

   resolve() {
    const formData: ResolverForm = new ResolverForm({
      structure: <string>this.inputCtrl.value,
      format: 'json',
      standardize: this.resolveCtrl.value || 'LARGEST',
    });

    // localStorage.removeItem('previouslyUsedOptions');
    /*     localStorage.setItem(
      'previouslyUsedOptions',
      JSON.stringify(
        this.subscriptionSelection().selected.map((fil) => fil.value),
      ),
    );*/

    this.resolverStore.resolveQuery({
      urlStub:
        '/' +
        this.subscriptionSelection.selected
          .map((filter) => filter.value)
          .join('/'),
      form: formData,
    });

    this.router.navigate([], {
      queryParams: {
        params: this.inputCtrl.value,
        options: this.subscriptionSelection.selected
          .map((filter) => filter.value)
          .join(';'),
        standardize: this.resolveCtrl.value,
      },
      queryParamsHandling: 'merge',
    });
  }

  searchFilters() {
    this.resolverStore.filterOptions(<string>this.filterSearchCtrl.value);
  }

  removeChip(filter: Filter) {
    const sel: Filter | undefined = this.subscriptionSelection.selected.find((fil)=> fil.term === filter.term)
    if(sel){
      this.subscriptionSelection.deselect(sel);
    }
  }

  clearParams() {
    this.subscriptionSelection.clear();
    this.router.navigate([]);
  }

  searchDisabled() {
    return !this.inputCtrl.value || this.subscriptionSelection.isEmpty();
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
