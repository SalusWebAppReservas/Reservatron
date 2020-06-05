(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['adminChart.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"css/adminChart.css\">\r\n<div class=\"ac__container\">\r\n    <div class=\"ac\">\r\n        <h2>Estadística anual</h2>\r\n        <div class=\"ac__year\">\r\n            <i id=\"btnBack\" class=\"icon-back\"></i>\r\n            <h3>"
    + alias4(((helper = (helper = lookupProperty(helpers,"year") || (depth0 != null ? lookupProperty(depth0,"year") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"year","hash":{},"data":data,"loc":{"start":{"line":7,"column":16},"end":{"line":7,"column":24}}}) : helper)))
    + "</h3>\r\n            <i id=\"btnNext\" class=\"icon-next\"></i>\r\n        </div>\r\n\r\n        <canvas id=\"chartContainer\" class=\"ac__chart\"></canvas>\r\n        <div class=\"ac__totales\">\r\n            <p>Usuarios registrados <br> año "
    + alias4(((helper = (helper = lookupProperty(helpers,"year") || (depth0 != null ? lookupProperty(depth0,"year") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"year","hash":{},"data":data,"loc":{"start":{"line":13,"column":45},"end":{"line":13,"column":53}}}) : helper)))
    + " <br> <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalUsers") || (depth0 != null ? lookupProperty(depth0,"totalUsers") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalUsers","hash":{},"data":data,"loc":{"start":{"line":13,"column":65},"end":{"line":13,"column":79}}}) : helper)))
    + "</span></p>\r\n            <p>Reservas realizadas<br>año "
    + alias4(((helper = (helper = lookupProperty(helpers,"year") || (depth0 != null ? lookupProperty(depth0,"year") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"year","hash":{},"data":data,"loc":{"start":{"line":14,"column":42},"end":{"line":14,"column":50}}}) : helper)))
    + "<br> <span>"
    + alias4(((helper = (helper = lookupProperty(helpers,"totalReservas") || (depth0 != null ? lookupProperty(depth0,"totalReservas") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalReservas","hash":{},"data":data,"loc":{"start":{"line":14,"column":61},"end":{"line":14,"column":78}}}) : helper)))
    + "</span></p>\r\n        </div>\r\n    </div>\r\n</div>";
},"useData":true});
})();