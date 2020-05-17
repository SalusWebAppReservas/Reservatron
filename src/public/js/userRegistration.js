import { connectFirebase } from './model/fireBase.js';

const url = window.location.href;

const getDataFromInputs = () => {
    return {
        user: document.getElementById('user').value,
        password: document.getElementById('password').value,
        userName: document.getElementById('userName').value,
        userSurnames: document.getElementById('userSurnames').value,
        userAddress: document.getElementById('userAddress').value,
        userPostalCode: document.getElementById('userPostalCode').value,
        userEmail: document.getElementById('userEmail').value,
    };
};

const verifyUserBySMS = async (e) => {
    e.preventDefault();
    const userData = getDataFromInputs();
    document.getElementById('registro').style.display = 'none';
    if (firebase.apps.length === 0) {
        await connectFirebase();
    }
    let ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                const userDataWithPhone = {
                    ...userData,
                    userPhone: authResult.user.phoneNumber,
                };
                fetch(`${url}addUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userDataWithPhone),
                });
                return false;
            },
        },
        signInFlow: 'popup',
        signInSuccessUrl: url,
        signInOptions: [
            {
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image', // 'audio'
                    size: 'invisible', // 'invisible' or 'compact'
                    badge: 'bottomleft', //' bottomright' or 'inline' applies to invisible.
                },
                defaultCountry: 'ES',
                displayName: userData.userName,
            },
        ],
        // Terms of service url.
        tosUrl: '',
        privacyPolicyUrl: '',
    };
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
};

// const btnCreateAccount = document.getElementById('btnCreateAccount');
// btnCreateAccount.addEventListener('click', verifyUserBySMS);

export default verifyUserBySMS;
