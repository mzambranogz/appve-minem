var rendimiento_vc = 0, precio_combustible_vc = 0, factor_emision_vc = 0, rendimiento_cvc = 0, precio_combustible_cvc = 0, factor_emision_cvc = 0, precio_vehiculo_cvc = 0;
var rendimiento_ve = 0, capacidad_bateria = 0, precio_cargador = 0, costo_instalacion = 0, tarifa_electricidad = 0, precio_vehiculo_ve;
var ipcc = 0.03, tasa_descuento = 0.05, reduccion_eficiencia_motor = 0.03;
var depreciacionVC = new Array(15);
var depreciacionVE = new Array(15);

//Vehiculo convencional
var arrInversionInicialVCNominal = new Array(15);
var arrCargaFinancieraVCNominal = new Array(15);
var arrSeguroVCNominal = new Array(15);
var arrEnergiaVCNominal = new Array(15);
var arrManteContinuoVCNominal = new Array(15);
var arrReventaVCNominal = new Array(15);
var arrManteExtraoVCNominal = new Array(15);
var arrServicioPublicoVCNominal = new Array(15);

var arrInversionInicialVCNeto = new Array(15);
var arrCargaFinancieraVCNeto = new Array(15);
var arrSeguroVCNeto = new Array(15);
var arrEnergiaVCNeto = new Array(15);
var arrManteContinuoVCNeto = new Array(15);
var arrReventaVCNeto = new Array(15);
var arrManteExtraoVCNeto = new Array(15);
var arrServicioPublicoVCNeto = new Array(15);

var arrInversionInicialVCAcumulado = new Array(15);
var arrCargaFinancieraVCAcumulado = new Array(15);
var arrSeguroVCAcumulado = new Array(15);
var arrEnergiaVCAcumulado = new Array(15);
var arrManteContinuoVCAcumulado = new Array(15);
var arrReventaVCAcumulado = new Array(15);
var arrManteExtraoVCAcumulado = new Array(15);
var arrServicioPublicoVCAcumulado = new Array(15);

//vehiculo electrico
var arrInversionInicialVENominal = new Array(15);
var arrCargaFinancieraVENominal = new Array(15);
var arrIncentivoVENominal = new Array(15);
var arrSeguroVENominal = new Array(15);
var arrRecambioVENominal = new Array(15);
var arrEnergiaVENominal = new Array(15);
var arrManteContinuoVENominal = new Array(15);
var arrReventaVENominal = new Array(15);

var arrInversionInicialVENeto = new Array(15);
var arrCargaFinancieraVENeto = new Array(15);
var arrIncentivoVENeto = new Array(15);
var arrSeguroVENeto = new Array(15);
var arrRecambioVENeto = new Array(15);
var arrEnergiaVENeto = new Array(15);
var arrManteContinuoVENeto = new Array(15);
var arrReventaVENeto = new Array(15);

var arrInversionInicialVEAcumulado = new Array(15);
var arrCargaFinancieraVEAcumulado = new Array(15);
var arrIncentivoVEAcumulado = new Array(15);
var arrSeguroVEAcumulado = new Array(15);
var arrRecambioVEAcumulado = new Array(15);
var arrEnergiaVEAcumulado = new Array(15);
var arrManteContinuoVEAcumulado = new Array(15);
var arrCargaInstalacionVEAcumulado = new Array(15);
var arrReventaVEAcumulado = new Array(15);

$(document).ready(() => {  
    //configuracion();
    cargarComponentes();
    $('#btnMenu').on('click', (e) => comenzar());
    $('#btnReg01').on('click', (e) => regresar1());
    $('#btnSig01').on('click', (e) => siguiente1());
    $('#btnReg02').on('click', (e) => regresar2());
    $('#btnSig02').on('click', (e) => siguiente2());
    $('#btnReg03').on('click', (e) => regresar3());
    $('#btnSig03').on('click', (e) => siguiente3());
    $('#btnReg04').on('click', (e) => regresar4());
    $('#btnSig04').on('click', (e) => siguiente4());
    $('#btnReg05').on('click', (e) => regresar5());
    $('#btnEva05').on('click', (e) => evaluar5());
    $('input[name="rad-ca-vc"]').on('change', (e) => cambiarCongVC());
    $('input[name="rad-gcs-vc"]').on('change', (e) => cambiarCongGCVC());
    $('input[name="rad-ca-cvc"]').on('change', (e) => cambiarCongCVC());
    $('input[name="rad-gcs-cvc"]').on('change', (e) => cambiarCongGCCVC());
    $('input[name="rad-sv-cvc"]').on('change', (e) => cambiarSeguroCVC());
    $('input[name="rad-sv-ve"]').on('change', (e) => cambiarSeguroCVE());
    $('input[name="rad-ca-ve"]').on('change', (e) => cambiarCongVE());
    $('input[name="rad-t-ve"]').on('change', (e) => cambiarCongTE());
    $('input[name="rad-inc-ve"]').on('change', (e) => cambiarCongINC());
    $('#tipo-compra-cvc').on('change', (e) => cambiarTipoCompraCVC());
    $('#tipo-compra-ve').on('change', (e) => cambiarTipoCompraCVE());
    $('#tipo-vehiculo-vc').on('change', (e) => evaluarTipoVehTipoCombVC());
    $('#tipo-combustible-vc').on('change', (e) => evaluarTipoVehTipoCombVC());
    $('#tipo-vehiculo-cvc').on('change', (e) => evaluarTipoVehTipoCombCVC());
    $('#tipo-combustible-cvc').on('change', (e) => evaluarTipoVehTipoCombCVC());
    $('#tipo-vehiculo-ve').on('change', (e) => cambiarVE());
    $('#modelo-ve').on('change', (e) => cambiarMVE());
    $('#tipo-cargador').on('change', (e) => cambiarTC());
    $('#cbo-potencia').on('change', (e) => cambiarCP());
    $('#cbo-departamento').on('change', (e) => cambiarDP());
    $('#tipo-incentivo').on('change', (e) => cambiarTI());
    $('#forma-incentivo').on('change', (e) => cambiarFI());
    $('#anio_evaluacion').on('change', (e) => cambiarAnio());
    $('#cbo-departamento-cvc').on('change', (e) => cambiarDepartamentoVC());
});

var configuracion = () => {
    //Servicio trnasporte
    $('#transporte-01').addClass('d-none');
    $('#transporte-02').addClass('d-none');
    $('#transporte-03').addClass('d-none');
    $('#transporte-04').addClass('d-none');
    //Secciones
    $('#seccion-02').addClass('d-none');
    $('#seccion-03').addClass('d-none');
    $('#seccion-04').addClass('d-none');
    $('#seccion-05').addClass('d-none');
}

var inicio = () => {
    //Vehiculo convencional
    $('#rad-ca-no-vc').prop('checked', true);
    cambiarCongVC();
    $('#rad-gcs-no-vc').prop('checked', true);
    cambiarCongGCVC();
    //Compra Vehiculo Convencional
    $('#rad-ca-no-cvc').prop('checked', true);
    cambiarCongCVC();
    $('#rad-gcs-no-cvc').prop('checked', true);
    cambiarCongGCCVC();
    $('#rad-sv-no-cvc').prop('checked', true);
    cambiarSeguroCVC()
    cambiarTipoCompraCVC();
    cambiarVE();
    //Compra Vehiculo Electrico
    $('#rad-ca-no-ve').prop('checked', true);
    cambiarCongVE();
    cambiarTC();
    $('#rad-t-no-ve').prop('checked', true);
    cambiarCongTE();
    cambiarTipoCompraCVE();
    $('#rad-sv-no-ve').prop('checked', true);
    cambiarSeguroCVE();
    $('#rad-inc-no-ve').prop('checked', true);
    cambiarCongINC();
    //cambiarTI();
    //cambiarFI();
}

