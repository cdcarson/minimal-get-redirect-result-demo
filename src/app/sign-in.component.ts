import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase/app';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-sign-in',
  template: `
  <h1>Sign In</h1>
  <hr>
  <div *ngIf="unhandledError" class="alert alert-danger">
    Error: {{unhandledError.code}}
  </div>
  <p *ngIf="'wait' === screen">
    Please wait...
  </p>
  <p *ngIf="'signIn' === screen">
    <button type="button" class="btn btn-lg btn-primary" (click)="signIn()">
      Sign In with Google
    </button>
  </p>
  <div *ngIf="'success' === screen" class="alert alert-success">
    Welcome, {{cred.user.displayName}}!
  </div>
  <h4>Signed In User (auth.currentUser)</h4>
  <pre>{{user | json}}</pre>
  <h4>Cred according to getRedirectResult()</h4>
  <pre>{{cred | json}}</pre>
  `,
  styles: []
})
export class SignInComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  screen: 'wait' | 'signIn' | 'success' = 'wait';
  cred: auth.UserCredential = null;
  unhandledError: auth.Error = null;
  user: User = null;
  constructor(
    private _afAuth: AngularFireAuth,
    private _router: Router
  ) { }

  get auth(): auth.Auth {
    return this._afAuth.auth;
  }

  ngOnInit() {
    this._afAuth.authState.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(user => this.user = user);
    this.onInitHandleOAuthRedirect();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  onInitHandleOAuthRedirect()  {
    this.auth.getRedirectResult()
      .then((cred: auth.UserCredential) => {
        if (cred.user) {
          this.cred = cred;
          this.screen = 'success';
        } else {
          this.screen = 'signIn';
        }
      })
      .catch(error => {
        this.screen = 'signIn';
        this.unhandledError = error;
      });
  }

  signIn() {
    const provider = new auth.GoogleAuthProvider();
    this.auth.signInWithRedirect(provider)
      .catch(error => {
        this.unhandledError = error;
      });
  }

}
