import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { PubtatorAnnotation } from 'rdas-models';
import { ArticleDetailsDisplayComponent } from 'article-display';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ArticleStore } from 'article-store';

@Component({
  selector: 'lib-article-page',
  imports: [CommonModule, ArticleDetailsDisplayComponent],
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ArticlePageComponent {
  private articleStore = inject(ArticleStore);
  article = this.articleStore.article;
}
