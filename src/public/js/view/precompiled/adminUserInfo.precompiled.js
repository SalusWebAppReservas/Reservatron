(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['adminUserInfo.hbs'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<link rel=\"stylesheet\" href=\"css/adminUserInfo.css\">\r\n<div class=\"aui__container\">\r\n    <div class=\"aui\">\r\n        <div class=\"aui__close\">\r\n            <button id=\"btnClose\">X</button>\r\n        </div>\r\n        <div class=\"aui__image\">\r\n            <i class=\"icon-user\"></i>\r\n        </div>\r\n        <div class=\"aui__data\">\r\n            <div class=\"aui__campo\">\r\n                <p>Nombre</p>\r\n                <p>Apellidos</p>\r\n                <p>Dirección</p>\r\n                <p>C.P.</p>\r\n                <p>Teléfono</p>\r\n                <p>Email</p>\r\n                <p>Alta</p>\r\n            </div>\r\n            <div class=\"aui__valores\">\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"username") || (depth0 != null ? lookupProperty(depth0,"username") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data,"loc":{"start":{"line":21,"column":19},"end":{"line":21,"column":31}}}) : helper)))
    + "</p>\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"usersurnames") || (depth0 != null ? lookupProperty(depth0,"usersurnames") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"usersurnames","hash":{},"data":data,"loc":{"start":{"line":22,"column":19},"end":{"line":22,"column":35}}}) : helper)))
    + "</p>\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"useraddress") || (depth0 != null ? lookupProperty(depth0,"useraddress") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"useraddress","hash":{},"data":data,"loc":{"start":{"line":23,"column":19},"end":{"line":23,"column":34}}}) : helper)))
    + "</p>\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"userpostalcode") || (depth0 != null ? lookupProperty(depth0,"userpostalcode") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userpostalcode","hash":{},"data":data,"loc":{"start":{"line":24,"column":19},"end":{"line":24,"column":37}}}) : helper)))
    + "</p>\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"userphone") || (depth0 != null ? lookupProperty(depth0,"userphone") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"userphone","hash":{},"data":data,"loc":{"start":{"line":25,"column":19},"end":{"line":25,"column":32}}}) : helper)))
    + "</p>\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"useremail") || (depth0 != null ? lookupProperty(depth0,"useremail") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"useremail","hash":{},"data":data,"loc":{"start":{"line":26,"column":19},"end":{"line":26,"column":32}}}) : helper)))
    + "</p>\r\n                <p>"
    + alias4(((helper = (helper = lookupProperty(helpers,"created") || (depth0 != null ? lookupProperty(depth0,"created") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"created","hash":{},"data":data,"loc":{"start":{"line":27,"column":19},"end":{"line":27,"column":30}}}) : helper)))
    + "</p>\r\n            </div>\r\n        </div>\r\n\r\n    </div>\r\n</div>";
},"useData":true});
})();