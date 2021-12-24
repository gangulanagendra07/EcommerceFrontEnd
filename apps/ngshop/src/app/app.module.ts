import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//Modules
import {UiModule } from '@bluebits/ui'
// import { ProductsModule } from '@bluebits/products'
import { ProductsModule} from '@bluebits/products'
import { AccordionModule } from 'primeng/accordion';


import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';



const routes: Routes = [
  { path: '', component: HomePageComponent },
];

@NgModule({
  declarations: [AppComponent, HomePageComponent, HeaderComponent, FooterComponent, NavComponent],
  imports: [BrowserModule, BrowserAnimationsModule, FormsModule, RouterModule.forRoot(routes), UiModule, ProductsModule, AccordionModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
