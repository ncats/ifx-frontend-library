import { inject, Injectable } from '@angular/core';
import { ObservableQuery, DocumentNode } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private apollo = inject(Apollo);

  fetchDiseases(
    query: DocumentNode,
    variables: object = {},
  ): Observable<ObservableQuery.Result<unknown>> {
    return this.apollo
      .watchQuery({
        query,
        variables,
      })
      .valueChanges.pipe();
  }

  fetchArticles(query: DocumentNode, variables: object = {}) {
    return this.apollo
      .use('articles')
      .watchQuery({
        query,
        variables,
      })
      .valueChanges.pipe();
  }

  fetchTrials(query: DocumentNode, variables: object = {}) {
    return this.apollo
      .use('trials')
      .watchQuery({
        query,
        variables,
      })
      .valueChanges.pipe();
  }

  fetchProjects(query: DocumentNode, variables: object = {}) {
    return this.apollo
      .use('projects')
      .watchQuery({
        query,
        variables,
      })
      .valueChanges.pipe();
  }
}
