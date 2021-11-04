/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { CategoriesService, Category, ProductsService } from '@bluebits/products';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  products: any = [];
  endsubs$: Subject<any> = new Subject();

  constructor(private productsService: ProductsService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _getProducts() {
    this.productsService.getProducts().pipe(takeUntil(this.endsubs$)).subscribe(products => {
      this.products = products;
    })
  }


  DeleteProduct(productId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
          this._getProducts();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Is Deleted' });
        },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Is Not Deleted' });
          });
      },
      reject: (type: any) => {

      }
    });

  }
  UpdateProduct(productId: string) {
    this.router.navigateByUrl(`products/form/${productId}`);
  }

}
