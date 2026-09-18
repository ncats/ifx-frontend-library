import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { switchMap, pipe, tap, from, map, mergeMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { User } from 'utils-models';
import {
  Auth,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { LocalStorageService } from './local-storage.service';
import {
  doc,
  DocumentSnapshot,
  Firestore,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore';

type UserState = {
  isLoading: boolean; // has the UserStore list been loaded
  error: string | undefined; // last known error (if any)
  user: User | undefined;
  subscriptions: { [key: string]: unknown }[] | undefined;
  emailSent: boolean;
  actionCodeSettings: {
    url: string;
    handleCodeInApp: boolean;
  };
};

const initialState: UserState = {
  user: undefined,
  subscriptions: undefined,
  error: undefined,
  isLoading: false,
  emailSent: false,
  actionCodeSettings: {
    url: '',
    // This must be true.
    handleCodeInApp: true,
  },
};

function getErrorMesssage(code: string): string {
  switch (code) {
    case 'auth/user-not-found': {
      return 'User not found. Please double check your email address';
    }
    case 'auth/email-already-in-use': {
      return 'Account already exists for this email address';
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

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    userSubscriptions: computed(() => {
      const user = state.user();
      if (user) {
        return user.subscriptions;
      } else return [];
    }),
  })),
  withMethods((store, localStorageService = inject(LocalStorageService)) => ({
    setUrl: rxMethod<string>(
      pipe(
        map((url) => {
          patchState(store, () => {
            return {
              actionCodeSettings: {
                url: url,
                handleCodeInApp: true,
              },
            };
          });
        }),
      ),
    ),
    clearError: rxMethod<void>(
      pipe(
        map(() => {
          patchState(store, () => {
            return {
              error: undefined,
            };
          });
        }),
      ),
    ),
    fetchUserFromLocalStorage: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, {
            error: undefined,
            isLoading: true,
          });
        }),
        map(() => {
          const user: string | null =
            localStorageService.fetchFromStorage('userEntity');
          if (user) {
            patchState(store, () => {
              const userObj = JSON.parse(<string>user) as User;
              return {
                user: userObj,
                subscriptions: userObj.subscriptions,
                isLoading: false,
                error: undefined,
              };
            });
          } else {
            patchState(store, { isLoading: false });
          }
        }),
      ),
    ),
    loginUser: rxMethod<{ providerName: string }>(
      pipe(
        tap(() => {
          patchState(store, {
            error: undefined,
            isLoading: true,
          });
        }),
        switchMap((action: { providerName: string }) => {
          let provider = new GoogleAuthProvider();
          if (action.providerName === 'facebook') {
            provider = new FacebookAuthProvider();
            provider.addScope('email');
            provider.addScope('public_profile');
          }
          return from(
            signInWithPopup(getAuth(), provider).catch((error) =>
              getErrorMesssage(error.code),
            ),
          ).pipe(
            map((res: UserCredential | string) => {
              if (typeof res === 'string') {
                patchState(store, () => {
                  return {
                    error: res,
                    isLoading: false,
                  };
                });
              } else {
                const docRef = doc(getFirestore(), 'users', res.user.uid);
                from(getDoc(docRef)).subscribe((profile: DocumentSnapshot) => {
                  const user = profile.data() as User;
                  user.subscriptions = user.subscriptions.map((sub) => {
                    if (sub['gardID']) {
                      sub['gardId'] = sub['gardID'];
                      delete sub['gardID'];
                      return sub;
                    } else {
                      return sub;
                    }
                  });
                  localStorageService.removeItem('userEntity');
                  localStorageService.setItem(
                    'userEntity',
                    JSON.stringify(user),
                  );
                  return patchState(store, () => {
                    return {
                      user: user,
                      subscriptions: user.subscriptions,
                      isLoading: false,
                      error: undefined,
                    };
                  });
                });
              }
            }),
          );
        }),
      ),
    ),
    loginEmailUser: rxMethod<{ email: string; pw: string }>(
      pipe(
        tap(() => {
          patchState(store, {
            error: undefined,
            isLoading: true,
          });
        }),
        mergeMap((action) => {
          return from(
            signInWithEmailAndPassword(
              getAuth(),
              action.email,
              action.pw,
            ).catch((error) => getErrorMesssage(error.code)),
          ).pipe(
            map((res: UserCredential | string) => {
              if (typeof res === 'string') {
                patchState(store, () => {
                  return {
                    error: res,
                    isLoading: false,
                  };
                });
              } else {
                const docRef = doc(getFirestore(), 'users', res.user.uid);
                from(getDoc(docRef)).subscribe((profile: DocumentSnapshot) => {
                  const user = profile.data() as User;
                  user.subscriptions = user.subscriptions.map((sub) => {
                    if (sub['gardID']) {
                      sub['gardId'] = sub['gardID'];
                      delete sub['gardID'];
                      return sub;
                    } else {
                      return sub;
                    }
                  });
                  localStorageService.removeItem('userEntity');
                  localStorageService.setItem(
                    'userEntity',
                    JSON.stringify(user),
                  );
                  return patchState(store, () => {
                    return {
                      user: user,
                      subscriptions: user.subscriptions,
                      isLoading: false,
                      error: undefined,
                    };
                  });
                });
              }
            }),
          );
        }),
      ),
    ),
    logoutUser: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        map(() => {
          const auth: Auth = getAuth();
          signOut(auth).then(() => {
            localStorageService.removeItem('userEntity');
            patchState(store, () => {
              return {
                user: undefined,
                isLoading: false,
                error: undefined,
              };
            });
          });
        }),
      ),
    ),
    sendResetEmail: rxMethod<{ email: string }>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        map((action: { email: string }) => {
          return from(
            sendPasswordResetEmail(
              getAuth(),
              action.email,
              store.actionCodeSettings(),
            ),
          ).pipe(
            map(() => {
              patchState(store, () => {
                return {
                  user: undefined,
                  isLoading: false,
                  emailSent: true,
                };
              });
            }),
          );
        }),
      ),
    ),
    registerUser: rxMethod<{ email: string; pw: string; pwVerify: string }>(
      pipe(
        tap(() => {
          patchState(store, {
            error: undefined,
            isLoading: true,
          });
        }),
        mergeMap((action: { email: string; pw: string }) => {
          return from(
            createUserWithEmailAndPassword(
              getAuth(),
              action.email,
              action.pw,
            ).catch((error) => getErrorMesssage(error.code)),
          ).pipe(
            map((res: UserCredential | string) => {
              if (typeof res === 'string') {
                patchState(store, () => {
                  return {
                    error: res,
                    isLoading: false,
                  };
                });
              } else {
                const u: User = new User({
                  displayName: res.user.displayName, //.users.entities[state.users.selectedId || "null"],
                  uid: res.user.uid,
                });
                patchState(store, () => {
                  return {
                    user: u,
                    subscriptions: u.subscriptions,
                    isLoading: false,
                    error: undefined,
                  };
                });
              }
            }),
          );
        }),
      ),
    ),
    updateUser: rxMethod<{ [key: string]: unknown }[]>(
      pipe(
        tap(() => {
          patchState(store, {
            isLoading: true,
          });
        }),
        map((action) => {
          const user = store.user();
          //update user object
          if (user) {
            user.subscriptions = action;

            //update user in local storage
            localStorageService.removeItem('userEntity');
            localStorageService.setItem('userEntity', JSON.stringify(user));
            //patch user in store
            const docRef = doc(getFirestore(), 'users', user!.uid);
            setDoc(docRef, JSON.parse(JSON.stringify(user)), {
              merge: true,
            }).then((r) => r);
            return patchState(store, () => {
              return {
                user: user,
                subscriptions: user.subscriptions,
                isLoading: false,
                error: undefined,
              };
            });
          }
          //push subscriptions update to firebase
        }),
      ),
    ),
  })),
  withHooks({}),
);
