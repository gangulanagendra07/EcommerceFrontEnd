import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';
import { CategoriesFormComponent } from './categories/categories-form/categories-form.component';

import { CategoriesService } from '@bluebits/products';
import { ConfirmationService, MessageService } from 'primeng/api';


import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';






const UXMODULE = [
  CardModule,
  ToastModule,
  TableModule,
  ToolbarModule,
  ButtonModule,
  InputTextModule,
  ConfirmDialogModule
]


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
       {
        path: 'categories',
        component: CategoriesListComponent,
      },
      {
       path: 'categories/form',
       component: CategoriesFormComponent,
     }
    ],
  },
];

@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesListComponent, CategoriesFormComponent],
    imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }), ...UXMODULE],
    providers: [CategoriesService, MessageService, ConfirmationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
