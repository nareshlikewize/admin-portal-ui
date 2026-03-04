
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AppConfig, loadAppConfig } from './core/config-loader';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, RouterModule],
  providers: [
    AppConfig,
    { provide: 'USE_RUNTIME_CONFIG', useValue: true },
    { provide: 'APP_INITIALIZER', useFactory: loadAppConfig, deps: [HttpClientModule, AppConfig], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
