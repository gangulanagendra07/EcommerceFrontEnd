/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { CategoriesService, Category } from '@bluebits/products';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  endsubs$: Subject<any> = new Subject();

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private catergoriesService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
     this._getCategories();
  }

  ngOnDestroy(){

    this.endsubs$.next();
    this.endsubs$.complete();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DeleteCategory(categoryId: string) {

    this.confirmationService.confirm({
      message: 'Do you want to delete this category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.catergoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endsubs$)).subscribe((response) => {
          this._getCategories();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category Is Deleted' });
        },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Is Not Deleted' });
          });
      },
      reject: (type: any) => {

      }
  });
  }

  UpdateCategory(categoryId: string){
      this.router.navigateByUrl(`categories/form/${categoryId}`);

  }

  private _getCategories() {
    this.catergoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe(cats => {
      this.categories = cats;
    });
  }
}
