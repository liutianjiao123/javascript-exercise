import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Themes} from './themeDefinition';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }
  getThemes(): Observable<Themes> {
    return this.http.get<Themes>('https://bootswatch.com/api/4.json');
  }
}
