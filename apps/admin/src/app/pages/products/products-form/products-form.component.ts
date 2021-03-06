/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Subject, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService, Category, Product } from '@bluebits/products';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  editmode = false;
  isSubmitted = false;
  catagories: any = [];
  imageDisplay: any;
  currentProductId!: string;

  endsubs$: Subject<any> = new Subject();



  constructor(private messageService: MessageService, private location: Location, private formBuilder: FormBuilder, private route: ActivatedRoute, private categoriesService: CategoriesService, private productsService: ProductsService) { }

  ngOnInit(): void {

    this._initForm();
    this._getCategories();
    this._checkEditMode();

  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }

  private _initForm() {

    this.form = this.formBuilder.group({

      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['' , Validators.required],
      isFeatured: [false]

    })

  }

  onSubmit() {

    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();

    Object.keys(this.productForm).map(key => {
      console.log(key);
      productFormData.append(key, this.productForm[key].value);
    })

    if (this.editmode) {
      this._updateProduct(productFormData);
    }
    else {
      this._addProduct(productFormData);
    }
  }


  onCancle() {

  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productsService.getProduct(params.id).subscribe((product) => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category?.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();

        })
      }
    })
  }

  private _getCategories() {

    this.categoriesService.getCategories().subscribe(categories => {
      this.catagories = categories;
    })
  }

  get productForm() {
    return this.form.controls;
  }

  private _addProduct(productData: FormData) {

    this.productsService.createProduct(productData).pipe(takeUntil(this.endsubs$)).subscribe((product: Product) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product  ${product.name} is created` });
      timer(200).toPromise().then(() => {
        setTimeout(() => {
          this.location.back();
        }, 1000)

      })
    },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Is Not Created' });
      });
  }

  private _updateProduct(productData: FormData) {

    this.productsService.updateProduct( productData, this.currentProductId).pipe(takeUntil(this.endsubs$)).subscribe((product: Product) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Product  ${product.name} is updated` });
      timer(200).toPromise().then(() => {
        setTimeout(() => {
          this.location.back();
        }, 1000)

      })
    },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product Is Not updated' });
      });
  }

  onImageUpload(event: any) {

    const file = event.target.files[0];
    if (file) {

      this.form.patchValue({ image: file });
      this.form.get('image')?.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

}
