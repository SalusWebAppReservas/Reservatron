(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['adminReservasDay.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"asr__citas__itemContainer\" data-serviceID="
    + alias4(((helper = (helper = lookupProperty(helpers,"serviceID") || (depth0 != null ? lookupProperty(depth0,"serviceID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serviceID","hash":{},"data":data,"loc":{"start":{"line":2,"column":54},"end":{"line":2,"column":67}}}) : helper)))
    + " data-userID="
    + alias4(((helper = (helper = lookupProperty(helpers,"userID") || (depth0 != null ? lookupProperty(depth0,"userID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userID","hash":{},"data":data,"loc":{"start":{"line":2,"column":80},"end":{"line":2,"column":90}}}) : helper)))
    + ">\r\n    <div class=\"asr__citas__item\">\r\n        <div class=\"asr__citas__item__citaNombre\">\r\n            <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"serviceName") || (depth0 != null ? lookupProperty(depth0,"serviceName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"serviceName","hash":{},"data":data,"loc":{"start":{"line":5,"column":15},"end":{"line":5,"column":30}}}) : helper)))
    + "</p>\r\n        </div>\r\n        <div class=\"asr__citas__item__texto\">\r\n            <p class=\"asr__citas__item__texto__nombre\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"userName") || (depth0 != null ? lookupProperty(depth0,"userName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userName","hash":{},"data":data,"loc":{"start":{"line":8,"column":55},"end":{"line":8,"column":67}}}) : helper)))
    + " "
    + alias4(((helper = (helper = lookupProperty(helpers,"userSurnames") || (depth0 != null ? lookupProperty(depth0,"userSurnames") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userSurnames","hash":{},"data":data,"loc":{"start":{"line":8,"column":68},"end":{"line":8,"column":84}}}) : helper)))
    + "</p>\r\n            <div class=\"asr__citas__item__texto__diaIconosContainer\">\r\n                <div class=\"asr__citas__item__texto__diaIconosContainer-left\">\r\n                    <div class=\"asr__citas__item__texto__diaContainer first\">\r\n                        <i class=\"icon-calendar-check\"></i>\r\n                        <p class=\"asr__citas__item__texto__dia\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"day") || (depth0 != null ? lookupProperty(depth0,"day") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"day","hash":{},"data":data,"loc":{"start":{"line":13,"column":64},"end":{"line":13,"column":71}}}) : helper)))
    + "</p>\r\n                    </div>\r\n                    <div class=\"asr__citas__item__texto__diaContainer\">\r\n                        <i class=\"icon-clock\"></i>\r\n                        <p class=\"asr__citas__item__texto__dia\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"time") || (depth0 != null ? lookupProperty(depth0,"time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data,"loc":{"start":{"line":17,"column":64},"end":{"line":17,"column":72}}}) : helper)))
    + "</p>\r\n                    </div>\r\n                </div>\r\n                <div class=\"asr__citas__item__showMoreDetails\">\r\n                    <i class=\"icon-double-down\"></i>\r\n                </div>\r\n                <div class=\"asr__citas__item__texto__diaIconosContainer-right\">\r\n                    <i class=\"icon-new\"></i>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <div class=\"asr__citas__item__details\">\r\n\r\n            <div class=\"asr__citas__item__details__comentario\">\r\n                <p>Comentario del cliente</p>\r\n                <textarea name=\"\" id=\"\" readonly>"
    + alias4(((helper = (helper = lookupProperty(helpers,"comments") || (depth0 != null ? lookupProperty(depth0,"comments") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"comments","hash":{},"data":data,"loc":{"start":{"line":32,"column":49},"end":{"line":32,"column":61}}}) : helper)))
    + "</textarea>\r\n            </div>\r\n            <div class=\"asr__citas__item__details__pushNotification\">\r\n                <p>Mensaje para cliente</p>\r\n                <textarea class=\"asr__textarea__pushNotification\" name=\"\" id=\"\"\r\n                    placeholder=\"Escriba mensaje para enviar notifiación al cliente\"></textarea>\r\n                <div class=\"ars__citas__item__notificacion__buttons\">\r\n                    <button class=\"asr__btn__send__notification asr__citas__item__buttonPush\"\r\n                        data-userID="
    + alias4(((helper = (helper = lookupProperty(helpers,"userID") || (depth0 != null ? lookupProperty(depth0,"userID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userID","hash":{},"data":data,"loc":{"start":{"line":40,"column":36},"end":{"line":40,"column":46}}}) : helper)))
    + ">Enviar por notificacion\r\n                        push</button>\r\n                    <button class=\"asr__btn__send__notification asr__citas__item__buttonEmail\"\r\n                        data-userID="
    + alias4(((helper = (helper = lookupProperty(helpers,"userID") || (depth0 != null ? lookupProperty(depth0,"userID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userID","hash":{},"data":data,"loc":{"start":{"line":43,"column":36},"end":{"line":43,"column":46}}}) : helper)))
    + ">Enviar por email</button>\r\n                </div>\r\n            </div>\r\n            <div class=\"asr__citas__item__details__buttons__crud\">\r\n                <button class=\"idButtonsDeleteModify asr__citas__item__buttonDelete\"\r\n                    data-reservation_id="
    + alias4(((helper = (helper = lookupProperty(helpers,"reservationID") || (depth0 != null ? lookupProperty(depth0,"reservationID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reservationID","hash":{},"data":data,"loc":{"start":{"line":48,"column":40},"end":{"line":48,"column":57}}}) : helper)))
    + " data-name=\"delete\">Borrar\r\n                    Cita</button>\r\n                <button class=\"idButtonsDeleteModify asr__citas__item__buttonModify\"\r\n                    data-reservation_id="
    + alias4(((helper = (helper = lookupProperty(helpers,"reservationID") || (depth0 != null ? lookupProperty(depth0,"reservationID") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reservationID","hash":{},"data":data,"loc":{"start":{"line":51,"column":40},"end":{"line":51,"column":57}}}) : helper)))
    + " data-name=\"modify\">Modificar\r\n                    Cita</button>\r\n            </div>\r\n            <div class=\"asr__citas__item__showLessDetails\">\r\n                <i class=\"icon-double-up\"></i>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n</div>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"reserva") : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":1,"column":0},"end":{"line":62,"column":9}}})) != null ? stack1 : "");
},"useData":true});
})();