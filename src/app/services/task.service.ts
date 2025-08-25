import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Task } from '../models/task';
import { Page } from '../models/page';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/tasks`;

  list(params: {
    page: number;
    size: number;
    sort?: string;
    status?: string;
    titulo?: string;
  }): Observable<Page<Task>> {
    let httpParams = new HttpParams()
      .set('page', params.page)
      .set('size', params.size);
    if (params.sort) {
      httpParams = httpParams.set('sort', params.sort);
    }
    if (params.status) {
      httpParams = httpParams.set('status', params.status);
    }
    if (params.titulo) {
      httpParams = httpParams.set('titulo', params.titulo);
    }
    return this.http.get<Page<Task>>(this.apiUrl, { params: httpParams });
  }

  get(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`);
  }

  create(payload: Pick<Task, 'titulo' | 'descricao' | 'status'>): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, payload);
  }

  update(id: number, payload: Pick<Task, 'titulo' | 'descricao' | 'status'>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

