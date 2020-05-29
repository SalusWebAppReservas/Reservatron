/* global firebase */
import { connectFirebase } from './model/fireBase.js';
import verifyUserBySMS from './userRegistration.js';
import { verifyLoginUser, sendLoginUser } from './login.js';
import * as DB from './model/db.js';
import * as DBUsers from './model/DBUsers.js';
import * as DBServices from './model/DBServices.js';
import * as UI from './view/UI.js';
import * as UIAdmin from './view/UIAdmin.js';

const login = document.getElementById('mainLogin');
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
    const promesa = new Promise((resolve) => {
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
    }, 200);
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
    const isBtnDaySelected = document.getElementById('asrBtnDay').dataset;
    const isBtnMonthSelected = document.getElementById('asrBtnMonth').dataset;

    if (
        isBtnDaySelected.selected === 'true' &&
        (target.id === 'asrBtnMonth' || target.id === 'asrIconMonth')
    ) {
        UI.changeIconDayMonth();

        btnNext.removeEventListener('click', UI.incrementDay);
        btnNext.addEventListener('click', addMonth);
        btnBack.removeEventListener('click', UI.decreaseDay);
        btnBack.addEventListener('click', subtractMonth);

        isBtnDaySelected.selected = false;
        isBtnMonthSelected.selected = true;

        const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
        const month = fechaSelected.getMonth();
        const year = fechaSelected.getFullYear();
        renderTemplate(UI.adminReservasMonth, { month, year }, 'asrCitasContainer');
        UI.showNameMonth(fechaSelected);
    } else if (
        isBtnMonthSelected.selected === 'true' &&
        (target.id === 'asrBtnDay' || target.id === 'asrIconDay')
    ) {
        UI.changeIconMonthToDay();

        btnNext.removeEventListener('click', addMonth);
        btnNext.addEventListener('click', UI.incrementDay);
        btnBack.removeEventListener('click', subtractMonth);
        btnBack.addEventListener('click', UI.decreaseDay);

        isBtnDaySelected.selected = true;
        isBtnMonthSelected.selected = false;
        const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
        const reservas = await cumplimentReserva(fechaSelected.getTime());
        renderTemplate(UI.adminReservasDay, reservas, 'asrCitasContainer');
        const asrFecha = document.getElementById('asrFechaDDMMYYYY');
        const asrNombreDia = document.getElementById('asrFechaNombreDia');

        asrFecha.textContent = fechaSelected.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
        asrNombreDia.textContent = fechaSelected.toLocaleDateString('es-ES', { weekday: 'long' });
    }
};

const createReservaNextMonth = () => {
    UI.incrementMonth();
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();
    renderTemplate(UI.adminCreateReservaMonth, { month, year }, 'acrCalendar');
    UI.showNameMonth(fechaSelected);
    UI.showDayAlreadySelected();
};

const createReservaBackMonth = () => {
    UI.decreaseMonth();
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();
    renderTemplate(UI.adminCreateReservaMonth, { month, year }, 'acrCalendar');
    UI.showNameMonth(fechaSelected);
    UI.showDayAlreadySelected();
};

const unselectDay = () => {
    const days = document.querySelectorAll('.acr__day');
    days.forEach((days) => days.classList.remove('acr__day-active'));
};
const selectDay = async ({ target }) => {
    if (target.className === 'acrContainer') return;

    document.getElementById('acrForm').classList.remove('acr__form-hidden');

    unselectDay();

    let date;
    if (target.tagName === 'P') {
        date = new Date(Number(target.parentNode.id));
        target.parentNode.classList.add('acr__day-active');
    } else {
        date = new Date(Number(target.id));
        target.classList.add('acr__day-active');
    }

    sessionStorage.setItem('RVdaySelected', date);

    const nombreDia = document.getElementById('nombreDia');
    nombreDia.textContent = date.toLocaleString('es-ES', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
    });

    const availableHours = await DB.getAvailableHours(date.getTime());
    UIAdmin.renderHours(availableHours);
};

const getAllClients = async () => await DB.getAllClients();
const getAllServices = async () => await DB.getAllServices();

const createReserva = async (e) => {
    const form = document.getElementById('acrForm');

    if (form.selectedHour.value === '0')
        form.selectedHour.setCustomValidity('Tienes que seleccionar una hora');
    else form.selectedHour.setCustomValidity('');
    e.preventDefault();

    const reservation = {
        clientID: form.clientName.dataset.id,
        serviceID: form.serviceName.dataset.id,
        comments: form.comments.value,
        date: Number(form.selectedHour.value),
    };

    const save = await DB.saveNewReserva(reservation);
    if (save.success) {
        document.getElementById('btnCreateReserva').textContent = 'Reserva salvada con éxito!!!';
        setTimeout(() => {
            renderAdminReservas();
        }, 3000);
    }
};

