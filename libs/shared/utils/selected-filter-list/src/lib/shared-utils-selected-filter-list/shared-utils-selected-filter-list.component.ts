import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lib-shared-utils-selected-filter-list',
  imports: [CommonModule, MatChipsModule, MatButtonModule, MatIconModule],
  templateUrl: './shared-utils-selected-filter-list.component.html',
  styleUrls: ['./shared-utils-selected-filter-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedUtilsSelectedFilterListComponent {
  filters = input<Map<string, string[]>>();
  filterChange = output<{ label: string; values: string[] }[]>();

  removeFilterFamily(family: string): void {
    this.filters()?.delete(family);

    this.filterChange.emit(this._flattenMap());
  }

  removeField(label: string, value: string): void {
    const vals = this.filters()
      ?.get(label)
      ?.filter((val) => val !== value);
    if (vals && vals.length > 0) {
      this.filters()?.set(label, vals);
    } else {
      this.removeFilterFamily(label);
    }
    this.filterChange.emit(this._flattenMap());
  }

  removeAll(): void {
    this.filters()?.clear();
    this.filterChange.emit(this._flattenMap());
  }

  _flattenMap(): { label: string; values: string[] }[] {
    const ret: { label: string; values: string[] }[] = [];
    [...this.filters()!.keys()].forEach((key) => {
      let valuesArr = this.filters()?.get(key);
      if (!valuesArr) {
        valuesArr = [];
      }
      ret.push({ label: key, values: valuesArr });
    });
    return ret;
  }
}