var comenzar = () => {
    let p1 = $('#rad-e1-si').prop('checked') ? true : $('#rad-e1-no').prop('checked') ? true : false; 
    let p2 = $('#rad-e2-si').prop('checked') ? true : $('#rad-e2-no').prop('checked') ? true : false;
    let p3 = $('#rad-e3-si').prop('checked') ? true : $('#rad-e3-no').prop('checked') ? true : false;
    if (!(p1 && p2 && p3)) {alert('Debe seleccionar todas las opciones'); return;}
    $('#seccion-01').addClass('d-none');
    if ($('#rad-e3-si').prop('checked')) $('#seccion-02').removeClass('d-none');
    else if ($('#rad-e1-si').prop('checked')) $('#seccion-03').removeClass('d-none');
    else if ($('#rad-e2-si').prop('checked')) $('#seccion-04').removeClass('d-none');
    else if ($('#rad-e3-si').prop('checked')) $('#seccion-05').removeClass('d-none');
    else $('#seccion-06').removeClass('d-none');
}

var regresar1 = () => {
    $('#seccion-01').removeClass('d-none');
    $('#seccion-02').addClass('d-none');
}

var siguiente1 = () => {
    let tp1 = $('#servicio-01').val() == 0 ? false : true;
    let tp2 = $('#servicio-02').val() == 0 ? false : true;
    let tp3 = $('#servicio-03').val() == 0 ? false : true;
    let tp4 = $('#servicio-04').val() == 0 ? false : true;
    if (!(tp1 || tp2 || tp3 || tp4))  {alert('Debe seleccionar al menos un tipo de transporte'); return;}
    if ($('#servicio-01').val() > 0) $('#transporte-01').removeClass();
    else $('#transporte-01').addClass();
    if ($('#servicio-02').val() > 0) $('#transporte-02').removeClass();
    else $('#transporte-02').addClass();
    if ($('#servicio-03').val() > 0) $('#transporte-03').removeClass();
    else $('#transporte-03').addClass();
    if ($('#servicio-04').val() > 0) $('#transporte-04').removeClass();
    else $('#transporte-04').addClass();
    $('#tipo-transporte-01').val($('#servicio-01').val() == null ? 0 : $('#servicio-01').val());
    $('#tipo-transporte-02').val($('#servicio-02').val() == null ? 0 : $('#servicio-02').val());
    $('#tipo-transporte-03').val($('#servicio-03').val() == null ? 0 : $('#servicio-03').val());
    $('#tipo-transporte-04').val($('#servicio-04').val() == null ? 0 : $('#servicio-04').val());

    $('#seccion-02').addClass('d-none');
    if ($('#rad-e1-si').prop('checked')) $('#seccion-03').removeClass('d-none');
    else if ($('#rad-e2-si').prop('checked')) $('#seccion-04').removeClass('d-none');
    else $('#seccion-05').removeClass('d-none');
}

var regresar2 = () => {
    $('#seccion-03').addClass('d-none');
    if ($('#rad-e3-si').prop('checked')) $('#seccion-02').removeClass('d-none');
    else $('#seccion-01').removeClass('d-none');
}

var siguiente2 = () => {
    let tv = $('#tipo-vehiculo-vc').val() > 0 ? true : false;
    let tc = $('#tipo-combustible-vc').val() > 0 ? true : false;
    let rendimiento = $('#rendimiento-vc').val() >= 0 ? true : false;
    let precio_comb = $('#precio-combustible-vc').val() >= 0 ? true : false;
    let porc_comb = $('#porc-anual-combustible-vc').val() >= 0 ? true : false;
    let factor_emision = $('#factor-emision-vc').val() >= 0 ? true : false;
    let mantenimiento = $('#mantenimiento-vc').val() >= 0 ? true : false;
    let seguro = $('#seguro-vc').val() >= 0 ? true : false;
    let gasto_comb = $('#rad-gcs-si-vc').prop('checked') ? $('#seguro-vc').val() >= 0 ? true : false : true;
    let kilometros = $('#kilometro-sem-vc').val() >= 0 ? true : false;
    let meses = $('#meses-vc').val() > 0 ? true : false;
    if (!(tv && tc && rendimiento && precio_comb && porc_comb && factor_emision && mantenimiento && seguro && gasto_comb && kilometros && meses))  {alert('Debe completar todos los campos'); return;}
    
    $('#seccion-03').addClass('d-none');
    if ($('#rad-e2-si').prop('checked')) $('#seccion-04').removeClass('d-none');
    else if ($('#rad-e3-si').prop('checked')) $('#seccion-05').removeClass('d-none');
    else $('#seccion-06').removeClass('d-none'); 
}

var regresar3 = () => {
    $('#seccion-04').addClass('d-none');
    if ($('#rad-e1-si').prop('checked')) $('#seccion-03').removeClass('d-none');    
    else if ($('#rad-e3-si').prop('checked')) $('#seccion-02').removeClass('d-none');
    else $('#seccion-01').removeClass('d-none');
}

var siguiente3 = () => {
    let tv = $('#tipo-vehiculo-cvc').val() > 0 ? true : false;
    let tc = $('#tipo-combustible-cvc').val() > 0 ? true : false;
    let rendimiento = $('#rendimiento-cvc').val() >= 0 ? true : false;
    let precio_comb = $('#precio-combustible-cvc').val() >= 0 ? true : false;
    let porc_comb = $('#porc-anual-combustible-cvc').val() >= 0 ? true : false;
    let factor_emision = $('#factor-emision-cvc').val() >= 0 ? true : false;    
    let gasto_comb = $('#rad-gcs-si-cvc').prop('checked') ? $('#seguro-cvc').val() >= 0 ? true : false : true;
    let kilometros = $('#kilometro-sem-cvc').val() >= 0 ? true : false;
    let meses = $('#meses-cvc').val() > 0 ? true : false;
    let costo_vehiculo = $('#costo-veh-cvc').val() >= 0 ? true : false;
    let tipo_compra = $('#tipo-compra-cvc').val() > 0 ? true : false;
    let financiamiento = $('#tipo-compra-cvc').val() == 2 ? costo_vehiculo : $('#tipo-compra-cvc').val() == 1 ? $('#tasa-interes-cvc').val() >= 0 && $('#anio-credito-cvc').val() > 0 && $('#cuota-inicial-cvc').val() >= 0 ? true : false : false;
    let seguro = $('#rad-sv-si-cvc').prop('checked') ? $('#seguro-cvc').val() >= 0 ? true : false : true;

    if (!(tv && tc && rendimiento && precio_comb && porc_comb && factor_emision && gasto_comb && kilometros && meses && costo_vehiculo && tipo_compra && financiamiento && seguro))  {alert('Debe completar todos los campos'); return;}

    $('#seccion-04').addClass('d-none');
    if ($('#rad-e3-si').prop('checked')) $('#seccion-05').removeClass('d-none');
    else $('#seccion-06').removeClass('d-none'); 
}

var regresar4 = () => {
    $('#seccion-05').addClass('d-none');
    if ($('#rad-e2-si').prop('checked')) $('#seccion-04').removeClass('d-none');
    else if ($('#rad-e1-si').prop('checked')) $('#seccion-03').removeClass('d-none');
    else if ($('#rad-e3-si').prop('checked')) $('#seccion-02').removeClass('d-none');
    else $('#seccion-01').removeClass('d-none');
}

var siguiente4 = () => {
    let tp1 = $('#servicio-01').val() == 0 ? true : validar('#costo-movilidad-01') && validar('#kilometros-01') && $('#meses-01').val() > 0 ? true : false;
    let tp2 = $('#servicio-02').val() == 0 ? true : validar('#costo-movilidad-02') && validar('#kilometros-02') && $('#meses-02').val() > 0 ? true : false;
    let tp3 = $('#servicio-03').val() == 0 ? true : validar('#costo-movilidad-03') && validar('#kilometros-03') && $('#meses-03').val() > 0 ? true : false;
    let tp4 = $('#servicio-04').val() == 0 ? true : validar('#costo-movilidad-04') && validar('#kilometros-04') && $('#meses-04').val() > 0 ? true : false;
    if (!(tp1 && tp2 && tp3 && tp4)) alert('Debe completar todos los campos');

    $('#seccion-05').addClass('d-none');
    $('#seccion-06').removeClass('d-none'); 
}

var regresar5 = () => {
    $('#seccion-06').addClass('d-none');
    if ($('#rad-e3-si').prop('checked')) $('#seccion-05').removeClass('d-none');
    else if ($('#rad-e2-si').prop('checked')) $('#seccion-04').removeClass('d-none');
    else if ($('#rad-e1-si').prop('checked')) $('#seccion-03').removeClass('d-none');     
    else $('#seccion-01').removeClass('d-none');
}

