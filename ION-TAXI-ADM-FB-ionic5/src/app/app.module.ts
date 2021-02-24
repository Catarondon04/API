

/**
* Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
*
* Copyright © 2019-present Enappd. All rights reserved.
*
* This source code is licensed as per the terms found in the
* LICENSE.md file in the root directory of this source tree.
*/

import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { IonicStorageModule } from '@ionic/storage';

import { environment } from '@env/environment';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { RideDetailsPage } from './pages/ride-details/ride-details.page';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { StorageService } from '@app/services/api/firestorage.service';
import { AuthenticationService } from '@app/services/api/firebase-authentication.service';
import { FirestoreService } from '@app/services/api/firestore.service';
import { APIService } from './services/api/api.service';

@NgModule({
  declarations: [AppComponent, RideDetailsPage],
  entryComponents: [RideDetailsPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({ name: 'admindb' }),
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places']
    }),
    AgmDirectionModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationService,
    FirestoreService,
    StorageService,
    APIService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    InitUserProvider,
    { provide: APP_INITIALIZER, useFactory: initUserProviderFactory, deps: [InitUserProvider], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function initUserProviderFactory(provider: InitUserProvider) {
  return () => provider.load();
}
