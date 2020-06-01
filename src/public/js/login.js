/* global firebase */
/* global firebaseui */

import { connectFirebase } from './model/fireBase.js';
import { webPushInit } from './model/notifications.js';

const url = window.location.href;

const showLoginResult = async (isLoginOk) => {
    const userID = await isLoginOk.json();

    if (userID) {
        await webPushInit(userID);
        sessionStorage.setItem('RVuserID', userID);
        window.location.href = url;
        return true;
    } else alert('Datos de login incorrectos');
    return false;
};
export const sendLoginUser = async (event) => {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;
    const loginForm = document.getElementById('loginForm');
    if (loginForm.checkValidity()) {
        event.preventDefault();
        const login = {
            user,
            password,
        };
        sessionStorage.setItem('RVadmin', user === 'admin' ? true : false);

        const isLoginOk = await fetch(`${url}loginUser/${JSON.stringify(login)}`);
        showLoginResult(isLoginOk);
    }
};

export const verifyLoginUser = async () => {
    if (firebase.apps.length === 0) {
        await connectFirebase();
    }
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: () => {
                // const userDataWithPhone = { ...userData, userPhone: authResult.user.phoneNumber };
                // fetch(`${url}addUser`, {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json',
                //     },
                //     body: JSON.stringify(userDataWithPhone),
                // });
                // alert('Usuario registrado en la base de datos con éxito');
                return true;
            },
        },
        signInFlow: 'popup',
        signInSuccessUrl: url.split('?')[0],
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.TwitterAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,

                recaptchaParameters: {
                    type: 'image', // 'audio'
                    size: 'invisible', // 'invisible' or 'compact'
                    badge: 'bottomleft', //' bottomright' or 'inline' applies to invisible.
                },
                defaultCountry: 'ES',
            },
        ],
        // Terms of service url.
        tosUrl: '',
        privacyPolicyUrl: '',
    };

    // The start method will wait until the DOM is loaded.
    ui.start('#loginContainer', uiConfig);
};

// btnLogin.addEventListener('click', sendLoginUser);
