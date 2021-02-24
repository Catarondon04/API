/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/


import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-help',
  templateUrl: 'help.page.html',
  styleUrls: ['help.page.scss']
})
export class HelpPage implements OnInit {
  public items = environment.HELP_FAQS;
  constructor(private util: UtilService) {
  }

  ngOnInit() {
  }

  dismiss() {
    this.util.goToNew('/home');
  }
}
