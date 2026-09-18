import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  input,
  OnInit,
  output,
  Output,
  QueryList,
  signal,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatTooltip } from '@angular/material/tooltip';
import { FilterCategory, OpenApiPath } from 'utils-models';
import { SharedUtilsFilterPanelComponent } from 'filter-panel';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';

@Component({
  selector: 'lib-ontology-panel',
  imports: [
    CommonModule,
    MatTooltip,
    MatButton,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIcon,
    SharedUtilsFilterPanelComponent,
  ],
  templateUrl: './ontology-panel.component.html',
  styleUrl: './ontology-panel.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OntologyPanelComponent implements OnInit {
  @ViewChildren('filterPanel')
  filterPanels!: QueryList<SharedUtilsFilterPanelComponent>;
  paths = input<OpenApiPath[]>();
  fetchMetabolitesSearch = output<{ ontologies: string[] }>();
  downloadMetabolitesSearch = output<{ ontologies: string[] }>();
  ontologies = input<FilterCategory[]>();
  filteredOntologies = signal(this.ontologies());
  ontologyMap: Map<string, string[]> = new Map<string, string[]>();
  disableSearch = false;
  allOntoFilterCtrl: FormControl = new FormControl<string>('');
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.filteredOntologies.set(this.ontologies());

    this.allOntoFilterCtrl.valueChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(400),
        distinctUntilChanged(),
        map((term: string) => {
          const retOntologies: FilterCategory[] = [];
          this.ontologies()?.forEach((ontologyCategory) => {
            const values = ontologyCategory.values.filter((ontology) => {
              const t = <string>ontology.term;
              return t
                .toLocaleLowerCase()
                .includes(<string>term.toLocaleLowerCase());
            });
            retOntologies.push(
              new FilterCategory({
                ...ontologyCategory,
                values: values,
                query: term,
              }),
            );
          });
          this.filteredOntologies.set(retOntologies);
        }),
      )
      .subscribe();
  }

  setValues(
    values: { label: string; values: (string | number | boolean)[] }[],
  ) {
    values.forEach((onto) => {
      this.ontologyMap.set(onto.label, <string[]>onto.values);
    });
  }

  filterChange(search: {
    label: string;
    term?: string | number | boolean;
    page?: number;
  }) {
    if (!search.term || search.term === '') {
      this.filteredOntologies.set(this.ontologies());
    } else {
      const returnedOntologies: FilterCategory[] = [];
      this.ontologies()?.forEach((onto) => {
        if (onto.label === search.label) {
          const term = search.term as string;
          const values = onto.values.filter((val) => {
            const t = <string>val.term;
            return t
              .toLocaleLowerCase()
              .includes(<string>term.toLocaleLowerCase());
          });
          returnedOntologies.push(
            new FilterCategory({ ...onto, values: values, query: term }),
          );
        } else {
          returnedOntologies.push(onto);
        }
        this.filteredOntologies.set(returnedOntologies);
      });
    }
  }

  clearAll() {
    this.filterPanels.forEach((panel) => {
      panel.filterSelection.clear();
    });
  }

  fetchMetabolitesFile() {
    const searchArr: string[] = [...this.ontologyMap.values()].flat();
    const searchObj = { ontologies: searchArr };
    this.downloadMetabolitesSearch.emit(searchObj);
  }

  fetchMetabolites() {
    const searchArr: string[] = [...this.ontologyMap.values()].flat();
    const searchObj = { ontologies: searchArr };
    this.fetchMetabolitesSearch.emit(searchObj);
  }
}
