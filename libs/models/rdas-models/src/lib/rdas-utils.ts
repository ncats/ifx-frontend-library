//todo see if i can keep using router params obj
import { TypedDocumentNode } from '@apollo/client';
import { Params } from '@angular/router';

export class QueryParameters {
  pageSize?: number;
  pageIndex?: number;
  parentId?: string; //hierarchy tree
  sort?: string;
  direction?: string;
  phenotypes?: string;
  genes?: string;
  q?: string;
}

export enum DIRECTION {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class RdasQueryParams {
  limit?: number;
  offset?: number;
  sort?: [{ [key: string]: DIRECTION }];
}

export interface RdasQueryFactory {
  query: TypedDocumentNode<unknown, unknown>;
  params: RdasQueryParams;

  getQuery(params: Params): {
    query: TypedDocumentNode<unknown, unknown>;
    params: Params;
  };
  _buildQuery(params: Params): TypedDocumentNode<unknown, unknown>;
  _buildParams(params: Params): void;
}
