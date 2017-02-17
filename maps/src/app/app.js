"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var navbar_1 = require('./components/navbar/navbar');
var alert_1 = require('./services/alert/alert');
// Routes + Components
var home_1 = require('./routes/home/home');
var contact_1 = require('./routes/contact/contact');
var nlogInstances_1 = require('./routes/logs/nlogInstances');
var nlogInstance_1 = require('./routes/log/nlogInstance');
var test_1 = require('./routes/test/test');
var auth_1 = require('./routes/auth/auth');
var noauth_1 = require('./routes/noAuth/noauth');
var App = (function () {
    function App(alert, router) {
        this.alert = alert;
        this.router = router;
    }
    App = __decorate([
        router_1.RouteConfig([
            { name: 'Default', path: '/', redirectTo: ['Home'] },
            { name: 'Home', path: '/home', component: home_1.Home },
            { name: 'Contact', path: '/contact', component: contact_1.Contact },
            { name: 'Logs', path: '/logs', component: nlogInstances_1.NlogInstances },
            { name: 'Log', path: '/log/:instanceId', component: nlogInstance_1.NlogInstance },
            { name: 'Auth', path: '/auth/...', component: auth_1.Auth },
            { name: 'NoAuth', path: '/noauth', component: noauth_1.NoAuth },
            { name: 'Test', path: '/test', component: test_1.Test },
        ]),
        core_1.Component({
            selector: 'my-app',
            templateUrl: 'app/app.html',
            directives: [router_1.RouterOutlet, ng2_bootstrap_1.Alert, navbar_1.NavBar],
        }), 
        __metadata('design:paramtypes', [alert_1.AlertService, (typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], App);
    return App;
    var _a;
}());
exports.App = App;
//# sourceMappingURL=app.js.map