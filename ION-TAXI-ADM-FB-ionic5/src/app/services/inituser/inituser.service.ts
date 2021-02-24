import { Injectable } from '@angular/core';
import { APIService } from '@app/services/api/api.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class InitUserProvider {
  private loggedInUser: any = {};

  constructor(
    public storage: Storage,
    private api: APIService
  ) {
  }

  public getUserData(): any {
    return this.loggedInUser;
  }

  load() {
    return new Promise((resolve, reject) => {
      this.api.getAdminToken().subscribe(res => {
        resolve(true);
      }, err => {
        resolve(true);
        console.log(err);
      });
    });
  }

}
