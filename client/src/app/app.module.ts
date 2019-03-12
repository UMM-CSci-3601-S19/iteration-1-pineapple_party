import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
//import {UserComponent} from './users/user.component';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';
import {RideComponent} from './rides/ride.component';
import {RideListComponent} from './rides/ride-list.component';
import {RideListService} from "./rides/ride-list.service";
import {AddRideComponent} from "./rides/add-ride.component";


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
   // UserComponent,
    RideComponent,
    RideListComponent,
    AddRideComponent
  ],
  providers: [
    RideListService,
    {provide: APP_BASE_HREF, useValue: '/'},
  ],

  bootstrap: [AppComponent]
})

export class AppModule {
}
