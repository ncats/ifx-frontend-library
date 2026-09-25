import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ResolverForm, ResolverOption, ResolverResponse } from 'ifx';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ResolverService {
  private resolverUrl!: string;
  private optionsUrl!: string;
  private extraString!: string;
  private http = inject(HttpClient);

  _setOptionsUrl(url: string): void {
    this.optionsUrl = url;
  }

  _setResolverUrl(url: string): void {
    this.resolverUrl = url;
  }

  _setextraString(key: string): void {
    this.extraString = key;
  }

  fetchOptions(): Observable<ResolverOption[]> {
    return this.http.get(this.optionsUrl) as Observable<ResolverOption[]>;
  }

  resolve(urlStub: string, form: ResolverForm) {
    const newForm: ResolverForm = { ...form, apikey: this.extraString };
    return this.http.post<ResolverResponse[]>(
      this.resolverUrl + urlStub,
      this.toUrlEncodedParams(newForm),
      httpOptions,
    );
  }

  private toUrlEncodedParams(body: ResolverForm): string {
    return Object.keys(body)
      .map(
        (key: string) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            body[key as keyof typeof body],
          )}`,
      )
      .join('&');
  }
}
