import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaymentsComponent } from './payments/payments.component';
import { AuthGuard } from './guards/auth.guard';
import {RegistrationComponent} from './registration/registration.component';
import {CheckRoomComponent} from './check-room/check-room.component';
import {RoomBookingComponent} from './room-booking/room-booking.component';
import {InventoryComponent} from './inventory/inventory.component';
import {BookingHistoryComponent} from './room-booking/booking-history/booking-history/booking-history.component';
import {ProfileComponent} from './profile/profile.component';
import {UserAccountUpdateComponent} from './user-account-update/user-account-update.component';
import {UserAccountActivateComponent} from './user-account-activate/user-account-activate.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'payment', component: PaymentsComponent, canActivate: [AuthGuard]},
  { path: 'signup', component: RegistrationComponent},
  { path: 'checkAvailability', component: CheckRoomComponent, canActivate: [AuthGuard]},
  { path: 'newBooking', component: RoomBookingComponent, canActivate: [AuthGuard]},
  { path: 'inventory', component: InventoryComponent, canActivate: [AuthGuard]},
  { path: 'booking-history', component: BookingHistoryComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'user-account-update', component: UserAccountUpdateComponent, canActivate: [AuthGuard]},
  { path: 'user-account-activate', component: UserAccountActivateComponent, canActivate: [AuthGuard]},

  {
    path: 'login',
    loadChildren: () => import('../app/Login Component/login/login.module').then(m => m.LoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
