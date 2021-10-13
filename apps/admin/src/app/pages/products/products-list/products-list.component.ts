/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { CategoriesService, Category, ProductsService } from '@bluebits/products';

@Component({
  selector: 'admin-products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {

  products: any = [];

  constructor(private productsService: ProductsService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this._getProducts();
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    })
  }


  DeleteProduct(productId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this product?',
      header: 'Delete product',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productsService.deleteProduct(productId).subscribe((response) => {
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
