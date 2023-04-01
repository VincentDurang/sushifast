import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  imageLink: string = environment.apiImageUrl;

  constructor() { }

  ngOnInit(): void {
    this.loadOrdersFromLocalStorage();
  }

  loadOrdersFromLocalStorage() {
    this.orders = JSON.parse(localStorage.getItem('orders') || '[]');
  }
}
