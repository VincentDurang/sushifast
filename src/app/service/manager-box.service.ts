import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Box } from '../models/Box';
import { IBoxs } from '../models/iBoxes';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManagerBoxService {
 
  
  boxes!: Box[];

  constructor(private http:HttpClient) {

  }
  getAllBoxes() : Observable<any> {
   return this.http.get(environment.apiBaseUrl+'api/boxes')
  }
}


