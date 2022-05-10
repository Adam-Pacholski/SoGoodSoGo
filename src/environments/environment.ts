// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    
    apiKey: "AIzaSyBdbGASNoTUMoGgrsB5p_GCDxTfTh0OGfI",
    authDomain: "sogoodsogoo-base.firebaseapp.com",
    projectId: "sogoodsogoo-base",
    storageBucket: "sogoodsogoo-base.appspot.com",
    messagingSenderId: "400687111881",
    appId: "1:400687111881:web:6043fa7b4e80d4c567b718",
    measurementId: "G-ZV85WT51JV"
  },
  google:{
    apiKey: 'AIzaSyDWK1mQdfs58uk0851oATf6T-lDBtNY8qk',
      libraries: ['places']
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
