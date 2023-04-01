import { Component, OnInit } from '@angular/core';
import { ManagerBoxService } from 'src/app/service/manager-box.service';
import { Box } from 'src/app/models/Box';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: [],
})
export class PanierComponent implements OnInit {
  panier: Box[] = [];
  uniqueCart: Box[] = [];
  total: number = 0;
  imageLink: string = environment.apiImageUrl;

  constructor(
    private boxService: ManagerBoxService,
    public dialog: MatDialog
  ) {}

  // Ouvre le dialogue de confirmation pour valider la commande
  openConfirmationDialog() {
    if (this.panier.length === 0) {
      // Si le panier est vide, afficher un message d'erreur
      alert('Votre panier est vide, vous ne pouvez pas passer de commande.');
      return;
    }
  
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);
  
    dialogRef.afterClosed().subscribe((result) => {
      console.log(result)
      if (result) {
        this.savePanierToLocalStorage();
      }
    });    
  }

  // Initialise le composant, récupère le panier et calcule le total
  ngOnInit() {
    this.loadPanierFromLocalStorage();
    this.panier = this.boxService.getPanier(); // Récupère le panier du service
    this.uniqueCart = this.getRegroupedBox(); // Regroupe les éléments du panier
    this.calculateTotal(); // Calcule le total du panier
  }

  // Calcule le total du panier
  calculateTotal() {
    this.total = 0;
    for (let box of this.panier) {
      this.total += box.prix; // Ajoute le prix de chaque box au total
    }
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
    this.panier.push(box); // Ajoute la box à la liste du panier
    this.uniqueCart = this.getRegroupedBox(); // Met à jour la liste des boxes uniques
    this.calculateTotal(); // Recalcule le total
  }
  generateUniqueId() {
    return new Date().getTime().toString();
  }

  // Sauvegarde le panier dans le localStorage
  savePanierToLocalStorage() {
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

  // Charge le panier depuis le localStorage
  loadPanierFromLocalStorage() {
    const storedCart = localStorage.getItem('orders'); // Récupère le panier stocké dans le localStorage
    if (storedCart) {
      this.panier = JSON.parse(storedCart); // Convertit la chaîne JSON en objet et l'affecte à la variable this.panier
    }
  }
}
