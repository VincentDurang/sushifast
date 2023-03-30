import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/Box';
import { ManagerBoxService } from 'src/app/service/manager-box.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boxes: Box[] = [];
  imageLink:string = environment.apiImageUrl

  constructor(private boxService: ManagerBoxService) { }

  ngOnInit() {
    this.boxService.getAllBoxes().subscribe((data) => {
      this.boxes = data;
    });
  }

  addToCart(box: Box) {
    console.log("ajout panier")
    this.boxService.addToCart(box);
  }
}