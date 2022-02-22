import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PaymentsComponent} from './payments/payments.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidenavComponent} from './sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RegistrationComponent} from './registration/registration.component';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './services/AuthInterceptor/AuthIntercepter';
import {CheckRoomComponent} from './check-room/check-room.component';
import {RoomBookingComponent} from './room-booking/room-booking.component';
import { InventoryComponent } from './inventory/inventory.component';
import { PopUpModelComponent } from './room-booking/PopUp Model/pop-up-model/pop-up-model.component';
import { BookingHistoryComponent } from './room-booking/booking-history/booking-history/booking-history.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAccountUpdateComponent } from './user-account-update/user-account-update.component';
import { UserAccountActivateComponent } from './user-account-activate/user-account-activate.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    PaymentsComponent,
    RegistrationComponent,
    CheckRoomComponent,
    RoomBookingComponent,
    InventoryComponent,
    PopUpModelComponent,
    BookingHistoryComponent,
    ProfileComponent,
    UserAccountUpdateComponent,
    UserAccountActivateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    // material
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
  ],
  providers: [authInterceptorProviders,
    DatePipe
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