const renderCreateReserva = async () => {
    const clients = await getAllClients();
    const services = await getAllServices();

    let fechaSelected = sessionStorage.getItem('RVfechaSelected');
    if (fechaSelected) fechaSelected = new Date(fechaSelected);
    else {
        fechaSelected = new Date();
        sessionStorage.setItem('RVfechaSelected', fechaSelected);
    }
    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();

    renderTemplate(UI.adminCreateReserva);
    renderTemplate(UI.adminCreateReservaMonth, { month, year }, 'acrCalendar');
    UI.showNameMonth(fechaSelected);

    const btnNext = document.getElementById('acrBtnNext');
    const btnBack = document.getElementById('acrBtnBack');
    btnNext.addEventListener('click', createReservaNextMonth);
    btnBack.addEventListener('click', createReservaBackMonth);

    const btnDia = document.getElementById('acrCalendar');
    btnDia.addEventListener('click', selectDay);

    const inputClientName = document.getElementById('inputClientName');
    inputClientName.addEventListener('keyup', ({ target }) =>
        UIAdmin.selectOption(target.value, clients, 'selectClients', 'inputClientName')
    );
    inputClientName.addEventListener('focus', () => {
        inputClientName.value = '';
        delete inputClientName.dataset['id'];
    });
    inputClientName.addEventListener('blur', () => {
        const ul = document.getElementById('selectClients');
        setTimeout(() => {
            if (ul.childElementCount !== 0 && !inputClientName.dataset.id) {
                ul.innerHTML = '';
                inputClientName.value = '';
            }
        }, 700);
    });

    const inputServiceName = document.getElementById('inputServiceName');
    inputServiceName.addEventListener('keyup', ({ target }) =>
        UIAdmin.selectOption(target.value, services, 'selectServices', 'inputServiceName')
    );
    inputServiceName.addEventListener('focus', () => {
        inputServiceName.value = '';
        delete inputServiceName.dataset['id'];
    });
    inputServiceName.addEventListener('blur', () => {
        const ul = document.getElementById('selectServices');
        setTimeout(() => {
            if (ul.childElementCount !== 0 && !inputServiceName.dataset.id) {
                ul.innerHTML = '';
                inputServiceName.value = '';
            }
        }, 700);
    });

    const btnCreateReserva = document.getElementById('btnCreateReserva');
    btnCreateReserva.addEventListener('click', createReserva);
};

const createService = async (e) => {
    const form = document.getElementById('asForm');
    if (form.checkValidity()) {
        e.preventDefault();
        const { nameService, durationService, color } = form;
        await DB.saveNewService(nameService.value, durationService.value, color.value);
        form.reset();
    }
};

const renderAdminSettings = () => {
    renderTemplate(UI.adminSettings);
    const btnCreateService = document.getElementById('btnCreateService');
    btnCreateService.addEventListener('click', createService);
};

const cumplimentReserva = async (fecha) => {
    const fechaSelected = new Date(fecha);
    const reservas = await DB.getReservas(fechaSelected.getTime());

    return Promise.all(
        reservas.map(async (reserva) => {
            const userData = await DBUsers.getUserData(reserva.clientID);
            const serviceData = await DBServices.getServiceData(reserva.serviceID);
            return {
                serviceID: reserva.serviceID,
                userID: reserva.clientID,
                serviceName: serviceData.nameService,
                userName: userData.userName,
                userSurnames: userData.userSurnames,
                day: new Date(reserva.date).toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }),
                time: `${new Date(reserva.date).getHours()}:00`,
            };
        })
    );
};

const renderAdminReservas = async () => {
    let fechaSelected = sessionStorage.getItem('RVfechaSelected');
    if (fechaSelected) fechaSelected = new Date(fechaSelected);
    else {
        fechaSelected = new Date();
        fechaSelected.setHours(0, 0, 0, 0);
        sessionStorage.setItem('RVfechaSelected', fechaSelected);
    }

    const reservas = await cumplimentReserva(fechaSelected);

    renderTemplate(UI.adminShowReservasTemplate, reservas);

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

    const addReserva = document.getElementById('footerAdd');
    addReserva.addEventListener('click', renderCreateReserva);

    const allReservas = document.getElementById('footerAll');
    allReservas.addEventListener('click', renderHome);

    const settings = document.getElementById('footerSettings');
    settings.addEventListener('click', renderAdminSettings);
};

const renderClientCreateReserva = () => {
    renderTemplate(UI.clientCreateReserva);
};

const renderClientReservas = async () => {
    let fechaSelected = sessionStorage.getItem('RVfechaSelected');
    if (fechaSelected) fechaSelected = new Date(fechaSelected);
    else {
        fechaSelected = new Date();
        sessionStorage.setItem('RVfechaSelected', fechaSelected);
    }
    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();
    renderTemplate(UI.clientReservas);
    renderTemplate(UI.adminCreateReservaMonth, { month, year }, 'acrCalendar');
    UI.showNameMonth(fechaSelected);
    const btnNext = document.getElementById('acrBtnNext');
    const btnBack = document.getElementById('acrBtnBack');
    btnNext.addEventListener('click', createReservaNextMonth);
    btnBack.addEventListener('click', createReservaBackMonth);
    const btnDia = document.getElementById('acrCalendar');
    btnDia.addEventListener('click', selectDay);

    // const reservas = await getReservas();
    // renderTemplate(UI.clientReservasDay, reservas, 'asCitas');

    const allReservas = document.getElementById('footerAll');
    allReservas.addEventListener('click', renderHome);

    const settings = document.getElementById('footerAdd');
    settings.addEventListener('click', renderClientCreateReserva);
};

const renderHome = async () => {
    // Falta chequear si el usuario es admin
    if (await isUserLogued())
        if (sessionStorage.getItem('RVadmin') === 'true') renderAdminReservas();
        else renderClientReservas();
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
