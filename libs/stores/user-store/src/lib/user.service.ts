import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthProvider } from '@firebase/auth';
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
  TwitterAuthProvider,
  EmailAuthProvider,
} from 'firebase/auth';
import { User } from 'utils-models';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  firestore = inject(Firestore);

  providers: Map<string, AuthProvider> = new Map<string, AuthProvider>([
    ['facebook', new FacebookAuthProvider()],
    ['google', new GoogleAuthProvider()],
    ['twitter', new TwitterAuthProvider()],
    ['github', new GithubAuthProvider()],
    ['email', new EmailAuthProvider()],
  ]);

  actionCodeSettings = {
    url: 'http://localhost:4200',
    // This must be true.
    handleCodeInApp: true,
  };

  doLogin(providerName: string) {
    const auth: Auth = getAuth();
    const provider: AuthProvider = <AuthProvider>(
      this.providers.get(providerName)
    );
    if (providerName === 'facebook') {
      const fProvider = new FacebookAuthProvider();
      fProvider.addScope('email');
      fProvider.addScope('public_profile');
      return from(signInWithPopup(auth, fProvider));
    } else {
      return from(signInWithPopup(auth, provider));
    }
  }

  doEmailLogin(email: string, pw: string) {
    const auth: Auth = getAuth();
    return from(
      signInWithEmailAndPassword(auth, email, pw).catch(
        (error: Error) => error,
      ),
    );
  }

  doEmailLinkLogin(email: string): Observable<void> {
    const auth: Auth = getAuth();
    return from(sendSignInLinkToEmail(auth, email, this.actionCodeSettings));
  }

  doRegister(email: string, pw: string) {
    const auth: Auth = getAuth();
    return from(createUserWithEmailAndPassword(auth, email, pw));
  }

  doResetEmail(email: string) {
    const auth: Auth = getAuth();
    return from(
      sendPasswordResetEmail(auth, email, this.actionCodeSettings).catch(
        (error: Error) => error,
      ),
    );
  }

  logout() {
    const auth: Auth = getAuth();
    signOut(auth).then(() => {
      return;
    });
  }

  createUserProfile(user: User) {
    const docRef = doc(this.firestore, 'users', user.uid);
    setDoc(docRef, { ...user });
    return this.fetchUserProfile(user);
  }

  updateUserProfile(user: User) {
    const docRef = doc(this.firestore, 'users', user.uid);
    setDoc(docRef, JSON.parse(JSON.stringify(user)), { merge: true });
    return this.fetchUserProfile(user);
  }

  fetchUserProfile(user: User) {
    const docRef = doc(this.firestore, 'users', user.uid);
    return from(getDoc(docRef));
  }
  /*
  /!**
     * handle errors, if there are multiple accounts, or popups are blocked
     * @param error
     *!/
    handleError(error: any) {
      // An error happened.
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Step 2.
        // User's email already exists.
        // The pending GitHub credential.
        const pendingCred = error.credential;
        // The provider account's email address.
        const email = error.email;
        // Get sign-in methods for this email.
        this.afAuth.fetchSignInMethodsForEmail(email).then((methods) => {
          // Step 3.
          // If the user has several sign-in methods,
          // the first method in the list will be the "recommended" method to use.
          /!*if (methods[0] === 'password') {
            // Asks the user their password.
            // In real scenario, you should handle this asynchronously.
            const password = this.promptUserForPassword(); // TODO: implement promptUserForPassword.
            this.afAuth.auth.signInWithEmailAndPassword(email, password).then(res => {
              // Step 4a.
              return res.user.linkWithCredential(pendingCred);
            }).then(function(res) {
              // GitHub account successfully linked to the existing Firebase user.
              this.fetchUserProfile(res.user);
            });
            return;
          }*!/
          // All the other cases are external providers.
          // Construct provider object for that provider.
          // TODO: implement getProviderForProviderId.
          const provider = this.providers.get(methods[0].split('.')[0]);
          // At this point, you should let the user know that he already has an account
          // but with a different provider, and let him validate the fact he wants to
          // sign in with this provider.
          // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
          // so in real scenario you should ask the user to click on a "continue" button
          // that will trigger the signInWithPopup.
          // @ts-ignore
          this.afAuth.signInWithPopup(provider).then(result => {
            // Remember that the user may have signed in with an account that has a different email
            // address than the first one. This can happen as Firebase doesn't control the provider's
            // sign in flow and the user is free to login using whichever account he owns.
            // Step 4b.
            // Link to GitHub credential.
            // As we have access to the pending credential, we can directly call the link method.
            // @ts-ignore
            result.user.linkWithCredential(pendingCred).then(usercred => {
              // GitHub account successfully linked to the existing Firebase user.
             // this.fetchUserProfile(usercred.user);
            });
          });
        });
      }
      if (error.code === 'auth/popup-blocked') {
        alert('Please allow popups for authentication');
      }
      /!*
        promptUserForPassword() {
          return '123456789'
        }*!/
    }
    */
  getErrorMesssage(code: string): string {
    switch (code) {
      case 'auth/user-not-found': {
        return 'User not found. Please double check your email address';
      }
      case 'auth/wrong-password': {
        return 'Invalid password';
      }
      case 'auth/invalid-email': {
        return 'Invalid email';
      }
      default: {
        return 'Unable to login with these credentials';
      }
    }
  }
}
