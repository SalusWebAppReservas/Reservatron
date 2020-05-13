const url = window.location.href;
const btnLogin = document.getElementById('btnLogin');

const showLoginResult = async (isLoginOk) => {
    const { user, userID } = await isLoginOk.json();
    if (userID) alert('Login correcto. Falta redireccionar');
    if (user) alert('Password incorrecto');
    else alert('Usuario no existe');
};
const sendLoginUser = async () => {
    const user = document.getElementById('user').value;
    const password = document.getElementById('password').value;

    const login = {
        user,
        password,
    };

    const isLoginOk = await fetch(`${url}loginUser/${login}`);

    showLoginResult(isLoginOk);
};

btnLogin.addEventListener('click', sendLoginUser);
