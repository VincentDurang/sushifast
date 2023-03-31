import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Box } from '../models/Box';
import { IBoxs } from '../models/iBoxes';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerBoxService {
  boxes!: Box[];
  cart: Box[] = [];
  constructor(private http: HttpClient) {}

  getAllBoxes(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'api/boxes');
  }

  addToCart(box: Box) {
    this.cart.push(box);
  }

  getCart(): Box[] {
    return this.cart;
  }
  clearCart() {
    this.cart = [];
    console.log('service');
    console.log(this.cart);
    return this.cart;
  }
}
