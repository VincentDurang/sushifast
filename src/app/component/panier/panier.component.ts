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
  imageLink:string = environment.apiImageUrl
  total: number = 0

  constructor(private boxService: ManagerBoxService) { }

  ngOnInit() {
    this.cart = this.boxService.getCart();
    this.calculTotal()
  }

  calculTotal(){
    this.total = 0
    for (let box of this.cart){
      this.total += box.prix
    }
  }
  deleteBox(index: number){
    this.cart.splice(index, 1)
    this.calculTotal()
  }
  

}