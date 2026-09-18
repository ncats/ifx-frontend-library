import { ListRange, SelectionModel } from '@angular/cdk/collections';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Filter, FilterCategory } from 'utils-models';
import { HighlightPipe } from 'highlight-pipe';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'lib-shared-utils-filter-panel',
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    ScrollingModule,
    HighlightPipe,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './shared-utils-filter-panel.component.html',
  styleUrls: ['./shared-utils-filter-panel.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class SharedUtilsFilterPanelComponent implements OnInit, OnChanges {
  destroyRef = inject(DestroyRef);
  showSearch = input(true);
  searchInput = viewChild<MatInput>(MatInput);
  filter = input<FilterCategory>();
  filterSelectionChange = output<
    {
      label: string;
      term?: string | number | boolean;
      values: (string | number | boolean)[];
    }[]
  >();
  filterChange = output<{
    label: string;
    term?: string | number | boolean;
    page?: number;
  }>();

  searchCtl: FormControl = new FormControl<string>('');
  filterSelection = new SelectionModel<string | number | boolean>(true, []);
  loading = false;

  range!: ListRange;

  fullList = input(false);

  ngOnInit() {
    this.filterSelection.changed.subscribe(() => {
      this.filterSelectionChange.emit([
        {
          label: <string>this.filter()?.label,
          term: <string>this.filter()?.field,
          values: this.filterSelection.selected,
        },
      ]);
    });

    this.searchCtl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(400),
        distinctUntilChanged(),
        map((term: string) => {
          this.filterChange.emit({
            label: <string>this.filter()?.label,
            term: term,
          });
        }),
      )
      .subscribe();
  }

  ngOnChanges() {
    this.searchCtl.setValue(this.filter()?.query, { emitEvent: false });

    if (this.searchInput && this.filter()?.query) {
      this.searchInput()!.focus();
    }

    if (this.filter() && this.filter()?.values) {
      const selectedFilters = this.filter()
        ?.values.filter((val) => val.selected)
        .map((val) => val.term);
      if (selectedFilters) {
        this.filterSelection.select(...selectedFilters);
      }
    }
  }

  loadMore() {
    this.loading = true;
    this.filterChange.emit({
      label: this.filter()!.label,
      page: this.filter()!.page + 1,
    });
  }
  clearSearch() {
    this.searchCtl.reset();
  }

  _filterField(index: number, filter: Filter) {
    return filter.value;
  }
}
