/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { SetLocationComponent } from '@app/components/set-location/set-location.component';
import { User } from '@app/models/user';
import { APIService } from '@app/services/api/api.service';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { UtilService } from '@app/services/util/util.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public customAlertOptions;
  public loggedInUser: User;
  public dialCodes;
  constructor(
    private util: UtilService,
    private userProvider: InitUserProvider,
    private api: APIService,
  ) {
    this.dialCodes = environment.COUNTRY_DIAL_CODES;
  }

  ngOnInit() {
    this.loggedInUser = this.userProvider.getUserData();
    console.log('user', this.loggedInUser);
  }

  async gotoEdit() {
    const profileModal: any = await this.util.createModal(SetLocationComponent);
    profileModal.present();
  }

  async openActionsheet() {
    const action = await this.util.createActionSheet({
      text: 'Take a Picture',
      role: 'destructive',
      cssClass: 'buttonCss',
      handler: () => {
        this.userProvider.openCamera();
      }
    }, {
      text: 'Pick From Gallery',
      handler: () => {
        this.userProvider.openGallery();
      }
    }, {
      text: 'Cancel',
      role: 'cancel',
      cssClass: 'buttonCss_Cancel',
      handler: () => {
        console.log('cancel');
      }
    });

    await action.present();
  }

  async updateProfileDetails() {
    if (!this.loggedInUser.name) {
      const toast = await this.util.createToast('Name cannot be empty', false, 'top');
      await toast.present();
    } else if (!this.loggedInUser.email) {
      const toast = await this.util.createToast('Email cannot be empty', false, 'top');
      await toast.present();
    } else {
      this.api.updateUser(this.loggedInUser.id, this.loggedInUser).subscribe(async (updatedUser) => {
        const toast = await this.util.createToast('Profile updated', false, 'top');
        await toast.present();
      });
    }
  }
}
