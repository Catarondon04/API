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
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'customers', loadChildren: () => import('./pages/customers/customers.module').then(m => m.CustomersPageModule) },
  { path: 'drivers', loadChildren: () => import('./pages/drivers/drivers.module').then(m => m.DriversPageModule) },
  { path: 'ride-history', loadChildren: () => import('./pages/ride-history/ride-history.module').then(m => m.RideHistoryPageModule) },
  { path: 'modal', loadChildren: () => import('./pages/ride-details/ride-details.module').then(m => m.RideDetailsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
