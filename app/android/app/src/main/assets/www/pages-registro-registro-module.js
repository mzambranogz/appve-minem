(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-registro-registro-module"],{

/***/ "8+ML":
/*!***************************************************!*\
  !*** ./src/app/pages/registro/registro.module.ts ***!
  \***************************************************/
/*! exports provided: RegistroPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroPageModule", function() { return RegistroPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _registro_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./registro-routing.module */ "8B87");
/* harmony import */ var _registro_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./registro.page */ "AYF9");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/components.module */ "j1ZV");








let RegistroPageModule = class RegistroPageModule {
};
RegistroPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _registro_routing_module__WEBPACK_IMPORTED_MODULE_5__["RegistroPageRoutingModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"]
        ],
        declarations: [_registro_page__WEBPACK_IMPORTED_MODULE_6__["RegistroPage"]]
    })
], RegistroPageModule);



/***/ }),

/***/ "8B87":
/*!***********************************************************!*\
  !*** ./src/app/pages/registro/registro-routing.module.ts ***!
  \***********************************************************/
/*! exports provided: RegistroPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroPageRoutingModule", function() { return RegistroPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _registro_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registro.page */ "AYF9");




const routes = [
    {
        path: '',
        component: _registro_page__WEBPACK_IMPORTED_MODULE_3__["RegistroPage"]
    }
];
let RegistroPageRoutingModule = class RegistroPageRoutingModule {
};
RegistroPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], RegistroPageRoutingModule);



/***/ }),

/***/ "AYF9":
/*!*************************************************!*\
  !*** ./src/app/pages/registro/registro.page.ts ***!
  \*************************************************/
/*! exports provided: RegistroPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RegistroPage", function() { return RegistroPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_registro_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./registro.page.html */ "SpOn");
/* harmony import */ var _registro_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./registro.page.scss */ "QzJ1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let RegistroPage = class RegistroPage {
    constructor() {
        this.usuario = {
            username: '',
            genero: '',
            email: '',
            password: '',
            confirm: ''
        };
    }
    // masculino = false
    // femenino = false
    ngOnInit() {
    }
    onSubmit(formulario) {
        console.log('submit');
        console.log(this.usuario);
        console.log(formulario);
    }
    asignaGenero(event) {
        console.log(event);
        this.usuario.genero = event.target.value;
        // let c = event.detail.checked;
        // console.log(v+"+"+c);
    }
};
RegistroPage.ctorParameters = () => [];
RegistroPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-registro',
        template: _raw_loader_registro_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_registro_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], RegistroPage);



/***/ }),

/***/ "QzJ1":
/*!***************************************************!*\
  !*** ./src/app/pages/registro/registro.page.scss ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWdpc3Ryby5wYWdlLnNjc3MifQ== */");

/***/ }),

/***/ "SpOn":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/registro/registro.page.html ***!
  \*****************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header regresar=\"true\"></app-header>\n\n<ion-content>\n  <ion-grid>\n    <form #formulario=\"ngForm\" (ngSubmit)=\"onSubmit(formulario)\">\n      <ion-row>\n        <ion-col size=\"12\">\n          <ion-img src=\"/assets/img/logo-principal.svg\" class=\"principal\"></ion-img>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n            <ion-label slot=\"start\" class=\"icon-l\">\n              <ion-img src=\"/assets/img/icon-user.svg\"></ion-img>\n            </ion-label>\n            <ion-label position=\"floating\">Nombre completo</ion-label>\n            <ion-input type=\"text\"\n                      name=\"username\"\n                      pattern=\"^[A-Za-z\\W+ ]{12,54}$\"\n                      autocomplete=\"off\"\n                      [(ngModel)]=\"usuario.username\"\n                      required></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n\n            <ion-list>\n              <ion-radio-group (ionChange)=\"asignaGenero($event)\">\n                <ion-item class=\"genero\">\n                  <ion-label>Masculino</ion-label>\n                  <ion-radio slot=\"start\" value=\"m\" ></ion-radio>\n                </ion-item>\n                <ion-item class=\"genero\">\n                  <ion-label>Femenino</ion-label>\n                  <ion-radio slot=\"start\" value=\"f\"></ion-radio>\n                </ion-item>\n              </ion-radio-group>\n            </ion-list>\n\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n            <ion-label slot=\"start\" class=\"icon-l\">\n              <ion-img src=\"/assets/img/icon-carta.svg\"></ion-img>\n            </ion-label>\n            <ion-label position=\"floating\">Correo electrónico</ion-label>\n            <ion-input type=\"email\"\n                      name=\"email\"\n                      pattern=\"^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$\"\n                      autocomplete=\"off\"\n                      [(ngModel)]=\"usuario.email\"\n                      required></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n            <ion-label slot=\"start\" class=\"icon-l\">\n              <ion-img src=\"/assets/img/icon-candado.svg\"></ion-img>\n            </ion-label>\n            <ion-label position=\"floating\">Contraseña</ion-label>\n            <ion-input type=\"password\"\n                      name=\"password\"\n                      pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\"\n                      autocomplete=\"off\"\n                      [(ngModel)]=\"usuario.password\"\n                      required></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n            <ion-label slot=\"start\" class=\"icon-l\">\n              <ion-img src=\"/assets/img/icon-candado.svg\"></ion-img>\n            </ion-label>\n            <ion-label position=\"floating\">Confirmar contraseña</ion-label>\n            <ion-input type=\"password\"\n                      name=\"confirm\"\n                      pattern=\"(?=^.{8,}$)((?=.*\\d)|(?=.*\\W+))(?![.\\n])(?=.*[A-Z])(?=.*[a-z]).*$\"\n                      autocomplete=\"off\"\n                      [(ngModel)]=\"usuario.confirm\"\n                      required></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-button [disabled]=\"formulario.invalid\"\n                      type=\"submit\"\n                      class=\"primario\"\n                      expand=\"block\"\n                      size=\"large\">REGÍSTRATE</ion-button>\n        </ion-col>\n        <!--ion-col size=\"12\">\n          <ion-button class=\"terciario\" expand=\"block\" size=\"large\" fill=\"outline\">REGRESAR</ion-button>\n        </ion-col-->\n      </ion-row>\n    </form>\n  </ion-grid>\n  <!--ion-button class=\"secundario\" expand=\"block\" size=\"large\">SIGUIENTE</ion-button>\n  <ion-button class=\"terciario\" expand=\"block\" size=\"large\" fill=\"outline\">REGRESAR</ion-button-->\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title class=\"ion-text-center pie\" routerLink=\"/login\">\n      Si ya tienes una cuenta\n      <div class=\"registro\">Ingresa</div>\n      <ion-img src=\"/assets/img/icon-flecha.svg\" class=\"flecha\"></ion-img>\n    </ion-title>\n  </ion-toolbar>\n</ion-footer>\n\n\n\n");

/***/ })

}]);
//# sourceMappingURL=pages-registro-registro-module.js.map