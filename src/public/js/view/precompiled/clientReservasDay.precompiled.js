(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['clientReservasDay.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"asr__citas__itemContainer\" data-serviceID="
    + alias4(((helper = (helper = lookupProperty(helpers,"serviceID") || (depth0 != null ? lookupProperty(depth0,"serviceID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serviceID","hash":{},"data":data,"loc":{"start":{"line":3,"column":54},"end":{"line":3,"column":67}}}) : helper)))
    + " data-userID="
    + alias4(((helper = (helper = lookupProperty(helpers,"userID") || (depth0 != null ? lookupProperty(depth0,"userID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userID","hash":{},"data":data,"loc":{"start":{"line":3,"column":80},"end":{"line":3,"column":90}}}) : helper)))
    + ">\r\n    <div class=\"asr__citas__item\">\r\n        <div class=\"asr__citas__item__citaNombre "
    + alias4(((helper = (helper = lookupProperty(helpers,"color") || (depth0 != null ? lookupProperty(depth0,"color") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"color","hash":{},"data":data,"loc":{"start":{"line":5,"column":49},"end":{"line":5,"column":58}}}) : helper)))
    + "\">\r\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"serviceName") || (depth0 != null ? lookupProperty(depth0,"serviceName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serviceName","hash":{},"data":data,"loc":{"start":{"line":6,"column":15},"end":{"line":6,"column":30}}}) : helper)))
    + "</p>\r\n        </div>\r\n        <div class=\"asr__citas__item__texto\">\r\n            <div class=\"asr__citas__item__texto__diaIconosContainer\">\r\n                <div class=\"asr__citas__item__texto__diaIconosContainer-left\">\r\n                    <div class=\"asr__citas__item__texto__diaContainer first\">\r\n                        <i class=\"icon-calendar-check\"></i>\r\n                        <p class=\"asr__citas__item__texto__dia\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"day") || (depth0 != null ? lookupProperty(depth0,"day") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"day","hash":{},"data":data,"loc":{"start":{"line":14,"column":64},"end":{"line":14,"column":71}}}) : helper)))
    + "</p>\r\n                    </div>\r\n                    <div class=\"asr__citas__item__texto__diaContainer\">\r\n                        <i class=\"icon-clock\"></i>\r\n                        <p class=\"asr__citas__item__texto__dia\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":18,"column":64},"end":{"line":18,"column":72}}}) : helper)))
    + "</p>\r\n                    </div>\r\n                </div>\r\n\r\n                <div class=\"asr__citas__item__texto__diaIconosContainer-right\">\r\n                    <i class=\"icon-modify\" data-reservation_id="
    + alias4(((helper = (helper = lookupProperty(helpers,"reservationID") || (depth0 != null ? lookupProperty(depth0,"reservationID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reservationID","hash":{},"data":data,"loc":{"start":{"line":23,"column":63},"end":{"line":23,"column":80}}}) : helper)))
    + " data-date="
    + alias4(((helper = (helper = lookupProperty(helpers,"date") || (depth0 != null ? lookupProperty(depth0,"date") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data,"loc":{"start":{"line":23,"column":91},"end":{"line":23,"column":99}}}) : helper)))
    + "></i>\r\n                    <i class=\"icon-calendar-delete\" data-reservation_id="
    + alias4(((helper = (helper = lookupProperty(helpers,"reservationID") || (depth0 != null ? lookupProperty(depth0,"reservationID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reservationID","hash":{},"data":data,"loc":{"start":{"line":24,"column":72},"end":{"line":24,"column":89}}}) : helper)))
    + "></i>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"css/clientReservasDay.css\">\r\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"reserva") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":2,"column":0},"end":{"line":30,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();