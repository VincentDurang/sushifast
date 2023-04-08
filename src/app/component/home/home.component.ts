import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Box } from 'src/app/models/Box';
import { ManagerBoxService } from 'src/app/service/manager-box.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  boxes: Box[] = [];
  imageLink: string = environment.apiImageUrl;
  lastAddToCartTime: number = 0; //Ligne pour stocker la dernière fois qu'un élément a été ajouté au panier

  constructor(private boxService: ManagerBoxService) {}

  ngOnInit() {
    this.boxService.getAllBoxes().subscribe((data) => {
      this.boxes = data;
    });
  }

  addToPanier(box: Box) {
    const currentTime = Date.now();
    if (currentTime - this.lastAddToCartTime > 300) {
      // Vérifie si au moins 2 secondes se sont écoulées depuis le dernier ajout
      console.log('ajout panier');
      this.boxService.addToPanier(box);
      this.lastAddToCartTime = currentTime; //La dernière fois qu'un élément a été ajouté au panier
    } else {
      console.log(
        'Veuillez patienter 0.3 secondes entre chaque ajout au panier.'
      );
    }
  }
}
