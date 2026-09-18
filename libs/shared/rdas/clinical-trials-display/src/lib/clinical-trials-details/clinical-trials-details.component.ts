import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { ClinicalTrial } from 'rdas-models';

@Component({
  selector: 'lib-clinical-trials-details',
  imports: [CommonModule, MatCardModule, MatTabsModule, MatListModule],
  templateUrl: './clinical-trials-details.component.html',
  styleUrls: ['./clinical-trials-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicalTrialsDetailsComponent {
  breakpointObserver = inject(BreakpointObserver);
  showFullSummary = false;
  trial = input<ClinicalTrial>();
  truncatedSummary = computed(() => {
    const t = this.trial();
    let ret = t?.briefSummary ? t?.briefSummary : '';
    if (t) {
      if (t.briefSummary && t.briefSummary?.length > 800) {
        ret = t.briefSummary.slice(0, 800);
      }
      if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
        if (t.briefSummary && t.briefSummary?.length > 400) {
          ret = t.briefSummary.slice(0, 400);
        }
      }
    }
    return ret;
  });

  fullSummary = computed<boolean>(() => {
    const t = this.trial();
    if (t) {
      if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
        return false;
      } else return !(t.briefSummary && t.briefSummary?.length > 800);
    } else return false;
  });

  getLabel(objType: string, plural = true): string {
    let ret: string = objType;
    const t = this.trial();
    if (t) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const arr = t[objType] as Array<unknown>;
      if (arr) {
        if (arr && arr.length > 1) {
          ret = ret + ' (' + arr.length + ')';
        } else if (arr && arr.length == 1 && plural) {
          ret = ret.slice(0, arr.length - 2);
        }
      }
      ret = ret
        .replace(/([A-Z])/g, (match) => ` ${match}`)
        .replace(/^./, (match) => match.toUpperCase())
        .trim();
    }
    return ret;
  }

  isHeader(criteria: string) {
    return (
      criteria === 'Inclusion Criteria:' || criteria === 'Exclusion Criteria:'
    );
  }
}
