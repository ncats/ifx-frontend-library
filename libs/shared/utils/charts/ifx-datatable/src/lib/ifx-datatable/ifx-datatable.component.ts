import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  computed,
  DestroyRef,
  inject,
  Injector,
  input,
  OnInit,
  output,
  QueryList,
  Type,
  viewChild,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DataProperty } from 'utils-models';
import { Observable } from 'rxjs';
import {
  MatRow,
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import {
  MatPaginator,
  PageEvent,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import {
  CdkPortalOutletAttachedRef,
  ComponentPortal,
  PortalModule,
} from '@angular/cdk/portal';
import { SelectionModel } from '@angular/cdk/collections';
import { PageData } from './models/page-data';
import { PropertyDisplayComponent } from './components/property-display/property-display.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgClass } from '@angular/common';

const _sortingDataAccessor = (
  data: { [key: string]: DataProperty },
  property: string,
) => {
  if (data[property] && data[property].value) {
    if (!isNaN(Number(data[property].value))) {
      return data[property].value;
    } else {
      return data[property].value.toLocaleUpperCase();
    }
  } else {
    return 0;
  }
};

/**
 * component to show flexible data consisting of multiple data types, custom components
 * also handles standard table operations, primarily with event emitters for the end user to react to
 */
@Component({
  selector: 'lib-ifx-datatable',
  templateUrl: './ifx-datatable.component.html',
  styleUrl: './ifx-datatable.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    /* trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),*/
  ],
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    PropertyDisplayComponent,
    PortalModule,
  ],
})
export class IfxDatatableComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  ref = inject(ChangeDetectorRef);
  _injector = inject(Injector);

  dataTable = viewChild(MatTable);
  _sort = viewChild(MatSort);

  @ViewChildren('expandedRowOutlet', { read: ViewContainerRef })
  rowOutlet!: QueryList<ViewContainerRef>;
  sortChange = output<Sort>();
  pageChange = output<PageEvent>();
  rowClick = output<MatRow>();

  data = input<{ [key: string]: DataProperty }[]>();
  fieldsConfig = input<DataProperty[]>();
  displayColumns = computed(() => {
    let ret: string[];
    if (this.selectableRows()) {
      ret = ['select'].concat(
        this.displayFields()?.map((field) => field.field) as string[],
      );
    } else {
      ret = this.displayFields()?.map((field) => field.field) as string[];
    }
    return ret;
  });

  displayFields = computed(() => {
    let ret: DataProperty[] = this.fieldsConfig()?.filter(
      (field) => !!field.visible,
    ) as DataProperty[];
    if (!ret || !ret.length) {
      ret = this.fieldsConfig() as DataProperty[];
    }
    return ret;
  });

  selectableRows = input(false);
  pageData = input<PageData>(new PageData({ total: this.data()?.length }));
  showPaginator = input(true);
  useInternalPaginator = input(false);
  showBottomPaginator = input(false);
  hidePageSize = input(false);
  expandable = input(true);

  /**
   * This compares each row of the table to the "expanded element - if they are equal, the row is expanded
   *  todo: this only allows one open at a time, this might need to be a map to allow multiple expanded rows
   */
  expandedElement: unknown | null;

  dataSource = computed(() => {
    const ds = new MatTableDataSource<{ [key: string]: DataProperty }>(
      this.data(),
    );

    if (this.internalSort() && this._sort()) {
      ds.sortingDataAccessor = _sortingDataAccessor;
      ds.sort = this._sort() as MatSort;
    }
    return ds;
  });

  /**
   * whether to toggle the condensed class to make a more compact table
   * @type {boolean}
   */
  condensed = input(false);
  internalSort = input(false);

  rowSelectionChange = output<SelectionModel<unknown>>();

  selection = new SelectionModel<unknown>(true, []);

  /**
   * Paginator object from Angular Material
   *
   */
  @ViewChild(MatPaginator) set paginator(paginator: MatPaginator) {
    this.dataSource().paginator = paginator;
  }

  ngOnInit() {
    this._sort()
      ?.sortChange.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.dataSource()?.paginator?.firstPage();
      });

    this.selection.changed
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.ref.detectChanges();
        this.rowSelectionChange.emit(this.selection);
      });

    const defaultSort: DataProperty[] = this.fieldsConfig()
      ? (this.fieldsConfig()?.filter((field) => field.sorted) as DataProperty[])
      : ([] as DataProperty[]);

    if (defaultSort.length > 0 && this.data()) {
      this._sort()?.sort({
        id: defaultSort[0].field,
        start: defaultSort[0].sorted ? defaultSort[0].sorted : 'asc',
        disableClear: true,
      });
      this.dataTable()?.renderRows();
    }
  }

  /**
   * emit sort change events for external data
   * @param sort
   */
  changeSort(sort: Sort): void {
    this.sortChange.emit(sort);
    this.ref.detectChanges();
    this.dataTable()?.renderRows();
  }

  /**
   * emit page change events or use internal paginator
   * @param $event
   */
  changePage($event: PageEvent): void {
    this.pageChange.emit($event);
  }

  getColSpan(): number {
    return this.displayFields() ? this.displayFields().length + 2 : 2;
  }

  /**
   * forces to boolean a check to see if a field has a custom component associated with it
   * @param field
   */
  checkCustomComponent(field: DataProperty): boolean {
    return !!field.customComponent;
  }

  /**
   * creates a custom component inside a table field currently the specific field data, substance object and expanded row
   * container are sent to the custom component
   * todo: the comtainer and object should be optional fields
   * todo: table injected components need to implement an interface to get the substance or container
   * @param field
   */
  getCustomComponent(field: DataProperty): ComponentPortal<unknown> | null {
    if (this.rowOutlet && field.customComponent) {
      const comp = this._injector.get<Type<unknown>>(field.customComponent);
      return new ComponentPortal(comp);
    } else {
      return null;
    }
  }

  /**
   * this fires once the custom comoponent above is created. Here is where listeners can be added to react to requests
   * from the injected component
   * this gives access to the injected component instance
   * @param component
   * @param index
   * @param field
   */
  componentAttached(
    component: CdkPortalOutletAttachedRef,
    index: number,
    field: DataProperty,
  ) {
    if (component) {
      const dataArr: { [p: string]: DataProperty }[] = this.data() as {
        [p: string]: DataProperty;
      }[];
      const obj: { [p: string]: DataProperty } = dataArr[index] as {
        [p: string]: DataProperty;
      };

      const compRef: ComponentRef<Record<string, unknown>> =
        component as ComponentRef<Record<string, unknown>>;
      if (compRef.instance['data'] === null && obj[field.field]) {
        const dataField: string = field.field;
        compRef.instance['data'] = <unknown>obj[dataField];
      }

      if (this.data() && compRef.instance['object']) {
        compRef.instance['object'] = obj;
      }
      if (compRef.instance['container']) {
        compRef.instance['container'] = this.rowOutlet.toArray()[index];
      }
      if (this.data() && compRef.instance['parent']) {
        compRef.instance['parent'] = obj;
      }
      if (compRef.instance['clickEvent']) {
        const clickRef: Observable<MatRow> = compRef.instance[
          'clickEvent'
        ] as Observable<MatRow>;
        clickRef.subscribe((res: MatRow) => {
          this.cellClicked(res);
        });
      }
      if (compRef.instance['ref']) {
        // todo this is still problematic because injected components are redrawn.
        this.ref.detach();
      }
    }
  }

  /**
   * expand row on cell click
   * @param {MatRow} row
   */
  cellClicked(row: MatRow): void {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  /**
   * emit row when clicked on
   * @param {MatRow} row
   */
  rowClicked(row: MatRow): void {
    this.rowClick.emit(row);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource().data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected() == true) {
      this.selection.clear();
    } else {
      this.dataSource().data.forEach((row) => this.selection.select(row));
    }
    this.ref.detectChanges();
  }

  protected readonly Array = Array;
}
