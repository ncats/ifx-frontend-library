// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //baseUrl: "http://mg-rdas-test.ncats.nih.gov",
  baseUrl: 'http://localhost:4000/',
  firebase: {
    apiKey: 'AIzaSyAeMmLhQqFbvzlP9kQfpCAteynu8Boo4qs',
    authDomain: 'ncats-summer-interns.firebaseapp.com',
    databaseURL: 'https://ncats-summer-interns.firebaseio.com',
    projectId: 'ncats-summer-interns',
    storageBucket: 'ncats-summer-interns.appspot.com',
    messagingSenderId: '528718212509',
    appId: '1:528718212509:web:028a64c1993f8441f81374',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
