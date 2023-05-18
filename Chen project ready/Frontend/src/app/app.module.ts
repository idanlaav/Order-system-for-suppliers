import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout-area/layout/layout.component';
import { AuthHomeComponent } from './components/auth-area/auth-home/auth-home.component';
import { HomeComponent } from './components/home-area/home/home.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { InterceptorService } from './services/Interceptor.service';
import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AuthHomeComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    JwtModule.forRoot({
        config: {
          tokenGetter: () => {
            return '';
          }
        }
      })
  ],
  providers: [HomeComponent,{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}, JwtHelperService, LayoutComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }


