import './plugins/handlebars.runtime-v4.7.6.js';
import './precompiled/home.precompiled.js';
import './precompiled/login.precompiled.js';
import './precompiled/userRegistration.precompiled.js';
import './precompiled/adminShowReservas.precompiled.js';
import './precompiled/adminReservasDay.precompiled.js';
import './precompiled/adminReservasMonth.precompiled.js';

export const homeTemplate = () => Handlebars.templates['home.hbs']();
export const loginTemplate = () => Handlebars.templates['login.hbs']();
export const userRegistrationTemplate = () => Handlebars.templates['userRegistration.hbs']();
export const adminShowReservasTemplate = (reserva) =>
    Handlebars.templates['adminShowReservas.hbs']({ reserva });
export const adminReservasDay = (reserva) =>
    Handlebars.templates['adminReservasDay.hbs']({ reserva });

export const adminReservasMonth = ({ month, year }) => {
    const getDaysOfMonth = (_month, _year) =>
        new Array(31)
            .fill('')
            .map((day, index) => new Date(_year, _month - 1, index + 1))
            .filter((fecha) => fecha.getMonth() === _month - 1);

    const getFirstDay = new Date(year, month - 1, 1).getDay();
    const getLastDay = new Date(year, month, 0).getDay();

    const firstWeek = new Array(getFirstDay === 0 ? 6 : getFirstDay - 1).fill('').map((v, i) => {
        return {
            day: new Date(year, month - 1, 0 - i).getDate(),
            name: new Date(year, month - 1, 0 - i)
                .toLocaleString('es-ES', { weekday: 'short' })
                .slice(0, -1),
        };
    });

    const lastWeek = new Array(getLastDay === 0 ? 0 : 7 - getLastDay).fill('').map((v, i) => {
        return {
            day: new Date(2020, month - 1, 1 + i).getDate(),
            name: new Date(2020, month - 1, 1 + i)
                .toLocaleString('es-ES', { weekday: 'short' })
                .slice(0, -1),
        };
    });

    const middleWeeks = getDaysOfMonth(month, year).map((v, i) => {
        return {
            day: v.getDate(),
            name: v.toLocaleString('es-ES', { weekday: 'short' }).slice(0, -1),
        };
    });

    const dias = [...firstWeek.reverse().concat(middleWeeks, lastWeek)];

    return Handlebars.templates['adminReservasMonth.hbs']({ dias });
};

export const changeIconToLogOut = () => {
    const logoHome = document.getElementById('mainLogin');
    logoHome.classList.remove('icon-user');
    logoHome.classList.add('icon-logout');
};

export const changeIconToLogIn = () => {
    const logoHome = document.getElementById('mainLogin');
    logoHome.classList.remove('icon-logout');
    logoHome.classList.add('icon-user');
};

export const registerGoToStep2 = (e) => {
    const formRegistro = document.getElementById('formRegistro');
    const formulario = document.getElementById('formulario__paso1');
    const paso1 = document.getElementById('registroPaso1');
    const paso2 = document.getElementById('registroPaso2');
    formRegistro.checkValidity();
    if (formRegistro.checkValidity()) {
        e.preventDefault();
        formulario.classList.add('step2');
        paso1.classList.remove('registro__pasos__paso-active');
        paso2.classList.add('registro__pasos__paso-active');
    }
};

export const registerGoToStep3 = (e) => {
    const formRegistro = document.getElementById('formRegistro');
    const formulario = document.getElementById('formulario__paso1');
    const paso2 = document.getElementById('registroPaso2');
    const paso3 = document.getElementById('registroPaso3');
    formRegistro.checkValidity();
    if (formRegistro.checkValidity()) {
        e.preventDefault();
        formulario.classList.add('step3');
        paso2.classList.remove('registro__pasos__paso-active');
        paso3.classList.add('registro__pasos__paso-active');
    }
};

export const registerBackToStep2 = (e) => {
    const formRegistro = document.getElementById('formRegistro');
    const formulario = document.getElementById('formulario__paso1');
    const paso2 = document.getElementById('registroPaso2');
    const paso3 = document.getElementById('registroPaso3');
    formRegistro.checkValidity();
    if (formRegistro.checkValidity()) {
        e.preventDefault();
        formulario.classList.remove('step3');
        paso3.classList.remove('registro__pasos__paso-active');
        paso2.classList.add('registro__pasos__paso-active');
    }
};

export const registerBackToStep1 = (e) => {
    const formRegistro = document.getElementById('formRegistro');
    const formulario = document.getElementById('formulario__paso1');
    const paso1 = document.getElementById('registroPaso1');
    const paso2 = document.getElementById('registroPaso2');
    formRegistro.checkValidity();
    if (formRegistro.checkValidity()) {
        e.preventDefault();
        formulario.classList.remove('step2');
        paso2.classList.remove('registro__pasos__paso-active');
        paso1.classList.add('registro__pasos__paso-active');
    }
};

export const changeIconDayMonth = () => {
    const iconDay = document.getElementById('asrIconDay');
    const iconMonth = document.getElementById('asrIconMonth');

    iconDay.classList.remove('asr__buttons__icon-active');
    iconMonth.classList.add('asr__buttons__icon-active');
};

export const changeIconMonthToDay = () => {
    const iconDay = document.getElementById('asrIconDay');
    const iconMonth = document.getElementById('asrIconMonth');

    iconDay.classList.add('asr__buttons__icon-active');
    iconMonth.classList.remove('asr__buttons__icon-active');
};
