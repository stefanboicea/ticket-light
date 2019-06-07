import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiModule } from './api.module';
import { BASE_PATH } from './variables';
import { environment } from '../environments/environment';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { Broadcaster } from './core/broadcaster';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchModule } from './search/search.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApiModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    SearchModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.API_BASE_PATH },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    Broadcaster
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
