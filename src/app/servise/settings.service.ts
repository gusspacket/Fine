
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  settings: Settings;

  private settingsUrl = 'http://89.108.114.139/api/settings/'

  getAllSettings():Observable<Settings> {
    return this.http.get<Settings>(this.settingsUrl)
  }





}
