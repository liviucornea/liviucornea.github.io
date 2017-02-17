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
var routerLink_1 = require('../../directives/routerLink/routerLink');
var user_1 = require('./user/user');
var role_1 = require('./role/role');
var resource_1 = require('./resource/resource');
var roleresource_1 = require('./roleResource/roleresource');
var userrole_1 = require('./userRole/userrole');
var navbarvert_1 = require('../../components/navbarVert/navbarvert');
var Auth = (function () {
    function Auth() {
        var roles = [
            'auth'
        ];
        this.navContent = [
            new navbarvert_1.NavItem('User', ['Auth', 'User'], '/user', roles, [
                new navbarvert_1.NavItem('Role', ['Auth', 'UserRole'], '/userrole', roles),
            ]),
            new navbarvert_1.NavItem('Role', ['Auth', 'Role'], '/role', roles, [
                new navbarvert_1.NavItem('Resource', ['Auth', 'RoleResource'], '/roleresource', roles),
            ]),
            new navbarvert_1.NavItem('Resource', ['Auth', 'Resource'], '/resource', roles)
        ];
    }
    Auth = __decorate([
        router_1.RouteConfig([
            { name: 'Default', path: '/', redirectTo: ['User'] },
            { name: 'User', path: '/user', component: user_1.AuthUser },
            { name: 'Role', path: '/role', component: role_1.AuthRole },
            { name: 'Resource', path: '/resource', component: resource_1.AuthResource },
            { name: 'RoleResource', path: '/roleresource', component: roleresource_1.AuthRoleResource },
            { name: 'UserRole', path: '/userrole', component: userrole_1.AuthUserRole },
        ]),
        core_1.Component({
            selector: 'auth',
            templateUrl: '../..//routes/auth/auth.html',
            directives: [routerLink_1.CustomRouterLink, router_1.RouterOutlet, navbarvert_1.NavBarVert],
        }), 
        __metadata('design:paramtypes', [])
    ], Auth);
    return Auth;
}());
exports.Auth = Auth;
//# sourceMappingURL=auth.js.map