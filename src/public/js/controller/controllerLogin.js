const btnCreateAccount = document.getElementById('btnCreateAccount');
const btnLogin = document.getElementById('btnLogin');
const url = window.location.href;

const checkLogin = async (isLoginOk) => {
    const { user, password, userID } = await isLoginOk.json();
    if (userID) alert('Login correcto. Falta redireccionar');
    else if (user) alert('Password incorrecto');
    else alert('Usuario no existe');
};
const sendLoginUser = async (event) => {
    event.preventDefault();
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const login = {
        user,
        password,
    };

    const isLoginOk = await fetch(`${url}loginUser/${login}`);

    checkLogin(isLoginOk);
};

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

btnLogin.addEventListener('click', loginUser);
btnCreateAccount.addEventListener('click', verifyUserBySMS);
