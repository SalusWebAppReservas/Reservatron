import './plugins/handlebars.runtime-v4.7.6.js';
import './precompiled/home.precompiled.js';
import './precompiled/login.precompiled.js';
import './precompiled/userRegistration.precompiled.js';
import './precompiled/adminShowReservas.precompiled.js';
import './precompiled/adminReservasDay.precompiled.js';
import './precompiled/adminReservasMonth.precompiled.js';
import './precompiled/adminCreateReserva.precompiled.js';
import './precompiled/adminCreateReservaMonth.precompiled.js';
import './precompiled/adminSettings.precompiled.js';

export const homeTemplate = () => Handlebars.templates['home.hbs']();
export const loginTemplate = () => Handlebars.templates['login.hbs']();
export const userRegistrationTemplate = () => Handlebars.templates['userRegistration.hbs']();
export const adminCreateReserva = () => Handlebars.templates['adminCreateReserva.hbs']();
export const adminSettings = () => Handlebars.templates['adminSettings.hbs']();

export const adminShowReservasTemplate = (reserva) =>
    Handlebars.templates['adminShowReservas.hbs']({ reserva });
export const adminReservasDay = (reserva) =>
    Handlebars.templates['adminReservasDay.hbs']({ reserva });

export const adminReservasMonth = ({ month, year }) => {
    const dias = daysOfMonth({ month, year });
    return Handlebars.templates['adminReservasMonth.hbs']({ dias });
};

export const adminCreateReservaMonth = ({ month, year }) => {
    const dias = daysOfMonth({ month, year });
    return Handlebars.templates['adminCreateReservaMonth.hbs']({ dias });
};

export const daysOfMonth = ({ month, year }) => {
    const getDaysOfMonth = (_month, _year) =>
        new Array(31)
            .fill('')
            .map((day, index) => new Date(_year, _month, index + 1))
            .filter((fecha) => fecha.getMonth() === _month);

    const getFirstDay = new Date(year, month, 1).getDay();
    const getLastDay = new Date(year, month + 1, 0).getDay();

    const firstWeek = new Array(getFirstDay === 0 ? 6 : getFirstDay - 1).fill('').map((v, i) => {
        let _year = year;
        let _month = month;
        if (month === 0) {
            _year = year - 1;
            _month = month + 1;
        }
        return {
            day: new Date(
                _year,
                _month === 0 ? 11 : _month - 1,
                getDaysOfMonth(_month === 0 ? 11 : _month - 1, _year).length - i
            ).getDate(),
            name: new Date(
                _year,
                _month === 0 ? 11 : _month - 1,
                getDaysOfMonth(_month === 0 ? 11 : _month - 1, _year).length - i
            )
                .toLocaleString('es-ES', { weekday: 'short' })
                .slice(0, -1),
            date: new Date(
                _year,
                _month === 0 ? 11 : _month - 1,
                getDaysOfMonth(_month === 0 ? 11 : _month - 1, _year).length - i
            ).getTime(),
        };
    });

    const lastWeek = new Array(getLastDay === 0 ? 0 : 7 - getLastDay).fill('').map((v, i) => {
        let _year = year;
        let _month = month;

        if (month === 11) {
            _year = year + 1;
            _month = -1;
        }
        return {
            day: new Date(_year, _month === 11 ? 0 : _month + 1, 1 + i).getDate(),
            name: new Date(_year, _month === 11 ? 0 : _month + 1, 1 + i)
                .toLocaleString('es-ES', { weekday: 'short' })
                .slice(0, -1),
            date: new Date(_year, _month === 11 ? 0 : _month + 1, 1 + i).getTime(),
        };
    });

    const middleWeeks = getDaysOfMonth(month, year).map((v, i) => {
        return {
            day: v.getDate(),
            name: v.toLocaleString('es-ES', { weekday: 'short' }).slice(0, -1),
            date: v.getTime(),
        };
    });

    const dias = [...firstWeek.reverse().concat(middleWeeks, lastWeek)];
    return dias;
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
    const formulario1 = document.getElementById('formulario__paso1');
    const paso1 = document.getElementById('registroPaso1');
    const paso2 = document.getElementById('registroPaso2');
    formRegistro.checkValidity();
    if (formRegistro.checkValidity()) {
        e.preventDefault();
        document.getElementById('userName').required = true;
        document.getElementById('userSurnames').required = true;
        formulario1.classList.add('step2');
        paso1.classList.remove('registro__pasos__paso-active');
        paso2.classList.add('registro__pasos__paso-active');
    }
};

