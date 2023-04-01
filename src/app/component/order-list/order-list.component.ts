import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  imageLink: string = environment.apiImageUrl;

  constructor() {}

  ngOnInit(): void {
    this.loadOrdersFromLocalStorage();
  }

  loadOrdersFromLocalStorage() {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }
  // Calcule le total d'une commande
  calculateTotal(order: any): string {
    let total = 0;
    for (let item of order.cart) {
      total += item.prix;
    }
    return total.toFixed(2);
  }

  // Efface le localStorage
  clearLocalStorage() {
    localStorage.removeItem('orders');
    this.orders = []; // Met à jour la liste des commandes
  }
}
