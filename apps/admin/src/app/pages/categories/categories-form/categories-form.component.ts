/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { CategoriesService, Category } from '@bluebits/products';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentCategoryId!: string;


  constructor(private messageService: MessageService, private location: Location, private formBuilder: FormBuilder, private categoryService: CategoriesService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    })

    this._checkEditMode();

  }

  onSubmit() {

    this.isSubmitted = true;
    if (this.form.invalid) {
      return;
    }

    const category: Category = {

      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value,

    }

    if (this.editMode) {
      this._updateCategory(category);
    }
    else {
      this._addCategory(category);
    }

  }

  onCancel(){
    this.location.back();
  }

  private _addCategory(category: Category) {

    this.categoryService.createCategory(category).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category  ${response.name} is created` });
      timer(200).toPromise().then(() => {
         setTimeout(() => {
          this.location.back();
         },1000)

      })
    },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Is Not Created' });
      });
  }

  private _updateCategory(category: Category) {

    this.categoryService.updateCategory(category).subscribe((response) => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: `Category  ${response.name} is updated` });
      timer(200).toPromise().then(() => {
        setTimeout(() => {
          this.location.back();
         },1000)
      })
    },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category Is Not updated' });
      });
  }

  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if (params.id) {
        this.editMode = true;
        this.currentCategoryId = params.id;
        this.categoryService.getCategory(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        })
      }
    })
  }

  get categoryForm() {
    return this.form.controls;
  }
}
