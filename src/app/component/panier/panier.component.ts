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

  constructor(private boxService: ManagerBoxService) { }

  ngOnInit() {
    this.cart = this.boxService.getCart();
  }

}