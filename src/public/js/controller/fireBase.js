let app_fireBase = {};

(function () {
  const firebaseConfig = {
    apiKey: "AIzaSyD_GiwlMz2fCQvL_zp0rjYrUQFqHhPbGl0",
    authDomain: "reservatron-7761e.firebaseapp.com",
    databaseURL: "https://reservatron-7761e.firebaseio.com",
    projectId: "reservatron-7761e",
    storageBucket: "reservatron-7761e.appspot.com",
    messagingSenderId: "646624650375",
    appId: "1:646624650375:web:220fa2f7a43735a5f64422",
    measurementId: "G-38V34M8GH9",
  };

  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  app_fireBase = firebase;
})();
