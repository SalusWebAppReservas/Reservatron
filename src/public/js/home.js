// Ojo, modificada linea 36 en handlebars.js porque usando imports se usa strict mode
// added (|| window) to 'this' porque en strict mode 'this' no puede acceder a 'window'.
import { connectFirebase } from './model/fireBase.js';
import {
    homeTemplate,
    loginTemplate,
    userRegistrationTemplate,
    adminShowReservasTemplate,
    changeIconToLogOut,
    changeIconToLogIn,
    registerGoToStep2,
    registerGoToStep3,
    registerBackToStep2,
    registerBackToStep1,
} from './view/UI.js';
import verifyUserBySMS from './userRegistration.js';
import { verifyLoginUser, sendLoginUser } from './login.js';
import { getReservas } from './model/db.js';

const login = document.getElementById('mainLogin');
const register = document.getElementById('btnRegister');
const contenedor = document.getElementById('contenedor');
const logoHome = document.getElementById('logoHome');

const logout = async () => {
    await connectFirebase();
    if (firebase) await firebase.auth().signOut();
    sessionStorage.removeItem('RVuserID');
    renderHome();
    changeIconToLogIn();
    login.removeEventListener('click', logout);
    login.addEventListener('click', renderLogin);
};
const isUserLogued = async () => {
    if (sessionStorage.getItem('RVuserID')) {
        changeIconToLogOut();
        login.removeEventListener('click', renderLogin);
        login.addEventListener('click', logout);
        return true;
    }
    const promesa = new Promise(async (resolve, reject) => {
        await connectFirebase();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                renderAdminReservas();
                changeIconToLogOut();
                login.removeEventListener('click', renderLogin);
                login.addEventListener('click', logout);
                resolve(true);
            } else {
                changeIconToLogIn();
                login.removeEventListener('click', logout);
                login.addEventListener('click', renderLogin);
                resolve(false);
            }
        });
    });
    return promesa;
};

const renderTemplate = (template, datos) => {
    // Hago que se oculte y el timeout de 1ms para que cuando se cargue la pagina ya esté aplicado el css
    // de lo contrario se ve durante 1ms la página sin el css aplicado.
    contenedor.style.visibility = 'hidden';
    console.log(datos);
    contenedor.innerHTML = template(datos);
    setTimeout(() => {
        contenedor.style.visibility = 'visible';
    }, 100);
};

const renderAdminReservas = async (fecha) => {
    const reservas = await getReservas(fecha);

    renderTemplate(adminShowReservasTemplate, reservas);
};

const renderHome = async () => {
    if (await isUserLogued()) renderAdminReservas();
    else {
        renderTemplate(homeTemplate);
        const register = document.getElementById('btnRegister');
        register.addEventListener('click', renderRegister);
    }
};

const renderLogin = async (e) => {
    if (await isUserLogued()) logout();
    else {
        renderTemplate(loginTemplate);
        e.preventDefault();
        verifyLoginUser();
        const btnLogin = document.getElementById('btnLogin');
        btnLogin.addEventListener('click', sendLoginUser);
    }
};

const renderRegister = (e) => {
    e.preventDefault();
    renderTemplate(userRegistrationTemplate);

    const formulario = document.getElementById('formulario__paso1');

    const btnSiguiente1 = document.getElementById('btnFormulario__siguiente1');
    const btnSiguiente2 = document.getElementById('btnFormulario__siguiente2');

    const btnVolverTo1 = document.getElementById('btnFormulario__volverTo1');
    const btnVolverTo2 = document.getElementById('btnFormulario__volverTo2');

    const paso1 = document.getElementById('registroPaso1');
    const paso2 = document.getElementById('registroPaso2');
    const paso3 = document.getElementById('registroPaso3');

    btnSiguiente1.addEventListener('click', registerGoToStep2);
    btnSiguiente2.addEventListener('click', registerGoToStep3);

    btnVolverTo2.addEventListener('click', registerBackToStep2);
    btnVolverTo1.addEventListener('click', registerBackToStep1);

    const btnCreateAccount = document.getElementById('btnCreateAccount');
    btnCreateAccount.addEventListener('click', verifyUserBySMS);

    document.querySelector('form').addEventListener('keydown', (e) => {
        if (e.which == 9) e.preventDefault();
    });
};

renderHome();

login.addEventListener('click', renderLogin);
logoHome.addEventListener('click', renderHome);
