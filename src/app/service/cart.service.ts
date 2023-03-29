import {EventEmitter, Injectable, Output } from '@angular/core';
import { Box } from '../models/Box';
import { IBoxs } from '../models/iBoxes';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Box[] = [];

  constructor() {
    this.items = this.getItems();
  }
  
  @Output() updateNewEvent = new EventEmitter<IBoxs[]>()

  addToCart(box: Box) {
    this.items.push(box);
    console.log('service')
    console.log(this.items)
  }

  getItems() {
    return this.items;
    
  }

  clearCart() {
    this.items = [];
    console.log('service')
    console.log(this.items)
    return this.items;
  }
}
