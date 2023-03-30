import { Component, OnInit } from '@angular/core';
import { ManagerBoxService } from 'src/app/service/manager-box.service';
import { Box } from 'src/app/models/Box';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cart: Box[] = [];
  uniqueCart: Box[] = [];
  total: number = 0;
  imageLink:string = environment.apiImageUrl

  constructor(private boxService: ManagerBoxService) { }

  ngOnInit() {
    this.cart = this.boxService.getCart();
    this.uniqueCart = this.getUniqueCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    for (let box of this.cart) {
      this.total += box.prix;
    }
  }

  getUniqueCart(): Box[] {
    return this.cart.filter((value, index, array) => 
      array.findIndex(t => t.id === value.id) === index
    );
  }

  countOccurrences(box: Box): number {
    return this.cart.reduce((acc, b) => {
      if (b.id === box.id) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    this.uniqueCart = this.getUniqueCart();
    this.calculateTotal();
  }
  addToCart(box: Box) {
    this.cart.push(box);
    this.uniqueCart = this.getUniqueCart();
    this.calculateTotal();
  }

 
  }
