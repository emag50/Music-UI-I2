import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  perPage: number;
  sort: string;
  subspotify: string;

  constructor(public view: ViewController, public navParams: NavParams) {

    this.perPage = this.navParams.get('perPage');
    this.sort = this.navParams.get('sort');
    this.subspotify = this.navParams.get('subspotify');
    
  }

  save(): void {

  	let settings = {
  		perPage: this.perPage,
  		sort: this.sort,
  		subspotify: this.subspotify
  	};

  	this.view.dismiss(settings);
  }

  close(): void {
  	this.view.dismiss();
  }
}