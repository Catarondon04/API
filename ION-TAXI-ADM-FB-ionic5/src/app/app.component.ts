/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AlertController } from '@ionic/angular';
import { environment } from '@env/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  page = [
    { title: 'Customers', url: '/customers' },
    { title: 'Ride History', url: '/ride-history' },
    { title: 'Drivers', url: '/drivers' }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (environment.GOOGLE_MAPS_API_KEY && environment.GOOGLE_MAPS_API_KEY === 'YOUR_API_KEY') {
        this.showAPIKeyAlert();
      }
    });
  }

  async showAPIKeyAlert() {
    const cancelAlert = await this.createAlert(
      'Wait!',
      false,
      'You have not entered your Maps API key in environment. Make sure you enter the API key in both' +
      ' debug and prod environment. Read more in the documentation or README.md of source code.',
      {
        text: 'Ok',
        role: 'cancel',
        cssClass: 'secondary',
        handler: async () => {
        }
      }
    );
    await cancelAlert.present();
  }

  async createAlert(header, backdropDismiss, message, buttonOptions1, buttonOptions2?): Promise<HTMLIonAlertElement> {
    const alert = await this.alertCtrl.create({
      header,
      backdropDismiss,
      message,
      buttons: !buttonOptions2 ? [buttonOptions1] : [buttonOptions1, buttonOptions2]
    });
    return alert;
  }
}
