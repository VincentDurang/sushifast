import { Component } from '@angular/core';
import { Box } from 'src/app/models/Box';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {
  items: Box[]

  constructor(private cartService: CartService) {
    this.items = cartService.getItems();
    cartService.updateNewEvent.subscribe( ( items: Box[]) =>{
      this.items= items
  })
   }

  removeFromCart(index: number) {
    this.items.splice(index, 1);
  }
}