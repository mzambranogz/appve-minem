(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-principal-principal-module"],{

/***/ "2lhn":
/*!*****************************************************!*\
  !*** ./src/app/pages/principal/principal.page.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcmluY2lwYWwucGFnZS5zY3NzIn0= */");

/***/ }),

/***/ "3a3Q":
/*!*************************************************************!*\
  !*** ./src/app/pages/principal/principal-routing.module.ts ***!
  \*************************************************************/
/*! exports provided: PrincipalPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrincipalPageRoutingModule", function() { return PrincipalPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _principal_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./principal.page */ "y6Bz");




const routes = [
    {
        path: '',
        component: _principal_page__WEBPACK_IMPORTED_MODULE_3__["PrincipalPage"]
    }
];
let PrincipalPageRoutingModule = class PrincipalPageRoutingModule {
};
PrincipalPageRoutingModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], PrincipalPageRoutingModule);



/***/ }),

/***/ "DGFQ":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/principal/principal.page.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<app-header menu=\"true\"></app-header>\n\n<ion-content>\n\n</ion-content>\n");

/***/ }),

/***/ "Lm/C":
/*!*****************************************************!*\
  !*** ./src/app/pages/principal/principal.module.ts ***!
  \*****************************************************/
/*! exports provided: PrincipalPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrincipalPageModule", function() { return PrincipalPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "TEn/");
/* harmony import */ var _principal_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./principal-routing.module */ "3a3Q");
/* harmony import */ var _principal_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./principal.page */ "y6Bz");
/* harmony import */ var _components_components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/components.module */ "j1ZV");








let PrincipalPageModule = class PrincipalPageModule {
};
PrincipalPageModule = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _principal_routing_module__WEBPACK_IMPORTED_MODULE_5__["PrincipalPageRoutingModule"],
            _components_components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"]
        ],
        declarations: [_principal_page__WEBPACK_IMPORTED_MODULE_6__["PrincipalPage"]]
    })
], PrincipalPageModule);



/***/ }),

/***/ "y6Bz":
/*!***************************************************!*\
  !*** ./src/app/pages/principal/principal.page.ts ***!
  \***************************************************/
/*! exports provided: PrincipalPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrincipalPage", function() { return PrincipalPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var _raw_loader_principal_page_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! raw-loader!./principal.page.html */ "DGFQ");
/* harmony import */ var _principal_page_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./principal.page.scss */ "2lhn");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




let PrincipalPage = class PrincipalPage {
    constructor() { }
    ngOnInit() {
    }
};
PrincipalPage.ctorParameters = () => [];
PrincipalPage = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-principal',
        template: _raw_loader_principal_page_html__WEBPACK_IMPORTED_MODULE_1__["default"],
        styles: [_principal_page_scss__WEBPACK_IMPORTED_MODULE_2__["default"]]
    })
], PrincipalPage);



/***/ })

}]);
//# sourceMappingURL=pages-principal-principal-module.js.map