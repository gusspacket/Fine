
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  private _settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(null);


  constructor(private http: HttpClient) { }
  // settings: Settings;

  private settingsUrl = 'http://89.108.114.139/api/settings/'

  getAllSettings():Observable<Settings> {
    return this.http.get<Settings>(this.settingsUrl).pipe(
      tap((settings) => {
        this._settings.next(settings)
      })
    )
  }

/**
   * Getter for settings
   */

get settings(): Observable<Settings> {
  return this._settings.asObservable();
}



}