var evaluar5 = () => {
    let tve = $('#tipo-vehiculo-ve').val() > 0 ? true : false;
    let tm = $('#tipo-vehiculo-ve').val() == 1 ? $('#modelo-ve').val() > 0 ? true : false : true;
    let rendimiento = $('#rendimiento-ve').val() >= 0 ? true : false;
    let capacidad_bateria = $('#bateria-ve').val() >= 0 ? true: false;
    let tipo_cargador = $('#tipo-cargador').val() > 0 ? true: false;
    let potencia = tipo_cargador ? $('#tipo-cargador').val() == 100 ? validar('#txt-potencia') : $('#cbo-potencia').val() > 0 ? true : false : false;
    let precio_cargador = validar('#precio-cargador');
    let costo_instalacion = validar('#costo-instalacion');
    let departamento = $('#cbo-departamento').val() > 0 ? true : false;
    let tarifa = validar('#tarifa-ve');
    let porc_anual_elec = validar('#porc-aual-ve');
    let kilometros = $('#kilometro-sem-ve').val() >= 0 ? true : false;
    let meses = $('#meses-ve').val() > 0 ? true : false;
    let costo_vehiculo = $('#costo-veh-ve').val() >= 0 ? true : false;
    let tipo_compra = $('#tipo-compra-ve').val() > 0 ? true : false;
    let financiamiento = $('#tipo-compra-ve').val() == 2 ? costo_vehiculo : $('#tipo-compra-ve').val() == 1 ? $('#tasa-interes-ve').val() >= 0 && $('#anio-credito-ve').val() > 0 && $('#cuota-inicial-ve').val() >= 0 ? true : false : false;
    let seguro = $('#rad-sv-si-ve').prop('checked') ? $('#seguro-ve').val() >= 0 ? true : false : true;
    let incentivo = $('#rad-inc-si-ve').prop('checked') ? $('#tipo-incentivo').val() == 1 ? $('#horizonte').val() > 0 && validar('#cuota-inc-anual') ? true : false : $('#tipo-incentivo').val() == 2 ? $('#forma-incentivo').val() > 0 ? $('#forma-incentivo').val() == 1 ? validar('#porcentaje-inc') : $('#forma-incentivo').val() == 2 ? validar('#valor-inc-unico') : false : false : false : true;

    if (!(tve && tm && rendimiento && capacidad_bateria && tipo_cargador && potencia && precio_cargador && costo_instalacion && departamento && tarifa && porc_anual_elec && kilometros && meses && costo_vehiculo && tipo_compra && financiamiento && seguro && incentivo))  {alert('Debe completar todos los campos'); return;}

    $('#seccion-06').addClass('d-none');
    $('#seccion-07').removeClass('d-none');
    evaluar();
}

//=======================================

var cambiarCongVC = () => {
    var v = $('input[name="rad-ca-vc"]:checked').val() == 1 ? true : false;
    if (v) $('#configuracion-vc').removeClass('d-none');
    else {
        $('#configuracion-vc').addClass('d-none');
        $('#rendimiento-vc').val(rendimiento_vc);
        $('#precio-combustible-vc').val(precio_combustible_vc);
        $('#porc-anual-combustible-vc').val(2);
        $('#factor-emision-vc').val(factor_emision_vc);
    }
}

var cambiarCongGCVC = () => {
    var v = $('input[name="rad-gcs-vc"]:checked').val() == 1 ? true : false;
    if (v) $('#gasto-comb-vc').removeClass('d-none');
    else {
        $('#gasto-comb-vc').addClass('d-none');
        $('#gasto-vc').val(0);
    } 
}

var cambiarCongCVC = () => {
    var v = $('input[name="rad-ca-cvc"]:checked').val() == 1 ? true : false;
    if (v) $('#configuracion-cvc').removeClass('d-none');
    else {
        $('#configuracion-cvc').addClass('d-none');
        $('#rendimiento-cvc').val(rendimiento_cvc);
        $('#precio-combustible-cvc').val(precio_combustible_cvc);
        $('#porc-anual-combustible-cvc').val(2);
        $('#factor-emision-cvc').val(factor_emision_cvc);
    }
}

var cambiarCongGCCVC = () => {
    var v = $('input[name="rad-gcs-cvc"]:checked').val() == 1 ? true : false;
    if (v) $('#gasto-comb-cvc').removeClass('d-none');
    else {
        $('#gasto-comb-cvc').addClass('d-none');
        $('#gasto-cvc').val(0);
    } 
}

var cambiarSeguroCVC = () => {
    var v = $('input[name="rad-sv-cvc"]:checked').val() == 1 ? true : false;
    if (v) $('#seguro-veh-cvc').removeClass('d-none');
    else {
        $('#seguro-veh-cvc').addClass('d-none');
        $('#seguro-cvc').val(0);
    } 
}

var cambiarSeguroCVE = () => {
    var v = $('input[name="rad-sv-ve"]:checked').val() == 1 ? true : false;
    if (v) $('#seguro-veh-ve').removeClass('d-none');
    else {
        $('#seguro-veh-ve').addClass('d-none');
        $('#seguro-ve').val(0);
    } 
}

var cambiarTipoCompraCVC = () => {
    if ($('#tipo-compra-cvc').val() == 0 || $('#tipo-compra-cvc').val() == 2) $('#financiado-cvc').addClass('d-none');
    else $('#financiado-cvc').removeClass('d-none');
}

var cambiarTipoCompraCVE = () => {
    if ($('#tipo-compra-ve').val() == 0 || $('#tipo-compra-ve').val() == 2) $('#financiado-ve').addClass('d-none');
    else $('#financiado-ve').removeClass('d-none');
}

var evaluarTipoVehTipoCombVC = () => {
    if ($('#tipo-vehiculo-vc').val() == 0 || $('#tipo-combustible-vc').val() == 0) return;
    let tipovehiculo = $('#tipo-vehiculo-vc').val();
    let tipocombustible = $('#tipo-combustible-vc').val();

    let url = `${baseUrl}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-vc').val(j.RENDIMIENTO.FACTOR);
            $('#unidad-rend-vc').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_vc = parseFloat(j.RENDIMIENTO.FACTOR);           
        }
        if (j.PRECIO_COMBUSTIBLE != null){
            $('#precio-combustible-vc').val(j.PRECIO_COMBUSTIBLE.FACTOR);
            $('#precio-comb-vc').html(j.PRECIO_COMBUSTIBLE.UNIDAD);
            precio_combustible_vc = parseFloat(j.PRECIO_COMBUSTIBLE.FACTOR);           
        }
        if (j.FACTOR_EMISION != null){
            $('#factor-emision-vc').val(j.FACTOR_EMISION.FACTOR);
            factor_emision_vc = parseFloat(j.FACTOR_EMISION.FACTOR);           
        }
        $('#porc-anual-combustible-vc').val(2);
    });
}

var evaluarTipoVehTipoCombCVC = () => {
    cambiarDepartamentoVC();
    if ($('#tipo-vehiculo-cvc').val() == 0 || $('#tipo-combustible-cvc').val() == 0) return;
    let tipovehiculo = $('#tipo-vehiculo-cvc').val();
    let tipocombustible = $('#tipo-combustible-cvc').val();    

    let url = `${baseUrl}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-cvc').val(j.RENDIMIENTO.FACTOR);
            $('#unidad-rend-cvc').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_vc = parseFloat(j.RENDIMIENTO.FACTOR);           
        }
        //if (j.PRECIO_COMBUSTIBLE != null){
        //    $('#precio-combustible-cvc').val(j.PRECIO_COMBUSTIBLE.FACTOR);
        //    $('#precio-comb-cvc').html(j.PRECIO_COMBUSTIBLE.UNIDAD);
        //    precio_combustible_vc = parseFloat(j.PRECIO_COMBUSTIBLE.FACTOR);           
        //}
        if (j.FACTOR_EMISION != null){
            $('#factor-emision-cvc').val(j.FACTOR_EMISION.FACTOR);
            factor_emision_vc = parseFloat(j.FACTOR_EMISION.FACTOR);           
        }
        if (j.PRECIO_VEHICULO != null){
            $('#costo-veh-cvc').val(j.PRECIO_VEHICULO.FACTOR);
            precio_vehiculo_cvc = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
        }   
        $('#porc-anual-combustible-cvc').val(2);
    });
}

