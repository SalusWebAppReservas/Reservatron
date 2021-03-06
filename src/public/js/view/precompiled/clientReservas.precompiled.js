(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['clientReservas.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div id="
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":19,"column":16},"end":{"line":19,"column":24}}}) : helper)))
    + " class=\"acr__day\">\r\n            <p class=\"acr__day__number\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"day") || (depth0 != null ? lookupProperty(depth0,"day") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"day","hash":{},"data":data,"loc":{"start":{"line":20,"column":40},"end":{"line":20,"column":47}}}) : helper)))
    + "</p>\r\n            <p class=\"acr__day__name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":21,"column":38},"end":{"line":21,"column":46}}}) : helper)))
    + "</p>\r\n        </div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"css/clientReservas.css\">\r\n<div class=\"acr\">\r\n    <div class=\"acr__titulo\">\r\n        <h1>Mis Reservas</h1>\r\n        <p id=\"nombreDia\">Selecciona un día</p>\r\n    </div>\r\n\r\n    <div class=\"acr__fecha\">\r\n        <i id=\"acrBtnBack\" class=\"icon-back\"></i>\r\n        <div class=\"acr__fecha__diaMes\">\r\n            <p id=\"asrFechaNombreDia\"></p>\r\n            <p id=\"asrFechaDDMMYYYY\"></p>\r\n        </div>\r\n        <i id=\"acrBtnNext\" class=\"icon-next\"></i>\r\n    </div>\r\n\r\n    <div id=\"acrCalendar\" class=\"acr__mes__container\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"dias") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":18,"column":8},"end":{"line":23,"column":17}}})) != null ? stack1 : "")
    + "    </div>\r\n    <div id=\"asCitas\"></div>\r\n</div>";
},"useData":true});
})();