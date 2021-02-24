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
import { UtilService } from '@app/services/util/util.service';

@Component({
  selector: 'app-payment-component',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @Input('taxiType') taxiType;
  @Input('carImage') carImage;

  constructor(
    private modalCtrl: ModalController,
    private util: UtilService
  ) {
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }
  async routeModal() {
    this.modalCtrl.dismiss();
    this.util.goForward('/requestride');
  }

  ngOnInit() {
  }
}
