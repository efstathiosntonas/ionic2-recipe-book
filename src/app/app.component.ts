import {Component, ViewChild} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import {Splashscreen, StatusBar} from 'ionic-native';
import {TabsPage} from '../pages/tabs/tabs';
import {SigninPage} from '../pages/signin/signin';
import {SignupPage} from '../pages/signup/signup';
import firebase from 'firebase';
import {AuthService} from '../services/auth.service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any            = TabsPage;
  signinPage               = SigninPage;
  signupPage               = SignupPage;
  @ViewChild('nav') nav: NavController;
  isAuthenticated: boolean = false;

  constructor(platform: Platform, private menuCtrl: MenuController, private authService: AuthService) {
    firebase.initializeApp({
      apiKey    : 'AIzaSyD30vUQLLuDb24MY8c34-BXq6TJTmmF1HU',
      authDomain: 'natural-system-135123.firebaseapp.com',
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.isAuthenticated = true;
        this.rootPage        = TabsPage;
      } else {
        this.isAuthenticated = false;
        this.rootPage        = SigninPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(SigninPage);
  }
}
