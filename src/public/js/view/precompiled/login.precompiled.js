(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<link rel=\"stylesheet\" href=\"css/login.css\">\r\n<form id=\"loginForm\" action=\"#\">\r\n    <div class=\"login__container\">\r\n        <div class=\"login__LogoContainer\">\r\n            <img id=\"logoHome\" class=\"login__logo\" src=\"img/logo.png\" alt=\"\">\r\n        </div>\r\n        <div id=\"loginContainer\" class=\"loginContainer__subContainerForm\">\r\n            <div class=\"login__form\">\r\n                <input id=\"user\" type=\"text\" placeholder=\"Introduce Usuario\" required>\r\n                <input id=\"password\" type=\"password\" placeholder=\"Contraseña\" required>\r\n                <p class=\"login__error\">Usuario o contraseña incorrectos</p>\r\n                <button id=\"btnLogin\">Iniciar sesión</button>\r\n                <p class=\"login__options\">o puedes usar:</p>\r\n                <div id=\"firebaseui-login\"></div>\r\n            </div>\r\n        </div>\r\n\r\n</form>\r\n\r\n</div>\r\n\r\n\r\n\r\n<script src=\"js/login.js\"></script>";
},"useData":true});
})();