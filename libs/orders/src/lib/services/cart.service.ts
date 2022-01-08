/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

export const CART_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());

  constructor() { }

  initialCartLocalStorage() {

    const cart: Cart = this.getCart();
    if (!cart) {

      const initialCart = {
        items: []
      };

      const initialCartJson = JSON.stringify(initialCart);
      localStorage.setItem(CART_KEY, initialCartJson);
    }

  }

  getCart() {

    const cartJsonString: any = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem): Cart {

    const cart = this.getCart();
    const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);

    if (cartItemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          item.quantity = item.quantity + cartItem.quantity;
        }
      });
    }
    else {
      cart.items.push(cartItem);
    }
    const cartItemsJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartItemsJson);
    this.cart$.next(cart);
    return cart;
  }

}
