
/*
Validaciones en input
*/

/*
Método números enteros: ruc, dni, etc.
Ejemplo => DNI: 10225896
*/
$(document).on("keyup", ".integer-positivo", function (e) {
    $(e.target).val(function (index, value) {
        return value.replace(/\D/g, "");
    });
});

/*
Método números enteros con formato miles: cantidad, etc.
Ejemplo => Números de camisas: 3,552 
*/
$(document).on("keyup", ".integer-miles-positivo", function (e) {
    $(e.target).val(function (index, value) {
        return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    });
});

/*
Método números enteros con formato miles: cantidad, etc.
Ejemplo => Números de camisas: 3,552 
*/
$(document).on("keyup", ".integer-miles-negativo", function (e) {
    $(e.target).val(function (index, value) {
        let v = /^-{1}/.test(this.value);
        let valor = value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
        return v ? `-${valor}` : valor;
    });
});

/*
Método números decimales con formato miles: precios, costos, etc.
Ejemplo => Precio de venta: 5,500,320.99 
*/
$(document).on("keyup", ".decimal-miles-positivo", function (event) {
    $(event.target).val(function (index, value) {
        if (value.length <= 2) {
            return value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{1})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
        } else {
            return value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{2})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
        }
    });
});

/*
Método números decimales con formato miles y 3 decimales: precios, costos, etc.
Ejemplo => Precio de venta: 5,500,320.999 
*/
$(document).on("keyup", ".decimal-3-miles-positivo", function (event) {
    $(event.target).val(function (index, value) {
        if (value.length <= 2) {
            return value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{1})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
        } else if (value.length <= 4) {
            return value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{2})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
        } else {
            return value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{3})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
        }
    });
});

/*
Método números decimales con formato miles negativo: precios, pérdidas, etc.
Ejemplo => Precio de venta: -3,140.89 
*/
$(document).on("keyup", ".decimal-miles-negativo", function (event) {
    $(event.target).val(function (index, value) {
        let v = /^-{1}/.test(this.value);
        if (value.length <= 2) {
            let valor = value.replace(/\D/g, "")
            .replace(/([0-9])([0-9]{1})$/, '$1.$2')
            .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
            return v ? `-${valor}` : valor;
        } else {
            let valor = value.replace(/\D/g, "")
                             .replace(/([0-9])([0-9]{2})$/, '$1.$2')
                             .replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
            return v ? `-${valor}` : valor;
        }
    });
});

/*
*
*
*
*
Métodos para asignar formatos
*
*
*
*/

/*
Método para asignar formato miles a números enteros
*/
function formatoMilesEnteros(n) {
    //var m = n * 1; return m.toFixed(0).replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
    return parseFloat(n).toFixed(0).replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ",");
}

/*
Método para asignar formato miles a números decimales
*/
var formatoMilesDecimales = (n) => {
    //var m = n * 1; return m.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    return parseFloat(n).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}