/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import {MessageService} from 'primeng/api';
import { timer } from 'rxjs';
import { CategoriesService, Category} from '@bluebits/products';




@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;

  constructor(private messageService: MessageService, private location: Location, private formBuilder: FormBuilder, private categoryService: CategoriesService) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    })

  }

  onSubmit(){

    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }

    const category : Category = {

      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value

    }

    this.categoryService.createCategory(category).subscribe( (response) =>{
      this.messageService.add({severity:'success', summary:'Success', detail:'Category Is Created'});
      timer(200).toPromise().then((done)=>{
        this.location.back();
      })
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    (error)=>{
      this.messageService.add({severity:'error', summary:'Error', detail:'Category Is Not Created'});
    });

  }

  get categoryForm(){
    return this.form.controls;
  }
}
