import {
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Article, PubtatorAnnotation } from 'rdas-models';
import { ArticleListCardComponent } from '../article-list-card/article-list-card.component';

@Component({
  selector: 'lib-article-details-display',
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    ArticleListCardComponent,
  ],
  templateUrl: './article-details-display.component.html',
  styleUrls: ['./article-details-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ArticleDetailsDisplayComponent {
  private sanitizer = inject(DomSanitizer);
  article = input<Article>();
  annotationsMap = computed<Map<string, string[]>>(() => {
    const aMap: Map<string, string[]> = new Map<string, string[]>();
    const art = this.article();
    if (art && art.annotations) {
      art.annotations.forEach((annotation: PubtatorAnnotation) => {
        if (annotation.annotation) {
          if (aMap.has(annotation.annotationType)) {
            let types = aMap.get(annotation.annotationType);
            if (types) {
              types = [...types, ...annotation.annotation];
            } else {
              types = annotation.annotation;
            }
            aMap.set(annotation.annotationType, [...new Set(types)]);
          } else {
            aMap.set(annotation.annotationType, annotation.annotation);
          }
        }
      });
    }
    return aMap;
  });
  showAbstract = false;

  getArticleAbstract(): SafeHtml | undefined {
    const text = this.article()?.abstractText;
    if (text) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    } else {
      return undefined;
    }
  }
}
