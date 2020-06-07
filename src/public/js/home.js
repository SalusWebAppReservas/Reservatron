/* global firebase */
import { connectFirebase } from './model/fireBase.js';
import verifyUserBySMS from './userRegistration.js';
import { verifyLoginUser, sendLoginUser } from './login.js';
import { sendPushNotification, sendEmailtoClient } from './model/notifications.js';
import * as DB from './model/db.js';
import * as DBUsers from './model/DBUsers.js';
import * as DBServices from './model/DBServices.js';
import * as DBReservations from './model/DBReservations.js';
import * as UI from './view/UI.js';
import * as UIAdmin from './view/UIAdmin.js';

const login = document.getElementById('mainLogin');
const logoHome = document.getElementById('logoHome');
const navMenu = document.getElementById('navMenu');

const logout = async () => {
    if (firebase.apps.length !== 0 && firebase) await firebase.auth().signOut();
    sessionStorage.removeItem('RVuserID');
    sessionStorage.removeItem('RVadmin');
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
    } else return false;
    // const promesa = new Promise((resolve) => {
    //     firebase.auth().onAuthStateChanged((user) => {
    //         const admin = sessionStorage.getItem('RVadmin') === 'true';
    //         if (user) {
    //             if (admin) renderAdminReservas();
    //             renderClientReservas();
    //             UI.changeIconToLogOut();
    //             login.removeEventListener('click', renderLogin);
    //             login.addEventListener('click', logout);
    //             resolve(true);
    //         } else {
    //             UI.changeIconToLogIn();
    //             login.removeEventListener('click', logout);
    //             login.addEventListener('click', renderLogin);
    //             resolve(false);
    //         }
    //     });
    // });
    // return promesa;
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
    colorizeMonth();
    UI.showNameMonth(fechaSelected);
    const monthWidget = document.querySelector('.armContainer');
    monthWidget.addEventListener('click', backToDay);
};

const subtractMonth = () => {
    UI.decreaseMonth();
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));

    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();

    renderTemplate(UI.adminReservasMonth, { month, year }, 'asrCitasContainer');
    colorizeMonth();
    UI.showNameMonth(fechaSelected);
    const monthWidget = document.querySelector('.armContainer');
    monthWidget.addEventListener('click', backToDay);
};

const colorizeMonth = async () => {
    const idClient = sessionStorage.getItem('RVuserID');
    const admin = sessionStorage.getItem('RVadmin');
    const monthWidget = document.getElementById('monthWidget');
    const firstDay = monthWidget.firstElementChild.id;
    const lastDay = monthWidget.lastElementChild.id;

    const reservasMonth = await DBReservations.getReservasMonth(firstDay, lastDay);
    let reservasMonthFiltered;
    if (admin === 'false')
        reservasMonthFiltered = reservasMonth.filter(({ clientID }) => clientID === idClient);
    else reservasMonthFiltered = reservasMonth;

    let daysToColorize = {};

    reservasMonthFiltered.forEach((reserva) => {
        const date = new Date(reserva.date);
        date.setHours(0, 0, 0, 0);
        const day = date.getTime();
        if (daysToColorize[day]) daysToColorize[day] += 1;
        else daysToColorize[day] = 1;
    });

    Object.entries(daysToColorize).forEach((day) => {
        const id = day[0];
        const contador = day[1];
        document.getElementById(id).classList.add(contador < 8 ? 'orange' : 'red');
    });
    return reservasMonthFiltered;
};

