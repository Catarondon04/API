/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import { Component, OnInit } from '@angular/core';
// import { DataService } from 'src/app/services/DataServices/data.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-addcar',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {
  cardDetails: any;
  public cards = environment.DUMMY_CARDS;
  customAlertOptions: any = {
    header: 'Select Card Type',
  };
  constructor(
    // public dataService: DataService,
  ) {
    this.cardDetails = { cardNumber: null, cardType: null, cardCvv: null, cardDate: null, zipCode: null };
  }

  ngOnInit() { }

  saveCard() {

  }

}
