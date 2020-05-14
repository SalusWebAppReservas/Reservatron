const login = document.getElementById('mainLogin');
const register = document.getElementById('mainRegister');
const contenedor = document.getElementById('contenedor');

const showStepTwo = () => {
    formPaso1.classList.add('step2');
};

const showStepThree = () => {
    formPaso1.classList.add('step2');
};

const renderLogin = (e) => {
    e.preventDefault();
    contenedor.innerHTML = Handlebars.templates['login.hbs']();
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', sendLoginUser);
};
const renderRegister = (e) => {
    e.preventDefault();
    contenedor.innerHTML = Handlebars.templates['userRegistration.hbs']();
    const btnSiguiente1 = document.getElementById('btnFormulario__siguiente1');
    const btnSiguiente2 = document.getElementById('btnFormulario__siguiente2');
    const formPaso1 = document.getElementById('formulario__paso1');
    const btnCreateAccount = document.getElementById('btnCreateAccount');
    btnSiguiente1.addEventListener('click', () => formPaso1.classList.add('step2'));
    btnSiguiente2.addEventListener('click', () => formPaso1.classList.add('step3'));
    btnCreateAccount.addEventListener('click', verifyUserBySMS);
};

login.addEventListener('click', renderLogin);
register.addEventListener('click', renderRegister);