const backToDay = ({ target }) => {
    if (target.className === 'armContainer') return;
    sessionStorage.setItem(
        'RVfechaSelected',
        target.tagName === 'P'
            ? new Date(Number(target.parentNode.id))
            : new Date(Number(target.id))
    );
    renderAdminReservas();
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

        btnNext.removeEventListener('click', incrementDay);
        btnNext.addEventListener('click', addMonth);
        btnBack.removeEventListener('click', decreaseDay);
        btnBack.addEventListener('click', subtractMonth);

        isBtnDaySelected.selected = false;
        isBtnMonthSelected.selected = true;

        const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
        const month = fechaSelected.getMonth();
        const year = fechaSelected.getFullYear();

        renderTemplate(UI.adminReservasMonth, { month, year }, 'asrCitasContainer');
        colorizeMonth();
        UI.showNameMonth(fechaSelected);

        const monthWidget = document.querySelector('.armContainer');
        monthWidget.addEventListener('click', backToDay);
    } else if (
        isBtnMonthSelected.selected === 'true' &&
        (target.id === 'asrBtnDay' || target.id === 'asrIconDay')
    ) {
        UI.changeIconMonthToDay();

        btnNext.removeEventListener('click', addMonth);
        btnNext.addEventListener('click', incrementDay);
        btnBack.removeEventListener('click', subtractMonth);
        btnBack.addEventListener('click', decreaseDay);

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
    colorizeMonth();
    UI.showNameMonth(fechaSelected);
    UI.showDayAlreadySelected();
};

const createReservaBackMonth = () => {
    UI.decreaseMonth();
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    const month = fechaSelected.getMonth();
    const year = fechaSelected.getFullYear();
    renderTemplate(UI.adminCreateReservaMonth, { month, year }, 'acrCalendar');
    colorizeMonth();
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
    const admin = sessionStorage.getItem('RVadmin') === 'true';
    const userID = sessionStorage.getItem('RVuserID');

    if (form.selectedHour.value === '0')
        form.selectedHour.setCustomValidity('Tienes que seleccionar una hora');
    else form.selectedHour.setCustomValidity('');
    e.preventDefault();

    const reservation = {
        clientID: admin ? form.clientName.dataset.id : userID,
        serviceID: form.serviceName.dataset.id,
        comments: form.comments.value,
        date: Number(form.selectedHour.value),
    };

    const { success } = await DB.saveNewReserva(reservation);
    if (success) {
        renderTemplate(
            UI.renderModal,
            success ? 'Reserva creada con éxito' : 'Hubo un error al crear la reserva',
            'modal'
        );
        UI.handleModal(admin ? renderAdminReservas : renderClientReservas);
        sessionStorage.setItem('RVfechaSelected', sessionStorage.getItem('RVdaySelected'));
    }
};

const modifyReserva = async (event) => {
    const form = document.getElementById('acrForm');
    const admin = sessionStorage.getItem('RVadmin') === 'true';
    const date = form.selectedHour.value;
    const reservationID = event.target.dataset['reservation_id'];

    event.preventDefault();
    const { success } = await DBReservations.modifyReservation(reservationID, date);
    if (success) sessionStorage.setItem('RVfechaSelected', sessionStorage.getItem('RVdaySelected'));
    renderTemplate(
        UI.renderModal,
        success ? 'Reserva modificada con éxito' : 'Hubo un error al modificar la reserva',
        'modal'
    );
    UI.handleModal(admin ? renderAdminReservas : renderClientReservas);
};

const renderCreateReserva = async (update) => {
    const admin = sessionStorage.getItem('RVadmin') === 'true';
    const clients = await getAllClients();
    const services = await getAllServices();

    let fechaSelected = sessionStorage.getItem('RVfechaSelected');
    if (fechaSelected) fechaSelected = new Date(fechaSelected);
    else {
        fechaSelected = new Date();
        sessionStorage.setItem('RVfechaSelected', fechaSelected);
    }

    const month = update.date ? new Date(Number(update.date)).getMonth() : fechaSelected.getMonth();
    const year = update.date
        ? new Date(Number(update.date)).getFullYear()
        : fechaSelected.getFullYear();

    renderTemplate(UI.adminCreateReserva, { admin });

    renderTemplate(UI.adminCreateReservaMonth, { month, year }, 'acrCalendar');
    UI.showNameMonth(fechaSelected);

    colorizeMonth();

    const btnNext = document.getElementById('acrBtnNext');
    const btnBack = document.getElementById('acrBtnBack');
    btnNext.addEventListener('click', createReservaNextMonth);
    btnBack.addEventListener('click', createReservaBackMonth);

    const btnDia = document.getElementById('acrCalendar');
    btnDia.addEventListener('click', selectDay);
    if (admin) {
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
    }

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

    if (update.date) {
        const fecha = new Date(Number(update.date));
        fecha.setHours(0, 0, 0, 0);
        document.getElementById('acrTitulo').textContent = 'Modifica Reserva';
        document.getElementById(fecha.getTime()).click();
        document
            .querySelectorAll(
                '.acr__form__titulo, .acr__form__clients,.acr__form__service__titulo,.acr__form__services,.acr__form__notes'
            )
            .forEach((e) => (e.innerHTML = ''));
        const form = document.getElementById('acrForm');
        form.style.backgroundColor = 'transparent';
        form.style.boxShadow = '0px 0px 0px black';
        form.style.marginTop = '-2em';
        const btnReserva = document.getElementById('btnCreateReserva');
        btnReserva.textContent = 'Modificar Reserva';
        btnReserva.dataset['reservation_id'] = update.reservationID;
    }

    const btnCreateReserva = document.getElementById('btnCreateReserva');
    btnCreateReserva.addEventListener('click', update.date ? modifyReserva : createReserva);
};

