import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './lib/banner/banner.component';
import { SliderComponent } from './lib/slider/slider.component';

@NgModule({
    imports: [CommonModule],
    declarations: [
      BannerComponent,
      SliderComponent
    ],
    exports: [
      BannerComponent,
      SliderComponent
    ]
})
export class UiModule {}
