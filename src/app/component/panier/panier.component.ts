import { Component, OnInit } from '@angular/core';
import { ManagerBoxService } from 'src/app/service/manager-box.service';
import { Box } from 'src/app/models/Box';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog.component';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
  cart: Box[] = [];
  uniqueCart: Box[] = [];
  total: number = 0;
  imageLink:string = environment.apiImageUrl

  constructor(private boxService: ManagerBoxService, public dialog: MatDialog) { }
  
  openConfirmationDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveCartToLocalStorage();
      }
    });
  }


  ngOnInit() {
    this.cart = this.boxService.getCart();
    this.uniqueCart = this.getUniqueCart();
    this.calculateTotal();
  }

  calculateTotal() {
    this.total = 0;
    for (let box of this.cart) {
      this.total += box.prix;
    }
    this.total = parseFloat(this.total.toFixed(2));
  }
  

  getUniqueCart(): Box[] {
    return this.cart.filter((value, index, array) => 
      array.findIndex(find => find.id === value.id) === index
    );
  }

  countOccurrences(box: Box): number {
    return this.cart.reduce((acc, b) => {
      if (b.id === box.id) {
        return acc + 1;
      }
      return acc;
    }, 0);
  }

  removeFromCart(box: Box) {
    const index = this.cart.findIndex(b => b.id === box.id);
  
    if (index !== -1) {
      this.cart.splice(index, 1);
      this.uniqueCart = this.getUniqueCart();
      this.calculateTotal();
    }
  }
  
  addToCart(box: Box) {
    this.cart.push(box);
    this.uniqueCart = this.getUniqueCart();
    this.calculateTotal();
  }

  saveCartToLocalStorage() {
    console.log('saveCartToLocalStorage') 
      localStorage.setItem('cart', JSON.stringify(this.cart));
    
  }
  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('panier');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }
  

 
  }
