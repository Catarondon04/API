import { Component, OnInit } from '@angular/core';
import { InitUserProvider } from '@app/services/inituser/inituser.service';
import { UtilService } from '@app/services/util/util.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {


  constructor(
    private userProvider: InitUserProvider,
    private util: UtilService
  ) { }

  ngOnInit() {
  }

  async logoutAction() {
    const delayAlert = await this.util.createAlert(
      'Confirm',
      true,
      environment.LOGOUT_CONFIRMATION,
      {
        text: 'Logout',
        cssClass: 'secondary',
        handler: async () => {
          this.logout();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
    );
    await delayAlert.present();
  }
  logout() {
    this.userProvider.logout().then(res => {
      this.util.goToNew('/login');
    });
  }
}
