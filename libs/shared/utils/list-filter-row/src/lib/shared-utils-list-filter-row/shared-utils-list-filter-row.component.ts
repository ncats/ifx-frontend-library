import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Filter, FilterCategory } from '@ncats-frontend-library/models/utils';

@Component({
  selector: 'lib-shared-utils-list-filter-row',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './shared-utils-list-filter-row.component.html',
  styleUrl: './shared-utils-list-filter-row.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUtilsListFilterRowComponent {
  filters = input<FilterCategory[]>();
  filterFormControls = computed(() => {
    const controls: { [key: string]: FormControl } = {};
    this.filters()?.forEach((filter: FilterCategory) => {
      if (filter.filterable && filter.field) {
        controls[filter.field] = new FormControl(
          filter.values.filter((val) => val.selected)
        );
      }
    });
    const fg = new FormGroup(controls);
    fg.valueChanges.subscribe(() => {
      this.filterChange.emit(fg.value);
    });
    return fg;
  });

  showCount = input<boolean>(true);
  showSelected = input<boolean>(true);

  @Output() filterChange: EventEmitter<{ [key: string]: Filter[] }> =
    new EventEmitter<{ [key: string]: Filter[] }>();
}
