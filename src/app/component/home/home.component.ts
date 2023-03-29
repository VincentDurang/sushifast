import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/Box';
import { ManagerBoxService } from 'src/app/service/manager-box.service';
import { environment } from 'src/environments/environment';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boxes: Box[] = [];
  ApiImagesUrl= environment.ApiImagesUrl;

  constructor(private boxService: ManagerBoxService, private cartService: CartService) { }

  ngOnInit() {
    this.boxService.getAllBoxes().subscribe((data) => {
      this.boxes = data;
    });
  }
  addToCart(box: Box) {
    console.log("addToCart")
    this.cartService.addToCart(box);
    console.log('component')
    console.log(this.cartService)
  }
}
