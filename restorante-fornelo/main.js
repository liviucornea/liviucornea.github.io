(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _home_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home/home.component */ "./src/app/home/home/home.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: 'home',
        component: _home_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n\n<div class=\"wrap\">\n  <app-header></app-header>\n  <app-presentation></app-presentation>\n  <main>\n    <router-outlet></router-outlet>\n  </main>\n  <app-footer></app-footer>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".wrap {\n  flex: 1; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.title = 'app';
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _home_home_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.module */ "./src/app/home/home.module.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _shared_module_shared_module_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared-module/shared-module.module */ "./src/app/shared-module/shared-module.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _home_home_module__WEBPACK_IMPORTED_MODULE_3__["HomeModule"].forRoot(),
                _shared_module_shared_module_module__WEBPACK_IMPORTED_MODULE_5__["SharedModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_4__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home/home.component.ts");
/* harmony import */ var _shared_module_shared_module_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared-module/shared-module.module */ "./src/app/shared-module/shared-module.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule_1 = HomeModule;
    HomeModule.forRoot = function () {
        return {
            ngModule: HomeModule_1,
            providers: []
        };
    };
    HomeModule = HomeModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _shared_module_shared_module_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
            ],
            declarations: [_home_home_component__WEBPACK_IMPORTED_MODULE_2__["HomeComponent"]]
        })
    ], HomeModule);
    return HomeModule;
    var HomeModule_1;
}());



/***/ }),

/***/ "./src/app/home/home/home.component.html":
/*!***********************************************!*\
  !*** ./src/app/home/home/home.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <div class=\"col-md-12\">\n      <app-card-list>\n        <app-card header=\"Fichipizza\" side=\"Our Unique Culinary Creations\">\n          <ng-template appCardContent>\n            A unique combination of Mediterranean and Italian pizza, topped with Mascarphone, proscuitto, figs, grando\n            panado,\n            honey and arugula.\n          </ng-template>\n        </app-card>\n\n        <app-card header=\"Weekend Grand Buffet\" side=\"This Month's Promotions\">\n          <ng-template appCardContent>\n            Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six\n            main\n            entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person\n          </ng-template>\n        </app-card>\n\n        <app-card header=\"Tommy McHugh\" side=\"Meet our Culinary Specialists\">\n          <ng-template appCardContent>\n            <h3>Executive Chef</h3>\n            Award winning three-star Michelin chef with wide International experience having worked closely with\n            whos-who in\n            the culinary world, he specializes in creating mouthwatering Mediterranean-Italian experiences.\n          </ng-template>\n        </app-card>\n      </app-card-list>\n    </div>\n  </div>\n\n  <div class=\"row\" fragment=\"menu\" #menu>\n    <div class=\"col-md-12\">\n    </div>\n  </div>\n</div>\n\n"

/***/ }),

/***/ "./src/app/home/home/home.component.scss":
/*!***********************************************!*\
  !*** ./src/app/home/home/home.component.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/home/home/home.component.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home/home.component.ts ***!
  \*********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/shared-module/card-list/card-list.component.html":
/*!******************************************************************!*\
  !*** ./src/app/shared-module/card-list/card-list.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let card of cards; let isEven = even\" class=\"card\">\n  <div class=\"row\">\n    <ng-container *ngTemplateOutlet=\"isEven ? mainTpl : sideTpl;  context: {$implicit: card}\"></ng-container>\n    <ng-container *ngTemplateOutlet=\"isEven ? sideTpl : mainTpl;  context: {$implicit: card}\"></ng-container>\n  </div>\n</div>\n\n<ng-template #sideTpl let-card>\n  <div class=\"col-md-3 col-sm-4\">\n    <h2>{{card.side}}</h2>\n  </div>\n</ng-template>\n\n<ng-template #mainTpl let-card>\n  <div class=\"col-md-9 col-sm-6\">\n    <h2>{{card.header}}</h2>\n    <ng-container [ngTemplateOutlet]=\"card.contentTpl?.templateRef\"></ng-container>\n    <!-- TODO -->\n    <a class=\"more-link\" href=\"#\">More »</a>\n  </div>\n</ng-template>\n\n"

/***/ }),

