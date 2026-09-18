import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { Filter, FilterCategory } from 'utils-models';
import { Disease } from 'rdas-models';
import { SharedUtilsDataNotFoundComponent } from 'data-not-found';
import { SharedUtilsListFilterRowComponent } from 'list-filter-row';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { SharedUtilsFilterPanelComponent } from 'filter-panel';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { HighlightPipe } from 'highlight-pipe';
import { MatCheckbox } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { form, FormField } from '@angular/forms/signals';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-rdas-panel-template',
  imports: [
    CommonModule,
    MatPaginatorModule,
    SharedUtilsListFilterRowComponent,
    SharedUtilsDataNotFoundComponent,
    MatProgressSpinner,
    MatIconButton,
    MatIcon,
    MatButton,
    MatDrawerContainer,
    MatDrawer,
    MatDrawerContent,
    SharedUtilsFilterPanelComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatSlideToggle,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    HighlightPipe,
    MatCheckbox,
    FormField,
  ],
  templateUrl: './rdas-panel-template.component.html',
  styleUrl: './rdas-panel-template.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RdasPanelTemplateComponent {
  filters = input<FilterCategory[]>();
  _id = input<string>();
  loaded = input<boolean | undefined>();
  message = input<string>();
  disease = input<Disease>();
  diseaseSubscription = computed(() => {
    return {
      gardName: this.disease()?.gardName,
      gardId: this.disease()?.gardId,
    };
  });
  count = input<number>(0);
  showPagination = input<boolean>(true);
  listChange = output<{ [key: string]: unknown }>();
  paginator = viewChild<MatPaginator>(MatPaginator);
  filterSelection = new SelectionModel<string | number | boolean>(true, []);

  fetchList(event: unknown) {
    const retObj: { [key: string]: (string | number | boolean)[] } = {};
    Object.entries(event as { [key: string]: Filter[] }).forEach(
      ([key, filters]) =>
        (retObj[key] = [...filters.map((filter) => filter.term)]),
    );
    this.listChange.emit(retObj);
  }

  filterChange(
    event: {
      label: string;
      term?: string | number | boolean;
      values: (string | number | boolean)[];
    }[]
  ) {
    const retObj: { [key: string]: (string | number | boolean)[] } = {};
    event.forEach(filter => {
      retObj[<string>filter.term] = filter.values
    })
    this.listChange.emit(retObj);
  }

  toggleField(label: string, value: boolean) {
    this.listChange.emit({ [label]: value });
  }

  pageList(event: PageEvent) {
    const pageOptions = {
      offset: <number>event.pageIndex * <number>event.pageSize,
    };
    this.listChange.emit(pageOptions);
  }

  _filterField(index: number, filter: Filter) {
    return filter.value;
  }
}
