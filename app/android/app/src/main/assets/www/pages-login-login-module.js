(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-login-login-module"],{

/***/ "ESM5":
/*!**********************************************!*\
  !*** ./src/app/services/usuarios.service.ts ***!
  \**********************************************/
/*! exports provided: UsuariosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuariosService", function() { return UsuariosService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../environments/environment */ "AytR");




const apiURL = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].url;
let UsuariosService = class UsuariosService {
    constructor(http) {
        this.http = http;
    }
    getusuario() {
        return this.http.get('https://jsonplaceholder.typicode.com/users');
    }
    getLogin(data) {
        return this.http.post(`${apiURL}/usuario/authenticate`, data);
    }
};
UsuariosService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }
];
UsuariosService = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injectable"])({
        providedIn: 'root'
    })
], UsuariosService);



/***/ }),

/***/ "F4UR":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.module.ts ***!
  \*********************************************/
/*! exports provided: LoginPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _login_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login-routing.module */ "aTZN");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login.page */ "bP1B");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/components.module */ "j1ZV");








let LoginPageModule = class LoginPageModule {
};
LoginPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _login_routing_module__WEBPACK_IMPORTED_MODULE_5__["LoginPageRoutingModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"]
        ],
        declarations: [_login_page__WEBPACK_IMPORTED_MODULE_6__["LoginPage"]]
    })
], LoginPageModule);



/***/ }),

/***/ "H+1c":
/*!*********************************************!*\
  !*** ./src/app/pages/login/login.page.scss ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsb2dpbi5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "TuYN":
/*!***********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/login/login.page.html ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header></app-header>\n\n<ion-content>\n  <ion-grid>\n    <form #formulario=\"ngForm\" (ngSubmit)=\"onLogin(formulario)\">\n      <ion-row>\n        <ion-col size=\"12\">\n          <ion-img src=\"/assets/img/logo-principal.svg\" class=\"principal\"></ion-img>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n            <ion-label slot=\"start\" class=\"icon-l\">\n              <ion-img src=\"/assets/img/icon-carta.svg\"></ion-img>\n            </ion-label>\n            <ion-label position=\"floating\">Correo electrónico</ion-label>\n            <ion-input type=\"email\"\n                      name=\"email\"\n                      pattern=\"^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$\"\n                      autocomplete=\"off\"\n                      [(ngModel)]=\"usuario.email\"\n                      required></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n            <ion-label slot=\"start\" class=\"icon-l\">\n              <ion-img src=\"/assets/img/icon-candado.svg\"></ion-img>\n            </ion-label>\n            <ion-label position=\"floating\">Contraseña</ion-label>\n            <ion-input type=\"password\"\n                      name=\"password\"\n                      pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\"\n                      autocomplete=\"off\"\n                      [(ngModel)]=\"usuario.password\"\n                      required></ion-input>\n            <!--ion-label slot=\"end\">\n              <ion-img src=\"/assets/img/icon-ojo.svg\"></ion-img>\n            </ion-label-->\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-button [disabled]=\"formulario.invalid\"\n                      type=\"submit\"\n                      class=\"primario\"\n                      expand=\"block\"\n                      size=\"large\">EMPIEZA</ion-button>\n        </ion-col>\n      </ion-row>\n    </form>\n  </ion-grid>\n  <!--ion-button class=\"secundario\" expand=\"block\" size=\"large\">SIGUIENTE</ion-button>\n  <ion-button class=\"terciario\" expand=\"block\" size=\"large\" fill=\"outline\">REGRESAR</ion-button-->\n\n  <ion-grid class=\"ion-padding-top\">\n    <ion-row class=\"ion-padding-top\">\n      <ion-col>\n        <div class=\"ion-text-center link ion-padding-top\" routerLink=\"/recuperar\">¿Olvidaste tu contraseña?</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid class=\"ion-padding-top\">\n    <ion-row>\n      <ion-col size=\"4\">\n        <hr class=\"division\"/>\n      </ion-col>\n      <ion-col size=\"4\">\n        <div class=\"ion-text-center link\">O conecta con</div>\n      </ion-col>\n      <ion-col size=\"4\">\n        <hr class=\"division\"/>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid class=\"ion-padding-top\">\n    <ion-row>\n      <ion-col size=\"6\">\n        <ion-button class=\"redes\" expand=\"block\" size=\"large\">\n          <ion-icon slot=\"start\" name=\"logo-google\"></ion-icon>\n          Gooogle\n        </ion-button>\n      </ion-col>\n      <ion-col size=\"6\">\n        <ion-button class=\"redes\" expand=\"block\" size=\"large\">\n          <ion-icon slot=\"start\" name=\"logo-facebook\"></ion-icon>\n          Facebook\n        </ion-button>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ion-grid class=\"ion-padding-top\">\n    <ion-row class=\"ion-padding-top\">\n      <ion-col class=\"ion-padding-top\">\n        <div class=\"ion-text-center link ion-padding-top\">Versión: 2021-160201</div>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title class=\"ion-text-center pie\" routerLink=\"/registro\">\n      Si no tienes una cuenta\n      <div class=\"registro\">Regístrate</div>\n      <ion-img src=\"/assets/img/icon-flecha.svg\" class=\"flecha\"></ion-img>\n    </ion-title>\n  </ion-toolbar>\n</ion-footer>\n");

/***/ }),

/***/ "aTZN":
/*!*****************************************************!*\
  !*** ./src/app/pages/login/login-routing.module.ts ***!
  \*****************************************************/
/*! exports provided: LoginPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageRoutingModule", function() { return LoginPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _login_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./login.page */ "bP1B");




const routes = [
    {
        path: '',
        component: _login_page__WEBPACK_IMPORTED_MODULE_3__["LoginPage"]
    }
];
let LoginPageRoutingModule = class LoginPageRoutingModule {
};
LoginPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], LoginPageRoutingModule);



/***/ }),

/***/ "bP1B":
/*!*******************************************!*\
  !*** ./src/app/pages/login/login.page.ts ***!
  \*******************************************/
/*! exports provided: LoginPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPage", function() { return LoginPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./login.page.html */ "TuYN");
/* harmony import */ var _login_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login.page.scss */ "H+1c");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/usuarios.service */ "ESM5");






let LoginPage = class LoginPage {
    constructor(usuariosService, navCtrl, loadingCtrl) {
        this.usuariosService = usuariosService;
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
        this.usuario = {
            email: '',
            password: ''
        };
    }
    ngOnInit() {
        this.usuariosService.getusuario().subscribe(console.log);
    }
    onLogin(formulario) {
        console.log('submit');
        console.log(this.usuario);
        console.log(formulario);
        //this.usuariosService.getLogin(this.usuario).subscribe(console.log);
        this.presentLoading();
        setTimeout(() => {
            this.loadingCtrl.dismiss();
            this.navCtrl.navigateRoot('/principal');
        }, 2700);
    }
    presentLoading() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.loading = yield this.loadingCtrl.create({
                message: 'Cargando...',
            });
            yield this.loading.present();
        });
    }
};
LoginPage.ctorParameters = () => [
    { type: src_app_services_usuarios_service__WEBPACK_IMPORTED_MODULE_5__["UsuariosService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["NavController"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["LoadingController"] }
];
LoginPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-login',
        template: _raw_loader_login_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_login_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], LoginPage);



/***/ })

}]);
//# sourceMappingURL=pages-login-login-module.js.map