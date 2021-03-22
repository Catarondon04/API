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
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { environment } from '@env/environment';
import { User } from '@app/models/user';
import { UtilService } from './services/util/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public loggedInUser: User;
  public menuItems = environment.MAIN_MENU_ITEMS;
  constructor(
    private userProvider: InitUserProvider,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private util: UtilService
  ) {
    this.initializeApp();
    this.loggedInUser = this.userProvider.getUserData();
    if (this.loggedInUser.id) {
      this.util.goToNew('/home');
    } else {
      this.util.goToNew('/login');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (environment.GOOGLE_MAPS_API_KEY && environment.GOOGLE_MAPS_API_KEY === 'AIzaSyC8aWI-nCV3_jFJoRMkIvH_kCWpj2VnOQ0') {
        this.showAPIKeyAlert();
      }
    });
  }

  redirectTo(page) {
    this.util.goForward(`/${page.url}`);
  }

  async showAPIKeyAlert() {

    const cancelAlert = await this.util.createAlert(
      'Wait!',
      false,
      'You have not entered your Maps API key in environment. Make sure you enter the API key in both debug and prod environment, config.xml, package.json and index.html. Read more in the documentation or README.md of source code.',
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

}
