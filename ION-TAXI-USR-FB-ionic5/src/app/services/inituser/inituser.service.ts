import { Injectable } from '@angular/core';
import { APIService } from '../api/api.service';
import { Storage } from '@ionic/storage';
import { User } from '@app/models/user';
import { StorageService } from '../api/firestorage.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { UUID } from 'angular2-uuid';
import { UtilService } from '@app/services/util/util.service';


@Injectable()
export class InitUserProvider {
  public loggedInUser: User;

  constructor(
    private storage: Storage,
    private api: APIService,
    private camera: Camera,
    private storageServ: StorageService,
    private loadingCtrl: LoadingController,
    public util: UtilService,
    private toastCtrl: ToastController
  ) {
    this.createNewEmptyUser();
  }

  getUserData(): User {
    return this.loggedInUser;
  }

  createNewEmptyUser() {
    this.loggedInUser = {
      id: null,
      name: '',
      email: '',
      phone: '',
      password: '',
      location_lat: 0,
      location_lng: 0,
      token: '',
      rideId: 0,
      location: ''
    };
  }

  load() {
    return new Promise((resolve, reject) => {
      this.getToken().then(token => {
        this.api.updateToken(token);
        this.api.getUser().subscribe((user: any) => {
          if (user) {
            this.setLoggedInUser(user);
          }
          resolve(true);
        }, err => {
          resolve(true);
          console.log(err);
        });
      });
    });
  }

  async setRideId(rideId) {
    this.loggedInUser.rideId = rideId;
    await this.storage.set('rideId', rideId);
  }

  async clearRideId() {  // TODO
    this.loggedInUser.rideId = null;
    await this.storage.remove('rideId');
  }

  async getRideId() {
    const rideId = await this.storage.get('rideId');
    return rideId;
  }

  async setToken(token) {
    this.api.updateToken(token);
    await this.storage.set('token', token);
  }

  async getToken() {
    const token = await this.storage.get('token');
    return token;
  }

  async setLoggedInUser(user) {
    Object.assign(this.loggedInUser, user);
    this.loggedInUser.token = await this.getToken();
    this.loggedInUser.rideId = await this.getRideId();
    await this.storage.set('id', user.id);
    console.log('SetLoggedinUser', this.loggedInUser);
  }

  async logout(): Promise<any> {
    this.createNewEmptyUser();
    await this.api.logout();
    return this.storage.clear();
  }

  getLocalUrl(_imagePath): Promise<{ url: string; nativeUrl: string; }> {
    return new Promise((resolve, reject) => {
      const name = _imagePath.split('/');
      this.makeFileIntoBlob(_imagePath, name[name.length - 1]).then((image) => {
        resolve({ url: window.URL.createObjectURL(image), nativeUrl: _imagePath });
      }).catch(error => {
        reject(error);

      });
    });
  }

  makeFileIntoBlob(_imagePath, fileName) {
    return new Promise((resolve, reject) => {
      window['resolveLocalFileSystemURL'](_imagePath, (fileEntry) => {
        fileEntry['file']((resFile) => {
          const reader = new FileReader();
          reader.onload = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };
          reader.onloadend = (evt: any) => {
            const imgBlob: any = new Blob([evt.target.result], { type: 'image/jpeg' });
            imgBlob.name = fileName;
            resolve(imgBlob);
          };

          reader.onerror = (e) => {

            reject(e);
          };

          reader.readAsArrayBuffer(resFile);
        }, (err) => {

          reject(err);
        });
      }, (err) => {
      });
    });
  }

  async createLoader(message): Promise<HTMLIonLoadingElement> {
    const loader = await this.loadingCtrl.create({
      message
      // duration: 3000
    });
    return loader;
  }

  async createToast(message, showCloseButton = false, position = 'bottom' as 'top' | 'bottom' | 'middle', duration = 2000): Promise<HTMLIonToastElement> {
    const toast = await this.toastCtrl.create({
      message,
      position,
      duration,
      buttons: [{
        text: 'Done',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    return toast;
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();
      // let name = url.split('/');
      // TODO
      this.makeFileIntoBlob(url, name).then(imageData => {
        this.createLoader('waiting...');
        this.storageServ.uploadContent(imageData, name).then(async success => {
          await this.loadingCtrl.dismiss();
          this.createToast('image uploded', true, 'bottom', 2100);
          console.log('success', success);
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.loggedInUser.profile_img = success.url;
        }).catch(async err => {
          await this.loadingCtrl.dismiss();
          this.createToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => { console.log('err', err); });
  }

  openGallery() {
    const options: CameraOptions = {
      quality: 60,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };
    this.camera.getPicture(options).then((url) => {
      const name = UUID.UUID();

      this.makeFileIntoBlob(url, name).then(imageData => {

        this.createLoader('waiting...');
        this.storageServ.uploadContent(imageData, name).then(async success => {
          await this.loadingCtrl.dismiss();
          this.createToast('image uploded', true, 'bottom', 2100);
          console.log('success', success);
          // eslint-disable-next-line @typescript-eslint/camelcase
          this.loggedInUser.profile_img = success.url;
        }).catch(async err => {
          await this.loadingCtrl.dismiss();
          this.createToast(`${err}`, true, 'bottom', 2100);
          console.log('err', err);
        });
      });
    }).catch(err => {
      console.log('errrrr', err);
    });
  }


}
