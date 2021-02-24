/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RideInfoService } from '@app/services/ride/ride.service';
import { APIService } from '@app/services/api/api.service';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.page.html',
  styleUrls: ['./ride-details.page.scss']
})
export class RideDetailsPage implements OnInit {
  @Input() rideInfo: any;
  public lat: number;
  public lng: number;
  public originAddr: any;
  public destinationAddr: any;
  public driver: string;
  public customer: string;

  constructor(
    public modalController: ModalController,
    private ride: RideInfoService,
    private api: APIService
  ) {
    this.lat = 51.678418;
    this.lng = 7.809007;
    this.originAddr = 'ORIGIN SAMPLE ADDRESS';
    this.destinationAddr = 'DESTINATION SAMPLE ADDRESS';
  }

  ngOnInit() {
    console.log(this.rideInfo);
    this.ride
      .getOrigin(this.rideInfo)
      .then(res => {
        console.log(res);
        const data = res;
        if (data && data['results'] && data['results'][0]) {
          this.originAddr = data['results'][0].formatted_address;
        }
      })
      .catch(err => console.log(err));

    setTimeout(() => {
      this.ride
        .getDestination(this.rideInfo)
        .then(res => {
          console.log(res);
          const data = res;
          if (data && data['results'] && data['results'][0]) {
            this.destinationAddr = data['results'][0].formatted_address;
          }
        })
        .catch(err => console.log(err));
    }, 2000);

    this.api.getDriver(this.rideInfo.driverId).subscribe(res => {
      if (res) {
        this.driver = res['email'];
      } else {
        this.driver = 'No Driver Assigned (Ride Not Taken)';
      }
    });

    this.api.getCustomer(this.rideInfo.clientId).subscribe(res => {
      this.customer = res['name'];
    });
  }

  goBack() {
    this.modalController.dismiss();
  }
}
