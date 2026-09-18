import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  viewChild,
  DOCUMENT,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltip } from '@angular/material/tooltip';
import { PhenotypeAssociation } from 'rdas-models';
import { SharedUtilsDataNotFoundComponent } from 'data-not-found';
import { ExternalLinkComponent } from 'external-link';
import { RdasPanelTemplateComponent } from 'rdas-panel-template';

@Component({
  selector: 'lib-phenotype-list',
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    SharedUtilsDataNotFoundComponent,
    ExternalLinkComponent,
    MatTooltip,
    RdasPanelTemplateComponent,
  ],
  templateUrl: './phenotype-list.component.html',
  styleUrls: ['./phenotype-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class PhenotypeListComponent {
  paginator = viewChild<MatPaginator>(MatPaginator);
  sort = viewChild<MatSort>(MatSort);

  phenotypes = input<PhenotypeAssociation[] | undefined>(
    [] as PhenotypeAssociation[],
  );
  showTab = input<boolean>(true);
  protected dom = inject(DOCUMENT);

  count = computed(() => this.phenotypes()?.length);

  dataSource = computed(() => {
    const ds = new MatTableDataSource<PhenotypeAssociation>(this.phenotypes());
    ds.paginator = this.paginator() as MatPaginator;
    ds.sort = this.sort() as MatSort;
    return ds;
  });

  displayColumns = ['Phenotype', 'Frequency', 'Evidence', 'Reference'];

  sortData(sort: Sort) {
    if (this.phenotypes()) {
      const data = this.phenotypes()!.slice();
      if (!sort.active || sort.direction === '') {
        this.dataSource().data = data;
        return;
      }

      this.dataSource().data = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'Phenotype':
            return compare(a.phenotype.hpoTerm, b.phenotype.hpoTerm, isAsc);
          case 'Frequency':
            return compare(a.frequencyRank, b.frequencyRank, isAsc);
          case 'Evidence':
            return compare(a.evidence.code, b.evidence.code, isAsc);
          default:
            return 0;
        }
      });
      this.dataSource()!.paginator!.firstPage();
    }
  }

  downloadData() {
    if (this.phenotypes()) {
      this._downloadFile(
        this._toTSV(this.phenotypes()!),
        'rdas-phenotypes-download.tsv',
      );
    }
  }

  _toTSV(data: PhenotypeAssociation[]): string {
    // grab the column headings (separated by tabs)
    const headings: string = [
      'term',
      'frequency',
      'evidence',
      'references',
    ].join('\t');

    // iterate over the data
    const rows: string = data
      .reduce(
        (acc, c) => {
          // for each row object get its values and add tabs between them
          // then add them as a new array to the outgoing array

          return acc.concat([c._toString()]);

          // finally joining each row with a line break
        },
        [headings],
      )
      .join('\n');
    return rows;
  }

  _downloadFile(data: string, name: string, type = 'text/tsv') {
    if (this.dom) {
      const file = new Blob([data], { type: type });
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

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
