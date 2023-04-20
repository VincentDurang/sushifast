import { ManagerBoxService } from 'src/app/service/manager-box.service';
import { Box } from 'src/app/models/Box';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog.component';
import { fromEvent } from 'rxjs';
import { tap, throttleTime, timestamp } from 'rxjs/operators';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: [],
})
export class PanierComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput?: ElementRef;

  panier: Box[] = [];
  
  uniqueCart: Box[] = [];
  total: number = 0
  subtotal: number = 0
  imageLink: string = environment.apiImageUrl;

  constructor(
    private boxService: ManagerBoxService,
    public dialog: MatDialog
  ) { }

  // Ouvre le dialogue de confirmation pour valider la commande
  openConfirmationDialog() {
    if (this.panier.length === 0) {
      // Si le panier est vide, afficher un message d'erreur
      alert('Votre panier est vide, vous ne pouvez pas passer de commande.');
      return;
    }

    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result) {
        this.savePanierToLocalStorage();
        this.boxService.clearPanier(); // Vide le panier
        this.panier = []; // Met à jour la variable `panier` dans le composant
        this.uniqueCart = []; // Met à jour la variable `uniqueCart` dans le composant
        this.total = 0; // Réinitialise le total
      }
    });
  }

  // Initialise le composant, récupère le panier et calcule le total
  ngOnInit() {
    this.panier = this.boxService.getPanier(); // Récupère le panier du service
    this.uniqueCart = this.getRegroupedBox(); // Regroupe les éléments du panier
    this.calculateTotal(); // Calcule le total du panier
  }

  // Calcule le total du panier
  calculateTotal() {
    
    for (let box of this.panier) {
      this.subtotal += box.prix; // Ajoute le prix de chaque box au sous-total
    }

    if (this.panier.length > 10) { // Vérifie si le panier contient plus de 10 articles
      this.total = this.subtotal * 0.95; // Applique une réduction de 5% sur le sous-total pour obtenir le total avec réduction
    } else {
      this.total = this.subtotal; // Si le panier contient 10 articles ou moins, le total est égal au sous-total
    }

    this.subtotal = parseFloat(this.subtotal.toFixed(2)); // Arrondit le sous-total à deux décimales
    this.total = parseFloat(this.total.toFixed(2)); // Arrondit le total à deux décimales
  }

  // Regroupe les éléments du panier en fonction de leur ID
  getRegroupedBox(): Box[] {
    return this.panier.filter(
      (value, index, array) =>
        array.findIndex((find) => find.id === value.id) === index // Filtrer les éléments uniques par ID
    );
  }

  // Compte le nombre d'occurrences d'une box spécifique dans le panier
  countOccurrences(box: Box): number {
    return this.panier.reduce((nbBox, occBox) => {
      if (occBox.id === box.id) {
        // Si l'ID de la box actuelle correspond à l'ID recherché
        return nbBox + 1; // Incrémente le compteur
      }
      return nbBox; // Sinon, retourne la valeur actuelle du compteur
    }, 0);
  }

  // Supprime une box du panier en fonction de son ID
  removeFromPanier(id: number) {
    this.boxService.deleteCountPanier();
    const index = this.panier.findIndex((box) => box.id === id); // Trouve l'index de la box avec l'ID spécifié
    if (index > -1) {
      this.panier.splice(index, 1); // Supprime la box de l'index trouvé
      this.calculateTotal(); // Recalcule le total
    }
    // Vérifie si le nombre d'occurrences est 0 après la suppression
    const box = this.uniqueCart.find((b) => b.id === id); // Trouve la box avec l'ID spécifié
    if (box && this.countOccurrences(box) === 0) {
      this.uniqueCart = this.uniqueCart.filter((b) => b.id !== id); // Supprime la box si le nombre d'occurrences est 0
    }
  }

  // Ajoute une box au panier
  addToPanier(box: Box) {
    this.boxService.ajouterCountPanier();
    this.panier.push(box); // Ajoute la box à la liste du panier
    this.uniqueCart = this.getRegroupedBox(); // Met à jour la liste des boxes uniques
    this.calculateTotal(); // Recalcule le total
  }
  generateUniqueId() {
    return new Date().getTime().toString();
  }

  // Sauvegarde le panier dans le localStorage
  savePanierToLocalStorage() {
    this.boxService.cleanCountPanier()
    // Récupérer les commandes existantes du localStorage
    let orders = JSON.parse(localStorage.getItem('orders') || '[]');

    if (this.panier.length > 0) {
      // Créer un nouvel objet de commande avec un identifiant unique et le contenu du panier
      let newOrder = {
        id: this.generateUniqueId(),
        cart: this.panier,
      };
      console.log(this.generateUniqueId());

      // Ajouter la nouvelle commande au tableau des commandes
      orders.push(newOrder);
    }
    // Sauvegarder le tableau des commandes mis à jour dans le localStorage
    localStorage.setItem('orders', JSON.stringify(orders));
  }


  isPanierAboveTen() {
    if (this.panier.length > 10){
      return true
    }else{
      return false
    }
  }


  getAllFlavor(boxes: Box[]){
    var flavors = [];
    for (var i = 0; i < boxes.length; i++) {
      for (var j = 0; j < boxes[i].saveurs.length; j++) {
        if (flavors.indexOf(boxes[i].saveurs[j]) === -1) {
          flavors.push(boxes[i].saveurs[j]);
        }
      }
    }
    return flavors
  };

  getUniqueSaveurs(): string[] {
    const saveurs: string[] = [];
    this.panier.forEach((box) => {
      box.saveurs.forEach((saveur) => {
        if (saveurs.indexOf(saveur) === -1) {
          saveurs.push(saveur);
        }
      });
    });
    return saveurs;
  }
}
