/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'orders-cart-icon',
  templateUrl: './cart-icon.component.html',
  styles: [
  ]
})
export class CartIconComponent implements OnInit {

  cartCount: any = 0;
  constructor( private cartService: CartService) { }

  ngOnInit(): void {

    this.cartService.cart$.subscribe((cartItem)=>{
      this.cartCount = cartItem?.items.length ?? 0;
    })
    // this.cartCount = this.cartService.getCart().items.length;

  }

}
