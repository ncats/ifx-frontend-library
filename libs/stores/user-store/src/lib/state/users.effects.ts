import { inject } from '@angular/core';
import { DocumentData } from '@angular/fire/compat/firestore';
import { UserCredential, UserInfo } from '@firebase/auth';
import { DocumentSnapshot } from '@firebase/firestore';
import { User } from 'utils-models';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { map, mergeMap, tap } from 'rxjs';
import { LocalStorageService } from '../local-storage.service';
import { UserService } from '../user.service';
import {
  LoginEmailUserActions,
  LoginLinkActions,
  RdasUsersInitActions,
  RegisterEmailUserActions,
  ResetPasswordEmailActions,
  UpdateUserActions,
  UserLoginActions,
} from './users.actions';

import { getSelected } from './users.selectors';

export const init = createEffect(
  (
    actions$ = inject(Actions),
    localStorageService = inject(LocalStorageService),
  ) => {
    return actions$.pipe(
      ofType(RdasUsersInitActions.init),
      map(() => {
        const user: string | null =
          localStorageService.fetchFromStorage('userEntity');
        if (user) {
          return RdasUsersInitActions.initSuccess({
            user: JSON.parse(<string>user) as User,
          });
        } else {
          return RdasUsersInitActions.initFailure({ error: '' });
        }
      }),
    );
  },
  { functional: true },
);

export const loginUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(UserLoginActions.loginUser),
      mergeMap((action: { provider: string }) => {
        return userService.doLogin(action.provider).pipe(
          map((res: UserCredential) => {
            if (res && res.user) {
              const tempUser: UserInfo = (<unknown>res.user) as UserInfo;
              return UserLoginActions.loginUserSuccess({
                user: new User({
                  displayName: tempUser.displayName, //.users.entities[state.users.selectedId || "null"],
                  uid: tempUser.uid,
                }),
              });
            } else {
              return UserLoginActions.loginUserFailure({
                error: 'Login Failed',
              });
            }
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loginEmailUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(LoginEmailUserActions.loginEmailUser),
      mergeMap((action: { email: string; pw: string }) => {
        return userService.doEmailLogin(action.email, action.pw).pipe(
          //   map((res: { code: string; user: User }) => {
          map((res: UserCredential | Error) => {
            const newResponse: { code: string; user: User } = (<unknown>(
              res
            )) as { code: string; user: User };
            if (newResponse.code) {
              const errMessage: string = userService.getErrorMesssage(
                newResponse.code,
              );
              return LoginEmailUserActions.loginEmailUserFailure({
                error: errMessage,
              });
            } else {
              if (newResponse.user) {
                const u: User = new User({
                  displayName: newResponse.user?.displayName, //.users.entities[state.users.selectedId || "null"],
                  uid: newResponse.user?.uid,
                });
                if (u) {
                  return LoginEmailUserActions.loginEmailUserSuccess({
                    user: u,
                  });
                } else {
                  return LoginEmailUserActions.loginEmailUserFailure({
                    error: 'Login Failed',
                  });
                }
              } else {
                return LoginEmailUserActions.loginEmailUserFailure({
                  error: 'Login Failed',
                });
              }
            }
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const registerEmailUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(RegisterEmailUserActions.registerEmailUser),
      mergeMap((action: { email: string; pw: string }) => {
        return userService.doRegister(action.email, action.pw).pipe(
          map((res: UserCredential) => {
            if (res && res.user) {
              const u: User = new User({
                displayName: res.user.displayName, //.users.entities[state.users.selectedId || "null"],
                uid: res.user.uid,
              });
              return RegisterEmailUserActions.registerEmailUserSuccess({
                user: u,
              });
            } else {
              return RegisterEmailUserActions.registerEmailUserFailure({
                error: 'Registration Failed',
              });
            }
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const loginLinkUser = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(LoginLinkActions.loginLinkUser),
      mergeMap((action: { email: string }) => {
        return userService.doEmailLinkLogin(action.email).pipe(
          map((res: unknown) => {
            if (res) {
              return LoginLinkActions.loginLinkUserSuccess({
                email: action.email,
              });
            } else {
              return LoginLinkActions.loginLinkUserFailure({
                error: 'Login Link Failed',
              });
            }
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const resetEmailPassword = createEffect(
  (actions$ = inject(Actions), userService = inject(UserService)) => {
    return actions$.pipe(
      ofType(ResetPasswordEmailActions.resetPasswordEmail),
      mergeMap((action: { email: string }) => {
        return userService.doResetEmail(action.email).pipe(
          map((res: void | Error) => {
            const newResponse: { code: string } = (<unknown>res) as {
              code: string;
            };
            if (res && newResponse.code) {
              const errMessage: string = userService.getErrorMesssage(
                newResponse.code,
              );
              return ResetPasswordEmailActions.resetPasswordEmailFailure({
                error: errMessage,
              });
            } else {
              return ResetPasswordEmailActions.resetPasswordEmailSuccess();
            }
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const logoutUser = createEffect(
  (
    actions$ = inject(Actions),
    userService = inject(UserService),
    localStorageService = inject(LocalStorageService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(UserLoginActions.logoutUser),
      tap(() => {
        userService.logout();
        localStorageService.removeItem('userEntity');
        store.dispatch(UserLoginActions.logoutUserSuccess());
        //  return UserLoginActions.logoutUserSuccess();
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const fetchUserProfile = createEffect(
  (
    actions$ = inject(Actions),
    userService = inject(UserService),
    localStorageService = inject(LocalStorageService),
  ) => {
    return actions$.pipe(
      ofType(
        RdasUsersInitActions.initSuccess,
        UserLoginActions.loginUserSuccess,
        LoginEmailUserActions.loginEmailUserSuccess,
        RegisterEmailUserActions.registerEmailUserSuccess,
      ),
      mergeMap((action: { user: User }) => {
        return userService.fetchUserProfile(action.user).pipe(
          map((res: DocumentSnapshot) => {
            let user: User = action.user;
            if (res && !res.exists) {
              userService.createUserProfile(user);
            } else {
              user = res.data() as User;
              localStorageService.removeItem('userEntity');
              localStorageService.setItem('userEntity', JSON.stringify(user));
            }
            return UserLoginActions.fetchUserProfileSuccess({ user: user });
          }),
        );
      }),
    );
  },
  { functional: true },
);

export const updateUserProfile = createEffect(
  (
    actions$ = inject(Actions),
    userService = inject(UserService),
    store = inject(Store),
    localStorageService = inject(LocalStorageService),
  ) => {
    return actions$.pipe(
      ofType(UpdateUserActions.updateUserSubscriptions),
      concatLatestFrom(() => store.select(getSelected)),
      mergeMap(([action, state]) => {
        const newUser: User = new User({
          displayName: state?.displayName, //.users.entities[state.users.selectedId || "null"],
          uid: state?.uid,
          subscriptions: action.subscriptions,
        });
        return userService.updateUserProfile(newUser).pipe(
          map((res: DocumentSnapshot<DocumentData, DocumentData>) => {
            const user = res.data() as User;
            localStorageService.removeItem('userEntity');
            localStorageService.setItem('userEntity', JSON.stringify(user));
            return UpdateUserActions.updateUserSubscriptionsSuccess({
              user: user,
            });
          }),
        );
      }),
    );
  },
  { functional: true },
);
