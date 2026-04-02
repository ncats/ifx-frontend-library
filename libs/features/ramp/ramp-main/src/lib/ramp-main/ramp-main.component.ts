import { CdkScrollable } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatCard } from '@angular/material/card';
import { MatRipple } from '@angular/material/core';
import { RouterLink, Router } from '@angular/router';
import { OpenApiPath } from 'utils-models';
import { Store } from '@ngrx/store';
import {
  DropdownQuestion,
  FileUploadQuestion,
  MultiSelectQuestion,
  NumberQuestion,
  QuestionBase,
  RadioQuestion,
  TextareaQuestion,
  TextboxQuestion,
} from 'ifx-form-question';
import { FormSubsection } from 'ramp';
import { RampPageComponent } from 'ramp-page';
import { RampSelectors } from 'ramp-store';

@Component({
  selector: 'lib-ramp-main',
  imports: [
    CommonModule,
    RampPageComponent,
    CdkScrollable,
    RouterLink,
    MatRipple,
    NgOptimizedImage,
    MatCard,
  ],
  templateUrl: './ramp-main.component.html',
  styleUrl: './ramp-main.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class RampMainComponent {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  activeElement = 'pathways';
  api = this.store.selectSignal(RampSelectors.getRampApi);
  paths = computed(() => {
    return this.api()?.get(this.fragment());
  });
  fragment = computed(() => this.router.url.split('/')[1].split('#')[0]);
  title = computed(() => this.fragment()?.replace(/-/g, ' '));

  filtersMap = computed(() => {
    const filterMap: Map<string, FormSubsection[]> = new Map<
      string,
      FormSubsection[]
    >();
    const pathsValue = this.paths();
    if (pathsValue) {
      const separatedPaths = this._separateInputTabs(pathsValue);
      separatedPaths.forEach((inputTab, formKey) => {
        const filteredInputTab = inputTab.filter((tab) => {
          return tab.filter;
        });
        filteredInputTab.forEach((parsedPath) => {
          const mappedSubform = this._pathToQuestionObject(parsedPath);
          if (filterMap.has(formKey)) {
            const tabQuestionsList = filterMap.get(formKey) as FormSubsection[];
            tabQuestionsList.push(mappedSubform);
            filterMap.set(formKey, tabQuestionsList);
          } else {
            filterMap.set(formKey, [mappedSubform]);
          }
        });
      });
    }
    return filterMap;
  });

  inputMap = computed(() => {
    const inputMap: Map<string, FormSubsection[]> = new Map<
      string,
      FormSubsection[]
    >();
    const pathsValue = this.paths();
    if (pathsValue) {
      const separatedPaths = this._separateInputTabs(pathsValue);
      separatedPaths.forEach((inputTab, formKey) => {
        inputTab.forEach((parsedPath) => {
          const mappedSubform = this._pathToQuestionObject(parsedPath);
          if (inputMap.has(formKey)) {
            const tabQuestionsList = inputMap.get(formKey) as FormSubsection[];
            tabQuestionsList.push(mappedSubform);
            inputMap.set(formKey, tabQuestionsList);
          } else {
            inputMap.set(formKey, [mappedSubform]);
          }
        });
      });
    }
    return inputMap;
  });

  isActive(path: string | undefined): boolean {
    return this.fragment() === path;
  }

  _mapPathToQuestion(
    key: string,
    prop: { [key: string]: unknown },
  ): QuestionBase<string> {
    let q = {} as QuestionBase<string>;
    switch (prop['type']) {
      case 'array': {
        if (prop['enum']) {
          q = new MultiSelectQuestion();
          const enu = <string[]>prop['enum'];
          const opts: { key: string; value: boolean | string }[] = [];
          enu.forEach((val) => opts.push({ key: val, value: val }));
          q.options = opts;
        } else {
          q = new TextareaQuestion({
            required: true,
          });
        }
        break;
      }
      case 'boolean': {
        q = new RadioQuestion({});
        if (prop['enum']) {
          const enu = <string[]>prop['enum'];
          const opts: { key: string; value: boolean | string }[] = [];
          enu.forEach((val) => opts.push({ key: val, value: val }));
          q.options = opts;
        } else {
          q.options = [
            { key: 'Yes', value: true },
            { key: 'No', value: false },
          ];
        }
        break;
      }
      case 'string': {
        if (prop['enum']) {
          const enu = <string[]>prop['enum'];
          const opts: { key: string; value: string }[] = [];
          enu.forEach((val) => opts.push({ key: val, value: val }));
          q = new DropdownQuestion({
            options: opts,
          });
        } else if (prop['format']) {
          q = new FileUploadQuestion();
          q.multiple = prop['multiple'] ? <boolean>prop['multiple'] : false;
        } else {
          q = new TextboxQuestion({});
        }
        if (prop['required']) {
          q.required = <boolean>prop['required'];
        }
        break;
      }
      case 'number': {
        q = new NumberQuestion({
          min: <number>prop['minimum'],
          max: <number>prop['maximum'],
        });

        break;
      }
    }
    if (<string>prop['label']) {
      q.label = <string>prop['label'];
      q.key = <string>prop['field'];
    } else {
      const label = (<string>prop['field']) as string;
      q.key = label;
      q.label = label.replace(/_/g, ' ');
    }

    if (prop['required']) {
      q.required = <boolean>prop['required'];
    }

    if (prop['description']) {
      q.description = <string>prop['description'];
    }

    if (prop['value']) {
      q.value = <string>prop['value'];
    }
    return q;
  }

  _pathToQuestionObject(path: OpenApiPath) {
    const questionsList = path.properties;
    const title: string = path.subtitle
      ? <string>path.subtitle
      : <string>path.title;
    const questionArray: QuestionBase<string>[] = [];
    questionsList.forEach((question) => {
      const field = <string>question['field'];
      const questionObject = this._mapPathToQuestion(field, question);
      questionArray.push(questionObject);
    });
    return { section: title, questions: questionArray };
  }

  _separateInputTabs(paths: OpenApiPath[]) {
    const inputTabMap: Map<string, OpenApiPath[]> = new Map<
      string,
      OpenApiPath[]
    >();
    paths.forEach((path) => {
      if (!(<boolean>path.hideSection)) {
        const subForm: string = <string>path.title;
        if (inputTabMap.has(subForm)) {
          const pathArray = inputTabMap.get(subForm) as OpenApiPath[];
          pathArray.push(path);
          inputTabMap.set(subForm, pathArray);
        } else {
          inputTabMap.set(subForm, [path]);
        }
      }
    });
    return inputTabMap;
  }

  cleanLabel(label: string): string {
    return label.replace(/-/g, ' ');
  }

  _originalOrder = () => 0;
}
