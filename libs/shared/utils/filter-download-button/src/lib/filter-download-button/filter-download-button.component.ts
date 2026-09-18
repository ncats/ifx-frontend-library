import {
  ChangeDetectionStrategy,
  Component,
  inject,
  DOCUMENT,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Filter, FilterCategory } from 'utils-models';

@Component({
  selector: 'lib-filter-download-button',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './filter-download-button.component.html',
  styleUrl: './filter-download-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FilterDownloadButtonComponent {
  selectedFilter = input<FilterCategory>();
  private dom = inject(DOCUMENT);

  downloadData() {
    if (this.selectedFilter) {
      this._downloadFile(
        this._toTSV(this.selectedFilter()),
        `${this.selectedFilter()
          ?.label.replaceAll(' ', '-')
          .toLocaleLowerCase()}.tsv`,
      );
    }
  }

  _toTSV(category: FilterCategory | undefined): string {
    if (category && category.values) {
      const data = category.values;
      //   grab the column headings (separated by tabs)
      const headings: string = Object.keys(data[0] as Filter).join('\t');
      // iterate over the data
      const rows: string[] = <string[]>data.reduce(
        (acc: string[], c: Filter) => {
          // for each row object get its values and add tabs between them
          // then add them as a new array to the outgoing array
          return acc.concat([Object.values(c).join('\t')]);

          // finally joining each row with a line break
        },
        [headings],
      );
      return rows.join('\n');
    } else return '';
  }

  _downloadFile(data: unknown, name: string, type = 'text/tsv') {
    if (this.dom) {
      const file = new Blob([data as Blob], { type: type });
      const link = this.dom.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        const url = URL.createObjectURL(file);
        link.setAttribute('href', url);
        link.setAttribute('download', `${name}`);
        link.style.visibility = 'hidden';
        this.dom.body.appendChild(link);
        link.click();
        this.dom.body.removeChild(link);
      }
    }
  }
}
