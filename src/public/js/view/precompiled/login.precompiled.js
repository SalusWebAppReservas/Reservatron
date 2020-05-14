(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<input id=\"user\" type=\"text\" placeholder=\"Introduce Usuario\">\r\n<input id=\"password\" type=\"text\" placeholder=\"Contraseña\">\r\n<button id=\"btnLogin\">Log In</button>\r\n\r\n\r\n<script src=\"js/login.js\"></script>";
},"useData":true});
})();