var cambiarCongVE = () => {
    var v = $('input[name="rad-ca-ve"]:checked').val() == 1 ? true : false;
    if (v) $('#configuracion-ve').removeClass('d-none');
    else {
        $('#configuracion-ve').addClass('d-none');
        $('#rendimiento-ve').val(rendimiento_ve);
        $('#batería-ve').val(capacidad_bateria);
    }
}

var cambiarCongTE = () => {
    var v = $('input[name="rad-t-ve"]:checked').val() == 1 ? true : false;
    if (v) $('#tarifa-e-ve').removeClass('d-none');
    else {
        $('#tarifa-e-ve').addClass('d-none');
        $('#tarifa-ve').val(tarifa_electricidad);
        $('#porc-aual-ve').val(0);
    }
}

var cambiarCongINC = () => {
    var v = $('input[name="rad-inc-ve"]:checked').val() == 1 ? true : false;
    if (v) $('#incentivo-ve').removeClass('d-none');
    else {
        $('#incentivo-ve').addClass('d-none');
        cambiarTI();
    }
}

var cambiarVE = () => {
    if ($('#tipo-vehiculo-ve').val() == 0) { $('#modelo-ve').parent().addClass('d-none'); $('#modelo-ve').val(0); return; }
    if ($('#tipo-vehiculo-ve').val() > 1) {$('#modelo-ve').parent().addClass('d-none'); $('#modelo-ve').val(0); }
    else $('#modelo-ve').parent().removeClass('d-none');

    if ($('#tipo-vehiculo-ve').val() > 1){
        let url = `${baseUrl}api/calculo/obtenervalorestve?valor1=${$('#tipo-vehiculo-ve').val()}`;
        fetch(url).then(r => r.json()).then(j => {
            if (j == null) return;
            if (j.RENDIMIENTO != null){
                $('#rendimiento-ve').val(j.RENDIMIENTO.FACTOR);
                $('#unidad-rend-ve').html(j.RENDIMIENTO.UNIDAD);
                rendimiento_ve = parseFloat(j.RENDIMIENTO.FACTOR);           
            }

            if (j.CAPACIDAD_BATERIA != null){
                $('#bateria-ve').val(j.CAPACIDAD_BATERIA.FACTOR);
                capacidad_bateria = parseFloat(j.CAPACIDAD_BATERIA.FACTOR);           
            }

            if (j.PRECIO_VEHICULO != null){
                $('#costo-veh-ve').val(j.PRECIO_VEHICULO.FACTOR);
                precio_vehiculo_ve = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
            }
        });
    }
}

var cambiarMVE = () => {
    if ($('#modelo-ve').val() == 0) return;

    let url = `${baseUrl}api/calculo/obtenervalorestvem?valor1=${$('#modelo-ve').val()}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-ve').val(j.RENDIMIENTO.FACTOR);
            $('#unidad-rend-ve').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_ve = parseFloat(j.RENDIMIENTO.FACTOR);           
        }

        if (j.CAPACIDAD_BATERIA != null){
            $('#bateria-ve').val(j.CAPACIDAD_BATERIA.FACTOR);
            capacidad_bateria = parseFloat(j.CAPACIDAD_BATERIA.FACTOR);           
        }

        if (j.PRECIO_VEHICULO != null){
            $('#costo-veh-ve').val(j.PRECIO_VEHICULO.FACTOR);
            precio_vehiculo_ve = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
        }
    });
}

var cambiarTC = () => {
    if ($('#tipo-cargador').val() == 0) { $('#cbo-potencia').parent().addClass('d-none'); return; }
    $('#cbo-potencia').parent().removeClass('d-none')
    if ($('#tipo-cargador').val() == 100){
        $('#cbo-potencia').addClass('d-none');
        $('#cbo-potencia').val(0);
        $('#txt-potencia').removeClass('d-none');
    } else{
        $('#cbo-potencia option').prop('hidden', true);
        $(`#cbo-potencia option[data-idcargador=${$('#tipo-cargador').val()}]`).prop('hidden', false);
        $('#cbo-potencia').removeClass('d-none');
        $('#txt-potencia').addClass('d-none');
    }
    $('#precio-cargador').val('');
    $('#costo-instalacion').val('');
}

var cambiarCP = () => {
    if ($('#cbo-potencia').val() == 0) return;

    let url = `${baseUrl}api/calculo/obtenervalorestccp?valor1=${$('#tipo-cargador').val()}&valor2=${$('#cbo-potencia').val()}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_CARGADOR != null){
            $('#precio-cargador').val(j.PRECIO_CARGADOR.FACTOR);
            precio_cargador = parseFloat(j.PRECIO_CARGADOR.FACTOR);          
        }

        if (j.COSTO_INSTALACION != null){
            $('#costo-instalacion').val(j.COSTO_INSTALACION.FACTOR);
            costo_instalacion = parseFloat(j.COSTO_INSTALACION.FACTOR);           
        }
    });
}

var cambiarDP = () => {
    if ($('#cbo-departamento').val() == 0) return;

    let url = `${baseUrl}api/calculo/obtenervaloresdp?valor1=${$('#cbo-departamento').val()}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.TARIFA_ELECTRICIDAD != null){
            $('#tarifa-ve').val(j.TARIFA_ELECTRICIDAD.FACTOR/100);
            tarifa_electricidad = parseFloat(j.TARIFA_ELECTRICIDAD.FACTOR)/100;          
        }
        $('#porc-aual-ve').val(0);
    });
}

var cambiarTI = () => {
    if ($('#tipo-incentivo').val() == 0) { validarOcultar(); return;} 
    if ($('#tipo-incentivo').val() == 1) {
        $('#horizonte').parent().removeClass('d-none');
        $('#cuota-inc-anual').parent().removeClass('d-none');
        $('#forma-incentivo').parent().addClass('d-none');
        $('#porcentaje-inc').parent().addClass('d-none');
        $('#valor-inc-unico').parent().addClass('d-none');
    } else {
        $('#horizonte').parent().addClass('d-none');
        $('#cuota-inc-anual').parent().addClass('d-none');
        $('#forma-incentivo').parent().removeClass('d-none');
        $('#porcentaje-inc').parent().removeClass('d-none');
        $('#valor-inc-unico').parent().removeClass('d-none');
        cambiarFI();
    }    
}

var cambiarFI = () => {
    if ($('#forma-incentivo').val() == 0) { $('#porcentaje-inc').parent().addClass('d-none'); $('#valor-inc-unico').parent().addClass('d-none'); return; } 
    if ($('#forma-incentivo').val() == 1){
        $('#porcentaje-inc').parent().removeClass('d-none');
        $('#valor-inc-unico').parent().addClass('d-none');
    } else{
        $('#porcentaje-inc').parent().addClass('d-none');
        $('#valor-inc-unico').parent().removeClass('d-none');
    }
}

var validarOcultar = () => {
    $('#horizonte').parent().addClass('d-none');
    $('#cuota-inc-anual').parent().addClass('d-none');
    $('#forma-incentivo').parent().addClass('d-none');
    $('#porcentaje-inc').parent().addClass('d-none');
    $('#valor-inc-unico').parent().addClass('d-none');
}

