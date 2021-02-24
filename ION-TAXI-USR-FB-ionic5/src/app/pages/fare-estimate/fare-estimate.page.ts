/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/



import { Component, OnInit } from '@angular/core';
import { RideService } from '@app/services/ride/ride.service';

@Component({
  selector: 'app-fareestimate',
  templateUrl: './fare-estimate.page.html',
  styleUrls: ['./fare-estimate.page.scss'],
})
export class FareEstimatePage implements OnInit {
  public totalFare: number;
  public tripTime: number;

  constructor(public rideService: RideService) { }

  ngOnInit() {
    this.totalFare = this.rideService.getFare();
    this.tripTime = this.rideService.getTripTime();
  }

}
