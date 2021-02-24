/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController, ToastController } from '@ionic/angular';
import { RideInfoService } from '@app/services/ride/ride.service';
import { APIService } from '@app/services/api/api.service';
import { RideDetailsPage } from '../ride-details/ride-details.page';

@Component({
  selector: 'app-ride-history',
  templateUrl: './ride-history.page.html',
  styleUrls: ['./ride-history.page.scss']
})
export class RideHistoryPage implements OnInit {
  public rides: any;
  public allRides: any;
  public lat: number;
  public lng: number;
  public origin: number;
  public destination: number;
  private loader: any;
  constructor(
    public modalController: ModalController,
    private toastCtrl: ToastController,
    private menu: MenuController,
    private rideInfoService: RideInfoService,
    private api: APIService
  ) {
    this.lat = 51.678418;
    this.lng = 7.809007;
    this.rides = [];
  }

  async ngOnInit() {
    if (!this.loader) {
      this.loader = await this.rideInfoService.loading('Loading history ...');
      this.loader.present();
    }
    this.api.getAllRides()
      .subscribe(res => {
        // this.rides = res;
        this.allRides = res.map(ride => {
          ride.origin = { lat: ride.origin_lat, lng: ride.origin_lng };
          ride.destination = { lat: ride.destination_lat, lng: ride.destination_lng };
          return ride;
        });
        this.fillRideArray();
        this.loader.dismiss();
      });
  }

  async fillRideArray() {
    if (!this.rides.length) {
      this.rides = this.allRides.slice(0, 5);
    } else if (this.rides.length < this.allRides.length) {
      const add = this.allRides.slice(this.rides.length, this.rides.length + 5);
      this.rides = this.rides.concat(add);
      const toast = await this.createToast('Fetched 5 more rides', false, 'top');
      await toast.present();
    } else {
      const toast = await this.createToast('No more data', false, 'top');
      await toast.present();
    }
  }

  ionViewDidEnter() {
    this.menu.enable(true, 'start');
    this.menu.enable(true, 'end');
  }

  async showInfo(ride) {
    const modal = await this.modalController.create({
      component: RideDetailsPage,
      componentProps: { rideInfo: ride }
    });
    await modal.present();
  }

  async createToast(message, showCloseButton = false, position = 'bottom' as 'top' | 'bottom' | 'middle', duration = 2000):
    Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration,
      buttons: [{
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return toast;
  }
}