var cambiarDepartamentoVC = () => {
    let dep = $('#cbo-departamento-cvc').val();
    let tipo_veh = $('#tipo-vehiculo-cvc').val();
    let tipo_comb = $('#tipo-combustible-cvc').val();
    if (dep == 0 || tipo_veh == 0 || tipo_comb == 0) { $('#precio-combustible-cvc').val(0); return; }

    let url = `${baseUrl}api/calculo/obtenervalorpreciocomb?valor1=${tipo_veh}&valor2=${tipo_comb}&valor3=${dep}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_COMBUSTIBLE != null){
            $('#precio-combustible-cvc').val(j.PRECIO_COMBUSTIBLE.FACTOR);
            $('#precio-comb-cvc').html(j.PRECIO_COMBUSTIBLE.UNIDAD);
            precio_combustible_vc = parseFloat(j.PRECIO_COMBUSTIBLE.FACTOR);           
        }
    });
}

//=======================================

var cargarComponentes = () => {
    let urlConsultarTipoTransporte = `${baseUrl}api/tipotransporte/obteneralltipotransporte`;
    let urlConsultarTipoCombustible = `${baseUrl}api/tipocombustible/obteneralltipocombustible`;
    let urlConsultarTipoVehiculoConvencional = `${baseUrl}api/tipovehiculoconvencional/obteneralltipovehiculoconvencional`;
    let urlConsultarTipoVehiculoElectrico = `${baseUrl}api/tipovehiculoelectrico/obteneralltipovehiculoelectrico`;
    let urlConsultarModeloVehiculoElectrico = `${baseUrl}api/tipovehiculoelectrico/obtenerallmodelovehiculoelectrico`;
    let urlConsultarTipoCargador = `${baseUrl}api/tipocargador/obteneralltipocargador`;
    let urlConsultarCargadorPotencia = `${baseUrl}api/tipocargador/obtenerallcargadorpotencia`;
    let urlConsultarDepartamento = `${baseUrl}api/departamento/obteneralldepartamento`;
    Promise.all([
        fetch(urlConsultarTipoTransporte),
        fetch(urlConsultarTipoCombustible),
        fetch(urlConsultarTipoVehiculoConvencional),
        fetch(urlConsultarTipoVehiculoElectrico),
        fetch(urlConsultarModeloVehiculoElectrico),
        fetch(urlConsultarTipoCargador),
        fetch(urlConsultarCargadorPotencia),
        fetch(urlConsultarDepartamento),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarListas);
}

var cargarListas = ([listaTipoTransporte, listaTipoCombustible, listaTipoVehiculoConvencional, listaTipoVehiculoElectrico, listaModeloVehiculoElectrico, urlConsultarTipoCargador, urlConsultarCargadorPotencia, urlConsultarDepartamento]) => {
    let option = '<option value="0">seleccione</option>';
    let opcionestt = listaTipoTransporte.length == 0 ? '' : listaTipoTransporte.map(x => `<option value="${x.ID_TIPO_TRANSPORTE}">${x.NOMBRE}</option>`).join('');
    $(`#servicio-01`).html(`${option}${opcionestt}`);
    $(`#servicio-02`).html(`${option}${opcionestt}`);
    $(`#servicio-03`).html(`${option}${opcionestt}`);
    $(`#servicio-04`).html(`${option}${opcionestt}`);
    $(`#tipo-transporte-01`).html(`${option}${opcionestt}`);
    $(`#tipo-transporte-02`).html(`${option}${opcionestt}`);
    $(`#tipo-transporte-03`).html(`${option}${opcionestt}`);
    $(`#tipo-transporte-04`).html(`${option}${opcionestt}`);

    let opcionestc = listaTipoCombustible.length == 0 ? '' : listaTipoCombustible.map(x => `<option value="${x.ID_TIPO_COMBUSTIBLE}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-combustible-vc`).html(`${option}${opcionestc}`);
    $(`#tipo-combustible-cvc`).html(`${option}${opcionestc}`);

    let opcionestv = listaTipoVehiculoConvencional.length == 0 ? '' : listaTipoVehiculoConvencional.map(x => `<option value="${x.ID_TIPO_VEHICULO_CONV}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-vehiculo-vc`).html(`${option}${opcionestv}`);
    $(`#tipo-vehiculo-cvc`).html(`${option}${opcionestv}`);

    let opcioneste = listaTipoVehiculoElectrico.length == 0 ? '' : listaTipoVehiculoElectrico.map(x => `<option value="${x.ID_TIPO_VEHICULO_ELEC}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-vehiculo-ve`).html(`${option}${opcioneste}`);

    let opcionestm = listaModeloVehiculoElectrico.length == 0 ? '' : listaModeloVehiculoElectrico.map(x => `<option value="${x.ID_MODELO}">${x.NOMBRE}</option>`).join('');
    $(`#modelo-ve`).html(`${option}${opcionestm}`);

    let opcionestpc = urlConsultarTipoCargador.length == 0 ? '' : urlConsultarTipoCargador.map(x => `<option value="${x.ID_CARGADOR}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-cargador`).html(`${option}${opcionestpc}<option value="100">Otro</option>`);

    let opcionescp = urlConsultarCargadorPotencia.length == 0 ? '' : urlConsultarCargadorPotencia.map(x => `<option value="${x.ID_POTENCIA}" data-idcargador="${x.ID_CARGADOR}">${x.POTENCIA}</option>`).join('');
    $(`#cbo-potencia`).html(`${option}${opcionescp}`);

    let opcionesdp = urlConsultarDepartamento.length == 0 ? '' : urlConsultarDepartamento.map(x => `<option value="${x.ID_DEPARTAMENTO}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-departamento`).html(`${option}${opcionesdp}`);
    $(`#cbo-departamento-cvc`).html(`${option}${opcionesdp}`);

    let meses = `<option value="0">seleccione</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>`;
    $('#meses-vc').html(meses);
    $('#meses-cvc').html(meses);
    $('#meses-ve').html(meses);
    $('#meses-01').html(meses);
    $('#meses-02').html(meses);
    $('#meses-03').html(meses);
    $('#meses-04').html(meses);

    let tipocompra = `<option value="0">seleccione</option><option value="1">Financiada</option><option value="2">Directa</option>`;
    $('#tipo-compra-cvc').html(tipocompra);
    $('#tipo-compra-ve').html(tipocompra);

    let anio_credito = `<option value="0">seleccione</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option>`;
    $('#anio-credito-cvc').html(anio_credito);
    $('#anio-credito-ve').html(anio_credito);

    let tipo_inc = `<option value="0">seleccione</option><option value="1">Anual</option><option value="2">Único</option>`;
    $('#tipo-incentivo').html(tipo_inc);

    let forma_inc = `<option value="0">seleccione</option><option value="1">Porcentual</option><option value="2">Directo</option>`;
    $('#forma-incentivo').html(forma_inc);

    let horizonte = `<option value="0">seleccione</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option>`;
    $('#horizonte').html(horizonte);

    let anios = `<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option>`;
    $('#anio_evaluacion').html(anios);
    $('#anio_evaluacion').val(15);

    inicio();
}

var validar = (id) => {
    let v = $(id).val() == "" ? false : $(id).val() >= 0 ? true : false;
    return v;
}

