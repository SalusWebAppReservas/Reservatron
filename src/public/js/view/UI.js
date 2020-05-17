import './plugins/handlebars.runtime-v4.7.6.js';
import './precompiled/home.precompiled.js';
import './precompiled/login.precompiled.js';
import './precompiled/userRegistration.precompiled.js';
import './precompiled/adminShowReservas.precompiled.js';

export const homeTemplate = () => Handlebars.templates['home.hbs']();
export const loginTemplate = () => Handlebars.templates['login.hbs']();
export const userRegistrationTemplate = () => Handlebars.templates['userRegistration.hbs']();

export const adminShowReservasTemplate = () => Handlebars.templates['adminShowReservas.hbs']();

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
