/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html',
  styles: [
  ]
})
export class GalleryComponent implements OnInit {

  selectedImageUrl!: string;

  @Input() images!: string[];

  // constructor() { }

  ngOnInit() {
    if (this.hasImages) {

      this.selectedImageUrl = this.images[0]
    }
  }
  changeSelectedImage(imageUrl: string) {
    this.selectedImageUrl = imageUrl;
    console.log("selected");
  }

  get hasImages() {
    return this.images?.length > 0;
  }

}
