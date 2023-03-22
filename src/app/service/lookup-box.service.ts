import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookupBoxService {

  constructor(private http:HttpClient) { }

  public getBox(){
    return this.http.get(environment.apiBaseUrl);
  }
}
