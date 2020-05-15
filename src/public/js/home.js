// Ojo, modificada linea 36 en handlebars.js porque usando imports se usa strict mode
// added (|| window) to 'this' porque en strict mode 'this' no puede acceder a 'window'.

import { homeTemplate, loginTemplate, userRegistrationTemplate } from './view/UI.js';
import verifyUserBySMS from './userRegistration.js';
import { verifyLoginUser, sendLoginUser } from './login.js';

const login = document.getElementById('mainLogin');
const register = document.getElementById('btnRegister');
const contenedor = document.getElementById('contenedor');
const logoHome = document.getElementById('logoHome');

const showStepTwo = () => {
    formPaso1.classList.add('step2');
};

const showStepThree = () => {
    formPaso1.classList.add('step2');
};

const renderHome = () => {
    contenedor.innerHTML = homeTemplate();
    const register = document.getElementById('btnRegister');
    register.addEventListener('click', renderRegister);
};

const renderLogin = (e) => {
    contenedor.innerHTML = loginTemplate();
    e.preventDefault();
    verifyLoginUser();
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', sendLoginUser);
};
const renderRegister = (e) => {
    e.preventDefault();
    contenedor.innerHTML = userRegistrationTemplate();
    const btnSiguiente1 = document.getElementById('btnFormulario__siguiente1');
    const btnSiguiente2 = document.getElementById('btnFormulario__siguiente2');
    const formPaso1 = document.getElementById('formulario__paso1');
    const btnCreateAccount = document.getElementById('btnCreateAccount');
    btnSiguiente1.addEventListener('click', () => formPaso1.classList.add('step2'));
    btnSiguiente2.addEventListener('click', () => formPaso1.classList.add('step3'));
    btnCreateAccount.addEventListener('click', verifyUserBySMS);
};

login.addEventListener('click', renderLogin);
logoHome.addEventListener('click', renderHome);
register.addEventListener('click', renderRegister);
