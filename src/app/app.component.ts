import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User = null;

  constructor(
    private _afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this._afAuth.authState.subscribe(user => this.user = user);
  }

  signOut() {
    this._afAuth.auth.signOut();
  }
}
