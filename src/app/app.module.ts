import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppComponent } from './app.component';
import { IndexComponent } from './index.component';
import { SignInComponent } from './sign-in.component';

const config = {
  apiKey: 'AIzaSyAj-sVghybTl3Gg0fJb1IctNSaeHSoxjKY',
  authDomain: 'blistering-inferno-4109.firebaseapp.com',
  databaseURL: 'https://blistering-inferno-4109.firebaseio.com',
  projectId: 'blistering-inferno-4109',
  storageBucket: 'blistering-inferno-4109.appspot.com',
  messagingSenderId: '431481227029'
};

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: '', component: IndexComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