const createService = async (e) => {
    const form = document.getElementById('asForm');
    if (form.checkValidity()) {
        e.preventDefault();
        const { nameService, durationService, color } = form;
        await DB.saveNewService(nameService.value, durationService.value, color.value);
        renderTemplate(UI.renderModal, 'Servicio creado con éxito', 'modal');
        UI.handleModal();
        setTimeout(() => {
            form.reset();
        }, 500);
    }
};

const renderAdminSettings = () => {
    renderTemplate(UI.adminSettings);
    const btnCreateService = document.getElementById('btnCreateService');
    btnCreateService.addEventListener('click', createService);
};

const sendNotification = async ({ target }) => {
    const mensaje = target.closest('.asr__citas__item').querySelector('.asr__textarea__message')
        .value;
    if (mensaje) {
        const sent = await sendPushNotification(target.dataset['userid'], mensaje);
        renderTemplate(
            UI.renderModal,
            sent.success > 0
                ? `Notificación enviada con éxito a ${sent.success} dispositivos del cliente`
                : `Cliente no tiene activadas las notificaciones push`,
            'modal'
        );
    } else
        renderTemplate(
            UI.renderModal,
            'Debe de escribir un mensaje, pulse OK para volver',
            'modal'
        );
    UI.handleModal();
};

const sendEmail = async ({ target }) => {
    const mensaje = target.closest('.asr__citas__item').querySelector('.asr__textarea__message')
        .value;

    const sent = await sendEmailtoClient(target.dataset['userid'], mensaje);
    renderTemplate(
        UI.renderModal,
        sent.success ? `Email enviado con éxito al cliente` : `No se pudo enviar el email`,
        'modal'
    );
    UI.handleModal();
};

const renderModifyReservation = ({ target }) => {
    const reservationID = target.dataset['reservation_id'];
    const date = target.dataset['date'];
    renderCreateReserva({ reservationID, date });
};

const deleteReservation = async ({ target }) => {
    const admin = sessionStorage.getItem('RVadmin') === 'true';
    const { success } = await DBReservations.deleteReservation(target.dataset['reservation_id']);
    renderTemplate(
        UI.renderModal,
        success ? 'Reserva eliminada con éxito' : 'Hubo un error al eliminar la reserva',
        'modal'
    );
    UI.handleModal(admin ? renderAdminReservas : renderClientReservas);
};

const showUserInfo = ({ target }) => {
    let data = {};

    Object.keys(target.dataset).forEach((key) => (data[key] = target.dataset[key].slice(1, -1)));

    const phoneFormated = data.userphone
        .slice(3)
        .replace(/^(\d{3})(\d{2})(\d{2})(\d{2})$/, '$1 $2 $3 $4');

    renderTemplate(UI.adminUserInfo, { ...data, userphone: phoneFormated }, 'userInfo');

    const btnClose = document.getElementById('btnClose');
    btnClose.addEventListener('click', () => (document.getElementById('userInfo').innerHTML = ''));
};