/***/ "./src/app/shared-module/card-list/card-list.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/shared-module/card-list/card-list.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  border-bottom: 1px solid #eeeeee; }\n\n.card:last-of-type {\n  border-bottom: 0; }\n\n.more-link {\n  display: block; }\n"

/***/ }),

/***/ "./src/app/shared-module/card-list/card-list.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/shared-module/card-list/card-list.component.ts ***!
  \****************************************************************/
/*! exports provided: CardListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardListComponent", function() { return CardListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.component */ "./src/app/shared-module/card-list/card.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CardListComponent = /** @class */ (function () {
    function CardListComponent() {
    }
    CardListComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"])(_card_component__WEBPACK_IMPORTED_MODULE_1__["CardDirective"]),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["QueryList"])
    ], CardListComponent.prototype, "cards", void 0);
    CardListComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-card-list',
            template: __webpack_require__(/*! ./card-list.component.html */ "./src/app/shared-module/card-list/card-list.component.html"),
            styles: [__webpack_require__(/*! ./card-list.component.scss */ "./src/app/shared-module/card-list/card-list.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CardListComponent);
    return CardListComponent;
}());



/***/ }),

/***/ "./src/app/shared-module/card-list/card.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/shared-module/card-list/card.component.ts ***!
  \***********************************************************/
/*! exports provided: CardContentDirective, CardDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardContentDirective", function() { return CardContentDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardDirective", function() { return CardDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CardContentDirective = /** @class */ (function () {
    function CardContentDirective(templateRef) {
        this.templateRef = templateRef;
    }
    CardContentDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({ selector: 'ng-template[appCardContent]' }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]])
    ], CardContentDirective);
    return CardContentDirective;
}());

var CardDirective = /** @class */ (function () {
    function CardDirective() {
    }
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CardDirective.prototype, "header", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], CardDirective.prototype, "side", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"])(CardContentDirective),
        __metadata("design:type", CardContentDirective)
    ], CardDirective.prototype, "contentTpl", void 0);
    CardDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({ selector: 'app-card' })
    ], CardDirective);
    return CardDirective;
}());



/***/ }),

/***/ "./src/app/shared-module/footer/footer.component.html":
/*!************************************************************!*\
  !*** ./src/app/shared-module/footer/footer.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"container\">\n  <div class=\"wrapper\">\n    <div class=\"row\">\n      <div class=\"col-md-3 col-xs-6 center\">\n        <h4>Links </h4>\n        <ul>\n          <li><a routerLink=\"/home\">Home</a></li>\n          <li><a routerLink=\"/about\">About</a></li>\n          <li><a routerLink=\"/home\" fragment=\"menu\">Menu</a></li>\n          <li><a routerLink=\"/contact\">Contact</a></li>\n        </ul>\n      </div>\n      <div class=\"col-md-3 col-xs-6\">\n        <h4>Our Address</h4>\n        <div>\n          214, King Street West\n          Downtown, Toronto\n          ONTARIO\n        </div>\n        <a class=\"tel\" href=\"tel:1-416-1234-5678\"><span class=\"glyphicon glyphicon-earphone\"\n                                                        aria-hidden=\"true\"></span>: +416 1234 5678</a>\n        <div><span class=\"glyphicon glyphicon-briefcase\" aria-hidden=\"true\"></span>: +416 8765 4321</div>\n        <div>\n          <a href=\"mailto:ilfornello@food.net?Subject=Hello\" target=\"_top\">\n            <span class=\"glyphicon glyphicon-envelope\" aria-hidden=\"true\"></span>:\n            ilfornello@food.net\n          </a>\n        </div>\n      </div>\n      <div class=\"col-md-6\">\n        <ul class=\"social\">\n          <li><a href=\"#\"> <i class=\"fa fa-google\"> </i> </a></li>\n          <li><a href=\"#\"> <i class=\"fa fa-facebook\"> </i> </a></li>\n          <li><a href=\"#\"> <i class=\"fa fa-linkedin\"> </i> </a></li>\n          <li><a href=\"#\"> <i class=\"fa fa-twitter\"> </i> </a></li>\n          <li><a href=\"#\"> <i class=\"fa fa-youtube\"> </i> </a></li>\n        </ul>\n      </div>\n    </div>\n\n    <div class=\"row\">\n      <div class=\"col-md-12 copyright\">\n        <div>© Copyright 2015 Ristorante Il Fornello</div>\n      </div>\n    </div>\n  </div>\n</footer>\n"

/***/ }),

