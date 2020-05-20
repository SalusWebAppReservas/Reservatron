import './plugins/handlebars.runtime-v4.7.6.js';
import './precompiled/home.precompiled.js';
import './precompiled/login.precompiled.js';
import './precompiled/userRegistration.precompiled.js';
import './precompiled/adminShowReservas.precompiled.js';

export const homeTemplate = () => Handlebars.templates['home.hbs']();
export const loginTemplate = () => Handlebars.templates['login.hbs']();
export const userRegistrationTemplate = () => Handlebars.templates['userRegistration.hbs']();
export const adminShowReservasTemplate = (reserva) => Handlebars.templates['adminShowReservas.hbs']({ reserva });

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