const renderReservationsByDay = async () => {
    const reservas = await cumplimentReserva(sessionStorage.getItem('RVfechaSelected'));

    renderTemplate(UI.adminReservasDay, reservas, 'asrCitasContainer');

    const btnUserInfo = document.querySelectorAll('.icon-user-info');
    btnUserInfo.forEach((button) => button.addEventListener('click', showUserInfo));

    const iconsDetails = document.querySelectorAll('.icon-double-down, .icon-double-up');

    if (iconsDetails) UIAdmin.showAndHideDetails(iconsDetails);

    const buttonsModifyAndDelete = document.querySelectorAll('.idButtonsDeleteModify');
    if (buttonsModifyAndDelete)
        buttonsModifyAndDelete.forEach((button) =>
            button.addEventListener(
                'click',
                button.dataset.name === 'modify' ? renderModifyReservation : deleteReservation
            )
        );

    const btnSendNotification = document.querySelectorAll('.asr__citas__item__buttonPush');
    btnSendNotification.forEach((button) => button.addEventListener('click', sendNotification));

    const btnSendEmail = document.querySelectorAll('.asr__citas__item__buttonEmail');
    btnSendEmail.forEach((button) => button.addEventListener('click', sendEmail));
};

const incrementDay = async () => {
    UI.incrementDay();
    renderReservationsByDay();
};

const decreaseDay = () => {
    UI.decreaseDay();
    renderReservationsByDay();
};

const cumplimentReserva = async (fecha) => {
    const fechaSelected = new Date(fecha);
    const reservas = await DB.getReservas(fechaSelected.getTime());
    try {
        return Promise.all(
            reservas.map(async (reserva) => {
                const userData = await DBUsers.getUserData(reserva.clientID);
                const serviceData = await DBServices.getServiceData(reserva.serviceID);
                if (userData && serviceData)
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
                        comments: reserva.comments,
                        reservationID: reserva.reservationID,
                        date: reserva.date,
                        color: serviceData.color,
                        userAddress: userData.userAddress,
                        userPostalCode: userData.userPostalCode,
                        userPhone: userData.userPhone,
                        userEmail: userData.userEmail,
                        created: new Date(userData.created).toLocaleString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }),
                    };
            })
        );
    } catch (error) {
        console.log(error);
    }
};

const renderChart = async () => {
    const year = sessionStorage.getItem('RVyearChart') || new Date().getFullYear();

    if (!sessionStorage.getItem('RVyearChart')) sessionStorage.setItem('RVyearChart', year);
    const {
        registeredUsers,
        reservationsDone,
        topClient,
        totalReservas,
        totalUsers,
    } = await DB.getDataForChart(year);

    const data = { year, totalUsers, totalReservas };
    renderTemplate(UI.adminChart, data);

    registeredUsers['chartName'] = 'Clientes';
    reservationsDone['chartName'] = 'Reservas';
    topClient['chartName'] = 'Mejor Cliente';

    UIAdmin.renderChart(registeredUsers, reservationsDone, topClient);
    const btnBackYear = document.getElementById('btnBack');
    const btnNextYear = document.getElementById('btnNext');
    btnNextYear.addEventListener('click', () => {
        sessionStorage.getItem('RVyearChart')
            ? sessionStorage.setItem(
                  'RVyearChart',
                  Number(sessionStorage.getItem('RVyearChart')) + 1
              )
            : sessionStorage.setItem('RVyearChart', new Date(new Date().getFullYear() + 1));
        renderChart();
    });
    btnBackYear.addEventListener('click', () => {
        sessionStorage.getItem('RVyearChart')
            ? sessionStorage.setItem(
                  'RVyearChart',
                  Number(sessionStorage.getItem('RVyearChart')) - 1
              )
            : sessionStorage.setItem('RVyearChart', new Date(new Date().getFullYear() - 1));
        renderChart();
    });
};

const renderAdminReservas = async () => {
    let fechaSelected = sessionStorage.getItem('RVfechaSelected');
    if (fechaSelected) fechaSelected = new Date(fechaSelected);
    else {
        fechaSelected = new Date();
        fechaSelected.setHours(0, 0, 0, 0);
        sessionStorage.setItem('RVfechaSelected', fechaSelected);
    }

    renderTemplate(UI.adminShowReservasTemplate);
    await renderReservationsByDay();

    const btnNext = document.getElementById('asrBtnNext');
    const btnBack = document.getElementById('asrBtnBack');
    btnNext.addEventListener('click', incrementDay);
    btnBack.addEventListener('click', decreaseDay);

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

    const charts = document.getElementById('footerChart');
    charts.addEventListener('click', renderChart);

    const settings = document.getElementById('footerSettings');
    settings.addEventListener('click', renderAdminSettings);
};

