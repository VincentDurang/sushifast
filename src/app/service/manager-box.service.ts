import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Box } from '../models/Box';
import { IBoxs } from '../models/iBoxes';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerBoxService {
  boxes!: Box[]; // Liste des boxes
  cart: Box[] = []; // Liste des boxes dans le panier

  // Injection du service HttpClient dans le service
  constructor(private http: HttpClient) {}

  // Récupère toutes les boxes depuis l'API
  getAllBoxes(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + 'api/boxes'); // Envoie une requête GET à l'API pour récupérer les boxes
  }

  // Ajoute une box au panier
  addToPanier(box: Box) {
    this.cart.push(box); // Ajoute la box à la liste du panier
  }

  // Récupère le contenu du panier
  getPanier(): Box[] {
    return this.cart; // Retourne la liste du panier
  }
  
  // Vide le panier
  clearPanier() {
    this.cart = []; // Réinitialise la liste du panier à une liste vide
    console.log('service'); // Affiche un message dans la console
    console.log(this.cart); // Affiche le contenu du panier dans la console
    return this.cart; // Retourne la liste du panier
  }
}
