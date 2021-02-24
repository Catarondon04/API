/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { APIService } from '@app/services/api/api.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  public dialCodes = environment.COUNTRY_DIAL_CODES;
  spinner = false;
  disabled = false;
  public user = { first_name: '', last_name: '', email: '', area: '', phone: '', password: '' };

  public customAlertOptions: any = {
    header: 'Contact Number',
    subHeader: 'Select Area Code',
    translucent: true
  };
  constructor(
    private userProvider: InitUserProvider,
    private menuCtrl: MenuController,
    private api: APIService,
    private util: UtilService,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  setSpinner() {
    this.spinner = true;
    this.disabled = true;
  }

  clearSpinner() {
    this.spinner = false;
    this.disabled = false;
  }

  registerUser() {
    this.setSpinner();

    this.api.signUp(this.user)
      .subscribe(
        res => {
          console.log(res);
          this.userProvider.setToken(res['id']);
          this.api.getUser().subscribe((user: any) => {
            this.userProvider.setLoggedInUser(user);
            this.clearSpinner();
            this.util.goToNew('/home');
          });
        },
        async err => {
          const toast = await this.util.createToast(err.message || err.statusText, false, 'top');
          await toast.present();
          this.clearSpinner();
        }
      );
  }
}
