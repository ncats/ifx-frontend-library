import {
  Component,
  computed,
  inject,
  input,
  viewChild,
  DOCUMENT,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { GeneAssociation } from 'rdas-models';
import { ExternalLinkComponent } from 'external-link';

@Component({
  selector: 'lib-gene-list',
  imports: [
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatSortModule,
    ExternalLinkComponent,
    MatTooltip,
  ],
  templateUrl: './gene-list.component.html',
  styleUrls: ['./gene-list.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class GeneListComponent {
  paginator = viewChild<MatPaginator>(MatPaginator);
  sort = viewChild<MatSort>(MatSort);

  genes = input<GeneAssociation[] | undefined>([] as GeneAssociation[]);
  showTab = input<boolean>(true);
  protected dom = inject(DOCUMENT);

  count = computed(() => this.genes()?.length);

  dataSource = computed(() => {
    const ds = new MatTableDataSource<GeneAssociation>(this.genes());
    ds.paginator = this.paginator() as MatPaginator;
    ds.sort = this.sort() as MatSort;
    return ds;
  });

  displayColumns = ['Gene', 'Gene Name', 'Association Type', 'Reference'];

  sortData(sort: Sort) {
    if (this.genes()) {
      this.dataSource()!.paginator!.firstPage();
      const data = this.genes()!.slice();
      if (!sort.active || sort.direction === '') {
        this.dataSource().data = data;
        return;
      }

      this.dataSource().data = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'Gene Symbol':
            return compare(a.gene.geneSymbol, b.gene.geneSymbol, isAsc);
          case 'Gene Name':
            return compare(a.gene.geneTitle, b.gene.geneTitle, isAsc);
          case 'Association Type':
            return compare(a.associationType, b.associationType, isAsc);
          case 'Association Status':
            return compare(a.associationStatus, b.associationStatus, isAsc);

          default:
            return 0;
        }
      });
    }
  }

  downloadData() {
    if (this.genes()) {
      this._downloadFile(this._toTSV(this.genes()!), 'rdas-genes-download.tsv');
    }
  }

  _toTSV(data: GeneAssociation[]): string {
    // grab the column headings (separated by tabs)
    const headings: string = [
      'geneSymbol',
      'associationStatus',
      'associationType',
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
