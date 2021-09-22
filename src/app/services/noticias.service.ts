/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResponseTopHeadlines} from '../interfaces/interfaces';
import {environment} from '../../environments/environment';
import {ResponseNews} from '../interfaces/mediastack.interface';

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  limit = 25;
  offset = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(
    private http: HttpClient
  ) { }

  getTopHeadlines(): Observable<ResponseNews> {
    const result = this.ejecutarQuery<ResponseNews>(`/news?languages=es&limit=${this.limit}&offset=${this.offset}`);
    this.offset += this.limit;
    return result;
  }

  getTopHeadlinesCategoria(categoria: string): Observable<ResponseNews> {
    if (this.categoriaActual === categoria) {
      this.offset += this.limit;
    } else {
      this.offset = 0;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<ResponseNews>(`/news?languages=es&categories=${categoria}&limit=${this.limit}&offset=${this.offset}`);
  }

  private ejecutarQuery<T>(query: string): Observable<T> {
    query = apiUrl + query + `&access_key=${apiKey}`;
    return this.http.get<T>( query );
  }
}
