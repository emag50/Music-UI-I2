import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { Spotify } from '../providers/spotify';
import { Data } from '../providers/data';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, Data, Spotify]
})
export class AppModule {}
