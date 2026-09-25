import { Params } from '@angular/router';

export interface FilterResponse {
  data: {
    filters: Filter[];
    label: string;
  };
}

export class Filter {
  term!: string | number | boolean;
  label!: string;
  value!: string | number | boolean;
  count = 0;
  filteredCount?: number;
  selected = false;
  description?: string;
  tags?: string[];
  format?: string;
  _filteredCount?: { aggregate: { count: { nodes: number } } };

  constructor(obj: Partial<Filter>) {
    Object.assign(this, obj);
    if (obj._filteredCount) {
      this.filteredCount = obj._filteredCount.aggregate.count.nodes;
    }
  }
}

export class FilterCategory {
  label!: string;
  field!: string;
  query?: string | number | boolean;
  parent?: string;
  formType = 'select';
  filterable = true;
  page = 1;
  values!: Filter[];

  constructor(obj: Partial<FilterCategory>) {
    Object.assign(this, obj);
    if (obj.values && obj.values.length) {
      this.values = obj.values
        .map((val) => {
          if (!val.label) {
            val.label = this.label;
          }
          return new Filter(val);
        })
        .sort((a, b) => b.count - a.count);
    }

    if (!obj.label) {
      if (obj.parent) {
        this.label = obj.parent;
      }
    }
    if (!obj.field) {
      if (obj.parent) {
        this.field = obj.parent;
      }
    }
  }
}

export function _parseFilters(
  data: {
    [key: string]: Filter[];
  },
  params?: Params,
) {
  const filters: FilterCategory[] = [];
  Object.entries(data).map((key) => {
    switch (key[0]) {
      case 'allEpiArticlesByYear': {
        const fc = new FilterCategory({
          parent: 'articles',
          label: 'Epidemiology Articles by Year',
          field: 'isEpi',
          values: key[1].map((fil: Partial<Filter>) => {
            let filter: Filter;
            if (params) {
              filter = new Filter({
                ...fil,
                selected:
                  params['year'] === fil.term ||
                  params['year']?.includes(fil.term),
              });
            } else {
              filter = new Filter(fil);
            }
            return filter;
          }),
        });
        fc.values = fc.values.sort((a, b) =>
          b.term.toString().localeCompare(a.term.toString()),
        );
        filters.push(fc);
        break;
      }
      case 'allNHSArticlesByYear': {
        const fc = new FilterCategory({
          parent: 'articles',
          label: 'Natural History Articles by Year',
          field: 'isNHS',
          values: key[1].map((fil: Partial<Filter>) => {
            let filter: Filter;
            if (params) {
              filter = new Filter({
                ...fil,
                selected:
                  params['year'] === fil.term ||
                  params['year']?.includes(fil.term),
              });
            } else {
              filter = new Filter(fil);
            }
            return filter;
          }),
        });
        fc.values = fc.values.sort((a, b) =>
          b.term.toString().localeCompare(a.term.toString()),
        );
        filters.push(fc);
        break;
      }
      case 'diseaseArticleByEpi': {
        filters.push(
          new FilterCategory({
            parent: 'articles',
            label: 'Epidemiology Articles',
            field: 'isEpi',
            formType: 'boolean',
            values: key[1].map((fil: Partial<Filter>) => {
              const filter: Filter = new Filter(fil);
              filter.term = JSON.parse(<string>filter.term);
              if (params) {
                filter.label = 'isEpi';
                filter.selected = params['isEpi']?.includes(filter.term);
              }
              return filter;
            }),
          }),
        );
        break;
      }
      case 'diseaseArticleByNHS': {
        filters.push(
          new FilterCategory({
            parent: 'articles',
            label: 'Natural History Study Articles',
            field: 'isNHS',
            formType: 'boolean',
            values: key[1].map((fil: Partial<Filter>) => {
              const filter: Filter = new Filter(fil);
              filter.term = JSON.parse(<string>filter.term);
              if (params) {
                filter.label = 'isNHS';
                filter.selected = params['isNHS']?.includes(filter.term);
              }
              return filter;
            }),
          }),
        );
        break;
      }

      case 'allProjectsByYear':
      case 'diseaseProjectsByYear': {
        filters.push(
          new FilterCategory({
            parent: 'projects',
            label: 'Projects Count by Year',
            filterable: false,
            values: key[1].map((fil: Partial<Filter>) => new Filter(fil)),
          }),
        );
        break;
      }

      case 'diseaseProjectsByCost': {
        filters.push(
          new FilterCategory({
            parent: 'projects',
            label: 'Projects Funding by Year',
            filterable: false,
            values: key[1].map((fil: Partial<Filter>) => new Filter(fil)),
          }),
        );
        break;
      }

      case 'allTrialsByPhase':
      case 'trialCountsByPhase':
      case 'diseaseTrialsByPhase': {
        filters.push(
          new FilterCategory({
            parent: 'trials',
            label: 'Clinical Trials by Phase',
            field: 'phase',
            values: key[1].map((fil: Partial<Filter>) => {
              let filter: Filter;
              if (params) {
                filter = new Filter({
                  ...fil,
                  selected:
                    params['phase'] === fil.term ||
                    params['phase']?.includes(fil.term),
                });
              } else {
                filter = new Filter(fil);
              }
              return filter;
            }),
          }),
        );
        break;
      }
      case 'allTrialsByStatus':
      case 'trialCountsByStatus':
      case 'diseaseTrialsByStatus': {
        filters.push(
          new FilterCategory({
            parent: 'trials',
            label: 'Clinical Trials by Status',
            field: 'overallStatus',
            values: key[1].map((fil: Partial<Filter>) => {
              let filter: Filter;
              if (params) {
                filter = new Filter({
                  ...fil,
                  selected:
                    params['overallStatus'] === fil.term ||
                    params['overallStatus']?.includes(fil.term),
                });
              } else {
                filter = new Filter(fil);
              }
              return filter;
            }),
          }),
        );
        break;
      }
      case 'allTrialsByType':
      case 'trialCountsByType':
      case 'diseaseTrialsByType': {
        filters.push(
          new FilterCategory({
            parent: 'trials',
            label: 'Clinical Trials by Type',
            field: 'studyType',
            values: key[1].map((fil: Partial<Filter>) => {
              let filter: Filter;
              if (params) {
                filter = new Filter({
                  ...fil,
                  selected:
                    params['studyType'] === fil.term ||
                    params['studyType']?.includes(fil.term),
                });
              } else {
                filter = new Filter(fil);
              }
              return filter;
            }),
          }),
        );
        break;
      }
      case 'allArticlesByYear':
      case 'diseaseArticleByYear': {
        const fc = new FilterCategory({
          parent: 'articles',
          label: 'Articles by Year',
          field: 'year',
          values: key[1].map((fil: Partial<Filter>) => {
            let filter: Filter;
            if (params) {
              filter = new Filter({
                ...fil,
                selected:
                  params['year'] === fil.term ||
                  params['year']?.includes(fil.term),
              });
            } else {
              filter = new Filter(fil);
            }
            return filter;
          }),
        });
        fc.values = fc.values.sort((a, b) =>
          b.term.toString().localeCompare(a.term.toString()),
        );
        filters.push(fc);
        break;
      }
    }
  });
  return filters;
}
