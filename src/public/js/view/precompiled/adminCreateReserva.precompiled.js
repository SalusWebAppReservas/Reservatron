(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['adminCreateReserva.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "    <div id="
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":19,"column":12},"end":{"line":19,"column":20}}}) : helper)))
    + " class=\"acr__day\">\r\n        <p class=\"acr__day__number\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"day") || (depth0 != null ? lookupProperty(depth0,"day") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"day","hash":{},"data":data,"loc":{"start":{"line":20,"column":36},"end":{"line":20,"column":43}}}) : helper)))
    + "</p>\r\n        <p class=\"acr__day__name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":21,"column":34},"end":{"line":21,"column":42}}}) : helper)))
    + "</p>\r\n    </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"css/adminCreateReserva.css\">\r\n\r\n<div class=\"acr__titulo\">\r\n    <h1>Nueva Reserva</h1>\r\n    <p id=\"nombreDia\">Selecciona un día</p>\r\n</div>\r\n\r\n<div class=\"acr__fecha\">\r\n    <i id=\"acrBtnBack\" class=\"icon-back\"></i>\r\n    <div class=\"acr__fecha__diaMes\">\r\n        <p id=\"asrFechaNombreDia\"></p>\r\n        <p id=\"asrFechaDDMMYYYY\"></p>\r\n    </div>\r\n    <i id=\"acrBtnNext\" class=\"icon-next\"></i>\r\n</div>\r\n\r\n<div id=\"acrCalendar\" class=\"acr__mes__container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"dias") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":4},"end":{"line":23,"column":13}}})) != null ? stack1 : "")
    + "</div>\r\n\r\n<div class=\"acr__form\">\r\n    <div class=\"acr__form__titulo\">\r\n        <h2>Cliente</h2>\r\n        <input type=\"text\" name=\"clientName\" id=\"clientName\" placeholder=\"clientName\">\r\n        <i class=\"icon-new\"></i>\r\n    </div>\r\n    <h3>Notas</h3>\r\n    <textarea name=\"comments\" id=\"formComments\" cols=\"30\" rows=\"10\"\r\n        placeholder=\"Algo importante que queramos anotar sobre la reserva?\"></textarea>\r\n    <div class=\"acr__form__colores\">\r\n        <div class=\"colores\">Color1</div>\r\n        <div class=\"colores\">Color2</div>\r\n        <div class=\"colores\">Color3</div>\r\n        <div class=\"colores\">Color4</div>\r\n    </div>\r\n    <div class=\"acr__form__horaContainer\">\r\n        <div class=\"acr__form__horaContainer__titulo\">\r\n            <p>time</p>\r\n            <i class=\"icon-calendar-full\"></i>\r\n        </div>\r\n        <div class=\"acr__form__horaContainer__hora\">\r\n            <p>13:00</p>\r\n        </div>\r\n    </div>\r\n    <div class=\"acr__form__button\">\r\n        <p>Crear Reserva</p>\r\n    </div>\r\n</div>";
},"useData":true});
})();