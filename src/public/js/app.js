const login = document.getElementById('mainLogin');
const register = document.getElementById('mainRegister');
const contenedor = document.getElementById('contenedor');

const renderLogin = (e) => {
    e.preventDefault();
    contenedor.innerHTML = Handlebars.templates['login.hbs']();
    const btnLogin = document.getElementById('btnLogin');
    btnLogin.addEventListener('click', sendLoginUser);
};
const renderRegister = (e) => {
    e.preventDefault();
    contenedor.innerHTML = Handlebars.templates['userRegistration.hbs']();
    const btnCreateAccount = document.getElementById('btnCreateAccount');
    btnCreateAccount.addEventListener('click', verifyUserBySMS);
};

login.addEventListener('click', renderLogin);
register.addEventListener('click', renderRegister);
