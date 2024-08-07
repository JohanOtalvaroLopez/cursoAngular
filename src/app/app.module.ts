import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupModule } from './generales/signup/signup.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, SignupModule],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
