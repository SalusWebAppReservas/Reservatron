// Ojo, modificada linea 36 en handlebars.js porque usando imports se usa strict mode
// added (|| window) to 'this' porque en strict mode 'this' no puede acceder a 'window'.
import { connectFirebase } from './model/fireBase.js';
import verifyUserBySMS from './userRegistration.js';
import { verifyLoginUser, sendLoginUser } from './login.js';
import { getReservas } from './model/db.js';
import * as UI from './view/UI.js';

const login = document.getElementById('mainLogin');
const register = document.getElementById('btnRegister');
const contenedor = document.getElementById('contenedor');
const logoHome = document.getElementById('logoHome');

const logout = async () => {
    if (firebase.apps.length !== 0 && firebase) await firebase.auth().signOut();
    sessionStorage.removeItem('RVuserID');
    renderHome();
    UI.changeIconToLogIn();
    login.removeEventListener('click', logout);
    login.addEventListener('click', renderLogin);
};
const isUserLogued = async () => {
    if (firebase.apps.length === 0) {
        await connectFirebase();
    }
    if (sessionStorage.getItem('RVuserID')) {
        UI.changeIconToLogOut();
        login.removeEventListener('click', renderLogin);
        login.addEventListener('click', logout);
        return true;
    }
    const promesa = new Promise(async (resolve, reject) => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                renderAdminReservas();
                UI.changeIconToLogOut();
                login.removeEventListener('click', renderLogin);
                login.addEventListener('click', logout);
                resolve(true);
            } else {
                UI.changeIconToLogIn();
                login.removeEventListener('click', logout);
                login.addEventListener('click', renderLogin);
                resolve(false);
            }
        });
    });
    return promesa;
};

const renderTemplate = (template, datos, container = 'contenedor') => {
    // Hago que se oculte y el timeout de 1ms para que cuando se cargue la pagina ya esté aplicado el css
    // de lo contrario se ve durante 1ms la página sin el css aplicado.
    const contenedor = document.getElementById(container);
    contenedor.style.visibility = 'hidden';
    contenedor.innerHTML = template(datos);
    setTimeout(() => {
        contenedor.style.visibility = 'visible';
    }, 100);
};

const addMonth = () => {
    UI.incrementMonth();
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();
    renderTemplate(UI.adminReservasMonth, { month, year }, 'asrCitasContainer');
    UI.showNameMonth(fechaSelected);
};

const subtractMonth = () => {
    UI.decreaseMonth();
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));

    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();

    renderTemplate(UI.adminReservasMonth, { month, year }, 'asrCitasContainer');
    UI.showNameMonth(fechaSelected);
};

const selectDayOrMonth = async ({ target }) => {
    const btnNext = document.getElementById('asrBtnNext');
    const btnBack = document.getElementById('asrBtnBack');
    let isBtnDaySelected = document.getElementById('asrBtnDay').dataset.selected;
    let isBtnMonthSelected = document.getElementById('asrBtnMonth').dataset.selected;

    if (target.id === 'asrBtnMonth' || target.id === 'asrIconMonth') {
        UI.changeIconDayMonth();

        btnNext.removeEventListener('click', UI.incrementDay);
        btnNext.addEventListener('click', addMonth);
        btnBack.removeEventListener('click', UI.decreaseDay);
        btnBack.addEventListener('click', subtractMonth);

        isBtnDaySelected = false;
        isBtnMonthSelected = true;

        const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
        const month = fechaSelected.getMonth();
        const year = fechaSelected.getFullYear();
        renderTemplate(UI.adminReservasMonth, { month, year }, 'asrCitasContainer');
        UI.showNameMonth(fechaSelected);
    } else if (target.id === 'asrBtnDay' || target.id === 'asrIconDay') {
        UI.changeIconMonthToDay();

        btnNext.removeEventListener('click', addMonth);
        btnNext.addEventListener('click', UI.incrementDay);
        btnBack.removeEventListener('click', subtractMonth);
        btnBack.addEventListener('click', UI.decreaseDay);

        isBtnDaySelected = true;
        isBtnMonthSelected = false;
        const reservas = await getReservas();
        renderTemplate(UI.adminReservasDay, reservas, 'asrCitasContainer');
        const asrFecha = document.getElementById('asrFechaDDMMYYYY');
        const asrNombreDia = document.getElementById('asrFechaNombreDia');
        const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));

        asrFecha.textContent = fechaSelected.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        asrNombreDia.textContent = fechaSelected.toLocaleDateString('es-ES', { weekday: 'long' });
    }
};

const renderAdminReservas = async (_fecha) => {
    const reservas = await getReservas(_fecha);
    let fechaSelected = sessionStorage.getItem('RVfechaSelected');
    if (fechaSelected === null) {
        fechaSelected = new Date();
        sessionStorage.setItem('RVfechaSelected', fechaSelected);
    } else fechaSelected = new Date(fechaSelected);

    renderTemplate(UI.adminShowReservasTemplate, reservas);

    const isBtnDaySelected = document.getElementById('asrBtnDay').dataset.selected;
    const isBtnMonthSelected = document.getElementById('asrBtnMonth').dataset.selected;

    const btnNext = document.getElementById('asrBtnNext');
    const btnBack = document.getElementById('asrBtnBack');
    btnNext.addEventListener('click', UI.incrementDay);
    btnBack.addEventListener('click', UI.decreaseDay);

    const asrFecha = document.getElementById('asrFechaDDMMYYYY');
    const asrNombreDia = document.getElementById('asrFechaNombreDia');
    asrFecha.textContent = fechaSelected.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    asrNombreDia.textContent = fechaSelected.toLocaleDateString('es-ES', { weekday: 'long' });

    const btnSelectDayMonth = document.getElementById('asr_btnSelectDayMonth');
    btnSelectDayMonth.addEventListener('click', selectDayOrMonth);
};

const renderHome = async () => {
    if (await isUserLogued()) renderAdminReservas();
    else {
        renderTemplate(UI.homeTemplate);
        const register = document.getElementById('btnRegister');
        register.addEventListener('click', renderRegister);
    }
};

const renderLogin = async (e) => {
    if (await isUserLogued()) logout();
    else {
        renderTemplate(UI.loginTemplate);
        e.preventDefault();
        verifyLoginUser();
        const btnLogin = document.getElementById('btnLogin');
        btnLogin.addEventListener('click', sendLoginUser);
    }
};

const renderRegister = (e) => {
    e.preventDefault();
    renderTemplate(UI.userRegistrationTemplate);

    const btnSiguiente1 = document.getElementById('btnFormulario__siguiente1');
    const btnSiguiente2 = document.getElementById('btnFormulario__siguiente2');

    const btnVolverTo1 = document.getElementById('btnFormulario__volverTo1');
    const btnVolverTo2 = document.getElementById('btnFormulario__volverTo2');

    btnSiguiente1.addEventListener('click', UI.registerGoToStep2);
    btnSiguiente2.addEventListener('click', UI.registerGoToStep3);

    btnVolverTo2.addEventListener('click', UI.registerBackToStep2);
    btnVolverTo1.addEventListener('click', UI.registerBackToStep1);

    const btnCreateAccount = document.getElementById('btnCreateAccount');
    btnCreateAccount.addEventListener('click', verifyUserBySMS);
};

renderHome();

login.addEventListener('click', renderLogin);
logoHome.addEventListener('click', renderHome);