/***/ "./src/app/shared-module/footer/footer.component.scss":
/*!************************************************************!*\
  !*** ./src/app/shared-module/footer/footer.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  margin-top: 50px;\n  display: block; }\n\n.wrapper {\n  background-color: #AFAFAF;\n  padding: 20px; }\n\n.tel {\n  color: black;\n  text-decoration: none; }\n\nul {\n  list-style-type: none;\n  padding-left: 0; }\n\n.copyright {\n  margin-top: 15px;\n  text-align: center; }\n\n.links {\n  display: flex;\n  flex-direction: column;\n  align-items: center; }\n\n.fa:hover {\n  opacity: 0.7; }\n\n.fa-facebook {\n  background: #3B5998;\n  color: white; }\n\n.fa-twitter {\n  background: #55ACEE;\n  color: white; }\n\n.fa-google {\n  background: #dd4b39;\n  color: white; }\n\n.fa-linkedin {\n  background: #007bb5;\n  color: white; }\n\n.fa-youtube {\n  background: #bb0000;\n  color: white; }\n\n.fa {\n  padding: 5px;\n  font-size: 25px;\n  width: 30px;\n  text-align: center;\n  text-decoration: none; }\n\n.fa:hover {\n  opacity: 0.7; }\n\n.social {\n  display: table;\n  margin: 0 auto; }\n\n.social li {\n  float: left;\n  margin: 5px; }\n"

/***/ }),

/***/ "./src/app/shared-module/footer/footer.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared-module/footer/footer.component.ts ***!
  \**********************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/shared-module/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.scss */ "./src/app/shared-module/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/shared-module/header/header.component.html":
/*!************************************************************!*\
  !*** ./src/app/shared-module/header/header.component.html ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar navbar-default rf-navbar\">\n  <div class=\"container-fluid\">\n    <div class=\"container\">\n      <!-- Brand and toggle get grouped for better mobile display -->\n      <div class=\"navbar-header\">\n        <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\" aria-expanded=\"false\">\n          <span class=\"sr-only\">Toggle navigation</span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n          <span class=\"icon-bar\"></span>\n        </button>\n        <a class=\"navbar-brand\" href=\"#\">\n          <img alt=\"Brand\" src=\"assets/rf-logo.png\">\n        </a>\n      </div>\n\n      <!-- Collect the nav links, forms, and other content for toggling -->\n      <div class=\"collapse navbar-collapse\" id=\"bs-example-navbar-collapse-1\">\n        <ul class=\"nav navbar-nav\">\n          <li routerLinkActive=\"active\">\n            <a routerLink=\"/home\"><span class=\"glyphicon glyphicon-home\" aria-hidden=\"true\"></span>Home <span class=\"sr-only\">(current)</span></a>\n          </li>\n          <li routerLinkActive=\"active\"><a routerLink=\"/about\"><span class=\"glyphicon glyphicon-info-sign\" aria-hidden=\"true\"></span>About</a></li>\n          <!-- TODO for menu bring ng2-bootstrap -->\n          <li class=\"dropdown\">\n            <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\">Menu <span class=\"caret\"></span></a>\n            <ul class=\"dropdown-menu\">\n              <li><a href=\"#\">Action</a></li>\n              <li><a href=\"#\">Another action</a></li>\n            </ul>\n          </li>\n          <li routerLinkActive=\"active\"><a routerLink=\"/contact\">Contact</a></li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</nav>\n\n"

/***/ }),

