import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Filter, FilterCategory } from 'utils-models';
import { MatSlideToggle } from '@angular/material/slide-toggle';

@Component({
  selector: 'lib-shared-utils-list-filter-row',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggle,
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
          filter.values.filter((val) => val.selected),
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

  filterChange = output<{ [key: string]: Filter[] }>();
}
