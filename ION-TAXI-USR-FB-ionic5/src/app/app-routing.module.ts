/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/landing/landing.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'home/:status',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./pages/help/help.module').then(m => m.HelpPageModule)
  },
  { path: 'loginPage', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule) },
  { path: 'forgotpassword', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotpasswordPageModule) },
  { path: 'resetPassword', loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  { path: 'addcard', loadChildren: () => import('./pages/add-card/add-card.module').then(m => m.AddcardPageModule) },
  { path: 'ride-details', loadChildren: () => import('./pages/ride-details/ride-details.module').then(m => m.RideDetailsModule) },
  { path: 'history', loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryPageModule) },
  { path: 'pickup', loadChildren: () => import('./pages/pickup/pickup.module').then(m => m.PickupPageModule) },
  { path: 'fareestimate', loadChildren: () => import('./pages/fare-estimate/fare-estimate.module').then(m => m.FareestimatePageModule) },
  { path: 'promo', loadChildren: () => import('./pages/promo/promo.module').then(m => m.PromoPageModule) },
  { path: 'requestride', loadChildren: () => import('./pages/request-ride/request-ride.module').then(m => m.RequestridePageModule) },
  { path: 'changepayment', loadChildren: () => import('./pages/change-payment/change-payment.module').then(m => m.ChangepaymentPageModule) },
  { path: 'profilepage', loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilepagePageModule) },
  { path: 'bookingconfirmation', loadChildren: () => import('./pages/booking-confirmation/booking-confirmation.module').then(m => m.BookingconfirmationPageModule) },
  {
    path: 'payment',
    loadChildren: () => import('./components/payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
