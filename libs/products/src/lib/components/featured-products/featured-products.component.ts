/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product, ProductsService } from '@bluebits/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-featured-products',
  templateUrl: './featured-products.component.html',
  styles: [
  ]
})
export class FeaturedProductsComponent implements OnInit, OnDestroy {

  featuredProducts : Product[] = [];
  endSubs$: Subject<any> = new Subject();

  constructor(private prodService: ProductsService) { }

  ngOnInit() {

    this._getFeaturedProducts();

  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

  private _getFeaturedProducts() {

    this.prodService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(featured =>{

      this.featuredProducts = featured;
    })
  }

}