var evaluar = () => {
    //
    if ($('#rad-e2-si').prop('checked')) {
        let cuota_inicial = 0;
        let costo_vehiculo = parseFloat($('#costo-veh-cvc').val());
        let meses_uso = $('#meses-cvc').val();
        let porc_aumento_comb = $('#porc-anual-combustible-cvc').val() / 100;
        //Cuota inicial y carga financiera
        if ($('#tipo-compra-cvc').val() ==  1){
            let porc_cuota_inicial = parseFloat($('#cuota-inicial-cvc').val())/100;            
            cuota_inicial = porc_cuota_inicial * costo_vehiculo;
            let tasa_interes = parseFloat($('#tasa-interes-cvc').val())/100; 
            let primera_carga = (costo_vehiculo - cuota_inicial) * (1 + tasa_interes)
            let anio_credito = $('#anio-credito-cvc').val();
            for (let i = 0; i < anio_credito; i++){
                if (i == 0) arrCargaFinancieraVCNominal[i] = primera_carga / anio_credito;
                else arrCargaFinancieraVCNominal[i] = (primera_carga / anio_credito) * (1 + ipcc)
            }
        } else if ($('#tipo-compra-cvc').val() ==  2) {
            cuota_inicial = costo_vehiculo;
        }
        arrInversionInicialVCNominal[0] = cuota_inicial;

        //Seguro
        if ($('#rad-sv-si-cvc').prop('checked')){
            for (var i = 0; i < 15; i++) {
                if (i == 0) arrSeguroVCNominal[i] = $('#seguro-cvc').val();
                else arrSeguroVCNominal[i] = arrSeguroVCNominal[i-1] * (1 + ipcc);
            }
        }

        //Energia (Electricidad y combustible)
        if ($('#rad-gcs-si-cvc').prop('checked')){
            let gasto_comb = $('#gasto-cvc').val();   
            for (var i = 0; i < 15; i++) {
                if (i == 0) arrEnergiaVCNominal[i] = gasto_comb * 4 * meses_uso;
                else arrEnergiaVCNominal[i] = arrEnergiaVCNominal[i-1] * (1 + ipcc) * (1 + reduccion_eficiencia_motor) * (1 + porc_aumento_comb);
            }
        } else {
            let precio_comb = $('#precio-combustible-cvc').val();
            let km = $('#kilometro-sem-cvc').val();
            let rendimiento = $('#rendimiento-cvc').val();
            let km_anual = (km * 52) * (meses_uso / 12);
            for (var i = 0; i < 15; i++) {
                if (i == 0) arrEnergiaVCNominal[i] = (km_anual / rendimiento) * precio_comb;
                else arrEnergiaVCNominal[i] = arrEnergiaVCNominal[i-1] * (1 + ipcc) * (1 + reduccion_eficiencia_motor) * (1 + porc_aumento_comb);
            }
        }

        //Mantenimiento continuo
        let mantenim_20km = costo_vehiculo * 0.0207533234859675; // 2.1%
        let mantenim_100km = costo_vehiculo * 0.0444362383062531; // 4.44%
        for (var i = 0; i < 15; i++) {
            if (i == 0) arrManteContinuoVCNominal[i] = mantenim_20km;
            else if (i == 1) arrManteContinuoVCNominal[i] = mantenim_100km;
            else arrManteContinuoVCNominal[i] = arrManteContinuoVCNominal[i-1] * (1 + ipcc);
        }

        //Depreciacion vehiculo
        for (var i = 0; i < 15; i++) {
            if (i == 0) depreciacionVC[i] = costo_vehiculo;
            else if (i == 1) depreciacionVC[i] = depreciacionVC[i-1]*0.8;
            else if (i == 2 || i == 3) depreciacionVC[i] = depreciacionVC[i-1]*0.85;
            else if (i == 4 || i == 5 || i == 6) depreciacionVC[i] = depreciacionVC[i-1]*0.9;
            else if (i == 7 || i == 8 || i == 9 || i == 10) depreciacionVC[i] = depreciacionVC[i-1]*0.95;
            else if (i == 11 || i == 12) depreciacionVC[i] = depreciacionVC[i-1]*0.97;
            else if (i == 13 || i == 14) depreciacionVC[i] = depreciacionVC[i-1]*0.98;
        }
        arrReventaVCNominal[14] = depreciacionVC[14];

        //Mantenimiento extraordinario
        let mante_extraordinario = 1500;
        for (var i = 7; i < 15; i++) {
            if (i == 7) arrManteExtraoVCNominal[i] = mante_extraordinario;
            else arrManteExtraoVCNominal[i] = arrManteExtraoVCNominal[i-1] * (1 + ipcc);
        }

        valoresPresenteNetoCuotaInicial(arrInversionInicialVCNominal);
        valoresPresenteNetoCargaFinanciera(arrCargaFinancieraVCNominal);
        valoresPresenteNetoSeguro(arrSeguroVCNominal);
        valoresPresenteNetoEnergiaVC(arrEnergiaVCNominal);
        valoresPresenteNetoManteContinuoVC(arrManteContinuoVCNominal);
        valoresPresenteNetoReventaVC(arrReventaVCNominal);
        valoresPresenteNetoManteExtraoVC(arrManteExtraoVCNominal);
    }

    //Transporte servicio publico
    if ($('#rad-e3-si').prop('checked')){
        let costo_general = 0;
        if ($('#servicio-01').val() > 0){
            let costo_mov = $('#costo-movilidad-01').val();
            let mes_uso = $('#meses-01').val();
            costo_general += costo_mov * mes_uso * 4;
        }
        if ($('#servicio-02').val() > 0){
            let costo_mov = $('#costo-movilidad-02').val();
            let mes_uso = $('#meses-02').val();
            costo_general += costo_mov * mes_uso * 4;
        }
        if ($('#servicio-03').val() > 0){
            let costo_mov = $('#costo-movilidad-03').val();
            let mes_uso = $('#meses-03').val();
            costo_general += costo_mov * mes_uso * 4;
        }
        if ($('#servicio-04').val() > 0){
            let costo_mov = $('#costo-movilidad-04').val();
            let mes_uso = $('#meses-04').val();
            costo_general += costo_mov * mes_uso * 4;
        }

        for (var i = 0; i < 15; i++) {
            if (i == 0) arrServicioPublicoVCNominal[i] = costo_general;
            else arrServicioPublicoVCNominal[i] = arrServicioPublicoVCNominal[i-1] * (1 + ipcc);
        }
        valoresPresenteNetoServicioPublicoVC(arrServicioPublicoVCNominal);
    }

    //Vehiculo electrico
    //Incentivo
    let incentivo_unico = 0;
    let costo_vehiculo_ve = parseFloat($('#costo-veh-ve').val());
    if ($('#rad-inc-si-ve').prop('checked')){
        if ($('#tipo-incentivo').val() == 1) { //anual
            let horizonte = $('#horizonte').val();
            let cuota_incentivo_anual = $('#cuota-inc-anual').val();
            for (var i = 0; i < horizonte; i++) {
                arrIncentivoVENominal[i] = cuota_incentivo_anual;
            }
            valoresPresenteNetoIncentivoVE(arrIncentivoVENominal);
        } else if ($('#tipo-incentivo').val() == 2){
            if ($('#forma-incentivo').val() == 1){ //porcentual
                let porc_incentivo = $('#porcentaje-inc').val() / 100;
                incentivo_unico = costo_vehiculo_ve * porc_incentivo;
            } else if ($('#forma-incentivo').val() == 2) { //directo
                incentivo_unico = $('#valor-inc-unico').val();
            }
        }
    }

    //Recambio bateria VE
    arrRecambioVENominal[7] = costo_vehiculo_ve * 0.15;
    valoresPresenteNetoRecambioVE(arrRecambioVENominal);

    //Mantenimiento continuo VE
    let mantenim_20km_ve = costo_vehiculo_ve * 0.0041067041067; // 0.4%
    let mantenim_100km_ve = costo_vehiculo_ve * 0.0111618111618; // 1.12%
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrManteContinuoVENominal[i] = mantenim_20km_ve;
        else if (i == 1) arrManteContinuoVENominal[i] = mantenim_100km_ve;
        else arrManteContinuoVENominal[i] = arrManteContinuoVENominal[i-1] * (1 + ipcc);
    }

    //Depreciacion vehiculo VE
    for (var i = 0; i < 15; i++) {
        if (i == 0) depreciacionVE[i] = costo_vehiculo_ve;
        else if (i == 1) depreciacionVE[i] = depreciacionVE[i-1]*0.8;
        else if (i == 2 || i == 3) depreciacionVE[i] = depreciacionVE[i-1]*0.85;
        else if (i == 4 || i == 5 || i == 6) depreciacionVE[i] = depreciacionVE[i-1]*0.9;
        else if (i == 7 || i == 8 || i == 9 || i == 10) depreciacionVE[i] = depreciacionVE[i-1]*0.95;
        else if (i == 11 || i == 12) depreciacionVE[i] = depreciacionVE[i-1]*0.97;
        else if (i == 13 || i == 14) depreciacionVE[i] = depreciacionVE[i-1]*0.98;
    }
    arrReventaVENominal[14] = depreciacionVE[14];

    //Cuota inicial y carga financiera
    let cuota_inicial_ve = 0;    
    costo_vehiculo_ve -= incentivo_unico;
    if ($('#tipo-compra-ve').val() ==  1) {
        let porc_cuota_inicial = parseFloat($('#cuota-inicial-ve').val())/100;            
        cuota_inicial_ve = porc_cuota_inicial * costo_vehiculo_ve;
        let tasa_interes = parseFloat($('#tasa-interes-ve').val())/100; 
        let primera_carga = (costo_vehiculo_ve - cuota_inicial_ve) * (1 + tasa_interes)
        let anio_credito_ve = $('#anio-credito-ve').val();
        for (let i = 0; i < anio_credito_ve; i++){
            if (i == 0) arrCargaFinancieraVENominal[i] = primera_carga / anio_credito_ve;
            else arrCargaFinancieraVENominal[i] = (primera_carga / anio_credito_ve) * (1 + ipcc)
        }
    } else if ($('#tipo-compra-ve').val() ==  2) {
        cuota_inicial_ve = costo_vehiculo_ve;
    }
    arrInversionInicialVENominal[0] = cuota_inicial_ve;

    //Seguro VE
    if ($('#rad-sv-si-ve').prop('checked')){
        for (var i = 0; i < 15; i++) {
            if (i == 0) arrSeguroVENominal[i] = $('#seguro-ve').val();
            else arrSeguroVENominal[i] = arrSeguroVENominal[i-1] * (1 + ipcc);
        }
        valoresPresenteNetoSeguroVE(arrSeguroVENominal);
    }

    //Energia VE (Electricidad y combustible)
    let porc_anual_ve = $('#porc-aual-ve').val() / 100;
    let km_semanal_ve = $('#kilometro-sem-ve').val();
    let meses_ve = $('#meses-ve').val();
    let km_anual_ve = (km_semanal_ve * 52) * (meses_ve / 12);
    let rendimiento_ve = $('#rendimiento-ve').val();
    let tarifa_ve = $('#tarifa-ve').val();
    let energia_ve = (km_anual_ve / rendimiento_ve) * tarifa_ve;
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrEnergiaVENominal[i] = energia_ve;
        else arrEnergiaVENominal[i] =arrEnergiaVENominal[i-1] * (1 + ipcc) * (1 + porc_anual_ve);
    }
    
    //Equipo carga e instalacion
    let precio_cargador = parseFloat($('#precio-cargador').val());
    let costo_instalacion = parseFloat($('#costo-instalacion').val());
    let carga_instalacion = precio_cargador + costo_instalacion;

    valoresPresenteNetoEnergiaVE(arrEnergiaVENominal);
    valoresPresenteNetoCuotaInicialVE(arrInversionInicialVENominal);
    valoresPresenteNetoCargaFinancieraVE(arrCargaFinancieraVENominal);
    valoresPresenteNetoManteContinuoVE(arrManteContinuoVENominal);
    valoresPresenteNetoCargaInstalacionVE(carga_instalacion);
    valoresPresenteNetoReventaVE(arrReventaVENominal);

    cambiarAnio();
}

