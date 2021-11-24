import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';



@Component({
  selector: 'products-catergories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

 categories: Category[] = [];
 endSubs$: Subject<any> = new Subject();

  constructor( private categoriesService: CategoriesService) { }

  ngOnInit(){

    this.categoriesService.getCategories().pipe(takeUntil(this.endSubs$)).subscribe(categories =>{
      this.categories = categories;
      console.log(categories);
    })
  }

  ngOnDestroy() {
    this.endSubs$.next();
    this.endSubs$.complete();
  }

}
