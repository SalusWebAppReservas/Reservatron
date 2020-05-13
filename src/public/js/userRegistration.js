const url = window.location.href;

const getFirebaseConfig = async () => await (await fetch(`${url}getFirebaseConfig`)).json();

const connectFirebase = async () => {
    firebase.initializeApp(await getFirebaseConfig());
    firebase.analytics();
};

const verifyUserBySMS = async () => {
    await connectFirebase();
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    var uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: (authResult) => {
                alert(
                    `Falta Mandar datos de registro a servidor con fetch...Telefono de usuario: ${authResult.user.phoneNumber}`
                );
                return false;
                // document.getElementById("formulario").style.display = "none";
            },
        },
        signInFlow: 'popup',
        signInOptions: [
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
    ui.start('#firebaseui-auth-container', uiConfig);
};

const btnCreateAccount = document.getElementById('btnCreateAccount');
btnCreateAccount.addEventListener('click', verifyUserBySMS);
