import { EventEmitter, Injectable, Output } from '@angular/core';
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

  @Output() editPanier = new EventEmitter<IBoxs>()
  @Output() updatePanierEvent = new EventEmitter<IBoxs[]>()
  
  getAllBoxes() : Observable<any> {
   return this.http.get(environment.apiBaseUrl+'api/boxes')
  }

  getPanier(): Box[] {
    return JSON.parse(localStorage.getItem('box') || '[]');
  }

  setBoxes(box: Box) {
    let boxes = this.getAllBoxes();
    localStorage.setItem('box', JSON.stringify(boxes));
    this.updatePanierEvent.emit(this.boxes)
  }
}