const renderClientCreateReserva = () => {
    const update = {};
    renderCreateReserva(update, false);
};

const ClientCumplimentReserva = async (reservas, clientID) => {
    try {
        return Promise.all(
            reservas.map(async (reserva) => {
                const userData = await DBUsers.getUserData(clientID);
                const serviceData = await DBServices.getServiceData(reserva.serviceID);
                if (userData && serviceData)
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
                        comments: reserva.comments,
                        reservationID: reserva.reservationID,
                        date: reserva.date,
                        color: serviceData.color,
                        userAddress: userData.userAddress,
                        userPostalCode: userData.userPostalCode,
                        userPhone: userData.userPhone,
                        userEmail: userData.userEmail,
                        created: new Date(userData.created).toLocaleString('es-ES', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                        }),
                    };
            })
        );
    } catch (error) {
        console.log(error);
    }
};
const clientSelectDay = async ({ target }) => {
    if (target.className === 'acrContainer') return;

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
    await clientShowReservasDay();
};

const clientShowReservasDay = async () => {
    const fechaSelected = sessionStorage.getItem('RVdaySelected');
    const userID = sessionStorage.getItem('RVuserID');
    const reservas = await colorizeMonth(userID);

    const filterReservasByDay = reservas.filter((reserva) => {
        const dayReserva = new Date(reserva.date).setHours(0, 0, 0, 0);

        return new Date(dayReserva).getTime() === new Date(fechaSelected).getTime();
    });

    const complimentedReservas = await ClientCumplimentReserva(filterReservasByDay, userID);
    console.log('render');

    renderTemplate(UI.clientReservasDay, complimentedReservas, 'asCitas');
    const btnModifyReserva = document.querySelectorAll('.icon-modify');
    btnModifyReserva.forEach((button) => button.addEventListener('click', renderModifyReservation));

    const btnDeleteReserva = document.querySelectorAll('.icon-calendar-delete');
    btnDeleteReserva.forEach((button) => button.addEventListener('click', deleteReservation));
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
    btnDia.addEventListener('click', clientSelectDay);

    await clientShowReservasDay();
    UI.showDayAlreadySelected();
    const allReservas = document.getElementById('footerAll');
    allReservas.addEventListener('click', renderHome);

    const settings = document.getElementById('footerAdd');
    settings.addEventListener('click', renderClientCreateReserva);
};

export const renderHome = async () => {
    // Falta chequear si el usuario es admin
    if (await isUserLogued())
        if (sessionStorage.getItem('RVadmin') === 'true') renderAdminReservas();
        else {
            renderClientReservas();
            document.getElementById('footerChart').style.display = 'none';
            document.getElementById('footerSettings').style.display = 'none';
        }
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

export const setUserID = async (user, password) => {
    sessionStorage.setItem('RVadmin', user === 'admin' ? true : false);
    const login = { user, password };
    let result = await fetch(`/loginUser/${JSON.stringify(login)}`);
    let data;
    try {
        data = await result.json();
    } catch (error) {
        console.log('no hay datos de ese usuario');
    }
    const { userID } = data;
    sessionStorage.setItem('RVuserID', userID);
    logout();
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
navMenu.addEventListener('click', () => {
    document.querySelector('.nav__menuExtended').classList.toggle('extended');
    navMenu.classList.toggle('hidden');
});

const navClose = document.getElementById('navClose');
navClose.addEventListener('click', () => {
    document.querySelector('.nav__menuExtended').classList.toggle('extended');
    navMenu.classList.toggle('hidden');
});

document.querySelector('nav ul').addEventListener('click', ({ target }) => {
    if (target.tagName === 'P') return;
    renderTemplate(UI.renderModal, 'Menú sólo disponible para usuarios premium', 'modal');
    UI.handleModal();
});
