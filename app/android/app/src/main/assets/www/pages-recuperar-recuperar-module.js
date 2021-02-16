(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-recuperar-recuperar-module"],{

/***/ "H9tk":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/recuperar/recuperar.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header regresar=\"true\"></app-header>\n\n<ion-content>\n  <ion-grid>\n    <form #formulario=\"ngForm\" (ngSubmit)=\"onSubmit(formulario)\">\n      <ion-row>\n        <ion-col size=\"12\">\n          <ion-img src=\"/assets/img/logo-principal.svg\" class=\"principal\"></ion-img>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-item>\n            <ion-label slot=\"start\" class=\"icon-l\">\n              <ion-img src=\"/assets/img/icon-carta.svg\"></ion-img>\n            </ion-label>\n            <ion-label position=\"floating\">Correo electrónico</ion-label>\n            <ion-input type=\"email\"\n                      name=\"email\"\n                      pattern=\"^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$\"\n                      autocomplete=\"off\"\n                      [(ngModel)]=\"usuario.email\"\n                      required></ion-input>\n          </ion-item>\n        </ion-col>\n        <ion-col size=\"12\">\n          <ion-button [disabled]=\"formulario.invalid\"\n                      type=\"submit\"\n                      class=\"primario\"\n                      expand=\"block\"\n                      size=\"large\">RECUPERA</ion-button>\n        </ion-col>\n        <!--ion-col size=\"12\">\n          <ion-button class=\"terciario\" expand=\"block\" size=\"large\" fill=\"outline\">REGRESAR</ion-button>\n        </ion-col-->\n      </ion-row>\n    </form>\n  </ion-grid>\n  <!--ion-button class=\"secundario\" expand=\"block\" size=\"large\">SIGUIENTE</ion-button>\n  <ion-button class=\"terciario\" expand=\"block\" size=\"large\" fill=\"outline\">REGRESAR</ion-button-->\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <ion-title class=\"ion-text-center pie\" routerLink=\"/login\">\n      Si ya tienes una cuenta\n      <div class=\"registro\">Ingresa</div>\n      <ion-img src=\"/assets/img/icon-flecha.svg\" class=\"flecha\"></ion-img>\n    </ion-title>\n  </ion-toolbar>\n</ion-footer>\n\n\n\n");

/***/ }),

/***/ "HkWM":
/*!*****************************************************!*\
  !*** ./src/app/pages/recuperar/recuperar.module.ts ***!
  \*****************************************************/
/*! exports provided: RecuperarPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecuperarPageModule", function() { return RecuperarPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _recuperar_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./recuperar-routing.module */ "f37j");
/* harmony import */ var _recuperar_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./recuperar.page */ "sRgI");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/components.module */ "j1ZV");








let RecuperarPageModule = class RecuperarPageModule {
};
RecuperarPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _recuperar_routing_module__WEBPACK_IMPORTED_MODULE_5__["RecuperarPageRoutingModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"]
        ],
        declarations: [_recuperar_page__WEBPACK_IMPORTED_MODULE_6__["RecuperarPage"]]
    })
], RecuperarPageModule);



/***/ }),

/***/ "RU0N":
/*!*****************************************************!*\
  !*** ./src/app/pages/recuperar/recuperar.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWN1cGVyYXIucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "f37j":
/*!*************************************************************!*\
  !*** ./src/app/pages/recuperar/recuperar-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: RecuperarPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecuperarPageRoutingModule", function() { return RecuperarPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _recuperar_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recuperar.page */ "sRgI");




const routes = [
    {
        path: '',
        component: _recuperar_page__WEBPACK_IMPORTED_MODULE_3__["RecuperarPage"]
    }
];
let RecuperarPageRoutingModule = class RecuperarPageRoutingModule {
};
RecuperarPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], RecuperarPageRoutingModule);



/***/ }),

/***/ "sRgI":
/*!***************************************************!*\
  !*** ./src/app/pages/recuperar/recuperar.page.ts ***!
  \***************************************************/
/*! exports provided: RecuperarPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RecuperarPage", function() { return RecuperarPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_recuperar_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./recuperar.page.html */ "H9tk");
/* harmony import */ var _recuperar_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recuperar.page.scss */ "RU0N");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let RecuperarPage = class RecuperarPage {
    constructor() {
        this.usuario = {
            email: ''
        };
    }
    ngOnInit() {
    }
    onSubmit(formulario) {
        console.log('submit');
        console.log(this.usuario);
        console.log(formulario);
    }
};
RecuperarPage.ctorParameters = () => [];
RecuperarPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-recuperar',
        template: _raw_loader_recuperar_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_recuperar_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], RecuperarPage);



/***/ })

}]);
//# sourceMappingURL=pages-recuperar-recuperar-module.js.map