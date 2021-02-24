import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { AuthenticationService } from './firebase-authentication.service';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  private id;

  constructor(
    private http: HttpClient,
    private firestore: FirestoreService,
    private auth: AuthenticationService
  ) {}


  logout() {
    return this.auth.logout();
  }

  updateDriverData(id, driverData): Observable<any> {
    return from(this.firestore.update('drivers', id, driverData));
  }

  getDriver(driverId): Observable<any> {
    return this.addIdToObject(driverId, this.firestore.getOne('drivers', driverId));
  }

  getCustomer(clientId): Observable<any> {
    return this.addIdToObject(clientId, this.firestore.getOne('clients', clientId));
  }

  getAllDrivers(): Observable<any> {
    return this.firestore.find('drivers');
  }
  getAllCustomers(): Observable<any> {
    return this.firestore.find('clients');
  }
  getAllRides(): Observable<any> {
    return this.firestore.find('rides');
  }

  getAdminToken(): Observable<any> {
    return from(this.auth.signInAnonymously());
  }

  addIdToObject(id, obj: Observable<any>) {
    return new Observable((observer) => {
      obj
        .subscribe(ref => {
          const newObj = ref;
          if (newObj) {
            newObj.id = id;
          }
          observer.next(newObj);
        }, err => {
          observer.error(err);
        });
    });
  }


}
