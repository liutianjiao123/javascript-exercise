import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import {ThemeService} from './theme.service';
import {HttpClientModule} from '@angular/common/http';
import { StorageModule } from '@ngx-pwa/local-storage';
import {FormsModule} from '@angular/forms';
import { UnlessDirective } from './unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UnlessDirective,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StorageModule.forRoot({IDBNoWrap: true}),
    FormsModule

  ],
  providers: [ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
