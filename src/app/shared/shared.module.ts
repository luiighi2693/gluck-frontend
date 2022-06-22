import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import {MaterialModule} from '../material/material.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { LegalAgreementComponent } from './components/legal-agreement/legal-agreement.component';
import { MaxLengthPipe } from './pipes/filter-pools.pipe';
import { ZuluDateTransformPipe } from './pipes/zulu-date-transform.pipe';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    BreadcrumbComponent,
    LegalAgreementComponent,
    MaxLengthPipe,
    ZuluDateTransformPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
  ],
  exports: [FooterComponent, LoaderComponent, BreadcrumbComponent, MaxLengthPipe, ZuluDateTransformPipe]
})
export class SharedModule { }
