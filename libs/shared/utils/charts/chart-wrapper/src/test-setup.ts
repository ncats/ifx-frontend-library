import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

import { FilterCategory } from 'utils-models';

export const PIEFILTERS: FilterCategory = new FilterCategory({
  field: '',
  label: 'Clinical Trials by Type',
  parent: 'trials',
  filterable: true,
  page: 1,
  values: [
    {
      term: 'Interventional',
      value: 'Interventional',
      label: 'StudyType',
      count: 45,
      selected: false,
    },
    {
      term: 'Observational',
      value: 'Observational',
      label: 'StudyType',
      count: 30,
      selected: false,
    },
  ],
});
