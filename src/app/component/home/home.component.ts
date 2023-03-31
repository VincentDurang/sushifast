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
  boxes: Box[] = []; // Liste des boxes
  imageLink: string = environment.apiImageUrl; // Lien vers les images des boxes

  // Injection du service ManagerBoxService dans le composant
  constructor(private boxService: ManagerBoxService) {}

  // Méthode appelée lors de l'initialisation du composant
  ngOnInit() {
    this.boxService.getAllBoxes().subscribe((data) => { // Récupère toutes les boxes depuis le service
      this.boxes = data; // Affecte les données récupérées à la variable this.boxes
    });
  }

  // Méthode pour ajouter une box au panier
  addToPanier(box: Box) {
    console.log('ajout panier'); // Affiche un message dans la console
    this.boxService.addToPanier(box); // Appelle la méthode addToCart du service avec la box en paramètre
  }
}