export const registerGoToStep3 = (e) => {
    const formRegistro = document.getElementById('formRegistro');
    const formulario1 = document.getElementById('formulario__paso1');
    const paso2 = document.getElementById('registroPaso2');
    const paso3 = document.getElementById('registroPaso3');
    formRegistro.checkValidity();
    if (formRegistro.checkValidity()) {
        e.preventDefault();
        document.getElementById('userAddress').required = true;
        document.getElementById('userPostalCode').required = true;
        document.getElementById('userEmail').required = true;
        formulario1.classList.add('step3');
        paso2.classList.remove('registro__pasos__paso-active');
        paso3.classList.add('registro__pasos__paso-active');
    }
};

export const registerBackToStep2 = (e) => {
    const formRegistro = document.getElementById('formRegistro');
    const formulario = document.getElementById('formulario__paso1');
    const paso2 = document.getElementById('registroPaso2');
    const paso3 = document.getElementById('registroPaso3');
    document.getElementById('userAddress').required = false;
    document.getElementById('userPostalCode').required = false;
    document.getElementById('userEmail').required = false;
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
    document.getElementById('userName').required = false;
    document.getElementById('userSurnames').required = false;
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

export const incrementDay = () => {
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    fechaSelected.setDate(fechaSelected.getDate() + 1);
    sessionStorage.setItem('RVfechaSelected', fechaSelected);
    document.getElementById('asrFechaDDMMYYYY').textContent = fechaSelected.toLocaleDateString(
        'es-ES',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }
    );
    document.getElementById(
        'asrFechaNombreDia'
    ).textContent = fechaSelected.toLocaleDateString('es-ES', { weekday: 'long' });
};

export const decreaseDay = () => {
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    fechaSelected.setDate(fechaSelected.getDate() + -1);
    sessionStorage.setItem('RVfechaSelected', fechaSelected);
    document.getElementById('asrFechaDDMMYYYY').textContent = fechaSelected.toLocaleDateString(
        'es-ES',
        {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }
    );
    document.getElementById(
        'asrFechaNombreDia'
    ).textContent = fechaSelected.toLocaleDateString('es-ES', { weekday: 'long' });
};

export const showNameMonth = (fechaSelected) => {
    document.getElementById(
        'asrFechaNombreDia'
    ).textContent = fechaSelected.toLocaleDateString('es-ES', { month: 'long' });
    document.getElementById(
        'asrFechaDDMMYYYY'
    ).textContent = fechaSelected.toLocaleDateString('es-ES', { year: 'numeric' });
};

export const incrementMonth = () => {
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    fechaSelected.setMonth(fechaSelected.getMonth() + 1);
    sessionStorage.setItem('RVfechaSelected', fechaSelected);
    showNameMonth(fechaSelected);
};

export const decreaseMonth = () => {
    const fechaSelected = new Date(sessionStorage.getItem('RVfechaSelected'));
    fechaSelected.setMonth(fechaSelected.getMonth() - 1);
    sessionStorage.setItem('RVfechaSelected', fechaSelected);
    showNameMonth(fechaSelected);
};

export const showDayAlreadySelected = () => {
    const daySelected = new Date(sessionStorage.getItem('RVdaySelected')).getTime();
    const daySelectedInMonth = [...document.querySelectorAll('.acr__day')].filter(
        (day) => Number(day.id) === daySelected
    )[0];
    if (daySelectedInMonth) daySelectedInMonth.classList.add('acrActive');
};
