import './plugins/handlebars.runtime-v4.7.6.js';
import './precompiled/home.precompiled.js';
import './precompiled/login.precompiled.js';
import './precompiled/userRegistration.precompiled.js';

export const homeTemplate = () => Handlebars.templates['home.hbs']();
export const loginTemplate = () => Handlebars.templates['login.hbs']();
export const userRegistrationTemplate = () => Handlebars.templates['userRegistration.hbs']();