//cuota inicial
var valoresPresenteNetoCuotaInicial = (arr) => {
    arrInversionInicialVCNeto[0] = arr[0]/Math.pow(1+tasa_descuento, -1 + 1);
    valoresAcumuladoCuotaInicial(arrInversionInicialVCNeto)
}

var valoresAcumuladoCuotaInicial = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrInversionInicialVCAcumulado[i] = arrNeto[i];
        else arrInversionInicialVCAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrInversionInicialVCAcumulado[i-1] == undefined ? 0 : arrInversionInicialVCAcumulado[i-1]);
    }
}

//Cuota inicial VE
var valoresPresenteNetoCuotaInicialVE = (arr) => {
    arrInversionInicialVENeto[0] = arr[0]/Math.pow(1+tasa_descuento, -1 + 1);
    valoresAcumuladoCuotaInicialVE(arrInversionInicialVENeto)
}

var valoresAcumuladoCuotaInicialVE = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrInversionInicialVEAcumulado[i] = arrNeto[i];
        else arrInversionInicialVEAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrInversionInicialVEAcumulado[i-1] == undefined ? 0 : arrInversionInicialVEAcumulado[i-1]);
    }
}

//Incentivo VE
var valoresPresenteNetoIncentivoVE = (arr) => {
    for (var i = 0; i < 15; i++) {
        arrIncentivoVENeto[i] = (arr[i] == undefined ? 0 : arr[i]) /Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoIncentivoVE(arrIncentivoVENeto)
}

var valoresAcumuladoIncentivoVE = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrIncentivoVEAcumulado[i] = arrNeto[i];
        else arrIncentivoVEAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrIncentivoVEAcumulado[i-1] == undefined ? 0 : arrIncentivoVEAcumulado[i-1]);
    }
}

//Recambio bateria
var valoresPresenteNetoRecambioVE = (arr) => {
    arrRecambioVENeto[7] = arr[7]/Math.pow(1+tasa_descuento, -1 + 8);
    valoresAcumuladoRecambioVE(arrRecambioVENeto)
}

var valoresAcumuladoRecambioVE = (arrNeto) => {
    for (var i = 7; i < 15; i++) {
        if (i == 7) arrRecambioVEAcumulado[i] = arrNeto[i];
        else arrRecambioVEAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrRecambioVEAcumulado[i-1] == undefined ? 0 : arrRecambioVEAcumulado[i-1]);
    }
}

//carga financiera
var valoresPresenteNetoCargaFinanciera = (arr) => {
    let anio_credito = $('#anio-credito-cvc').val();
    if ($('#tipo-compra-cvc').val() ==  1){
        for (var i = 0; i < anio_credito; i++) {
            arrCargaFinancieraVCNeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
        }
    }   
    valoresAcumuladoCargaFinanciera(arrCargaFinancieraVCNeto)
}

var valoresAcumuladoCargaFinanciera = (arrNeto) => {
    if ($('#tipo-compra-cvc').val() ==  1){
        for (var i = 0; i < 15; i++) {
            if (i == 0) arrCargaFinancieraVCAcumulado[i] = arrNeto[i];
            else arrCargaFinancieraVCAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrCargaFinancieraVCAcumulado[i-1] == undefined ? 0 : arrCargaFinancieraVCAcumulado[i-1]);
        }
    }    
}

//carga financiera VE
var valoresPresenteNetoCargaFinancieraVE = (arr) => {
    let anio_credito = $('#anio-credito-ve').val();
    if ($('#tipo-compra-ve').val() ==  1){
        for (var i = 0; i < anio_credito; i++) {
            arrCargaFinancieraVENeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
        }
    }   
    valoresAcumuladoCargaFinancieraVE(arrCargaFinancieraVENeto)
}

var valoresAcumuladoCargaFinancieraVE = (arrNeto) => {
    if ($('#tipo-compra-ve').val() ==  1){
        for (var i = 0; i < 15; i++) {
            if (i == 0) arrCargaFinancieraVEAcumulado[i] = arrNeto[i];
            else arrCargaFinancieraVEAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrCargaFinancieraVEAcumulado[i-1] == undefined ? 0 : arrCargaFinancieraVEAcumulado[i-1]);
        }
    }    
}

//Seguro
var valoresPresenteNetoSeguro = (arr) => {
    if ($('#rad-sv-si-cvc').prop('checked')){
        for (var i = 0; i < 15; i++) {
            arrSeguroVCNeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
        }
    }
    valoresAcumuladoSeguro(arrSeguroVCNeto)
}

var valoresAcumuladoSeguro = (arrNeto) => {
    if ($('#rad-sv-si-cvc').prop('checked')){ 
        for (var i = 0; i < 15; i++) {
            if (i == 0) arrSeguroVCAcumulado[i] = arrNeto[i];
            else arrSeguroVCAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrSeguroVCAcumulado[i-1] == undefined ? 0 : arrSeguroVCAcumulado[i-1]);
        }
    }    
}

//Seguro VE
var valoresPresenteNetoSeguroVE = (arr) => {
    for (var i = 0; i < 15; i++) {
        arrSeguroVENeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoSeguroVE(arrSeguroVENeto)
}

var valoresAcumuladoSeguroVE = (arrNeto) => {
    if ($('#rad-sv-si-cvc').prop('checked')){ 
        for (var i = 0; i < 15; i++) {
            if (i == 0) arrSeguroVEAcumulado[i] = arrNeto[i];
            else arrSeguroVEAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrSeguroVEAcumulado[i-1] == undefined ? 0 : arrSeguroVEAcumulado[i-1]);
        }
    }    
}

//Energia
var valoresPresenteNetoEnergiaVC = (arr) => {
    for (var i = 0; i < 15; i++) {
        arrEnergiaVCNeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoEnergia(arrEnergiaVCNeto)
}

var valoresAcumuladoEnergia = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrEnergiaVCAcumulado[i] = arrNeto[i];
        else arrEnergiaVCAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrEnergiaVCAcumulado[i-1] == undefined ? 0 : arrEnergiaVCAcumulado[i-1]);
    }   
}

//Energia VE
var valoresPresenteNetoEnergiaVE = (arr) => {
    for (var i = 0; i < 15; i++) {
        arrEnergiaVENeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoEnergiaVE(arrEnergiaVENeto)
}

var valoresAcumuladoEnergiaVE = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrEnergiaVEAcumulado[i] = arrNeto[i];
        else arrEnergiaVEAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrEnergiaVEAcumulado[i-1] == undefined ? 0 : arrEnergiaVEAcumulado[i-1]);
    }   
}

