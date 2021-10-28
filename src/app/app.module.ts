import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MasvendidoComponent } from './components/masvendido/masvendido.component';

import { HttpClientModule } from '@angular/common/http';
import { ProveedorProvider } from '../providers/proveedor/proveedor';
import { ProveedorProviderSender } from '../providers/proveedorsender/proveedorsender';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { NgxStripeModule } from 'ngx-stripe';
import {NgxPaginationModule} from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MasvendidoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    MDBBootstrapModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    // NgxStripeModule.forRoot('***your-stripe-publishable-key***'),
    NgxStripeModule.forRoot('pk_test_51JforyGm74XpSQdW9wiW7P0WrM5W1BMO7fq5URdhyUG7CWrU6oefiXxQI8FgLUG7dtIMi8fizBPT9MN4ongY0LhL00ucjWFRcy'),
    ToastrModule.forRoot(
      {
        timeOut: 20000,
        preventDuplicates: true,
      }
    )
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    ProveedorProvider,
    ProveedorProviderSender
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
