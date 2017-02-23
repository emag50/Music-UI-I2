import { Component } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { SettingsPage } from '../settings/settings';
import { Data } from '../../providers/data';
import { Spotify } from '../../providers/spotify';
import { FormControl } from '@angular/forms';
import { InAppBrowser } from 'ionic-native';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  subspotifyValue: string;
  subspotifyControl: FormControl;

  constructor(public dataService: Data, public spotifyService: Spotify, public modalCtrl: ModalController, public platform: Platform) {

    this.subspotifyControl = new FormControl();
  }

  ionViewDidLoad() {

    this.subspotifyControl.valueChanges.debounceTime(1500)
      .distinctUntilChanged().subscribe(spotify => {

        if (spotify != '' && spotify) {
          this.spotifyService.spotify = spotify;
          this.changeSubreddit();
          Keyboard.close();
        }
      });

    this.platform.ready().then(() => {

      this.loadSettings();
    });

  }

  loadSettings(): void {
    this.dataService.getData().then((settings) => {

      if (settings && typeof (settings) != "undefined") {

        let newSettings = JSON.parse(settings);
        this.spotifyService.settings = newSettings;

        if (Spotify.length != 0) {
          this.spotifyService.sort = newSettings.sort;
          this.spotifyService.perPage = newSettings.perPage;
          this.spotifyService.spotify = newSettings.subreddit;
        }

      }

      this.changeSubreddit();

    });

  }
   showComments(post): void {
    let browser = new InAppBrowser('http://reddit.com' + post.data.permalink, '_system');
  }


openSettings(): void {

    let settingsModal = this.modalCtrl.create(SettingsPage, {
      perPage: this.spotifyService.perPage,
      sort: this.spotifyService.sort,
      subreddit: this.spotifyService.spotify
    });
    
    settingsModal.onDidDismiss(settings => {

      if(settings){
        this.spotifyService.perPage = settings.perPage;
        this.spotifyService.sort = settings.sort;
        this.spotifyService.spotify = settings.subreddit;

        this.dataService.save(settings); 
        this.changeSubreddit();      
      }

    });

    settingsModal.present();

  }

  playVideo(e, post): void {

    //Create a reference to the video
    let video = e.target;

    if(!post.alreadyLoaded){
      post.showLoader = true;     
    }

    //Toggle the video playing
    if(video.paused){

      //Show the loader gif
      video.play();

      //Once the video starts playing, remove the loader gif
      video.addEventListener("playing", function(e){
        post.showLoader = false;
        post.alreadyLoaded = true;
      });

    } else {
      video.pause();
    }
    
  }

  changeSubspotify(): void {
  	this.spotifyService.resetPosts();
  }

  loadMore(): void {
    this.spotifyService.nextPage();
  }

}
