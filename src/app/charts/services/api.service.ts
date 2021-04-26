/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export abstract class ApiService<T> {
  private readonly apiUrl = `${environment.apiUrl}${this.getResourceUrl()}`;

  constructor(protected httpClient: HttpClient) {}

  abstract getResourceUrl(): string;

  toServerModel(entity: T): any {
    return entity;
  }

  fromServerModel(json: any): T {
    return json;
  }

  getList(index: number, page: number): Observable<T[]> {
    const params = new HttpParams().set('limit', index.toString()).set('offset', page.toString());

    return this.httpClient.get<T[]>(`/${this.apiUrl}?${params.toString()}`).pipe(
      map((list) => list.map((item) => this.fromServerModel(item))),
      catchError(this.handleError)
    );
  }

  get(id: string | number): Observable<T> {
    return this.httpClient.get<T>(`/${this.apiUrl}/${id}`).pipe(
      map((json) => this.fromServerModel(json)),
      catchError(this.handleError)
    );
  }

  add(resource: T): Observable<any> {
    return this.httpClient.post(`/${this.apiUrl}`, this.toServerModel(resource)).pipe(catchError(this.handleError));
  }

  delete(id: string | number): Observable<any> {
    return this.httpClient.delete(`/${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  update(resource: T): Observable<any> {
    return this.httpClient.put(`/${this.apiUrl}`, this.toServerModel(resource)).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    // Handle the HTTP error here
    return throwError('Something wrong happened');
  }
}
