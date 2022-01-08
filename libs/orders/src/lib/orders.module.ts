import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import {BadgeModule} from 'primeng/badge';
export const ordersRoutes: Route[] = [];

@NgModule({
  imports: [CommonModule,BadgeModule, RouterModule, ],
  declarations: [
    CartIconComponent
  ],
  exports: [
    CartIconComponent
  ]
})
export class OrdersModule {
  constructor(private cartService: CartService) {

    cartService.initialCartLocalStorage();

  }

}
