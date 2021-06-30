import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { MaterialModule } from '../../material/material.module';


@NgModule({
  declarations: [HomeComponent, HomeBannerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild([{path: '', component: HomeComponent}])
  ]
})
export class HomeModule { }
