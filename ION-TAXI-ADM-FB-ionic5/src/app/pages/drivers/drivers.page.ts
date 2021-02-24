
/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { APIService } from '@app/services/api/api.service';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.page.html',
  styleUrls: ['./drivers.page.scss']
})
export class DriversPage implements OnInit {
  public drivers: any;
  public filterDrivers: any = [];
  public segment = false;
  constructor(private api: APIService) {
    this.getAllDrivers();
  }

  getAllDrivers() {
    this.api.getAllDrivers().subscribe(docs => {
      this.drivers = docs;
      this.filterDriver();
    });
  }

  ngOnInit() { }

  segmentChanged(ev) {
    this.segment = ev.detail.value === 'true';
    this.filterDriver();
  }

  filterDriver() {
    this.filterDrivers = [];
    this.drivers.forEach(driver => {
      console.log(driver.approved, this.segment);
      if (!!driver.approved === this.segment) {
        this.filterDrivers.push(driver);
      }
    });
  }

  toggleChanged(ev, driverId) {
    const check = ev.detail.checked;
    this.api.updateDriverData(driverId, { approved: check })
      .subscribe(() => {
        this.getAllDrivers();
      }, err => console.log(err));
  }
}