//Mantenimiento Continuo
var valoresPresenteNetoManteContinuoVC = (arr) => {
    for (var i = 0; i < 15; i++) {
        arrManteContinuoVCNeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoManteContinuo(arrManteContinuoVCNeto)
}

var valoresAcumuladoManteContinuo = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrManteContinuoVCAcumulado[i] = arrNeto[i];
        else arrManteContinuoVCAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrManteContinuoVCAcumulado[i-1] == undefined ? 0 : arrManteContinuoVCAcumulado[i-1]);
    }   
}

//Mantenimiento Continuo VE
var valoresPresenteNetoManteContinuoVE = (arr) => {
    for (var i = 0; i < 15; i++) {
        arrManteContinuoVENeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoManteContinuoVE(arrManteContinuoVENeto)
}

var valoresAcumuladoManteContinuoVE = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrManteContinuoVEAcumulado[i] = arrNeto[i];
        else arrManteContinuoVEAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrManteContinuoVEAcumulado[i-1] == undefined ? 0 : arrManteContinuoVEAcumulado[i-1]);
    }   
}

//Carga e instalacion
var valoresPresenteNetoCargaInstalacionVE = (carga_instalacion) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrCargaInstalacionVEAcumulado[i] = carga_instalacion;
        else arrCargaInstalacionVEAcumulado[i] = 0 + (arrCargaInstalacionVEAcumulado[i-1] == undefined ? 0 : arrCargaInstalacionVEAcumulado[i-1]);
    }
}

//Reventa
var valoresPresenteNetoReventaVC = (arr) => {
    arrReventaVCNeto[14] = arr[14]/Math.pow(1+tasa_descuento, -1 + 15);
    valoresAcumuladoReventa(arrReventaVCNeto)
}

var valoresAcumuladoReventa = (arrNeto) => {
    arrReventaVCAcumulado[14] = arrNeto[14];
}

//Reventa VE
var valoresPresenteNetoReventaVE = (arr) => {
    arrReventaVENeto[14] = arr[14]/Math.pow(1+tasa_descuento, -1 + 15);
    valoresAcumuladoReventaVE(arrReventaVENeto)
}

var valoresAcumuladoReventaVE = (arrNeto) => {
    arrReventaVEAcumulado[14] = arrNeto[14];
}

//Mantenimiento Extraordinario
var valoresPresenteNetoManteExtraoVC = (arr) => {
    for (var i = 7; i < 15; i++) {
        arrManteExtraoVCNeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoManteExtrao(arrManteExtraoVCNeto)
}

var valoresAcumuladoManteExtrao = (arrNeto) => {
    for (var i = 7; i < 15; i++) {
        if (i == 7) arrManteExtraoVCAcumulado[i] = arrNeto[i];
        else arrManteExtraoVCAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrManteExtraoVCAcumulado[i-1] == undefined ? 0 : arrManteExtraoVCAcumulado[i-1]);
    }   
}

//Transporte Servicio publico
var valoresPresenteNetoServicioPublicoVC = (arr) => {
    for (var i = 0; i < 15; i++) {
        arrServicioPublicoVCNeto[i] = arr[i]/Math.pow(1+tasa_descuento, -1 + (i+1));
    }
    valoresAcumuladoServicioPublico(arrServicioPublicoVCNeto)
}

var valoresAcumuladoServicioPublico = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrServicioPublicoVCAcumulado[i] = arrNeto[i];
        else arrServicioPublicoVCAcumulado[i] = (arrNeto[i] == undefined ? 0 : arrNeto[i]) + (arrServicioPublicoVCAcumulado[i-1] == undefined ? 0 : arrServicioPublicoVCAcumulado[i-1]);
    }
}

//===============
var valores = (arrNeto) => {
    for (var i = 0; i < 15; i++) {
        if (i == 0) arrInversionInicialVCAcumulado[i] = arrNeto[i];
        else arrInversionInicialVCAcumulado[i] = arrNeto[i] + arrNeto[i-1];
    }
}

var cambiarAnio = () => {
    let anio = $('#anio_evaluacion').val() - 1;
    //vehiculo convencional
    $('#eva-cuota-inicial-vc').html(arrInversionInicialVCAcumulado[anio] == null || arrInversionInicialVCAcumulado[anio] == "" || arrInversionInicialVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrInversionInicialVCAcumulado[anio]));
    $('#eva-carga-financiera-vc').html(arrCargaFinancieraVCAcumulado[anio] == null || arrCargaFinancieraVCAcumulado[anio] == "" || arrCargaFinancieraVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrCargaFinancieraVCAcumulado[anio]));
    $('#eva-seguro-vc').html(arrSeguroVCAcumulado[anio] == null || arrSeguroVCAcumulado[anio] == "" || arrSeguroVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrSeguroVCAcumulado[anio]));
    $('#eva-energia-vc').html(arrEnergiaVCAcumulado[anio] == null || arrEnergiaVCAcumulado[anio] == "" || arrEnergiaVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrEnergiaVCAcumulado[anio]));
    $('#eva-mante-continuo-vc').html(arrManteContinuoVCAcumulado[anio] == null || arrManteContinuoVCAcumulado[anio] == "" || arrManteContinuoVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrManteContinuoVCAcumulado[anio]));
    $('#eva-reventa-vc').html(arrReventaVCAcumulado[anio] == null || arrReventaVCAcumulado[anio] == "" || arrReventaVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrReventaVCAcumulado[anio]));
    $('#eva-mante-extraordinario-vc').html(arrManteExtraoVCAcumulado[anio] == null || arrManteExtraoVCAcumulado[anio] == "" || arrManteExtraoVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrManteExtraoVCAcumulado[anio]));
    $('#eva-transporte-vc').html(arrServicioPublicoVCAcumulado[anio] == null || arrServicioPublicoVCAcumulado[anio] == "" || arrServicioPublicoVCAcumulado[anio] == undefined ? 0 : formatoMiles(arrServicioPublicoVCAcumulado[anio]));

    //vehiculo electrico
    $('#eva-cuota-inicial-ve').html(arrInversionInicialVEAcumulado[anio] == null || arrInversionInicialVEAcumulado[anio] == "" || arrInversionInicialVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrInversionInicialVEAcumulado[anio]));
    $('#eva-carga-financiera-ve').html(arrCargaFinancieraVEAcumulado[anio] == null || arrCargaFinancieraVEAcumulado[anio] == "" || arrCargaFinancieraVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrCargaFinancieraVEAcumulado[anio]));
    $('#eva-incentivo-ve').html(arrIncentivoVEAcumulado[anio] == null || arrIncentivoVEAcumulado[anio] == "" || arrIncentivoVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrIncentivoVEAcumulado[anio]));
    $('#eva-seguro-ve').html(arrSeguroVEAcumulado[anio] == null || arrSeguroVEAcumulado[anio] == "" || arrSeguroVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrSeguroVEAcumulado[anio]));
    $('#eva-recambio-ve').html(arrRecambioVEAcumulado[anio] == null || arrRecambioVEAcumulado[anio] == "" || arrRecambioVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrRecambioVEAcumulado[anio]));
    $('#eva-energia-ve').html(arrEnergiaVEAcumulado[anio] == null || arrEnergiaVEAcumulado[anio] == "" || arrEnergiaVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrEnergiaVEAcumulado[anio]));
    $('#eva-mante-continuo-ve').html(arrManteContinuoVEAcumulado[anio] == null || arrManteContinuoVEAcumulado[anio] == "" || arrManteContinuoVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrManteContinuoVEAcumulado[anio]));
    $('#eva-carga-instalacion-ve').html(arrCargaInstalacionVEAcumulado[anio] == null || arrCargaInstalacionVEAcumulado[anio] == "" || arrCargaInstalacionVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrCargaInstalacionVEAcumulado[anio]));
    $('#eva-reventa-ve').html(arrReventaVEAcumulado[anio] == null || arrReventaVEAcumulado[anio] == "" || arrReventaVEAcumulado[anio] == undefined ? 0 : formatoMiles(arrReventaVEAcumulado[anio]));
}

var formatoMiles = (n) => {
    var m = n * 1;
    return m.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}