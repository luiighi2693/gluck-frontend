import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsModule } from './shared/alerts/alerts.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {NgxCaptchaModule} from 'ngx-captcha';
import { LoaderProvider } from './utilities/providers/loader-provider';
import {EventBusService} from 'ng-simple-event-bus';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    NgxCaptchaModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    SharedModule,
    AlertsModule,
    HttpClientModule,
  ],
  providers: [LoaderProvider, EventBusService],
  bootstrap: [AppComponent]
})
export class AppModule { }
