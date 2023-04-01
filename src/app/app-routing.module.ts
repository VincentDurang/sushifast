import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { PanierComponent } from './component/panier/panier.component';
import { RgpdComponent } from './component/rgpd/rgpd.component';
import { BrowserModule } from '@angular/platform-browser';
import { OrderListComponent } from './component/order-list/order-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'rgpd', component: RgpdComponent},
  { path: 'commandes', component: OrderListComponent},
];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