/***/ "./src/app/shared-module/header/header.component.scss":
/*!************************************************************!*\
  !*** ./src/app/shared-module/header/header.component.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "img {\n  height: 50px; }\n\n.rf-navbar {\n  background-color: #2F3BA1;\n  color: #9D9D9D;\n  border: 0;\n  border-bottom: 2px solid #181E80;\n  border-radius: 0;\n  margin-bottom: 0; }\n\n.rf-navbar .navbar-brand {\n    padding: 0; }\n\n.rf-navbar .navbar-brand img {\n      height: 50px; }\n\n.rf-navbar .navbar-nav .active a, .rf-navbar .navbar-nav .active a:hover, .rf-navbar .navbar-nav .active a:focus {\n    background-color: #181E80;\n    color: white; }\n\n.rf-navbar .navbar-nav li > a:hover, .rf-navbar .navbar-nav li > a:focus {\n    color: white;\n    background-color: transparent; }\n"

/***/ }),

/***/ "./src/app/shared-module/header/header.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared-module/header/header.component.ts ***!
  \**********************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/shared-module/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.scss */ "./src/app/shared-module/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/shared-module/presentation/presentation.component.html":
/*!************************************************************************!*\
  !*** ./src/app/shared-module/presentation/presentation.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <div class=\"container\">\n    <div class=\"jumbotron rf-jumbotron\">\n      <h1>Ristorante Il Fornello</h1>\n      <div class=\"row\">\n        <p class=\"col-md-8\">\n          Simple, fresh ingredients, prepared and cooked with love and passion become truly great dishes, from\n          wood-oven\n          baked Neapolitan style pizzas to pastas, entrees!\n        </p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/shared-module/presentation/presentation.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/shared-module/presentation/presentation.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".rf-jumbotron, .container-fluid {\n  color: white;\n  background-color: #7986CA; }\n\n@media only screen and (min-width: 992px) {\n  p {\n    margin-top: 60px; }\n  .rf-jumbotron {\n    border-radius: 0;\n    padding-right: 0;\n    padding-left: 0; } }\n"

/***/ }),

/***/ "./src/app/shared-module/presentation/presentation.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/shared-module/presentation/presentation.component.ts ***!
  \**********************************************************************/
/*! exports provided: PresentationComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PresentationComponent", function() { return PresentationComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PresentationComponent = /** @class */ (function () {
    function PresentationComponent() {
    }
    PresentationComponent.prototype.ngOnInit = function () {
    };
    PresentationComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-presentation',
            template: __webpack_require__(/*! ./presentation.component.html */ "./src/app/shared-module/presentation/presentation.component.html"),
            styles: [__webpack_require__(/*! ./presentation.component.scss */ "./src/app/shared-module/presentation/presentation.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PresentationComponent);
    return PresentationComponent;
}());



/***/ }),

/***/ "./src/app/shared-module/shared-module.module.ts":
/*!*******************************************************!*\
  !*** ./src/app/shared-module/shared-module.module.ts ***!
  \*******************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./header/header.component */ "./src/app/shared-module/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/shared-module/footer/footer.component.ts");
/* harmony import */ var _card_list_card_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./card-list/card-list.component */ "./src/app/shared-module/card-list/card-list.component.ts");
/* harmony import */ var _card_list_card_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./card-list/card.component */ "./src/app/shared-module/card-list/card.component.ts");
/* harmony import */ var _presentation_presentation_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./presentation/presentation.component */ "./src/app/shared-module/presentation/presentation.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
            declarations: [_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"], _card_list_card_component__WEBPACK_IMPORTED_MODULE_5__["CardContentDirective"], _card_list_card_component__WEBPACK_IMPORTED_MODULE_5__["CardDirective"],
                _card_list_card_list_component__WEBPACK_IMPORTED_MODULE_4__["CardListComponent"],
                _presentation_presentation_component__WEBPACK_IMPORTED_MODULE_6__["PresentationComponent"]],
            exports: [_header_header_component__WEBPACK_IMPORTED_MODULE_2__["HeaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_3__["FooterComponent"], _card_list_card_component__WEBPACK_IMPORTED_MODULE_5__["CardContentDirective"], _card_list_card_component__WEBPACK_IMPORTED_MODULE_5__["CardDirective"],
                _card_list_card_list_component__WEBPACK_IMPORTED_MODULE_4__["CardListComponent"], _presentation_presentation_component__WEBPACK_IMPORTED_MODULE_6__["PresentationComponent"]]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Angular_2_0\GITHUB\ScotiaAssignment\restorante-fornelo\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map