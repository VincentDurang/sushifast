import { Component, OnInit } from '@angular/core';
import { ManagerBoxService } from 'src/app/service/manager-box.service';
import { Box } from 'src/app/models/Box';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
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

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.savePanierToLocalStorage();
      }
    });
  }

  ngOnInit() {
    this.panier = this.boxService.getCart();
    this.uniqueCart = this.getRegroupedBox();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    for (let box of this.panier) {
      this.total += box.prix;
    }
    this.total = parseFloat(this.total.toFixed(2));
    //La méthode toFixed() retourne une chaîne de caractères représentant le nombre avec le nombre spécifié de décimales.
  }

  getRegroupedBox(): Box[] {
    return this.panier.filter(
      (value, index, array) =>
        array.findIndex((find) => find.id === value.id) === index
    );
  }

  countOccurrences(box: Box): number {
    return this.panier.reduce((nbBox, occBox) => {
      if (occBox.id === box.id) {
        return nbBox + 1;
      }
      return nbBox;
    }, 0);
  }

  removeFromPanier(id: number) {
    const index = this.panier.findIndex((box) => box.id === id);
    if (index > -1) {
      this.panier.splice(index, 1);
      this.calculateTotal();
    }
    // Vérifie si le nombre d'occurrences est 0 après la suppression
    const box = this.uniqueCart.find((b) => b.id === id);
    if (box && this.countOccurrences(box) === 0) {
      this.uniqueCart = this.uniqueCart.filter((b) => b.id !== id);
    }
  }

  addToPanier(box: Box) {
    this.panier.push(box);
    this.uniqueCart = this.getRegroupedBox();
    this.calculateTotal();
  }

  savePanierToLocalStorage() {
    console.log('saveCartToLocalStorage');
    localStorage.setItem('cart', JSON.stringify(this.panier));
  }
  loadPanierFromLocalStorage() {
    const storedCart = localStorage.getItem('panier');
    if (storedCart) {
      this.panier = JSON.parse(storedCart);
    }
  }
}
