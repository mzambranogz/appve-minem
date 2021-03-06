﻿//variable mapa
var origen_longitud, origen_latitud, destino_longitud, destino_latitud, distancia, nombre_origen, nombre_destino, veces_semana_g; //variable origen (x, y), destino (x,y), distancia, nombre origen, nombre destino
var directions; //variable mapbox
var arr_ruta_vc = [], arr_ruta_cvc = [], arr_ruta_ve = [], arr_ruta_t1 = [], arr_ruta_t2 = [], arr_ruta_t3 = [], arr_ruta_t4 = []; // array de rutas VC, CVC, VE, SP
var arrTransporteMarcar = []

//var arr_ruta_vc_bd = [], arr_ruta_cvc_bd = [], arr_ruta_ve_bd = [], arr_ruta_t1_bd = [], arr_ruta_t2_bd = [], arr_ruta_t3_bd = [], arr_ruta_t4_bd = []; // array de rutas VC, CVC, VE, SP
var arr_veh_ruta_bd = [];

var validar_escenario, accion;

//variable lista para graficos
var Lista_convencional = [], Lista_electrico = [], Lista_leyenda = [], Lista_consumo_energ_vc = [], Lista_consumo_energ_ve = [], Lista_emision_vc = [], Lista_emision_ve = [], Lista_contaminante_local = [];

var rendimiento_vc_g = 0, precio_combustible_vc_g = 0, factor_emision_vc = 0, rendimiento_cvc_g = 0, precio_combustible_cvc_g = 0, factor_emision_cvc_g = 0, precio_vehiculo_cvc_g = 0;
var rendimiento_ve_g = 0, capacidad_bateria_g = 0, precio_cargador_g = 0, costo_instalacion_g = 0, precio_vehiculo_ve_g = 0, precio_vehiculo_ve_g = 0, tarifa_electricidad_g = 0;
var tasa_interes_g = 10.00, anio_credito_g = 5, cuota_inicial_g = 10.00
var tasa_interes_temp_g = 0, anio_credito_temp_g = 0, cuota_inicial_temp_g = 0
var kilometro_g = 0

$(document).ready(() => {
    //configuracion();
    mapa();
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
    $('input[name="rad-e2"]').on('change', (e) => cambiarPregunta01());
    $('input[name="rad-e1"]').on('change', (e) => cambiarPregunta02());
    $('input[name="rad-e3"]').on('change', (e) => mostrarTransportes());
    $('input[name="rad-ca-vc"]').on('change', (e) => cambiarCongVC());
    $('input[name="rad-gcs-vc"]').on('change', (e) => cambiarCongGCVC());
    $('input[name="rad-ca-cvc"]').on('change', (e) => cambiarCongCVC());
    $('input[name="rad-gcs-cvc"]').on('change', (e) => cambiarCongGCCVC());
    //$('input[name="rad-sv-cvc"]').on('change', (e) => cambiarSeguroCVC());
    //$('input[name="rad-sv-ve"]').on('change', (e) => cambiarSeguroCVE());
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
    $('#cbo-departamento-cvc').on('change', (e) => cambiarDepartamentoCVC());
    $('#cbo-departamento-vc').on('change', (e) => cambiarDepartamentoVC());

    $('#btnAdd-vc').on('click', (e) => mostrarRutas(e));
    $('#btnAdd-cvc').on('click', (e) => mostrarRutas(e));
    $('#btnAdd-ve').on('click', (e) => mostrarRutas(e));
    $('#btnAdd-t1').on('click', (e) => mostrarRutas(e));
    $('#btnAdd-t2').on('click', (e) => mostrarRutas(e));
    $('#btnAdd-t3').on('click', (e) => mostrarRutas(e));
    $('#btnAdd-t4').on('click', (e) => mostrarRutas(e));
    $('#btn-nueva-ruta').on('click', (e) => nuevaRuta(e));
    $('#aceptar-ruta').on('click', (e) => aceptarRuta());
    $('#cerrar-rutas').on('click', (e) => atrasRuta())
    $('#btn-cerrar').on('click', (e) => ocultarMapa());
    $('#btnGuardar').on('click', (e) => guardarResultados());
    $('#btnNuevo').on('click', (e) => nuevoCalculo());

    $('#btn-distancia').on('click', (e) => obtenerDistancia());
    $('#btn-copiar-ruta').on('click', (e) => copiarRuta());
    $('#btn-ruta-frecuente').on('click', (e) => mostrarRutasBD());
    $('#cerrar-rutas-bd').on('click', (e) => atrasRutaFrecuente())
    $('#rendimiento-vc').on('keyup', (e) => obtenerFactorEmisionVC());
    $('#rendimiento-cvc').on('keyup', (e) => obtenerFactorEmisionCVC());

});

var mapa = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3phcmtsb3oiLCJhIjoiY2tsaDRoenNjMjRjcDJ2cXR4a2FrOHFtMSJ9.IubP7nyb7i-2Rvoyg_bLlA';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.03101439999999, -12.016025599999999],
        zoom: 5
    });

    var nav = new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true
    });
    map.addControl(nav);

    map.addControl(new mapboxgl.FullscreenControl());
    map.addControl(new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    //map.on('mousemove', function (e) {
    //    document.getElementById('coordenadas').innerHTML = JSON.stringify(e.lngLat);
    //});

    directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving',
        //alternatives: true, //aparecen las opciones de llegar al destino
        compile: function(c){
            console.log(c)
        },
        controls: {
            profileSwitcher: false
        },
        geocoder: {
            //language: "es",
            bbox: [-81.33531256420639, -18.35532317840149, -68.64771000999576, -0.03322135965653],
        },
        placeholderDestination: "Escoge una ubicación de destino",
        placeholderOrigin: "Escoge una ubicación de origen"
    });

    map.addControl(directions, 'top-left');

    directions.on('route', function (e) {
        distancia = e.route[0].distance;
        let tm = e.route[0].legs[0].steps.length == 0 ? 0 : e.route[0].legs[0].steps.length - 1;
        nombre_origen = e.route[0].legs[0].steps[0].name;
        nombre_destino = e.route[0].legs[0].steps[tm].name;
        $('.mapbox-directions-route-summary').html(`<h1>Distancia:</h1>&nbsp;<h1>${Math.round((parseFloat(distancia)/1000)*100)/100} km</h1>`)
        //console.log(e.route[0].distance); // Logs the current route shown in the interface.
    });

    $('.mapboxgl-ctrl-bottom-right').addClass('d-none');
    $('.mapboxgl-ctrl-bottom-left').addClass('d-none');
    $('#seccion-mapa').addClass('d-none')
}

var getCoordenadas = () => {
    veces_semana_g = $('#veces-semana').val() == "" ? 0 : parseInt($('#veces-semana').val());
    if (directions.getOrigin().geometry == undefined || directions.getDestination().geometry == undefined) {
        alert("Debe seleccionar el origen y destino"); return;
    }
    if (veces_semana_g == 0){
        alert("Debe ingresar las veces por semana que utiliza esta ruta"); return;
    }

    origen_longitud = directions.getOrigin().geometry.coordinates[0];
    origen_latitud = directions.getOrigin().geometry.coordinates[1];
    destino_longitud = directions.getDestination().geometry.coordinates[0];
    destino_latitud = directions.getDestination().geometry.coordinates[1];

    //if (accion == 0) agregarRuta(validar_escenario == 'vc' ? arr_ruta_vc : validar_escenario == 'cvc' ? arr_ruta_cvc : validar_escenario == 've' ? arr_ruta_ve : validar_escenario == 't1' ? arr_ruta_t1 : validar_escenario == 't2' ? arr_ruta_t2 : validar_escenario == 't3' ? arr_ruta_t3 : validar_escenario == 't4' ? arr_ruta_t4 : []);
    //else actualizarRuta(validar_escenario == 'vc' ? arr_ruta_vc : validar_escenario == 'cvc' ? arr_ruta_cvc : validar_escenario == 've' ? arr_ruta_ve : validar_escenario == 't1' ? arr_ruta_t1 : validar_escenario == 't2' ? arr_ruta_t2 : validar_escenario == 't3' ? arr_ruta_t3 : validar_escenario == 't4' ? arr_ruta_t4 : []);  

    alert("Se guardó la ruta exitosamente");
    $('#seccion-mapa').addClass('d-none');
    $('#seccion-menu-ruta').removeClass('d-none');
    listarRutas();
}

//var agregarRuta = (arr) => {
//    arr.push({
//        ID_RUTA: arr.length + 1,
//        ORIGEN: `${origen_longitud}, ${origen_latitud}`,
//        DESTINO: `${destino_longitud}, ${destino_latitud}`,
//        NOMBRE_ORIGEN: nombre_origen,
//        NOMBRE_DESTINO: nombre_destino,
//        DISTANCIA: Math.round((parseFloat(distancia)/1000)*100)/100,
//        VECES_SEMANA: veces_semana_g
//    });
//}

//var actualizarRuta = (arr) => {
//    v = arr.find(x => { return x.ID_RUTA == accion; }) == undefined ? false : true;
//    if (v) {
//        let i = arr.findIndex(x => { return x.ID_RUTA == accion; });
//        arr[i].ORIGEN = `${origen_longitud}, ${origen_latitud}`;
//        arr[i].DESTINO = `${destino_longitud}, ${destino_latitud}`;
//        arr[i].NOMBRE_ORIGEN = nombre_origen;
//        arr[i].NOMBRE_DESTINO = nombre_destino;
//        arr[i].DISTANCIA = Math.round((parseFloat(distancia)/1000)*100)/100;
//        arr[i].VECES_SEMANA = veces_semana_g
//    }
//}

var actualizarRuta = (arr) => {
    v = arr.find(x => { return x.ID_RUTA == accion; }) == undefined ? false : true;
    if (v) {
        let i = arr.findIndex(x => { return x.ID_RUTA == accion; });
        arr[i].ORIGEN = `${origen_longitud}, ${origen_latitud}`;
        arr[i].DESTINO = `${destino_longitud}, ${destino_latitud}`;
        arr[i].KM_DIARIO = Math.round((parseFloat(distancia)/1000)*100)/100;
    }
}

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
    //cambiarSeguroCVC()
    cambiarTipoCompraCVC();
    cambiarVE();
    //Compra Vehiculo Electrico
    $('#rad-ca-no-ve').prop('checked', true);
    cambiarCongVE();
    cambiarTC();
    $('#rad-t-no-ve').prop('checked', true);
    cambiarCongTE();
    cambiarTipoCompraCVE();
    //$('#rad-sv-no-ve').prop('checked', true);
    //cambiarSeguroCVE();
    $('#rad-inc-no-ve').prop('checked', true);
    cambiarCongINC();
    //cambiarTI();
    //cambiarFI();
}

$(document).on('change mousedown mousemove', '#mantenimiento-vc', () => {
    $('#valor-mantenimiento-vc').html(formatoMiles($('#mantenimiento-vc').val()));
});

$(document).on('change mousedown mousemove', '#seguro-vc', () => {
    $('#valor-seguro-vc').html(formatoMiles($('#seguro-vc').val()));
});

$(document).on('change mousedown mousemove', '#seguro-cvc', () => {
    $('#valor-seguro-cvc').html(formatoMiles($('#seguro-cvc').val()));
});

$(document).on('change mousedown mousemove', '#costo-veh-cvc', () => {
    $('#valor-costo-veh-cvc').html(formatoMiles($('#costo-veh-cvc').val()));
});

$(document).on('change mousedown mousemove', '#costo-veh-ve', () => {
    $('#valor-costo-veh-ve').html(formatoMiles($('#costo-veh-ve').val()));
});

$(document).on('change mousedown mousemove', '#seguro-ve', () => {
    $('#valor-seguro-ve').html(formatoMiles($('#seguro-ve').val()));
});

var mostrarTransportes = () => {
    if ($('#rad-e3-si').prop('checked')){
        $('#seccion-02').removeClass('d-none');
    } else {
        $('#seccion-02').addClass('d-none');
        arrTransporteMarcar = []
        $('[id*="chk-tp-"]').prop('checked', false)
        $('[id*="tipo-transporte-0"]').val(0)
        $('[id*="costo-movilidad-0"]').val(0)
        $('[id*="kilometros-0"]').val(0)
        $('[id*="meses-0"]').val(0)
    }
}

var comenzar = () => {
    let p1 = $('#rad-e1-si').prop('checked') ? true : $('#rad-e1-no').prop('checked') ? true : false; 
    let p2 = $('#rad-e2-si').prop('checked') ? true : $('#rad-e2-no').prop('checked') ? true : false;
    let p3 = $('#rad-e3-si').prop('checked') ? true : $('#rad-e3-no').prop('checked') ? true : false;
    if (!(p1 && p2 && p3)) {alert('Debe seleccionar todas las opciones'); return;}

    if ($('#rad-e3-si').prop('checked')) {
        let tp = arrTransporteMarcar.length == 0 ? false : true;
        if (!tp)  {alert('Debe seleccionar al menos un tipo de transporte'); return;}
        for (var i = 0; i < 4; i++) {
            if (arrTransporteMarcar.length > i) {
                $(`#transporte-0${i+1}`).removeClass('d-none');
                $(`#tipo-transporte-0${i+1}`).val(arrTransporteMarcar[i].ID)
                $(`#meses-0${i+1}`).val(12)
            } else {
                $(`#transporte-0${i+1}`).addClass('d-none');
                $(`#tipo-transporte-0${i+1}`).val(0)
            }
        }
    }    

    $('#seccion-01').addClass('d-none');
    //if ($('#rad-e3-si').prop('checked')) $('#seccion-02').removeClass('d-none');
    if ($('#rad-e1-si').prop('checked')) $('#seccion-03').removeClass('d-none');
    else if ($('#rad-e2-si').prop('checked')) $('#seccion-04').removeClass('d-none');
    else if ($('#rad-e3-si').prop('checked')) $('#seccion-05').removeClass('d-none');
    else $('#seccion-06').removeClass('d-none');
}

var regresar1 = () => {
    $('#seccion-01').removeClass('d-none');
    $('#seccion-02').addClass('d-none');
}

var siguiente1 = () => {
    //let tp1 = $('#servicio-01').val() == 0 ? false : true;
    //let tp2 = $('#servicio-02').val() == 0 ? false : true;
    //let tp3 = $('#servicio-03').val() == 0 ? false : true;
    //let tp4 = $('#servicio-04').val() == 0 ? false : true;
    //if (!(tp1 || tp2 || tp3 || tp4))  {alert('Debe seleccionar al menos un tipo de transporte'); return;}
    //if ($('#servicio-01').val() > 0) $('#transporte-01').removeClass('d-none');
    //else $('#transporte-01').addClass('d-none');
    //if ($('#servicio-02').val() > 0) $('#transporte-02').removeClass('d-none');
    //else $('#transporte-02').addClass('d-none');
    //if ($('#servicio-03').val() > 0) $('#transporte-03').removeClass('d-none');
    //else $('#transporte-03').addClass('d-none');
    //if ($('#servicio-04').val() > 0) $('#transporte-04').removeClass('d-none');
    //else $('#transporte-04').addClass('d-none');
    //$('#tipo-transporte-01').val($('#servicio-01').val() == null ? 0 : $('#servicio-01').val());
    //$('#tipo-transporte-02').val($('#servicio-02').val() == null ? 0 : $('#servicio-02').val());
    //$('#tipo-transporte-03').val($('#servicio-03').val() == null ? 0 : $('#servicio-03').val());
    //$('#tipo-transporte-04').val($('#servicio-04').val() == null ? 0 : $('#servicio-04').val());

    let tp = arrTransporteMarcar.length == 0 ? false : true;
    if (!tp)  {alert('Debe seleccionar al menos un tipo de transporte'); return;}
    for (var i = 0; i < 4; i++) {
        if (arrTransporteMarcar.length > i) {
            $(`#transporte-0${i+1}`).removeClass('d-none');
            $(`#tipo-transporte-0${i+1}`).val(arrTransporteMarcar[i].ID)
        } else {
            $(`#transporte-0${i+1}`).addClass('d-none');
            $(`#tipo-transporte-0${i+1}`).val(0)
        }
    }

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
    let dp = $('#cbo-departamento-vc').val() > 0 ? true : false;
    let rendimiento = $('#rendimiento-vc').val() >= 0 ? true : false;
    let precio_comb = $('#precio-combustible-vc').val() >= 0 ? true : false;
    let porc_comb = $('#porc-anual-combustible-vc').val() >= 0 ? true : false;
    let factor_emision = $('#factor-emision-vc').val() >= 0 ? true : false;
    //let mantenimiento = $('#mantenimiento-vc').val() >= 0 ? true : false;
    //let seguro = $('#seguro-vc').val() >= 0 ? true : false;
    let mantenimiento = $('#rad-ca-si-vc').prop('checked') ? validar('#mantenimiento-vc') : true;
    let seguro = $('#rad-ca-si-vc').prop('checked') ? validar('#seguro-vc') : true;
    //let gasto_comb = $('#rad-gcs-si-vc').prop('checked') ? $('#gasto-vc').val() >= 0 ? true : false : true;
    let gasto_comb = $('#rad-ca-si-vc').prop('checked') ? validar('#gasto-vc') : true;
    let kilometros = validar('#kilometro-sem-vc');
    let meses = $('#rad-ca-si-vc').prop('checked') ? $('#meses-vc').val() > 0 ? true : false : true;
    if (!(tv && tc && dp && rendimiento && precio_comb && porc_comb && factor_emision && mantenimiento && seguro && gasto_comb && kilometros && meses))  {alert('Debe completar todos los campos'); return;}

    $('#kilometro-sem-ve').val($('#kilometro-sem-vc').val())
    $('#cbo-departamento').val($('#cbo-departamento-vc').val())
    cambiarDP()

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
    let dp = $('#cbo-departamento-cvc').val() > 0 ? true : false;
    let rendimiento = $('#rendimiento-cvc').val() >= 0 ? true : false;
    let precio_comb = $('#precio-combustible-cvc').val() >= 0 ? true : false;
    let porc_comb = $('#porc-anual-combustible-cvc').val() >= 0 ? true : false;
    let factor_emision = $('#factor-emision-cvc').val() >= 0 ? true : false;    
    //let gasto_comb = $('#rad-gcs-si-cvc').prop('checked') ? $('#gasto-cvc').val() >= 0 ? true : false : true;
    let gasto_comb = $('#rad-ca-si-cvc').prop('checked') ? validar('#gasto-cvc') : true;
    let kilometros = validar('#kilometro-sem-cvc');
    let meses = $('#rad-ca-si-cvc').prop('checked') ? $('#meses-cvc').val() > 0 ? true : false : true;
    //let costo_vehiculo = $('#costo-veh-cvc').val() >= 0 ? true : false;
    let costo_vehiculo = $('#rad-ca-si-cvc').prop('checked') ? validar('#costo-veh-cvc') : true;
    let tipo_compra = $('#tipo-compra-cvc').val() > 0 ? true : false;
    let financiamiento = $('#tipo-compra-cvc').val() == 2 ? costo_vehiculo : $('#tipo-compra-cvc').val() == 1 ? $('#tasa-interes-cvc').val() >= 0 && $('#anio-credito-cvc').val() > 0 && $('#cuota-inicial-cvc').val() >= 0 ? true : false : false;
    //let seguro = $('#rad-sv-si-cvc').prop('checked') ? $('#seguro-cvc').val() >= 0 ? true : false : true;
    let seguro = $('#rad-ca-si-cvc').prop('checked') ? validar('#seguro-cvc') : true;

    if (!(tv && tc && dp && rendimiento && precio_comb && porc_comb && factor_emision && gasto_comb && kilometros && meses && costo_vehiculo && tipo_compra && financiamiento && seguro))  {alert('Debe completar todos los campos'); return;}

    $('#kilometro-sem-ve').val($('#kilometro-sem-cvc').val())
    if ($('#tipo-compra-cvc').val() == 1) {
        tasa_interes_temp_g = $('#tasa-interes-cvc').val()
        anio_credito_temp_g = $('#anio-credito-cvc').val()
        cuota_inicial_temp_g = $('#cuota-inicial-cvc').val()
        $('#tasa-interes-ve').val(tasa_interes_temp_g)
        $('#anio-credito-ve').val(anio_credito_temp_g)
        $('#cuota-inicial-ve').val(cuota_inicial_temp_g)
    } else if ($('#tipo-compra-cvc').val() == 2) {
        tasa_interes_temp_g = 0
        anio_credito_temp_g = 0
        cuota_inicial_temp_g = 0
    }
    $('#tipo-compra-ve').val($('#tipo-compra-cvc').val())
    cambiarTipoCompraCVE()

    $('#cbo-departamento').val($('#cbo-departamento-cvc').val())
    cambiarDP()

    $('#seccion-04').addClass('d-none');
    if ($('#rad-e3-si').prop('checked')) $('#seccion-05').removeClass('d-none');
    else $('#seccion-06').removeClass('d-none'); 
}

var regresar4 = () => {
    $('#seccion-05').addClass('d-none');
    if ($('#rad-e2-si').prop('checked')) $('#seccion-04').removeClass('d-none');
    else if ($('#rad-e1-si').prop('checked')) $('#seccion-03').removeClass('d-none');
    //else if ($('#rad-e3-si').prop('checked')) $('#seccion-02').removeClass('d-none');
    else if ($('#rad-e3-si').prop('checked')) $('#seccion-01').removeClass('d-none');
    else $('#seccion-01').removeClass('d-none');
}

var siguiente4 = () => {
    //let tp1 = $('#servicio-01').val() == 0 ? true : validar('#costo-movilidad-01') && validar('#kilometros-01') && $('#meses-01').val() > 0 ? true : false;
    //let tp2 = $('#servicio-02').val() == 0 ? true : validar('#costo-movilidad-02') && validar('#kilometros-02') && $('#meses-02').val() > 0 ? true : false;
    //let tp3 = $('#servicio-03').val() == 0 ? true : validar('#costo-movilidad-03') && validar('#kilometros-03') && $('#meses-03').val() > 0 ? true : false;
    //let tp4 = $('#servicio-04').val() == 0 ? true : validar('#costo-movilidad-04') && validar('#kilometros-04') && $('#meses-04').val() > 0 ? true : false;

    let tp1 = $('#tipo-transporte-01').val() == 0 ? true : validar('#costo-movilidad-01') && validar('#kilometros-01') && $('#meses-01').val() > 0 ? true : false;
    let tp2 = $('#tipo-transporte-02').val() == 0 ? true : validar('#costo-movilidad-02') && validar('#kilometros-02') && $('#meses-02').val() > 0 ? true : false;
    let tp3 = $('#tipo-transporte-03').val() == 0 ? true : validar('#costo-movilidad-03') && validar('#kilometros-03') && $('#meses-03').val() > 0 ? true : false;
    let tp4 = $('#tipo-transporte-04').val() == 0 ? true : validar('#costo-movilidad-04') && validar('#kilometros-04') && $('#meses-04').val() > 0 ? true : false;
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
    let recambio = $('#rad-ca-si-ve').prop('checked') ? $('#anio-recambio-ve').val() > 0 ? true : false : true;
    let tipo_cargador = false, potencia = false, precio_cargador = false, costo_instalacion = false
    if ($('#tipo-vehiculo-ve').val() > 1) {
        tipo_cargador = true;
        potencia = true;
        precio_cargador = validar('#precio-cargador');
        costo_instalacion = validar('#costo-instalacion');
    } else {
        tipo_cargador = $('#tipo-cargador').val() > 0 ? true: false;
        potencia = tipo_cargador ? $('#tipo-cargador').val() == 100 ? validar('#txt-potencia') : $('#cbo-potencia').val() > 0 ? true : false : false;
        precio_cargador = validar('#precio-cargador');
        costo_instalacion = validar('#costo-instalacion');
    }
    //let tipo_cargador = $('#tipo-cargador').val() > 0 ? true: false;
    //let potencia = tipo_cargador ? $('#tipo-cargador').val() == 100 ? validar('#txt-potencia') : $('#cbo-potencia').val() > 0 ? true : false : false;
    //let precio_cargador = validar('#precio-cargador');
    //let costo_instalacion = validar('#costo-instalacion');
    let departamento = $('#cbo-departamento').val() > 0 ? true : false;
    let tarifa = $('#rad-ca-si-ve').prop('checked') ? validar('#tarifa-ve') : true;
    let porc_anual_elec = $('#rad-ca-si-ve').prop('checked') ? validar('#porc-aual-ve') : true;
    let kilometros = validar('#kilometro-sem-ve');
    let meses = $('#rad-ca-si-ve').prop('checked') ? $('#meses-ve').val() > 0 ? true : false : true;
    let costo_vehiculo = $('#rad-ca-si-ve').prop('checked') ? validar('#costo-veh-ve') : true;
    let tipo_compra = $('#tipo-compra-ve').val() > 0 ? true : false;
    let financiamiento = $('#tipo-compra-ve').val() == 2 ? costo_vehiculo : $('#tipo-compra-ve').val() == 1 ? $('#tasa-interes-ve').val() >= 0 && $('#anio-credito-ve').val() > 0 && $('#cuota-inicial-ve').val() >= 0 ? true : false : false;
    //let seguro = $('#rad-sv-si-ve').prop('checked') ? $('#seguro-ve').val() >= 0 ? true : false : true;
    let seguro = $('#rad-ca-si-ve').prop('checked') ? validar('#seguro-ve') : true;
    let incentivo = $('#rad-inc-si-ve').prop('checked') ? $('#tipo-incentivo').val() == 1 ? $('#horizonte').val() > 0 && validar('#cuota-inc-anual') ? true : false : $('#tipo-incentivo').val() == 2 ? $('#forma-incentivo').val() > 0 ? $('#forma-incentivo').val() == 1 ? validar('#porcentaje-inc') : $('#forma-incentivo').val() == 2 ? validar('#valor-inc-unico') : false : false : false : true;

    if (!(tve && tm && rendimiento && capacidad_bateria && tipo_cargador && potencia && precio_cargador && costo_instalacion && departamento && tarifa && porc_anual_elec && kilometros && meses && costo_vehiculo && tipo_compra && financiamiento && seguro && incentivo && recambio))  {alert('Debe completar todos los campos'); return;}

    //alert("correcto");

    $('#seccion-06').addClass('d-none');
    $('#seccion-07').removeClass('d-none');
    evaluar();
}

//=======================================

var cambiarPregunta01 = () => {
    var v = $('input[name="rad-e2"]:checked').val() == 1 ? true : false;
    if (v) $('#rad-e1-no').prop('checked', true);
}

var cambiarPregunta02 = () => {
    var v = $('input[name="rad-e1"]:checked').val() == 1 ? true : false;
    if (v) $('#rad-e2-no').prop('checked', true);
}

var cambiarCongVC = () => {
    var v = $('input[name="rad-ca-vc"]:checked').val() == 1 ? true : false;
    if (v) $('#configuracion-vc').removeClass('d-none');
    else {
        $('#configuracion-vc').addClass('d-none');
        $('#rendimiento-vc').val(formatoMiles(Math.round(rendimiento_vc_g * 100)/100));
        $('#precio-combustible-vc').val(formatoMiles(Math.round(precio_combustible_vc_g * 100)/100));
        $('#porc-anual-combustible-vc').val(2);
        $('#factor-emision-vc').val(formatoMiles(Math.round(factor_emision_vc * 100)/100));
        $('#meses-vc').val(12);
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
        $('#rendimiento-cvc').val(formatoMiles(Math.round(rendimiento_cvc_g * 100)/100));
        $('#precio-combustible-cvc').val(formatoMiles(Math.round(precio_combustible_cvc_g * 100)/100));
        $('#porc-anual-combustible-cvc').val(2);
        $('#factor-emision-cvc').val(formatoMiles(Math.round(factor_emision_cvc_g * 100)/100));
        $('#costo-veh-cvc').val(formatoMiles(Math.round(precio_vehiculo_cvc_g * 100)/100));
        $('#meses-cvc').val(12);
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
    if ($('#tipo-compra-cvc').val() == 0 || $('#tipo-compra-cvc').val() == 2) {
        $('#financiado-cvc').addClass('d-none');
        $('#tasa-interes-cvc').val(tasa_interes_g)
        $('#anio-credito-cvc').val(anio_credito_g)
        $('#cuota-inicial-cvc').val(cuota_inicial_g)
    }
    else $('#financiado-cvc').removeClass('d-none');
}

var cambiarTipoCompraCVE = () => {
    if ($('#tipo-compra-ve').val() == 0 || $('#tipo-compra-ve').val() == 2) {
        let tc = $('#rad-e2-si').prop('checked') ? $('#tipo-compra-cvc').val() == 1 : false
        $('#financiado-ve').addClass('d-none');
        $('#tasa-interes-ve').val(tc ? tasa_interes_temp_g : tasa_interes_g)
        $('#anio-credito-ve').val(tc ? anio_credito_temp_g : anio_credito_g)
        $('#cuota-inicial-ve').val(tc ? cuota_inicial_temp_g : cuota_inicial_g)
    }
    else $('#financiado-ve').removeClass('d-none');
}

//end_points //Segundo
var evaluarTipoVehTipoCombVC = () => {
    cambiarDepartamentoVC();
    if ($('#tipo-vehiculo-vc').val() == 0 || $('#tipo-combustible-vc').val() == 0) return;
    let tipovehiculo = $('#tipo-vehiculo-vc').val();
    let tipocombustible = $('#tipo-combustible-vc').val();

    //let url = `${baseUrl}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    let url = `${baseUrlApi}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json();
        else if (response.status == 401) return 401;
        else return 0;
    })
    .then(j => {
        if (j == 401) { console.log("No tiene autorización para realizar este proceso"); }
        else if (j == 0) { console.log("Error"); }
        else {
            if (j == null) return;
            if (j.RENDIMIENTO != null){
                $('#rendimiento-vc').val( formatoMiles(Math.round(j.RENDIMIENTO.FACTOR * 100)/100) );
                $('#unidad-rend-vc').html(j.RENDIMIENTO.UNIDAD);
                rendimiento_vc_g = parseFloat(j.RENDIMIENTO.FACTOR);          
            }
            if (j.FACTOR_EMISION != null){
                $('#factor-emision-vc').val(formatoMiles(Math.round(j.FACTOR_EMISION.FACTOR* 100)/100));
                factor_emision_vc = parseFloat(j.FACTOR_EMISION.FACTOR);           
            }
            $('#porc-anual-combustible-vc').val(2);
        }        
    })
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

//end_points igual a 430
var evaluarTipoVehTipoCombCVC = () => {
    cambiarDepartamentoCVC();
    if ($('#tipo-vehiculo-cvc').val() == 0 || $('#tipo-combustible-cvc').val() == 0) return;
    let tipovehiculo = $('#tipo-vehiculo-cvc').val();
    let tipocombustible = $('#tipo-combustible-cvc').val();    

    //let url = `${baseUrl}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    let url = `${baseUrlApi}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };
    fetch(url, init).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-cvc').val(formatoMiles(Math.round(j.RENDIMIENTO.FACTOR * 100)/100));
            $('#unidad-rend-cvc').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_cvc_g = parseFloat(j.RENDIMIENTO.FACTOR);           
        }
        if (j.FACTOR_EMISION != null){
            $('#factor-emision-cvc').val(formatoMiles(Math.round(j.FACTOR_EMISION.FACTOR * 100)/100));
            factor_emision_cvc_g = parseFloat(j.FACTOR_EMISION.FACTOR);           
        }
        if (j.PRECIO_VEHICULO != null){
            $('#costo-veh-cvc').val(formatoMiles(Math.round(j.PRECIO_VEHICULO.FACTOR * 100)/100));
            $('#valor-costo-veh-cvc').html(formatoMiles(j.PRECIO_VEHICULO.FACTOR));
            precio_vehiculo_cvc_g = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
        }   
        $('#porc-anual-combustible-cvc').val(2);
    });
}

var cambiarCongVE = () => {
    var v = $('input[name="rad-ca-ve"]:checked').val() == 1 ? true : false;
    if (v) $('#configuracion-ve').removeClass('d-none');
    else {
        $('#configuracion-ve').addClass('d-none');
        $('#rendimiento-ve').val(formatoMiles(Math.round(rendimiento_ve_g * 100)/100));
        $('#bateria-ve').val(formatoMiles(Math.round(capacidad_bateria_g * 100)/100));
        $('#tarifa-ve').val(formatoMiles(Math.round(tarifa_electricidad_g * 100)/100));
        $('#porc-aual-ve').val(0);
        $('#costo-veh-ve').val(formatoMiles(Math.round(precio_vehiculo_ve_g * 100)/100));
        $('#valor-costo-veh-ve').html(formatoMiles(Math.round(precio_vehiculo_ve_g * 100)/100));
        $('#anio-recambio-ve').val(8);
        $('#meses-ve').val(12);
    }
}

var cambiarCongTE = () => {
    var v = $('input[name="rad-t-ve"]:checked').val() == 1 ? true : false;
    if (v) $('#tarifa-e-ve').removeClass('d-none');
    else {
        $('#tarifa-e-ve').addClass('d-none');
        $('#tarifa-ve').val(tarifa_electricidad_g);
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

//end_points //Cuarto
var cambiarVE = () => {
    if ($('#tipo-vehiculo-ve').val() == 0) { 
        $('#modelo-ve').parent().addClass('d-none'); 
        $('#modelo-ve').val(0); 
        //$('#sec-precio-instalacion-ve').addClass('d-none')
        $('#tipo-cargador').parent().parent().addClass('d-none')
        $('#costo-veh-ve').val('0')
        $('#seguro-ve').val(0)
        $('#tipo-cargador').val(0)
        cambiarTC()
        return; 
    }

    $('#tipo-cargador').parent().parent().removeClass('d-none')
    if ($('#tipo-vehiculo-ve').val() > 1) {
        $('#modelo-ve').parent().addClass('d-none'); 
        //$('#sec-precio-instalacion-ve').addClass('d-none')
        $('#modelo-ve').val(0);
        //$('#tipo-cargador').val(0);
        $('#seguro-ve').val(0)        

        $('#tipo-cargador option[value=0]').prop('hidden', false)
        $('#tipo-cargador option[value=1]').prop('hidden', false)
        $('#tipo-cargador option[value=2]').prop('hidden', true)
        $('#tipo-cargador option[value=3]').prop('hidden', true)
        $('#tipo-cargador option[value=4]').prop('hidden', true)
        $('#tipo-cargador').val(1)
        cambiarTC()
    }
    else {
        $('#modelo-ve').parent().removeClass('d-none');
        $('#sec-precio-instalacion-ve').removeClass('d-none')
        $('#costo-veh-ve').val('0')
        $('#seguro-ve').val(formatoMiles(1000))
        $('#tipo-cargador').val(0)
        cambiarTC()

        $('#tipo-cargador option[value=0]').prop('hidden', false)
        $('#tipo-cargador option[value=1]').prop('hidden', true)
        $('#tipo-cargador option[value=2]').prop('hidden', false)
        $('#tipo-cargador option[value=3]').prop('hidden', false)
        $('#tipo-cargador option[value=4]').prop('hidden', false)
    }

    if ($('#tipo-vehiculo-ve').val() > 1){
        //let url = `${baseUrl}api/calculo/obtenervalorestve?valor1=${$('#tipo-vehiculo-ve').val()}`;
        let url = `${baseUrlApi}api/calculo/obtenervalorestve?valor1=${$('#tipo-vehiculo-ve').val()}`;
        let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

        fetch(url, init).then(r => r.json()).then(j => {
            if (j == null) return;
            if (j.RENDIMIENTO != null){
                $('#rendimiento-ve').val(formatoMiles(Math.round(j.RENDIMIENTO.FACTOR * 100)/100));
                $('#unidad-rend-ve').html(j.RENDIMIENTO.UNIDAD);
                rendimiento_ve_g = parseFloat(j.RENDIMIENTO.FACTOR);           
            }

            if (j.CAPACIDAD_BATERIA != null){
                $('#bateria-ve').val(formatoMiles(Math.round(j.CAPACIDAD_BATERIA.FACTOR * 100)/100));
                capacidad_bateria_g = parseFloat(j.CAPACIDAD_BATERIA.FACTOR);           
            }

            if (j.PRECIO_VEHICULO != null){
                $('#costo-veh-ve').val(formatoMiles(Math.round(j.PRECIO_VEHICULO.FACTOR * 100)/100));
                $('#valor-costo-veh-ve').html(formatoMiles(j.PRECIO_VEHICULO.FACTOR));
                precio_vehiculo_ve_g = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
            }
        });
    }
}

//end_points //Quinto
var cambiarMVE = () => {
    if ($('#modelo-ve').val() == 0) return;

    //let url = `${baseUrl}api/calculo/obtenervalorestvem?valor1=${$('#modelo-ve').val()}`;
    let url = `${baseUrlApi}api/calculo/obtenervalorestvem?valor1=${$('#modelo-ve').val()}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

    fetch(url, init).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-ve').val(formatoMiles(Math.round(j.RENDIMIENTO.FACTOR * 100)/100));
            $('#unidad-rend-ve').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_ve_g = parseFloat(j.RENDIMIENTO.FACTOR);           
        }

        if (j.CAPACIDAD_BATERIA != null){
            $('#bateria-ve').val(formatoMiles(Math.round(j.CAPACIDAD_BATERIA.FACTOR * 100)/100));
            capacidad_bateria_g = parseFloat(j.CAPACIDAD_BATERIA.FACTOR);           
        }

        if (j.PRECIO_VEHICULO != null){
            $('#costo-veh-ve').val(formatoMiles(Math.round(j.PRECIO_VEHICULO.FACTOR * 100)/100));
            $('#valor-costo-veh-ve').html(formatoMiles(Math.round(j.PRECIO_VEHICULO.FACTOR * 100)/100));
            precio_vehiculo_ve_g = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
        }
    });
}

var cambiarTC = () => {
    /*if ($('#tipo-cargador').val() == 0) { 
        $('#cbo-potencia').parent().addClass('d-none'); 
        $('#precio-cargador').val('0');
        $('#costo-instalacion').val('0');
        return; 
    }
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
    $('#precio-cargador').val('0');
    $('#costo-instalacion').val('0');*/

    if ($('#tipo-cargador').val() == 0) { 
        $('#cbo-potencia').parent().addClass('d-none'); 
        $('#cbo-potencia').val(0)
        cambiarCP()
        //$('#precio-cargador').val('0');
        //$('#costo-instalacion').val('0');
        return; 
    }

    if ($('#tipo-cargador').val() == 1) {
        $('#cbo-potencia option[value=0]').prop('hidden', false)
        $('#cbo-potencia option[value=1]').prop('hidden', false)
        $('#cbo-potencia option[value=2]').prop('hidden', true)
        $('#cbo-potencia option[value=3]').prop('hidden', true)
        $('#cbo-potencia option[value=4]').prop('hidden', true)
    } else if ($('#tipo-cargador').val() == 2) {
        $('#cbo-potencia option[value=0]').prop('hidden', false)
        $('#cbo-potencia option[value=1]').prop('hidden', false)
        $('#cbo-potencia option[value=2]').prop('hidden', true)
        $('#cbo-potencia option[value=3]').prop('hidden', true)
        $('#cbo-potencia option[value=4]').prop('hidden', true)
    } else if ($('#tipo-cargador').val() == 3) {
        $('#cbo-potencia option[value=0]').prop('hidden', false)
        $('#cbo-potencia option[value=1]').prop('hidden', false)
        $('#cbo-potencia option[value=2]').prop('hidden', false)
        $('#cbo-potencia option[value=3]').prop('hidden', false)
        $('#cbo-potencia option[value=4]').prop('hidden', false)
    } else if ($('#tipo-cargador').val() == 4) {
        $('#cbo-potencia option[value=0]').prop('hidden', false)
        $('#cbo-potencia option[value=1]').prop('hidden', true)
        $('#cbo-potencia option[value=2]').prop('hidden', true)
        $('#cbo-potencia option[value=3]').prop('hidden', false)
        $('#cbo-potencia option[value=4]').prop('hidden', false)
    }
    $('#cbo-potencia').parent().removeClass('d-none');
    $('#txt-potencia').addClass('d-none')
    $('#cbo-potencia').val(0)
    cambiarCP()
}

//end_points //Sexto
var cambiarCP = () => {
    if ($('#cbo-potencia').val() == 0) {
        $('#precio-cargador').val(0)
        $('#costo-instalacion').val(0)
        return;
    } 

    //let url = `${baseUrl}api/calculo/obtenervalorestccp?valor1=${$('#tipo-cargador').val()}&valor2=${$('#cbo-potencia').val()}`;
    /*let url = `${baseUrlApi}api/calculo/obtenervalorestccp?valor1=${$('#tipo-cargador').val()}&valor2=${$('#cbo-potencia').val()}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

    fetch(url, init).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_CARGADOR != null){
            $('#precio-cargador').val(formatoMiles(Math.round(j.PRECIO_CARGADOR.FACTOR * 100)/100));
            precio_cargador_g = parseFloat(j.PRECIO_CARGADOR.FACTOR);          
        }

        if (j.COSTO_INSTALACION != null){
            $('#costo-instalacion').val(formatoMiles(Math.round(j.COSTO_INSTALACION.FACTOR * 100)/100));
            costo_instalacion_g = parseFloat(j.COSTO_INSTALACION.FACTOR);           
        }
    });*/
    let tc  = $('#tipo-cargador').val()
    let p   = $('#cbo-potencia').val()
    if (tc == 1) {
        $('#precio-cargador').val(formatoMiles(0))
        $('#costo-instalacion').val(formatoMiles(0*0.2))
    } else if (tc == 2) {
        $('#precio-cargador').val(formatoMiles(0))
        $('#costo-instalacion').val(formatoMiles(0*0.2))
    } else if (tc == 3){
        if (p == 1) {
            $('#precio-cargador').val(formatoMiles(2500))
            $('#costo-instalacion').val(formatoMiles(2500*0.2))
        } else if (p == 2) {
            $('#precio-cargador').val(formatoMiles(3700))
            $('#costo-instalacion').val(formatoMiles(3700*0.2))
        } else if (p == 3) {
            $('#precio-cargador').val(formatoMiles(6000))
            $('#costo-instalacion').val(formatoMiles(6000*0.2))
        } else if (p == 4) {
            $('#precio-cargador').val(formatoMiles(11000))
            $('#costo-instalacion').val(formatoMiles(11000*0.2))
        }
    } else if (tc == 4){
        if (p == 3) {
            $('#precio-cargador').val(formatoMiles(16000))
            $('#costo-instalacion').val(formatoMiles(16000*0.2))
        } else if (p == 4) {
            $('#precio-cargador').val(formatoMiles(25000))
            $('#costo-instalacion').val(formatoMiles(25000*0.2))
        } else {
            $('#precio-cargador').val(formatoMiles(0))
            $('#costo-instalacion').val(formatoMiles(0*0.2))
        }
    }
}

//end_points //Septimo
var cambiarDP = () => {
    if ($('#cbo-departamento').val() == 0) return;

    //let url = `${baseUrl}api/calculo/obtenervaloresdp?valor1=${$('#cbo-departamento').val()}`;
    let url = `${baseUrlApi}api/calculo/obtenervaloresdp?valor1=${$('#cbo-departamento').val()}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

    fetch(url, init).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.TARIFA_ELECTRICIDAD != null){
            $('#tarifa-ve').val(formatoMiles(Math.round(j.TARIFA_ELECTRICIDAD.FACTOR * 100)/10000));
            tarifa_electricidad_g = parseFloat(j.TARIFA_ELECTRICIDAD.FACTOR)/100;          
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

//end_points //Tercero
var cambiarDepartamentoCVC = () => {
    let dep = $('#cbo-departamento-cvc').val();
    let tipo_veh = $('#tipo-vehiculo-cvc').val();
    let tipo_comb = $('#tipo-combustible-cvc').val();
    if (dep == 0 || tipo_veh == 0 || tipo_comb == 0) { $('#precio-combustible-cvc').val(0); return; }

    //let url = `${baseUrl}api/calculo/obtenervalorpreciocomb?valor1=${tipo_veh}&valor2=${tipo_comb}&valor3=${dep}`;
    let url = `${baseUrlApi}api/calculo/obtenervalorpreciocomb?valor1=${tipo_veh}&valor2=${tipo_comb}&valor3=${dep}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

    fetch(url, init).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_COMBUSTIBLE != null){
            $('#precio-combustible-cvc').val(formatoMiles(Math.round(j.PRECIO_COMBUSTIBLE.FACTOR * 100)/100));
            $('#precio-comb-cvc').html(j.PRECIO_COMBUSTIBLE.UNIDAD);
            precio_combustible_cvc_g = parseFloat(j.PRECIO_COMBUSTIBLE.FACTOR);           
        }
    });
}

//end_points igual a la linea 651
var cambiarDepartamentoVC = () => {
    let dep = $('#cbo-departamento-vc').val();
    let tipo_veh = $('#tipo-vehiculo-vc').val();
    let tipo_comb = $('#tipo-combustible-vc').val();
    if (dep == 0 || tipo_veh == 0 || tipo_comb == 0) { $('#precio-combustible-vc').val(0); return; }

    //let url = `${baseUrl}api/calculo/obtenervalorpreciocomb?valor1=${tipo_veh}&valor2=${tipo_comb}&valor3=${dep}`;
    let url = `${baseUrlApi}api/calculo/obtenervalorpreciocomb?valor1=${tipo_veh}&valor2=${tipo_comb}&valor3=${dep}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };
    fetch(url, init).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_COMBUSTIBLE != null){
            $('#precio-combustible-vc').val(formatoMiles(Math.round(j.PRECIO_COMBUSTIBLE.FACTOR * 100)/100));
            $('#precio-comb-vc').html(j.PRECIO_COMBUSTIBLE.UNIDAD);
            precio_combustible_vc_g = parseFloat(j.PRECIO_COMBUSTIBLE.FACTOR);           
        }
    });
}

var obtenerFactorEmisionVC = () => {
    if ($('#tipo-vehiculo-vc').val() == 0 || $('#tipo-combustible-vc').val() == 0) return;
    if ($('#rendimiento-vc').val().length >= 2) {
        setTimeout(obtenerFactorVC, 1500);
    }      
}
var obtenerFactorEmisionCVC = () => {
    if ($('#tipo-vehiculo-cvc').val() == 0 || $('#tipo-combustible-cvc').val() == 0) return;
    if ($('#rendimiento-cvc').val().length >= 2) {
        setTimeout(obtenerFactorCVC, 1500);
    }      
}


var obtenerFactorVC = () => {
    let tipovehiculo = $('#tipo-vehiculo-vc').val();
    let tipocombustible = $('#tipo-combustible-vc').val();
    let rendimiento = parseFloat($('#rendimiento-vc').val().replace(/,/gi, ''));

    //let url = `${baseUrl}api/calculo/obtenerfactoremisionporrendimiento?valor1=${tipocombustible}&tipoveh=${tipovehiculo}&rendimiento=${rendimiento}`; //end point 33
    let url = `${baseUrlApi}api/calculo/obtenerfactoremisionporrendimiento?valor1=${tipocombustible}&tipoveh=${tipovehiculo}&rendimiento=${rendimiento}`; //end point 33
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json();
        else if (response.status == 401) return 401;
        else return 0;
    })
    .then(j => {
        if (j == 401) { console.log("No tiene autorización para realizar este proceso"); }
        else if (j == 0) { console.log("Error"); }
        else {
            if (j == null) return;
            if (j.FACTOR_EMISION != null){
                $(`#factor-emision-vc`).val(formatoMiles(Math.round(j.FACTOR_EMISION.FACTOR * 100)/100));           
            }
        }        
    })
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

var obtenerFactorCVC = () => {
    let tipovehiculo = $('#tipo-vehiculo-cvc').val();
    let tipocombustible = $('#tipo-combustible-cvc').val();
    let rendimiento = parseFloat($('#rendimiento-cvc').val().replace(/,/gi, ''));

    //let url = `${baseUrl}api/calculo/obtenerfactoremisionporrendimiento?valor1=${tipocombustible}&tipoveh=${tipovehiculo}&rendimiento=${rendimiento}`;
    let url = `${baseUrlApi}api/calculo/obtenerfactoremisionporrendimiento?valor1=${tipocombustible}&tipoveh=${tipovehiculo}&rendimiento=${rendimiento}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} };

    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json();
        else if (response.status == 401) return 401;
        else return 0;
    })
    .then(j => {
        if (j == 401) { console.log("No tiene autorización para realizar este proceso"); }
        else if (j == 0) { console.log("Error"); }
        else {
            if (j == null) return;
            if (j.FACTOR_EMISION != null){
                $(`#factor-emision-cvc`).val(formatoMiles(Math.round(j.FACTOR_EMISION.FACTOR * 100)/100));           
            }
        }        
    })
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });
}

//=======================================

//end_points 8 //Primero
var cargarComponentes = () => {
    //let urlConsultarTipoTransporte = `${baseUrl}api/tipotransporte/obteneralltipotransporte`;
    //let urlConsultarTipoCombustible = `${baseUrl}api/tipocombustible/obteneralltipocombustible`;
    //let urlConsultarTipoVehiculoConvencional = `${baseUrl}api/tipovehiculoconvencional/obteneralltipovehiculoconvencional`;
    //let urlConsultarTipoVehiculoElectrico = `${baseUrl}api/tipovehiculoelectrico/obteneralltipovehiculoelectrico`;
    //let urlConsultarModeloVehiculoElectrico = `${baseUrl}api/tipovehiculoelectrico/obtenerallmodelovehiculoelectrico`;
    //let urlConsultarTipoCargador = `${baseUrl}api/tipocargador/obteneralltipocargador`;
    //let urlConsultarCargadorPotencia = `${baseUrl}api/tipocargador/obtenerallcargadorpotencia`;
    //let urlConsultarDepartamento = `${baseUrl}api/departamento/obteneralldepartamento`;
    //let urlConsultarRutas = `${baseUrl}api/calculo/obtenerrutasall?idusuario=${idUsuarioLogin}`; //prioridad 21

    let urlConsultarTipoTransporte = `${baseUrlApi}api/TipoTransporte/obtenerall`;    
    let urlConsultarTipoCombustible = `${baseUrlApi}api/TipoCombustible/obtenerall`;    
    let urlConsultarTipoVehiculoConvencional = `${baseUrlApi}api/TipoVehiculoConvencional/obtenerall`;    
    let urlConsultarTipoVehiculoElectrico = `${baseUrlApi}api/TipovehiculoElectrico/obtenerall`;    
    let urlConsultarModeloVehiculoElectrico = `${baseUrlApi}api/modelovehiculo/obtenerall`;    
    //let urlConsultarTipoCargador = `${baseUrlApi}api/TipoCargador/obteneralltipocargador`;    
    //let urlConsultarCargadorPotencia = `${baseUrlApi}api/TipoCargador/obtenerallcargadorpotencia`;   
    let urlConsultarTipoCargador = `${baseUrlApi}api/modocarga/obtenerallmodocarga`;    
    let urlConsultarCargadorPotencia = `${baseUrlApi}api/potencia/obtenerallpotencia`;
    let urlConsultarDepartamento = `${baseUrlApi}api/Departamento/obteneralldepartamento`;
    let urlConsultarRutas = `${baseUrlApi}api/calculo/obtenerrutasall?idusuario=${idUsuarioLogin}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}};

    Promise.all([
        fetch(urlConsultarTipoTransporte, init),
        fetch(urlConsultarTipoCombustible, init),
        fetch(urlConsultarTipoVehiculoConvencional, init),
        fetch(urlConsultarTipoVehiculoElectrico, init),
        fetch(urlConsultarModeloVehiculoElectrico, init),
        fetch(urlConsultarTipoCargador, init),
        fetch(urlConsultarCargadorPotencia, init),
        fetch(urlConsultarDepartamento, init),
        fetch(urlConsultarRutas, init),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarListas);
}

var cargarListas = ([listaTipoTransporte, listaTipoCombustible, listaTipoVehiculoConvencional, listaTipoVehiculoElectrico, listaModeloVehiculoElectrico, listaTipoCargador, listaCargadorPotencia, listaDepartamento, listaVehiculoRuta]) => {
    let option = '<option value="0">seleccione</option>';
    let checktt = listaTipoTransporte.length == 0 ? '' : listaTipoTransporte.map((x, y) => {
        let col2 = `<div class="col-1"><input class="form-control chk-marcar" type="checkbox" id="chk-tp-${x.ID_TIPO_TRANSPORTE}"></div>`
        let col1 = `<div class="col-5"><i class="fas fa-car"></i>&nbsp;<label for="chk-tp-${x.ID_TIPO_TRANSPORTE}">&nbsp;${x.NOMBRE}</label></div>`;
        let row = `<div class="row">${col1}${col2}</div>`
        return row
    }).join('');
    $('#transporte-publico-chk').html(checktt)
    //let opcionestt = listaTipoTransporte.length == 0 ? '' : listaTipoTransporte.map(x => `<option value="${x.ID_TIPO_TRANSPORTE}">${x.NOMBRE}</option>`).join('');
    //$(`#servicio-01`).html(`${option}${opcionestt}`);
    //$(`#servicio-02`).html(`${option}${opcionestt}`);
    //$(`#servicio-03`).html(`${option}${opcionestt}`);
    //$(`#servicio-04`).html(`${option}${opcionestt}`);

    let opcionestt = listaTipoTransporte.length == 0 ? '' : listaTipoTransporte.map(x => `<option value="${x.ID_TIPO_TRANSPORTE}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-transporte-01`).html(`${option}${opcionestt}`);
    $(`#tipo-transporte-02`).html(`${option}${opcionestt}`);
    $(`#tipo-transporte-03`).html(`${option}${opcionestt}`);
    $(`#tipo-transporte-04`).html(`${option}${opcionestt}`);

    let opcionestc = listaTipoCombustible.length == 0 ? '' : listaTipoCombustible.map(x => `<option value="${x.ID_TIPO_COMBUSTIBLE}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-combustible-vc`).html(`${option}${opcionestc}`);
    $(`#tipo-combustible-cvc`).html(`${option}${opcionestc}`);

    let opcionestv = listaTipoVehiculoConvencional.length == 0 ? '' : listaTipoVehiculoConvencional.map(x => `<option value="${x.ID_TIPO_VEHICULO_CONV}">${x.NOMBRE == null ? "" : x.NOMBRE}</option>`).join('');
    $(`#tipo-vehiculo-vc`).html(`${option}${opcionestv}`);
    $(`#tipo-vehiculo-cvc`).html(`${option}${opcionestv}`);

    let opcioneste = listaTipoVehiculoElectrico.length == 0 ? '' : listaTipoVehiculoElectrico.map(x => `<option value="${x.ID_TIPO_VEHICULO_ELEC}">${x.NOMBRE == null ? "" : x.NOMBRE}</option>`).join('');
    $(`#tipo-vehiculo-ve`).html(`${option}${opcioneste}`);

    let opcionestm = listaModeloVehiculoElectrico.length == 0 ? '' : listaModeloVehiculoElectrico.map(x => `<option value="${x.ID_MODELO}">${x.NOMBRE}</option>`).join('');
    $(`#modelo-ve`).html(`${option}${opcionestm}`);

    //let opcionestpc = listaTipoCargador.length == 0 ? '' : listaTipoCargador.map(x => `<option value="${x.ID_CARGADOR}">${x.NOMBRE}</option>`).join('');
    //$(`#tipo-cargador`).html(`${option}${opcionestpc}<option value="100">Otro</option>`);
    //$(`#tipo-cargador`).html('<option value="0">seleccione</option><option value="1">Modo 1</option><option value="2">Modo 2 (lenta)</option><option value="3">Modo 3 (semi-rápida)</option><option value="4">Modo 4 (Modo rápida)</option>')
    let opcionesmc = listaTipoCargador.length == 0 ? '' : listaTipoCargador.map(x => `<option value="${x.ID_MODO_CARGA}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-cargador`).html(`${option}${opcionesmc}`);

    //let opcionescp = listaCargadorPotencia.length == 0 ? '' : listaCargadorPotencia.map(x => `<option value="${x.ID_POTENCIA}" data-idcargador="${x.ID_CARGADOR}">${x.POTENCIA}</option>`).join('');
    //$(`#cbo-potencia`).html(`${option}${opcionescp}`);
    //$(`#cbo-potencia`).html('<option value="0">seleccione</option><option value="1">3.7</option><option value="2">7.4</option><option value="3">22</option><option value="4">Mayor a 22</option>')
    let opcionescp = listaCargadorPotencia.length == 0 ? '' : listaCargadorPotencia.map(x => `<option value="${x.ID_POTENCIA}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-potencia`).html(`${option}${opcionescp}`);

    let opcionesdp = listaDepartamento.length == 0 ? '' : listaDepartamento.map(x => `<option value="${x.ID_DEPARTAMENTO}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-departamento`).html(`${option}${opcionesdp}`);
    $(`#cbo-departamento-vc`).html(`${option}${opcionesdp}`);
    $(`#cbo-departamento-cvc`).html(`${option}${opcionesdp}`);

    let meses = `<option value="0">seleccione</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option>`;
    $('#meses-vc').html(meses);
    $('#meses-cvc').html(meses);
    $('#meses-ve').html(meses);
    $('#meses-01').html(meses);
    $('#meses-02').html(meses);
    $('#meses-03').html(meses);
    $('#meses-04').html(meses);
    $('#anio-recambio-ve').html(meses);
    $('#anio-recambio-ve').val(8);
    $('#meses-vc').val(12);
    $('#meses-cvc').val(12);
    $('#meses-ve').val(12);

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

    arr_veh_ruta_bd = listaVehiculoRuta;
    
    inicio();
    armarRutasBD();
}

var validar = (id) => {
    let v = $(id).val() == "" ? false : $(id).val().replace(/,/gi, '') >= 0 ? true : false;
    return v;
}

var evaluar = () => {
    let data_vc = {}, data_ve = {}, data_ce_vc = {}, data_ce_ve = {}, data_l = {}, data_em_vc = {}, data_em_ve = {}, data_cm = {};

    //vehiculo convencional costo
    let p1 = $('#rad-e1-si').prop('checked') ? '1' : '0';
    let p2 = $('#rad-e2-si').prop('checked') ? '1' : '0';
    let p3 = $('#rad-e3-si').prop('checked') ? '1' : '0';
    //let p_seguro_vc = $('#rad-sv-si-cvc').prop('checked') ? '1' : '0';
    let p_seguro_vc = $('#seguro-cvc').val() == "" ? '0' : $('#seguro-cvc').val().replace(/,/gi, '') > 0 ? '1' : '0';
    //let p_gasto_combustible = p2 == '1' ? $('#rad-gcs-si-cvc').prop('checked') ? '1' : '0' : p1 == '1' ? $('#rad-gcs-si-vc').prop('checked') ? '1' : '0' : '0';
    let p_gasto_combustible = p2 == '1' ? $('#gasto-cvc').val() == "" ? '0' : $('#gasto-cvc').val().replace(/,/gi, '') > 0 ? '1' : '0' : p1 == '1' ? $('#gasto-vc').val().replace(/,/gi, '') == "" ? '0' : $('#gasto-vc').val().replace(/,/gi, '') > 0 ? '1' : '0' : '0';
    let costo_vehiculo_vc = 0, meses_uso_vc = 0, porc_aumento_comb_vc = 0, tipo_compra_vc = 0;
    let porc_cuota_inicial_vc = 0, tasa_interes_vc = 0, anio_credito_vc = 0, seguro_vc = 0;
    let gasto_combustible_vc = 0, precio_combustible_vc = 0, kilometro_semanal_vc = 0, rendimiento_vc = 0, mantenimiento_vc = 0;
    let factor_emisionvc = 0, tipo_combustible_vc = 0, tipo_vehiculo_vc = 0;
    let lista_servicio_publico = [];
    if (p2 == '1') {
        costo_vehiculo_vc = parseFloat($('#costo-veh-cvc').val().replace(/,/gi, ''));
        meses_uso_vc = $('#meses-cvc').val();
        porc_aumento_comb_vc = $('#porc-anual-combustible-cvc').val().replace(/,/gi, '') / 100;
        factor_emisionvc = $('#factor-emision-cvc').val().replace(/,/gi, '');
        tipo_combustible_vc = $('#tipo-combustible-cvc').val();
        tipo_vehiculo_vc = $('#tipo-vehiculo-cvc').val();
        tipo_compra_vc = $('#tipo-compra-cvc').val();
        if (tipo_compra_vc == 1){
            porc_cuota_inicial_vc = parseFloat($('#cuota-inicial-cvc').val().replace(/,/gi, ''))/100; 
            tasa_interes_vc = parseFloat($('#tasa-interes-cvc').val().replace(/,/gi, ''))/100;
            anio_credito_vc = $('#anio-credito-cvc').val();
        }
        if (p_seguro_vc == '1') seguro_vc = $('#seguro-cvc').val().replace(/,/gi, '');
        if (p_gasto_combustible == '1') gasto_combustible_vc = $('#gasto-cvc').val().replace(/,/gi, '');
        else {
            precio_combustible_vc = $('#precio-combustible-cvc').val().replace(/,/gi, '');            
            rendimiento_vc = $('#rendimiento-cvc').val().replace(/,/gi, '');
        }    
        kilometro_semanal_vc = $('#kilometro-sem-cvc').val().replace(/,/gi, '');
    } else if (p1 == '1') {
        meses_uso_vc = $('#meses-vc').val();
        porc_aumento_comb_vc = $('#porc-anual-combustible-vc').val().replace(/,/gi, '') / 100;
        factor_emisionvc = $('#factor-emision-vc').val().replace(/,/gi, '');
        tipo_combustible_vc = $('#tipo-combustible-vc').val();
        tipo_vehiculo_vc = $('#tipo-vehiculo-vc').val();
        seguro_vc = $('#seguro-vc').val().replace(/,/gi, '');
        if (p_gasto_combustible == '1') gasto_combustible_vc = $('#gasto-vc').val().replace(/,/gi, '');
        else {
            precio_combustible_vc = $('#precio-combustible-vc').val().replace(/,/gi, '');            
            rendimiento_vc = $('#rendimiento-vc').val().replace(/,/gi, '');
        }
        kilometro_semanal_vc = $('#kilometro-sem-vc').val().replace(/,/gi, '');
        mantenimiento_vc = $('#mantenimiento-vc').val().replace(/,/gi, '');
    }

    if (p3 == '1'){
        //if ($('#servicio-01').val() > 0){
        if ($('#tipo-transporte-01').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-01').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-01').val().replace(/,/gi, ''),
                KILOMETRO_SEMANAL: $('#kilometros-01').val().replace(/,/gi, ''),
                MESES_USO: $('#meses-01').val(),
            }
            lista_servicio_publico.push(r);
        }
        //if ($('#servicio-02').val() > 0){
        if ($('#tipo-transporte-02').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-02').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-02').val().replace(/,/gi, ''),
                KILOMETRO_SEMANAL: $('#kilometros-02').val().replace(/,/gi, ''),
                MESES_USO: $('#meses-02').val(),
            }
            lista_servicio_publico.push(r);
        }
        //if ($('#servicio-03').val() > 0){
        if ($('#tipo-transporte-03').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-03').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-03').val().replace(/,/gi, ''),
                KILOMETRO_SEMANAL: $('#kilometros-03').val().replace(/,/gi, ''),
                MESES_USO: $('#meses-03').val(),
            }
            lista_servicio_publico.push(r);
        }
        //if ($('#servicio-04').val() > 0){
        if ($('#tipo-transporte-04').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-04').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-04').val().replace(/,/gi, ''),
                KILOMETRO_SEMANAL: $('#kilometros-04').val().replace(/,/gi, ''),
                MESES_USO: $('#meses-04').val(),
            }
            lista_servicio_publico.push(r);
        }
    }

    data_vc = { 
        P1: p1, P2: p2, P3: p3, COSTO_VEHICULO_VC: costo_vehiculo_vc, MESES_USO_VC: meses_uso_vc, PORC_AUMENTO_COMBUSTIBLE_VC: porc_aumento_comb_vc, TIPO_COMPRA_VC: tipo_compra_vc,
        PORC_CUOTA_INICIAL_VC: porc_cuota_inicial_vc, TASA_INTERES_VC: tasa_interes_vc, ANIO_CREDITO_VC: anio_credito_vc, P_SEGURO_VC: p_seguro_vc, SEGURO_VC: seguro_vc, P_GASTO_COMBUSTIBLE: p_gasto_combustible,
        GASTO_COMBUSTIBLE_VC: gasto_combustible_vc, PRECIO_COMBUSTIBLE_VC: precio_combustible_vc, KILOMETRO_SEMANAL_VC: kilometro_semanal_vc, RENDIMIENTO_VC: rendimiento_vc, MANTENIMIENTO_VC: mantenimiento_vc,
        LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    };

    console.log(data_vc);
    console.log(JSON.stringify(data_vc));

    //Vehiculo electrico costo
    let p_incentivo = $('#rad-inc-si-ve').prop('checked') ? '1' : '0';
    //let p_seguro_ve = $('#rad-sv-si-ve').prop('checked') ? '1' : '0';
    let p_seguro_ve = $('#seguro-ve').val().replace(/,/gi, '') == "" ? '0' : $('#seguro-ve').val().replace(/,/gi, '') > 0 ? '1' : '0';
    let costo_vehiculo_ve = parseFloat($('#costo-veh-ve').val().replace(/,/gi, ''));
    let tipo_incentivo = 0, horizonte = 0, cuota_incentivo_anual = 0, forma_incentivo = 0, porcentaje_incentivo = 0, incentivo_unico = 0;
    if (p_incentivo == '1'){
        tipo_incentivo = $('#tipo-incentivo').val();
        if (tipo_incentivo == 1){
            horizonte = $('#horizonte').val();
            cuota_incentivo_anual = $('#cuota-inc-anual').val().replace(/,/gi, '');
        } else if (tipo_incentivo == 2) {
            forma_incentivo = $('#forma-incentivo').val();
            if (forma_incentivo == 1) {
                porcentaje_incentivo = $('#porcentaje-inc').val().replace(/,/gi, '') / 100;
            } else if (forma_incentivo == 2){
                incentivo_unico = $('#valor-inc-unico').val().replace(/,/gi, '');
            }
        }
    }
    let tipo_compra_ve = $('#tipo-compra-ve').val();
    let porc_cuota_inicial_ve = 0, tasa_interes_ve = 0, anio_credito_ve = 0;
    if (tipo_compra_ve == 1){
        porc_cuota_inicial_ve = parseFloat($('#cuota-inicial-ve').val().replace(/,/gi, ''))/100; 
        tasa_interes_ve = parseFloat($('#tasa-interes-ve').val().replace(/,/gi, ''))/100;
        anio_credito_ve = $('#anio-credito-ve').val();
    }
    let seguro_ve = 0;
    if (p_seguro_ve == '1') seguro_ve = $('#seguro-ve').val().replace(/,/gi, '');
    let porcentaje_anual_ve = $('#porc-aual-ve').val().replace(/,/gi, '') / 100;
    let km_semanal_ve = $('#kilometro-sem-ve').val().replace(/,/gi, '');
    let meses_ve = $('#meses-ve').val();
    let rendimiento_ve = $('#rendimiento-ve').val().replace(/,/gi, '');
    let tarifa_ve = $('#tarifa-ve').val().replace(/,/gi, '');
    let precio_cargador = parseFloat($('#precio-cargador').val().replace(/,/gi, ''));
    let costo_instalacion = parseFloat($('#costo-instalacion').val().replace(/,/gi, ''));
    let capacidad_bateria_ve = $('#bateria-ve').val().replace(/,/gi, '');
    let anio_recambio = $('#anio-recambio-ve').val();
    let tipo_vehiculo_electrico_ve = $('#tipo-vehiculo-ve').val()

    data_ve = { 
        P_INCENTIVO: p_incentivo, P_SEGURO_VE: p_seguro_ve, COSTO_VEHICULO_VE: costo_vehiculo_ve, TIPO_INCENTIVO_VE: tipo_incentivo, HORIZONTE: horizonte, CUOTA_INCENTIVO_ANUAL: cuota_incentivo_anual,
        FORMA_INCENTIVO_VE: forma_incentivo, PORCENTAJE_INCENTIVO: porcentaje_incentivo, INCENTIVO_UNICO: incentivo_unico, TIPO_COMPRA_VE: tipo_compra_ve, PORC_CUOTA_INICIAL_VE: porc_cuota_inicial_ve, TASA_INTERES_VE: tasa_interes_ve,
        ANIO_CREDITO_VE: anio_credito_ve, SEGURO_VE: seguro_ve, PORCENTAJE_ANUAL_VE: porcentaje_anual_ve, KILOMETRO_SEMANAL_VE: km_semanal_ve, MESES_USO_VE: meses_ve, RENDIMIENTO_VE: rendimiento_ve, TARIFA_VE: tarifa_ve,
        PRECIO_CARGADOR: precio_cargador, COSTO_INSTALACION: costo_instalacion, ANIO_RECAMBIO: anio_recambio,
    };

    console.log(JSON.stringify('Vehiculo electrico:'));
    console.log(JSON.stringify(data_ve));

    //Leyendas
    data_l ={
        LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    }
    console.log(JSON.stringify('leyenda:'));
    console.log(JSON.stringify(data_l));

    //Consumo energetivo convencional
    data_ce_vc = {
        P1: p1, P2: p2, KILOMETRO_SEMANAL_VC: kilometro_semanal_vc, MESES_USO_VC: meses_uso_vc, ID_TIPO_COMBUSTIBLE_VC: tipo_combustible_vc, RENDIMIENTO_VC: rendimiento_vc, LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    }
    console.log(JSON.stringify('Consumo energetivo convencional:'));
    console.log(JSON.stringify(data_ce_vc));

    //Consumo energetivo electrico
    data_ce_ve = {
        KILOMETRO_SEMANAL_VE: km_semanal_ve, MESES_USO_VE: meses_ve, RENDIMIENTO_VE: rendimiento_ve,
    }
    console.log(JSON.stringify('Consumo energetivo electrico:'));
    console.log(JSON.stringify(data_ce_ve));

    //Emisiones Convencional
    data_em_vc = {
        P1: p1, P2: p2, KILOMETRO_SEMANAL_VC: kilometro_semanal_vc, MESES_USO_VC: meses_uso_vc, FACTOR_EMISION_VC: factor_emisionvc, LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    }
    console.log(JSON.stringify('Emisiones Convencional:'));
    console.log(JSON.stringify(data_em_vc));

    //Emisiones Electrico
    data_em_ve = {
        TIPO_VEHICULO_ELECTRICO_VE: tipo_vehiculo_electrico_ve, CAPACIDAD_BATERIA_VE: capacidad_bateria_ve, KILOMETRO_SEMANAL_VE: km_semanal_ve, MESES_USO_VE: meses_ve, RENDIMIENTO_VE: rendimiento_ve,
    }
    console.log(JSON.stringify('Emisiones Electrico:'));
    console.log(JSON.stringify(data_em_ve));

    //Contaminantes locales
    data_cm = {
        P1: p1, P2: p2, KILOMETRO_SEMANAL_VC: kilometro_semanal_vc, MESES_USO_VC: meses_uso_vc, ID_TIPO_VEHICULO_VC: tipo_vehiculo_vc, ID_TIPO_COMBUSTIBLE_VC: tipo_combustible_vc, LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    }
    console.log(JSON.stringify('Contaminantes locales:'));
    console.log(JSON.stringify(data_cm));

    //end_points 7 //Octavo Final
    //Calculo
    //let urlvc = `${baseUrl}api/calculo/calcularvehiculoconvencional`;
    let urlvc = `${baseUrlApi}api/calculo/calcularvehiculoconvencional`;
    let datavc = data_vc;
    let initvc = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(datavc) };

    //let urlve = `${baseUrl}api/calculo/calcularvehiculoelectrico`;
    let urlve = `${baseUrlApi}api/calculo/calcularvehiculoelectrico`;
    let datave = data_ve;
    let initve = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(datave) };

    //let urll = `${baseUrl}api/calculo/obtenerleyendas`;
    let urll = `${baseUrlApi}api/calculo/obtenerleyendas`;
    let datal = data_l;
    let initl = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(datal) };

    //let urlvcce = `${baseUrl}api/calculo/calcularconsumoenergeticoconvencional`;
    let urlvcce = `${baseUrlApi}api/calculo/calcularconsumoenergeticoconvencional`;
    let datavcce = data_ce_vc;
    let initvcce = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(datavcce) };

    //let urlvece = `${baseUrl}api/calculo/calcularconsumoenergeticoelectrico`;
    let urlvece = `${baseUrlApi}api/calculo/calcularconsumoenergeticoelectrico`;
    let datavece = data_ce_ve;
    let initvece = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(datavece) };

    //let urlemvc = `${baseUrl}api/calculo/calcularemisionesconvencional`;
    let urlemvc = `${baseUrlApi}api/calculo/calcularemisionesconvencional`;
    let dataemvc = data_em_vc;
    let initemvc = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(dataemvc) };

    //let urlemve = `${baseUrl}api/calculo/calcularemisioneselectrico`;
    let urlemve = `${baseUrlApi}api/calculo/calcularemisioneselectrico`;
    let dataemve = data_em_ve;
    let initemve = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(dataemve) };

    //end_points noveno
    //let urlcm = `${baseUrl}api/calculo/calcularcontaminantelocal`;
    let urlcm = `${baseUrlApi}api/calculo/calcularcontaminantelocal`;
    let datacm = data_cm;
    let initcm = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(datacm) };

    Promise.all([
        fetch(urlvc, initvc),
        fetch(urlve, initve),
        fetch(urll, initl),
        fetch(urlvcce, initvcce),
        fetch(urlvece, initvece),
        fetch(urlemvc, initemvc),
        fetch(urlemve, initemve),
        fetch(urlcm, initcm),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarVCVE);
}

var cargarVCVE = ([listaVC, listaVE, listaleyenda, listaVCCE, listaVECE, listaEMVC, listaEMVE, listaCM]) => {
    Lista_convencional = listaVC;
    Lista_electrico = listaVE;
    Lista_leyenda = listaleyenda;
    Lista_consumo_energ_vc = listaVCCE;
    Lista_consumo_energ_ve = listaVECE;
    Lista_emision_vc = listaEMVC;
    Lista_emision_ve = listaEMVE;
    Lista_contaminante_local = listaCM;
    cambiarAnio();
    grafico_costo();
}

var cambiarAnio = () => {
    valoresDiferenciados();
    cambiarAnioVC();
    cambiarAnioVE();
    grafico_costo_por_anio();
    grafico_consumo_energ();
    grafico_consumo_energ_total();
    grafico_emisiones();
    mostrar_contaminante_local();
    $('#seccion-opciones').removeClass('d-none');
    
}

//var configuration = () => {
//    $('#emisiones_totales div div').attr("width","1000")
//    $('#emisiones_totales svg').attr("width","1000")
//    $('#emisiones_totales rect').attr("width","1000")
//}

var valoresDiferenciados = () => {
    let i = $('#anio_evaluacion').val() - 1;
    let total_costo = parseFloat(Lista_convencional[i].TOTAL) - parseFloat(Lista_electrico[i].TOTAL);
    let total_consumo = (parseFloat(Lista_consumo_energ_vc[i].TOTAL_PUBLICO) + parseFloat(Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC)) - (parseFloat(Lista_consumo_energ_ve[i].TOTAL_PUBLICO) + parseFloat(Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE));
    let total_emisiones = parseFloat(Lista_emision_vc[i].TOTAL_VC) - parseFloat(Lista_emision_ve[i].TOTAL_VE);

    $('#ahorro-economico-d').html(formatoMiles(total_costo));
    $('#consumo-energetico-d').html(formatoMiles(total_consumo));
    $('#emisiones-d').html(formatoMiles(total_emisiones));
}

var cambiarAnioVC = () => {
    let anio = $('#anio_evaluacion').val() - 1;
    //vehiculo convencional
    $('#eva-cuota-inicial-vc').html(formatoMiles(Lista_convencional[anio].CUOTA_INICIAL));
    $('#eva-incentivo-vc').html(formatoMiles(Lista_convencional[anio].INCENTIVO_ECONOMICO));
    $('#eva-recambio-vc').html(formatoMiles(Lista_convencional[anio].RECAMBIO_BATERIA));
    $('#eva-seguro-vc').html(formatoMiles(Lista_convencional[anio].SEGURO));
    $('#eva-energia-vc').html(formatoMiles(Lista_convencional[anio].ENERGIA));
    $('#eva-mante-continuo-vc').html(formatoMiles(Lista_convencional[anio].MANTENIMIENTO_CONTINUO));
    $('#eva-carga-financiera-vc').html(formatoMiles(Lista_convencional[anio].CARGA_FINANCIERA));
    $('#eva-carga-instalacion-vc').html(formatoMiles(Lista_convencional[anio].CARGA_INSTALACION));
    $('#eva-reventa-vc').html(formatoMiles(Lista_convencional[anio].REVENTA_VEHICULO));
    $('#eva-transporte-vc').html(formatoMiles(Lista_convencional[anio].OTROS_TRANSPORTES));    
    $('#eva-mante-extraordinario-vc').html(formatoMiles(Lista_convencional[anio].MANTENIMIENTO_EXTRAORDINARIO));    
    $('#eva-total-vc').html(formatoMiles(Lista_convencional[anio].TOTAL)); 
}

var cambiarAnioVE = () => {
    let anio = $('#anio_evaluacion').val() - 1;
    //vehiculo electrico
    $('#eva-cuota-inicial-ve').html(formatoMiles(Lista_electrico[anio].CUOTA_INICIAL));
    $('#eva-incentivo-ve').html(formatoMiles(Lista_electrico[anio].INCENTIVO_ECONOMICO));
    $('#eva-recambio-ve').html(formatoMiles(Lista_electrico[anio].RECAMBIO_BATERIA));
    $('#eva-seguro-ve').html(formatoMiles(Lista_electrico[anio].SEGURO));
    $('#eva-energia-ve').html(formatoMiles(Lista_electrico[anio].ENERGIA));
    $('#eva-mante-continuo-ve').html(formatoMiles(Lista_electrico[anio].MANTENIMIENTO_CONTINUO));
    $('#eva-carga-financiera-ve').html(formatoMiles(Lista_electrico[anio].CARGA_FINANCIERA));
    $('#eva-carga-instalacion-ve').html(formatoMiles(Lista_electrico[anio].CARGA_INSTALACION));
    $('#eva-reventa-ve').html(formatoMiles(Lista_electrico[anio].REVENTA_VEHICULO));
    $('#eva-transporte-ve').html(formatoMiles(Lista_electrico[anio].OTROS_TRANSPORTES));    
    $('#eva-mante-extraordinario-ve').html(formatoMiles(Lista_electrico[anio].MANTENIMIENTO_EXTRAORDINARIO));   
    $('#eva-total-ve').html(formatoMiles(Lista_electrico[anio].TOTAL)); 
}

var formatoMiles = (n) => {
    var m = n * 1;
    return m.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

var grafico_costo = () => {
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Horizonte de evaluación (en años)');
        data.addColumn('number', 'Escenario movilidad eléctrica');
        //data.addColumn({ type: 'string', role: 'annotation' });
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
        data.addColumn('number', 'Escenario movilidad convencional');
        //data.addColumn({ type: 'string', role: 'annotation' });
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

        //data.addRows([
        //  [1, Math.round(Lista_electrico[0].TOTAL * 100)/100, Math.round(Lista_convencional[0].TOTAL * 100)/100],
        //  [2, Lista_electrico[1].TOTAL, Lista_convencional[1].TOTAL],
        //  [3, Lista_electrico[2].TOTAL, Lista_convencional[2].TOTAL],
        //  [4, Lista_electrico[3].TOTAL, Lista_convencional[3].TOTAL],
        //  [5, Lista_electrico[4].TOTAL, Lista_convencional[4].TOTAL],
        //  [6, Lista_electrico[5].TOTAL, Lista_convencional[5].TOTAL],
        //  [7, Lista_electrico[6].TOTAL, Lista_convencional[6].TOTAL],
        //  [8, Lista_electrico[7].TOTAL, Lista_convencional[7].TOTAL],
        //  [9, Lista_electrico[8].TOTAL, Lista_convencional[8].TOTAL],
        //  [10, Lista_electrico[9].TOTAL, Lista_convencional[9].TOTAL],
        //  [11, Lista_electrico[10].TOTAL, Lista_convencional[10].TOTAL],
        //  [12, Lista_electrico[11].TOTAL, Lista_convencional[11].TOTAL],
        //  [13, Lista_electrico[12].TOTAL, Lista_convencional[12].TOTAL],
        //  [14, Lista_electrico[13].TOTAL, Lista_convencional[13].TOTAL],
        //  [15, Math.round(Lista_electrico[14].TOTAL * 100)/100, Math.round(Lista_convencional[14].TOTAL * 100)/100]
        //]);

        let escenario_convencional = 'Escenario movilidad convencional', esceneario_electrico = 'Escenario movilidad eléctrica'

        data.addRows([
          ['1', Lista_electrico[0].TOTAL, tooltipTCO('1',esceneario_electrico, Lista_electrico[0].TOTAL), Lista_convencional[0].TOTAL, tooltipTCO('1',escenario_convencional, Lista_convencional[0].TOTAL)],
          ['2', Lista_electrico[1].TOTAL, tooltipTCO('2',esceneario_electrico, Lista_electrico[1].TOTAL), Lista_convencional[1].TOTAL, tooltipTCO('2',escenario_convencional, Lista_convencional[1].TOTAL)],
          ['3', Lista_electrico[2].TOTAL, tooltipTCO('3',esceneario_electrico, Lista_electrico[2].TOTAL), Lista_convencional[2].TOTAL, tooltipTCO('3',escenario_convencional, Lista_convencional[2].TOTAL)],
          ['4', Lista_electrico[3].TOTAL, tooltipTCO('4',esceneario_electrico, Lista_electrico[3].TOTAL), Lista_convencional[3].TOTAL, tooltipTCO('4',escenario_convencional, Lista_convencional[3].TOTAL)],
          ['5', Lista_electrico[4].TOTAL, tooltipTCO('5',esceneario_electrico, Lista_electrico[4].TOTAL), Lista_convencional[4].TOTAL, tooltipTCO('5',escenario_convencional, Lista_convencional[4].TOTAL)],
          ['6', Lista_electrico[5].TOTAL, tooltipTCO('6',esceneario_electrico, Lista_electrico[5].TOTAL), Lista_convencional[5].TOTAL, tooltipTCO('6',escenario_convencional, Lista_convencional[5].TOTAL)],
          ['7', Lista_electrico[6].TOTAL, tooltipTCO('7',esceneario_electrico, Lista_electrico[6].TOTAL), Lista_convencional[6].TOTAL, tooltipTCO('7',escenario_convencional, Lista_convencional[6].TOTAL)],
          ['8', Lista_electrico[7].TOTAL, tooltipTCO('8',esceneario_electrico, Lista_electrico[7].TOTAL), Lista_convencional[7].TOTAL, tooltipTCO('8',escenario_convencional, Lista_convencional[7].TOTAL)],
          ['9', Lista_electrico[8].TOTAL, tooltipTCO('9',esceneario_electrico, Lista_electrico[8].TOTAL), Lista_convencional[8].TOTAL, tooltipTCO('9',escenario_convencional, Lista_convencional[8].TOTAL)],
          ['10', Lista_electrico[9].TOTAL, tooltipTCO('10',esceneario_electrico, Lista_electrico[9].TOTAL), Lista_convencional[9].TOTAL, tooltipTCO('10',escenario_convencional, Lista_convencional[9].TOTAL)],
          ['11', Lista_electrico[10].TOTAL, tooltipTCO('11',esceneario_electrico, Lista_electrico[10].TOTAL), Lista_convencional[10].TOTAL, tooltipTCO('11',escenario_convencional, Lista_convencional[10].TOTAL)],
          ['12', Lista_electrico[11].TOTAL, tooltipTCO('12',esceneario_electrico, Lista_electrico[11].TOTAL), Lista_convencional[11].TOTAL, tooltipTCO('12',escenario_convencional, Lista_convencional[11].TOTAL)],
          ['13', Lista_electrico[12].TOTAL, tooltipTCO('13',esceneario_electrico, Lista_electrico[12].TOTAL), Lista_convencional[12].TOTAL, tooltipTCO('13',escenario_convencional, Lista_convencional[12].TOTAL)],
          ['14', Lista_electrico[13].TOTAL, tooltipTCO('14',esceneario_electrico, Lista_electrico[13].TOTAL), Lista_convencional[13].TOTAL, tooltipTCO('14',escenario_convencional, Lista_convencional[13].TOTAL)],
          ['15', Lista_electrico[14].TOTAL, tooltipTCO('15',esceneario_electrico, Lista_electrico[14].TOTAL), Lista_convencional[14].TOTAL, tooltipTCO('15',escenario_convencional, Lista_convencional[14].TOTAL)],
        ]);

        var options = {
            //chart: {
            //    title: 'Comparativa entre movilidad convencional vs eléctrico',
            //    //subtitle: 'in millions of dollars (USD)'
            //},
            //title: 'Comparativa entre movilidad convencional vs eléctrico',
            width: 900,
            height: 500,
            tooltip: { isHtml: true },
            //legend: { position: 'top', maxLines: 3, textStyle: { fontSize: 20} }, //configuracion para el tamaño de letra
            legend: { position: 'top', maxLines: 3 },
            lineWidth: 3,
            pointSize: 5,
            visibleInLegend: false,
            //vAxis: {format: 'decimal'},  
            isStacked: true
        };

        //var chart = new google.charts.Line(document.getElementById('linechart_material'));
        var chart = new google.visualization.LineChart(document.getElementById('linechart_material'));
        chart.draw(data, google.charts.Line.convertOptions(options));
        //chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChart);
}

var tooltipTCO = (anio_n, escenario_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">S/ ${formatoMiles(costo_n)}</span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 120px;padding: 10px">${anio}${escenario}${costo}</div>`;
    return html
}

var grafico_costo_por_anio = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartC() {
        let escenario_convencional = 'Movilidad convencional', esceneario_electrico = 'Movilidad eléctrica'
        var data = google.visualization.arrayToDataTable([
            ['Genre', 
             'Mantenimiento extraordinario', { type: 'string', role: 'tooltip', p: { html: true } },
             'Otros transportes', { type: 'string', role: 'tooltip', p: { html: true } },
             'Reventa vehículo', { type: 'string', role: 'tooltip', p: { html: true } },
             'Equipo carga e instalación', { type: 'string', role: 'tooltip', p: { html: true } },
             'Carga financiera', { type: 'string', role: 'tooltip', p: { html: true } },
             'Mantenimiento continuo', { type: 'string', role: 'tooltip', p: { html: true } },
             'Energía', { type: 'string', role: 'tooltip', p: { html: true } },
             'Seguro', { type: 'string', role: 'tooltip', p: { html: true } },
             'Recambio de batería', { type: 'string', role: 'tooltip', p: { html: true } },
             'Incentivo económico', { type: 'string', role: 'tooltip', p: { html: true } },
             'Cuota inicial', { type: 'string', role: 'tooltip', p: { html: true } },
             { role: 'annotation' }],
            ['Movilidad convencional', 
                Lista_convencional[i].MANTENIMIENTO_EXTRAORDINARIO, tooltipTCOGrafico(i+1, escenario_convencional, 'Mantenimiento extraordinario', Lista_convencional[i].MANTENIMIENTO_EXTRAORDINARIO),
                Lista_convencional[i].OTROS_TRANSPORTES, tooltipTCOGrafico(i+1, escenario_convencional, 'Otros transportes', Lista_convencional[i].OTROS_TRANSPORTES),
                Lista_convencional[i].REVENTA_VEHICULO, tooltipTCOGrafico(i+1, escenario_convencional, 'Reventa vehículo', Lista_convencional[i].REVENTA_VEHICULO),
                Lista_convencional[i].CARGA_INSTALACION, tooltipTCOGrafico(i+1, escenario_convencional, 'Equipo de carga e instalación', Lista_convencional[i].CARGA_INSTALACION),
                Lista_convencional[i].CARGA_FINANCIERA, tooltipTCOGrafico(i+1, escenario_convencional, 'Carga financiera', Lista_convencional[i].CARGA_FINANCIERA),
                Lista_convencional[i].MANTENIMIENTO_CONTINUO, tooltipTCOGrafico(i+1, escenario_convencional, 'Mantenimiento continuo', Lista_convencional[i].MANTENIMIENTO_CONTINUO),
                Lista_convencional[i].ENERGIA, tooltipTCOGrafico(i+1, escenario_convencional, 'Energía (combustible)', Lista_convencional[i].ENERGIA),
                Lista_convencional[i].SEGURO, tooltipTCOGrafico(i+1, escenario_convencional, 'Seguro', Lista_convencional[i].SEGURO),
                Lista_convencional[i].RECAMBIO_BATERIA, tooltipTCOGrafico(i+1, escenario_convencional, 'Recambio de batería', Lista_convencional[i].RECAMBIO_BATERIA),
                Lista_convencional[i].INCENTIVO_ECONOMICO, tooltipTCOGrafico(i+1, escenario_convencional, 'Incentivo económico', Lista_convencional[i].INCENTIVO_ECONOMICO),
                Lista_convencional[i].CUOTA_INICIAL, tooltipTCOGrafico(i+1, esceneario_electrico, 'Cuota inicial', Lista_convencional[i].CUOTA_INICIAL),
                ''],
            ['Movilidad eléctrica', 
                Lista_electrico[i].MANTENIMIENTO_EXTRAORDINARIO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Mantenimiento extraordinario', Lista_electrico[i].MANTENIMIENTO_EXTRAORDINARIO),
                Lista_electrico[i].OTROS_TRANSPORTES, tooltipTCOGrafico(i+1, esceneario_electrico, 'Otros transportes', Lista_electrico[i].OTROS_TRANSPORTES),
                Lista_electrico[i].REVENTA_VEHICULO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Reventa vehículo', Lista_electrico[i].REVENTA_VEHICULO),
                Lista_electrico[i].CARGA_INSTALACION, tooltipTCOGrafico(i+1, esceneario_electrico, 'Equipo de carga e instalación', Lista_electrico[i].CARGA_INSTALACION),
                Lista_electrico[i].CARGA_FINANCIERA, tooltipTCOGrafico(i+1, esceneario_electrico, 'Carga financiera', Lista_electrico[i].CARGA_FINANCIERA),
                Lista_electrico[i].MANTENIMIENTO_CONTINUO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Mantenimiento continuo', Lista_electrico[i].MANTENIMIENTO_CONTINUO),
                Lista_electrico[i].ENERGIA, tooltipTCOGrafico(i+1, esceneario_electrico, 'Energía (electricidad)', Lista_electrico[i].ENERGIA),
                Lista_electrico[i].SEGURO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Seguro', Lista_electrico[i].SEGURO),
                Lista_electrico[i].RECAMBIO_BATERIA, tooltipTCOGrafico(i+1, esceneario_electrico, 'Recambio de batería', Lista_electrico[i].RECAMBIO_BATERIA),
                Lista_electrico[i].INCENTIVO_ECONOMICO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Incentivo económico', Lista_electrico[i].INCENTIVO_ECONOMICO),
                Lista_electrico[i].CUOTA_INICIAL, tooltipTCOGrafico(i+1, esceneario_electrico, 'Cuota inicial', Lista_electrico[i].CUOTA_INICIAL),
                '']
        ]);

        var options = {
            //title: 'Comparación – Costo total de propiedad (TCO)',
            width: 900,
            height: 800,
            //legend: { position: 'right', maxLines: 12 },
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Costo total de propiedad (TCO) en (S/)'
            },
            bar: { groupWidth: '75%' },
            isStacked: true, //junta los valores en una columna una columna 
        };

        //var chart = new google.charts.Bar(document.getElementById("columnchart_values"));
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(data, options);
        $('#headingCTCO_G').addClass('d-none')
    }
    google.charts.setOnLoadCallback(drawChartC);
}

var tooltipTCOGrafico = (anio_n, escenario_n, aspecto_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">S/ ${formatoMiles(costo_n)}</span>`
    let aspecto = `<span style="display: block; font-size: 1rem; color: black"><strong>${aspecto_n}</strong></span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 150px;padding: 10px">${anio}${escenario}${aspecto}${costo}</div>`;
    return html
}


var grafico_consumo_energ = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCE() {
        let escenario_convencional = 'Movilidad convencional', esceneario_electrico = 'Movilidad eléctrica'
        let arrNombre = [], arrConvencional = [], arrElectrico = [];
        let tamanio = Lista_leyenda.length;
        arrNombre.push('Genre');
        for (var j = 0; j < tamanio; j++) {
            arrNombre.push(Lista_leyenda[j].NOMBRE_TRANSPORTE);
            arrNombre.push({ type: 'string', role: 'tooltip', p: { html: true } });
        }

        arrConvencional.push('Movilidad convencional');
        if (1 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[0].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC));
        } 
        if (2 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[1].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1));
        } 
        if (3 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[2].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2));
        } 
        if (4 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[3].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3));
        } 
        if (5 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[4].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4));
        } 

        arrElectrico.push('Movilidad eléctrica');
        if (1 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[0].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE));
        }
        if (2 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_1);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[1].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_1));
        }
        if (3 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_2);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[2].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_2));
        } 
        if (4 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_3);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[3].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_3));
        } 
        if (5 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_4);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[4].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_4));
        } 

        //var data = google.visualization.arrayToDataTable([
        //    ['Genre', Lista_leyenda[0].NOMBRE_TRANSPORTE, Lista_leyenda[1].NOMBRE_TRANSPORTE, Lista_leyenda[2].NOMBRE_TRANSPORTE, Lista_leyenda[3].NOMBRE_TRANSPORTE, Lista_leyenda[4].NOMBRE_TRANSPORTE, { role: 'annotation' }],
        //    ['Escenario movilidad convencional', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4, ''],
        //    ['Escenario electromovilidad', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4, '']
        //]);

        var data = google.visualization.arrayToDataTable([
            arrNombre,
            arrConvencional,
            arrElectrico
        ]);

        var options = {
            //title: 'Consumo energético total en GJ',
            width: 900,
            height: 600,            
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Consumo energético (GJ)'
            },
            //legend: { position: 'right', maxLines: 5 },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico"));
        chart.draw(data, options);
        $('#headingCEGJ1_G').addClass('d-none')
    }
    google.charts.setOnLoadCallback(drawChartCE);
}

var grafico_consumo_energ_total = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCET() {
        //let escenario_convencional = 'Movilidad convencional', esceneario_electrico = 'Movilidad eléctrica'
        //var data = google.visualization.arrayToDataTable([
        //    ['Genre', 
        //        'Vehículo propio', { type: 'string', role: 'tooltip', p: { html: true } },
        //        'Total serv. de transp', { type: 'string', role: 'tooltip', p: { html: true } },
        //        { role: 'annotation' }],
        //    ['Movilidad convencional', 
        //        Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, tooltipTCOGraficoConsumoE(i+1, escenario_convencional, 'Vehículo propio', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC),
        //        Lista_consumo_energ_vc[i].TOTAL_PUBLICO, tooltipTCOGraficoConsumoE(i+1, escenario_convencional, 'Total servicios de transporte', Lista_consumo_energ_vc[i].TOTAL_PUBLICO),
        //        ''],
        //    ['Movilidad eléctrica', 
        //        Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE, tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, 'Vehículo propio', Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE),
        //        Lista_consumo_energ_ve[i].TOTAL_PUBLICO, tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, 'Total servicios de transporte', Lista_consumo_energ_ve[i].TOTAL_PUBLICO),
        //        '']
        //]);

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Genre');
        data.addColumn('number', 'Vehículo propio');
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
        data.addColumn('number', 'Total servicios de transporte');
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

        let escenario_convencional = 'Escenario movilidad convencional', esceneario_electrico = 'Escenario movilidad eléctrica'

        data.addRows([
          ['Movilidad convencional', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, tooltipTCOGraficoConsumoE(i+1, escenario_convencional, 'Vehículo propio', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC), Lista_consumo_energ_vc[i].TOTAL_PUBLICO, tooltipTCOGraficoConsumoE(i+1, escenario_convencional, 'Total servicios de transporte', Lista_consumo_energ_vc[i].TOTAL_PUBLICO)],
          ['Movilidad eléctrica', Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE, tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, 'Vehículo propio', Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE), Lista_consumo_energ_ve[i].TOTAL_PUBLICO, tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, 'Total servicios de transporte', Lista_consumo_energ_ve[i].TOTAL_PUBLICO)],
        ]);

        var options = {
            //title: 'Consumo energético total en GJ',
            width: 900,
            height: 600,            
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Consumo energético total (GJ)'
            },
            //legend: { position: 'right', maxLines: 3 },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico_total"));
        chart.draw(data, options);

        $('#headingCEGJ2_G').addClass('d-none')
        //var data = new google.visualization.DataTable();
        //data.addColumn('timeofday', 'Time of Day');
        //data.addColumn('number', 'Motivation Level');
        //data.addColumn('number', 'Energy Level');

        //data.addRows([
        //  [{v: [8, 0, 0], f: '8 am'}, 1, .25],
        //  [{v: [9, 0, 0], f: '9 am'}, 2, .5],
        //  [{v: [10, 0, 0], f:'10 am'}, 3, 1],
        //  [{v: [11, 0, 0], f: '11 am'}, 4, 2.25],
        //  [{v: [12, 0, 0], f: '12 pm'}, 5, 2.25],
        //  [{v: [13, 0, 0], f: '1 pm'}, 6, 3],
        //  [{v: [14, 0, 0], f: '2 pm'}, 7, 4],
        //  [{v: [15, 0, 0], f: '3 pm'}, 8, 5.25],
        //  [{v: [16, 0, 0], f: '4 pm'}, 9, 7.5],
        //  [{v: [17, 0, 0], f: '5 pm'}, 10, 10],
        //]);

        //var options = {
        //    title: 'Motivation and Energy Level Throughout the Day',
        //    colors: ['#9575cd', '#33ac71'],
        //    hAxis: {
        //        title: 'Time of Day',
        //        format: 'h:mm a',
        //        viewWindow: {
        //            min: [7, 30, 0],
        //            max: [17, 30, 0]
        //        }
        //    },
        //    isStacked: true,
        //    legend: { position: 'top', maxLines: 3 },
        //    vAxis: {
        //        title: 'Rating (scale of 1-10)'
        //    }
        //};

        //var chart = new google.visualization.ColumnChart(document.getElementById('consumo_energetico_total'));
        //chart.draw(data, options);

    }
    google.charts.setOnLoadCallback(drawChartCET);
}

var tooltipTCOGraficoConsumoE = (anio_n, escenario_n, aspecto_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">${formatoMiles(costo_n)} GJ</span>`
    let aspecto = `<span style="display: block; font-size: 1rem; color: black"><strong>${aspecto_n}</strong></span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 150px;padding: 10px">${anio}${escenario}${aspecto}${costo}</div>`;
    return html
}

var grafico_emisiones = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartEM() {
        let escenario_convencional = 'Movilidad convencional', esceneario_electrico = 'Movilidad eléctrica'
        var data = google.visualization.arrayToDataTable([
            ['Genre', 
                'Fabricación de baterías', { type: 'string', role: 'tooltip', p: { html: true } },
                'Operación del vehículo', { type: 'string', role: 'tooltip', p: { html: true } },
                'Fabricación del vehículo', { type: 'string', role: 'tooltip', p: { html: true } },
                'Servicios de transporte', { type: 'string', role: 'tooltip', p: { html: true } },
                { role: 'annotation' }],
            ['Movilidad convencional', 
                Lista_emision_vc[i].FABRICACION_BATERIA_VC, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Fabricación de baterías', Lista_emision_vc[i].FABRICACION_BATERIA_VC),
                Lista_emision_vc[i].OPERACION_VEHICULO_VC, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Operación del vehículo', Lista_emision_vc[i].OPERACION_VEHICULO_VC),
                Lista_emision_vc[i].FABRICACION_VEHICULO_VC, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Fabricación del vehículo', Lista_emision_vc[i].FABRICACION_VEHICULO_VC),
                Lista_emision_vc[i].SERVICIO_TRANSPORTE, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Servicios de transporte', Lista_emision_vc[i].SERVICIO_TRANSPORTE),
                ''],
            ['Movilidad eléctrica', 
                Lista_emision_ve[i].FABRICACION_BATERIA_VE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Fabricación de baterías', Lista_emision_ve[i].FABRICACION_BATERIA_VE),
                Lista_emision_ve[i].OPERACION_VEHICULO_VE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Operación del vehículo', Lista_emision_ve[i].OPERACION_VEHICULO_VE),
                Lista_emision_ve[i].FABRICACION_VEHICULO_VE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Fabricación del vehículo', Lista_emision_ve[i].FABRICACION_VEHICULO_VE),
                Lista_emision_ve[i].SERVICIO_TRANSPORTE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Servicios de transporte', Lista_emision_ve[i].SERVICIO_TRANSPORTE),
                '']
        ]);

        var options = {
            //title: 'Emisiones GEI totales en kgCO₂e',
            width: 900,
            height: 600,
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Emisiones GEI totales en (kgCO2e)'
            },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("emisiones_totales"));
        chart.draw(data, options);
        $('#headingEmisionesGEI_G').addClass('d-none')
    }
    google.charts.setOnLoadCallback(drawChartEM);
}

var tooltipTCOGraficoEmisiones = (anio_n, escenario_n, aspecto_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">${formatoMiles(costo_n)} kgCO<sub>2</sub>e</span>`
    let aspecto = `<span style="display: block; font-size: 1rem; color: black"><strong>${aspecto_n}</strong></span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 150px;padding: 10px">${anio}${escenario}${aspecto}${costo}</div>`;
    return html
}

var mostrar_contaminante_local = () => {
    let i = $('#anio_evaluacion').val() - 1;
    $('#cl-nox').html(formatoMiles(Lista_contaminante_local[i].TOTAL_NOX));
    $('#cl-co').html(formatoMiles(Lista_contaminante_local[i].TOTAL_CO));
    $('#cl-mp25').html(formatoMiles(Lista_contaminante_local[i].TOTAL_PM25));
    $('#cl-bc').html(formatoMiles(Lista_contaminante_local[i].TOTAL_BC));
}

var mostrarRutas = (e) => {
    $('#seccion-principal').addClass('d-none');
    $('#seccion-menu-ruta').removeClass('d-none');
    validar_escenario = $(`#${e.target.id}`).data('validar');
    validarCopiarRuta();
    if (arr_veh_ruta_bd.length > 0) $('#rutas-frecuentes').removeClass("d-none");
    else $('#rutas-frecuentes').addClass("d-none");
    listarRutas();
}

var validarCopiarRuta = () => {
    if (validar_escenario == 'vc') {
        $('#btn-copiar-ruta').parent().parent().addClass('d-none');
    } else if (validar_escenario == 'cvc') {
        if (arr_ruta_vc.length > 0) {
            $('#btn-copiar-ruta').parent().parent().removeClass('d-none');
            $('#btn-copiar-ruta').html('Copiar las rutas ingresadas en vehículo propio');
        } else {
            $('#btn-copiar-ruta').parent().parent().addClass('d-none');
        }
    } else if (validar_escenario == 've') {
        if (arr_ruta_vc.length > 0) {
            $('#btn-copiar-ruta').parent().parent().removeClass('d-none');
            $('#btn-copiar-ruta').html('Copiar las rutas ingresadas en vehículo propio');
        } else if (arr_ruta_cvc.length > 0) {
            $('#btn-copiar-ruta').parent().parent().removeClass('d-none');
            $('#btn-copiar-ruta').html('Copiar las rutas ingresadas en vehículo nuevo');
        } else {
            $('#btn-copiar-ruta').parent().parent().addClass('d-none');
        }
    }
}

var copiarRuta = () => {
    let arr = retornarArrayRutaTemp();
    let arrCopia = [];
    let count = 0;
    let validar = false;
    if (validar_escenario == "cvc") {        
        arrCopia = arr_ruta_vc;
    } else if (validar_escenario == "ve") {
        if (arr_ruta_vc.length > 0) {
            arrCopia = arr_ruta_vc;
        } else if (arr_ruta_cvc.length > 0) {
            arrCopia = arr_ruta_cvc;
        }
    }
    
    if (arr.length == 1 && ($(`#ruta-1`).val() == "" && $(`#origen-1`).val() == "" && $(`#destino-1`).val() == "" && $(`#veces-1`).val() == "" && $(`#kmdiario-1`).val() == "" && $(`#kmsemanal-1`).val() == "") ) {
        //arr = [];
        limpiarArray();
        validar = true;
        for (var i = 0; i < arrCopia.length; i++) {
            retornarArrayRutaTemp().push({
                ID_RUTA: retornarArrayRutaTemp().length + 1,
                NOMBRE_RUTA: arrCopia[i].NOMBRE_RUTA,
                NOMBRE_ORIGEN: arrCopia[i].NOMBRE_ORIGEN,
                NOMBRE_DESTINO: arrCopia[i].NOMBRE_DESTINO,
                VECES_SEMANA: arrCopia[i].VECES_SEMANA,
                KM_DIARIO: arrCopia[i].KM_DIARIO,
                KM_SEMANAL: arrCopia[i].KM_SEMANAL,
                ORIGEN: arrCopia[i].ORIGEN,
                DESTINO: arrCopia[i].DESTINO,
                COPIA: 1,
                BD: arrCopia[i].BD,
                ID_OBJETO: arrCopia[i].ID_RUTA,
                TIPO_ARR: validar_escenario,
                OBJETO: arrCopia[i],
                ID_RUTA_BD: arrCopia[i].ID_RUTA_BD,
                ACTIVO: 1,
            });
        }
    } else {
        for (var i = 0; i < arrCopia.length; i++) {
            retornarArrayRutaTemp().push({
                ID_RUTA: arr[arr.length - 1].ID_RUTA + 1,
                NOMBRE_RUTA: arrCopia[i].NOMBRE_RUTA,
                NOMBRE_ORIGEN: arrCopia[i].NOMBRE_ORIGEN,
                NOMBRE_DESTINO: arrCopia[i].NOMBRE_DESTINO,
                VECES_SEMANA: arrCopia[i].VECES_SEMANA,
                KM_DIARIO: arrCopia[i].KM_DIARIO,
                KM_SEMANAL: arrCopia[i].KM_SEMANAL,
                ORIGEN: arrCopia[i].ORIGEN,
                DESTINO: arrCopia[i].DESTINO,
                COPIA: 1,
                BD: arrCopia[i].BD,
                ID_OBJETO: arrCopia[i].ID_RUTA,
                TIPO_ARR: validar_escenario,
                OBJETO: arrCopia[i],
                ID_RUTA_BD: arrCopia[i].ID_RUTA_BD,
                ACTIVO: 1,
            });
        }
        count = retornarArrayRutaTemp().length - arrCopia.length;
    }
    mostrarCopiarRuta(retornarArrayRutaTemp(), count, validar);
}

var limpiarArray = () => {
    if ("vc" == validar_escenario) arr_ruta_vc = [];
    if ("cvc" == validar_escenario) arr_ruta_cvc = [];
    if ("ve" == validar_escenario) arr_ruta_ve = [];
    if ("t1" == validar_escenario) arr_ruta_t1 = [];
    if ("t2" == validar_escenario) arr_ruta_t2 = [];
    if ("t3" == validar_escenario) arr_ruta_t3 = [];
    if ("t4" == validar_escenario) arr_ruta_t4 = [];
}

var mostrarCopiarRuta = (arr, count, v) => {
    let rutas = "";
    if (v) $('#rutas-km').html("");
    for (var i = 0; i < arr.length; i++) {
        if (i > count - 1) {
            let cerrar = i == 0 ? '<div class="col-12 text-right"></div>' : `<div class="col-12 text-right"><a href="javascript:void(0)" class="quitar-ruta" id="quitar-${arr[i].ID_RUTA}"><i class="fas fa-window-close mr-1"></i></a></div>`;
            let nombreruta = `<div class="col-12"><div class="container-input"><input type="text" id="ruta-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_RUTA}" required><label for="" class="label">Nombre de la ruta</label></div></div>`;
            let origen = `<div class="col-6"><div class="container-input"><input type="text" id="origen-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_ORIGEN}" required><label for="" class="label">Origen</label></div></div>`;
            let destino = `<div class="col-6"><div class="container-input"><input type="text" id="destino-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_DESTINO}" required><label for="" class="label">Destino</label></div></div>`;
            let vecessemana = `<div class="col-6"><div class="container-input"><input type="text" id="veces-${arr[i].ID_RUTA}" class="field calcular-km" value="${arr[i].VECES_SEMANA}" required><label for="" class="label">Veces por semana</label></div></div>`;
            let kmdiario = `<div class="col-9"><div class="container-input"><input type="text" id="kmdiario-${arr[i].ID_RUTA}" class="field calcular-km" value="${arr[i].KM_DIARIO}" required><label for="" class="label">Km diarios</label></div></div>`;
            let botonmap = `<div class="col-3"><div class="container-input"><a class="distancia-mapa" href="javascript:void(0)" id="distancia-${arr[i].ID_RUTA}"><i class="fas fa-map-marked mr-1"></i></a></div></div>`;
            let contentkmdiario = `<div class="col-6"><div class="row">${kmdiario}${botonmap}</div></div>`;
            let vacio = `<div class="col-6"></div>`;
            let kmsemanal = `<div class="col-6"><div class="container-input"><input type="text" id="kmsemanal-${arr[i].ID_RUTA}" class="field" value="${arr[i].KM_SEMANAL}" required><label for="" class="label">Km semanal</label></div></div>`;
            rutas += `<div class="col-6 mb-2 rutas" id="bloq-ruta-${arr[i].ID_RUTA}" data-nuevo="1"><div class="estilo-g"><div class="row">${cerrar}${nombreruta}${origen}${destino}${vecessemana}${contentkmdiario}${vacio}${kmsemanal}</div></div></div>`;
        }        
    }
    $('#rutas-km').append(`${rutas}`);
    $('.distancia-mapa').on('click', (e) => distanciaRuta(e));
    calcularTotal();
}

var mostrarRutasBD = () => {
    $('#seccion-rutas-bd').removeClass("d-none");
    $('#seccion-menu-ruta').addClass("d-none");
}

var armarRutasBD = () => {
    $('#rutas-bd').html("");
    let rutas = "";
    for (var i = 0; i < arr_veh_ruta_bd.length; i++) {
        let titulo = `<div class="row">`;
        titulo += `<div class="col-10"><div class="row"><div class="col-12"><span style="color: brown;">Nombre de la ruta</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr_veh_ruta_bd[i].NOMBRE_RUTA}</span></div></div></div>`;
        titulo += `<div class="col-2"><div class="row"><a class="btn btn-sm bg-success text-white w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0"><i class="fas fa-tools mr-1"></i></a><div class="dropdown-menu"><a class="dropdown-item estilo-01 agregar-ruta-bd" id="agregar-${arr_veh_ruta_bd[i].ID_RUTA}" href="javascript:void(0)"><i class="fas fa-history mr-1"></i>Agregar</a><a class="dropdown-item estilo-01 eliminar-ruta-bd" id="eliminar-${arr_veh_ruta_bd[i].ID_RUTA}" href="javascript:void(0)"><i class="fas fa-history mr-1"></i>Eliminar</a></div></div></div>`;
        titulo += `<div class="col-12"><hr /></div></div>`;

        let origen_destino = `<div class="row">`;
        origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Origen</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr_veh_ruta_bd[i].NOMBRE_ORIGEN}</span></div></div></div>`;
        origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Destino</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr_veh_ruta_bd[i].NOMBRE_DESTINO}</span></div></div></div>`;
        origen_destino += `<div class="col-12"><hr /></div></div>  `; 
                        
        let veces_km_semana = `<div class="row">`;  
        veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Veces por semana</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr_veh_ruta_bd[i].VECES_SEMANA}</span></div></div></div>`;
        veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Km diarios</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr_veh_ruta_bd[i].KM_DIARIO}</span></div></div></div>`;
        veces_km_semana += `<div class="col-12"><hr /></div></div>`;                                    
        
        let km_total = `<div class="row">`;
        km_total += `<div class="col-6 "></div>`;
        km_total += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Km semanal</span></div></div><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${arr_veh_ruta_bd[i].KM_SEMANAL}</span></div></div></div>`;
        km_total += `</div>`;

        rutas += `<div class="col-6 mb-2" id="bd-${arr_veh_ruta_bd[i].ID_RUTA}"><div class="card" style="width: 100%;"><div class="card-body">${titulo}${origen_destino}${veces_km_semana}${km_total}</div></div></div>`;      
    }
    $('#rutas-bd').append(`${rutas}`);
}

var ocultarMapa = () => {    
    //listarRutas();
    $('#seccion-menu-ruta').removeClass('d-none');
    $('#seccion-mapa').addClass('d-none');
}

//var listarRutas = () => {
//    $('#rutas-km').html('');
//    let arr, rutas = "", total_km = 0;
//    if ("vc" == validar_escenario) arr = arr_ruta_vc;
//    if ("cvc" == validar_escenario) arr = arr_ruta_cvc;
//    if ("ve" == validar_escenario) arr = arr_ruta_ve;
//    if ("t1" == validar_escenario) arr = arr_ruta_t1;
//    if ("t2" == validar_escenario) arr = arr_ruta_t2;
//    if ("t3" == validar_escenario) arr = arr_ruta_t3;
//    if ("t4" == validar_escenario) arr = arr_ruta_t4;

//    for (var i = 0; i < arr.length; i++) {
//        let total = parseFloat(arr[i].DISTANCIA) * parseFloat(arr[i].VECES_SEMANA);
//        total_km += total;        

//        let titulo = `<div class="row">`;
//        titulo += `<div class="col-10"><div class="row"><div class="col-12"><h6 style="color: blue;">Ruta N° ${arr[i].ID_RUTA}:</h6></div></div></div>`;
//        titulo += `<div class="col-2"><div class="row"><div class="col-12 ml-3"><a href="#"><i class="fas fa-window-close mr-1"></i></a></div></div></div>`;
//        titulo += `<div class="col-12"><hr /></div></div>`;

//        let origen_destino = `<div class="row">`;
//        origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Origen</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].NOMBRE_ORIGEN}</span></div></div></div>`;
//        origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Destino</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].NOMBRE_DESTINO}</span></div></div></div>`;
//        origen_destino += `<div class="col-12"><hr /></div></div>  `; 
                        
//        let veces_km_semana = `<div class="row">`;  
//        veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Veces por semana</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].VECES_SEMANA}</span></div></div></div>`;
//        veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-9"><span style="color: brown;">Km de la ruta</span></div><div class="col-3"><a class="editar-mapa" href="#" data-accion="editar" id="${validar_escenario}-${arr[i].ID_RUTA}"><i class="fas fa-map-marked mr-1"></i></a></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].DISTANCIA} Km</span></div></div></div>`;
//        veces_km_semana += `<div class="col-12"><hr /></div></div>`;                                    
        
//        let km_total = `<div class="row">`;
//        km_total += `<div class="col-6 "></div>`;
//        km_total += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Km total</span></div></div><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${Math.round(total * 100) / 100} Km</span></div></div></div>`;
//        km_total += `</div>`;

//        rutas += `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">${titulo}${origen_destino}${veces_km_semana}${km_total}</div></div></div>`;                    
//    }

//    total_km = Math.round(total_km * 100) / 100;
//    let totales = `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">`;
//    totales += `<div class="row"><div class="col-6 "><div class="row"><div class="col-3"><span><i class="fas fa-map-marked mr-1"></i></span></div><div class="col-9"><span style="color: brown;">Kilómetros totales</span></div></div></div>`;
//    totales += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${total_km} Km</span></div></div></div></div>`;
//    totales += `</div></div></div>`;

//    $('#rutas-km').html(`${rutas}${totales}`);    
//    $('.editar-mapa').on('click', (e) => editarRuta(e));
//    if (validar_escenario == 'vc') $('#kilometro-sem-vc').val(total_km);    
//    if (validar_escenario == 'cvc')$('#kilometro-sem-cvc').val(total_km); 
//    if (validar_escenario == 've') $('#kilometro-sem-ve').val(total_km); 
//    if (validar_escenario == 't1') $('#kilometros-01').val(total_km); 
//    if (validar_escenario == 't2') $('#kilometros-02').val(total_km); 
//    if (validar_escenario == 't3') $('#kilometros-03').val(total_km); 
//    if (validar_escenario == 't4') $('#kilometros-04').val(total_km);
//}

var listarRutas = () => {
    $('#rutas-km').html('');
    let arr = retornarArrayRutaTemp();
    let rutas = "", total_km = 0;

    if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            //let total = parseFloat(arr[i].DISTANCIA) * parseFloat(arr[i].VECES_SEMANA);
            //total_km += arr[i].KM_SEMANAL;        

            //let titulo = `<div class="row">`;
            //titulo += `<div class="col-10"><div class="row"><div class="col-12"><h6 style="color: blue;">Ruta N° ${arr[i].ID_RUTA}:</h6></div></div></div>`;
            //titulo += `<div class="col-2"><div class="row"><div class="col-12 ml-3"><a href="#"><i class="fas fa-window-close mr-1"></i></a></div></div></div>`;
            //titulo += `<div class="col-12"><hr /></div></div>`;

            //let origen_destino = `<div class="row">`;
            //origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Origen</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].NOMBRE_ORIGEN}</span></div></div></div>`;
            //origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Destino</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].NOMBRE_DESTINO}</span></div></div></div>`;
            //origen_destino += `<div class="col-12"><hr /></div></div>  `; 
                        
            //let veces_km_semana = `<div class="row">`;  
            //veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Veces por semana</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].VECES_SEMANA}</span></div></div></div>`;
            //veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-9"><span style="color: brown;">Km de la ruta</span></div><div class="col-3"><a class="editar-mapa" href="#" data-accion="editar" id="${validar_escenario}-${arr[i].ID_RUTA}"><i class="fas fa-map-marked mr-1"></i></a></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].DISTANCIA} Km</span></div></div></div>`;
            //veces_km_semana += `<div class="col-12"><hr /></div></div>`;                                    
        
            //let km_total = `<div class="row">`;
            //km_total += `<div class="col-6 "></div>`;
            //km_total += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Km total</span></div></div><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${Math.round(total * 100) / 100} Km</span></div></div></div>`;
            //km_total += `</div>`;

            //rutas += `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">${titulo}${origen_destino}${veces_km_semana}${km_total}</div></div></div>`; 
            
            let cerrar = i == 0 ? '<div class="col-12 text-right"></div>' : `<div class="col-12 text-right"><a href="javascript:void(0)" class="quitar-ruta" id="quitar-${arr[i].ID_RUTA}"><i class="fas fa-window-close mr-1"></i></a></div>`;
            let nombreruta = `<div class="col-12"><div class="container-input"><input type="text" id="ruta-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_RUTA}" required><label for="" class="label">Nombre de la ruta</label></div></div>`;
            let origen = `<div class="col-6"><div class="container-input"><input type="text" id="origen-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_ORIGEN}" required><label for="" class="label">Origen</label></div></div>`;
            let destino = `<div class="col-6"><div class="container-input"><input type="text" id="destino-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_DESTINO}" required><label for="" class="label">Destino</label></div></div>`;
            let vecessemana = `<div class="col-6"><div class="container-input"><input type="text" id="veces-${arr[i].ID_RUTA}" class="field calcular-km" value="${arr[i].VECES_SEMANA}" required><label for="" class="label">Veces por semana</label></div></div>`;
            let kmdiario = `<div class="col-9"><div class="container-input"><input type="text" id="kmdiario-${arr[i].ID_RUTA}" class="field calcular-km" value="${arr[i].KM_DIARIO}" required><label for="" class="label">Km diarios</label></div></div>`;
            let botonmap = `<div class="col-3"><div class="container-input"><a class="distancia-mapa" href="javascript:void(0)" id="distancia-${arr[i].ID_RUTA}"><i class="fas fa-map-marked mr-1"></i></a></div></div>`;
            let contentkmdiario = `<div class="col-6"><div class="row">${kmdiario}${botonmap}</div></div>`;
            let vacio = `<div class="col-6"></div>`;
            let kmsemanal = `<div class="col-6"><div class="container-input"><input type="text" id="kmsemanal-${arr[i].ID_RUTA}" class="field" value="${arr[i].KM_SEMANAL}" required><label for="" class="label">Km semanal</label></div></div>`;
            rutas += `<div class="col-6 mb-2 rutas" id="bloq-ruta-${arr[i].ID_RUTA}" data-nuevo="0" data-eliminar="0"><div class="estilo-g"><div class="row">${cerrar}${nombreruta}${origen}${destino}${vecessemana}${contentkmdiario}${vacio}${kmsemanal}</div></div></div>`;
        }
        $('#rutas-km').append(`${rutas}`);
        $('.distancia-mapa').on('click', (e) => distanciaRuta(e));                
    } else {
        agregarRuta();
    } 
    
    calcularTotal();

    //total_km = Math.round(total_km * 100) / 100;
    //let totales = `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">`;
    //totales += `<div class="row"><div class="col-6 "><div class="row"><div class="col-3"><span><i class="fas fa-map-marked mr-1"></i></span></div><div class="col-9"><span style="color: brown;">Kilómetros totales</span></div></div></div>`;
    //totales += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${total_km} Km</span></div></div></div></div>`;
    //totales += `</div></div></div>`;

       
    //$('.editar-mapa').on('click', (e) => editarRuta(e));
    //if (validar_escenario == 'vc') $('#kilometro-sem-vc').val(total_km);    
    //if (validar_escenario == 'cvc')$('#kilometro-sem-cvc').val(total_km); 
    //if (validar_escenario == 've') $('#kilometro-sem-ve').val(total_km); 
    //if (validar_escenario == 't1') $('#kilometros-01').val(total_km); 
    //if (validar_escenario == 't2') $('#kilometros-02').val(total_km); 
    //if (validar_escenario == 't3') $('#kilometros-03').val(total_km); 
    //if (validar_escenario == 't4') $('#kilometros-04').val(total_km);
}

var retornarArrayRutaTemp = () => {
    if ("vc" == validar_escenario) return arr_ruta_vc;
    if ("cvc" == validar_escenario) return arr_ruta_cvc;
    if ("ve" == validar_escenario) return arr_ruta_ve;
    if ("t1" == validar_escenario) return arr_ruta_t1;
    if ("t2" == validar_escenario) return arr_ruta_t2;
    if ("t3" == validar_escenario) return arr_ruta_t3;
    if ("t4" == validar_escenario) return arr_ruta_t4;
    return [];
}

//var retornarArrayRutaBD = () => {
//    if ("vc" == validar_escenario) return arr_ruta_vc_bd;
//    if ("cvc" == validar_escenario) return arr_ruta_cvc_bd;
//    if ("ve" == validar_escenario) return arr_ruta_ve_bd;
//    if ("t1" == validar_escenario) return arr_ruta_t1_bd;
//    if ("t2" == validar_escenario) return arr_ruta_t2_bd;
//    if ("t3" == validar_escenario) return arr_ruta_t3_bd;
//    if ("t4" == validar_escenario) return arr_ruta_t4_bd;
//    return [];
//}

var agregarRuta = () => {
    let arr = retornarArrayRutaTemp();
    let rutas = "", total_km = 0;
    let tam = arr.length == 0 ? 1 : arr[arr.length - 1].ID_RUTA + 1;

    let cerrar = tam == 1 ? '' : `<div class="col-12 text-right"><a href="javascript:void(0)" class="quitar-ruta" id="quitar-${tam}"><i class="fas fa-window-close mr-1"></i></a></div>`;
    let nombreruta = `<div class="col-12"><div class="container-input"><input type="text" id="ruta-${tam}" class="field" required><label for="" class="label">Nombre de la ruta</label></div></div>`;
    let origen = `<div class="col-6"><div class="container-input"><input type="text" id="origen-${tam}" class="field" required><label for="" class="label">Origen</label></div></div>`;
    let destino = `<div class="col-6"><div class="container-input"><input type="text" id="destino-${tam}" class="field" required><label for="" class="label">Destino</label></div></div>`;
    let vecessemana = `<div class="col-6"><div class="container-input"><input type="text" id="veces-${tam}" class="field calcular-km" required><label for="" class="label">Veces por semana</label></div></div>`;
    let kmdiario = `<div class="col-9"><div class="container-input"><input type="text" id="kmdiario-${tam}" class="field calcular-km" required><label for="" class="label">Km diarios</label></div></div>`;
    let botonmap = `<div class="col-3"><div class="container-input"><a class="distancia-mapa" href="javascript:void(0)" id="distancia-${tam}"><i class="fas fa-map-marked mr-1"></i></a></div></div>`;
    let contentkmdiario = `<div class="col-6"><div class="row">${kmdiario}${botonmap}</div></div>`;
    let vacio = `<div class="col-6"></div>`;
    let kmsemanal = `<div class="col-6"><div class="container-input"><input type="text" id="kmsemanal-${tam}" class="field" required><label for="" class="label">Km semanal</label></div></div>`;
    rutas = `<div class="col-6 mb-2 rutas" id="bloq-ruta-${tam}" data-nuevo="1"><div class="estilo-g"><div class="row">${cerrar}${nombreruta}${origen}${destino}${vecessemana}${contentkmdiario}${vacio}${kmsemanal}</div></div></div>`;

    $('#rutas-km').append(`${rutas}`);

    arr.push({
        ID_RUTA: tam,
        NOMBRE_RUTA: '',
        NOMBRE_ORIGEN: '',
        NOMBRE_DESTINO: '',
        VECES_SEMANA: 0,
        KM_DIARIO: 0,
        KM_SEMANAL: 0,
        ORIGEN: '',
        DESTINO: '',
        COPIA: 0,
        BD: 0,
        ID_OBJETO: 0,
        TIPO_ARR: '',
        OBJETO: {},
        ID_RUTA_BD: 0,
        ACTIVO: 1,
    });

    $('.distancia-mapa').on('click', (e) => distanciaRuta(e));
    //let sec1 = `<div class="col-6"><div class="row"><div class="col-3"><span><i class="fas fa-map-marked mr-1"></i></span></div><div class="col-9"><span style="color: brown;">Kilómetros totales</span></div></div></div>`;
    //let sec2 = `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${total_km} Km</span></div></div></div>`;
    //let totales = `<div class="col-6 vc-rutas"><div class="estilo-g"><div class="row"><div class="col-12"><div class="row">${sec1}${sec2}</div></div></div></div></div>`;

    //$('#rutas-km').html(`${rutas}${totales}`);    
    //$('.editar-mapa').on('click', (e) => editarRuta(e));
    //if (validar_escenario == 'vc') $('#kilometro-sem-vc').val(total_km);    
    //if (validar_escenario == 'cvc')$('#kilometro-sem-cvc').val(total_km); 
    //if (validar_escenario == 've') $('#kilometro-sem-ve').val(total_km); 
    //if (validar_escenario == 't1') $('#kilometros-01').val(total_km); 
    //if (validar_escenario == 't2') $('#kilometros-02').val(total_km); 
    //if (validar_escenario == 't3') $('#kilometros-03').val(total_km); 
    //if (validar_escenario == 't4') $('#kilometros-04').val(total_km);
}

$(document).on('click', '.quitar-ruta', (e) => {
    let id = e.currentTarget.id;
    let comp = id.replace('quitar-', '');  
    let element = $(`#${id}`).parent().parent().parent().parent()[0].id;
    if ($(`#${element}`).data("nuevo") == 1){
        let arr = retornarArrayRutaTemp();
        let indice = arr.findIndex(x => { return x.ID_RUTA == comp; });
        retornarArrayRutaTemp().splice(indice, 1);
        $(`#${element}`).remove();
    } else if ($(`#${element}`).data("nuevo") == 0) {
        $(`#${element}`).data("eliminar", 1);
        $(`#${element}`).addClass('d-none');
    }    
    //$(`#${id}`).parent().parent().parent().parent().remove();
    calcularTotal();
});

$(document).on('keyup paste', '.calcular-km', (e) => {
    let comp = e.currentTarget.id.replace('veces-','').replace('kmdiario-','');
    calcular(comp);
});

$(document).on('click', '.agregar-ruta-bd', (e) => {
    let comp = e.currentTarget.id.replace('agregar-','');
    let i = arr_veh_ruta_bd.findIndex(x => { return x.ID_RUTA == comp; });
    agregarRutaBD(i)
});

$(document).on('click', '.eliminar-ruta-bd', (e) => {
    let comp = e.currentTarget.id.replace('eliminar-','');
    let i = arr_veh_ruta_bd.findIndex(x => { return x.ID_RUTA == comp; });
    arr_veh_ruta_bd[i].FLAG_ESTADO = 0;
    let element = $(`#${e.currentTarget.id}`).parent().parent().parent().parent().parent().parent().parent()[0].id;
    $(`#${element}`).remove();
});

var agregarRutaBD = (i) => {
    let arr = retornarArrayRutaTemp();
    let arrCopia = [];
    let count = 0;
    let validar = false;
    
    if (arr.length == 1 && ($(`#ruta-1`).val() == "" && $(`#origen-1`).val() == "" && $(`#destino-1`).val() == "" && $(`#veces-1`).val() == "" && $(`#kmdiario-1`).val() == "" && $(`#kmsemanal-1`).val() == "") ) {
        //arr = [];
        limpiarArray();
        validar = true;
        retornarArrayRutaTemp().push({
            ID_RUTA: retornarArrayRutaTemp().length + 1,
            NOMBRE_RUTA: arr_veh_ruta_bd[i].NOMBRE_RUTA,
            NOMBRE_ORIGEN: arr_veh_ruta_bd[i].NOMBRE_ORIGEN,
            NOMBRE_DESTINO: arr_veh_ruta_bd[i].NOMBRE_DESTINO,
            VECES_SEMANA: arr_veh_ruta_bd[i].VECES_SEMANA,
            KM_DIARIO: arr_veh_ruta_bd[i].KM_DIARIO,
            KM_SEMANAL: arr_veh_ruta_bd[i].KM_SEMANAL,
            ORIGEN: arr_veh_ruta_bd[i].ORIGEN,
            DESTINO: arr_veh_ruta_bd[i].DESTINO,
            COPIA: 0,
            BD: 1,
            ID_OBJETO: 0,
            TIPO_ARR: '',
            OBJETO: arr_veh_ruta_bd[i],
            ID_RUTA_BD: arr_veh_ruta_bd[i].ID_RUTA,
            ACTIVO: 1,
        });
    } else {
        retornarArrayRutaTemp().push({
            ID_RUTA: arr[arr.length - 1].ID_RUTA + 1,
            NOMBRE_RUTA: arr_veh_ruta_bd[i].NOMBRE_RUTA,
            NOMBRE_ORIGEN: arr_veh_ruta_bd[i].NOMBRE_ORIGEN,
            NOMBRE_DESTINO: arr_veh_ruta_bd[i].NOMBRE_DESTINO,
            VECES_SEMANA: arr_veh_ruta_bd[i].VECES_SEMANA,
            KM_DIARIO: arr_veh_ruta_bd[i].KM_DIARIO,
            KM_SEMANAL: arr_veh_ruta_bd[i].KM_SEMANAL,
            ORIGEN: arr_veh_ruta_bd[i].ORIGEN,
            DESTINO: arr_veh_ruta_bd[i].DESTINO,
            COPIA: 0,
            BD: 1,
            ID_OBJETO: 0,
            TIPO_ARR: '',
            OBJETO: arr_veh_ruta_bd[i],
            ID_RUTA_BD: arr_veh_ruta_bd[i].ID_RUTA,
            ACTIVO: 1,
        });
        //count = arr.length - arr_veh_ruta_bd.length;
    }
    mostrarRutaBD(retornarArrayRutaTemp(), validar, arr.length - 1);
}

var mostrarRutaBD = (arr, v, i) => {
    let rutas = "";
    if (v) $('#rutas-km').html("");
    let cerrar = i == 0 ? '<div class="col-12 text-right"></div>' : `<div class="col-12 text-right"><a href="javascript:void(0)" class="quitar-ruta" id="quitar-${arr[i].ID_RUTA}"><i class="fas fa-window-close mr-1"></i></a></div>`;
    let nombreruta = `<div class="col-12"><div class="container-input"><input type="text" id="ruta-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_RUTA}" required><label for="" class="label">Nombre de la ruta</label></div></div>`;
    let origen = `<div class="col-6"><div class="container-input"><input type="text" id="origen-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_ORIGEN}" required><label for="" class="label">Origen</label></div></div>`;
    let destino = `<div class="col-6"><div class="container-input"><input type="text" id="destino-${arr[i].ID_RUTA}" class="field" value="${arr[i].NOMBRE_DESTINO}" required><label for="" class="label">Destino</label></div></div>`;
    let vecessemana = `<div class="col-6"><div class="container-input"><input type="text" id="veces-${arr[i].ID_RUTA}" class="field calcular-km" value="${arr[i].VECES_SEMANA}" required><label for="" class="label">Veces por semana</label></div></div>`;
    let kmdiario = `<div class="col-9"><div class="container-input"><input type="text" id="kmdiario-${arr[i].ID_RUTA}" class="field calcular-km" value="${arr[i].KM_DIARIO}" required><label for="" class="label">Km diarios</label></div></div>`;
    let botonmap = `<div class="col-3"><div class="container-input"><a class="distancia-mapa" href="javascript:void(0)" id="distancia-${arr[i].ID_RUTA}"><i class="fas fa-map-marked mr-1"></i></a></div></div>`;
    let contentkmdiario = `<div class="col-6"><div class="row">${kmdiario}${botonmap}</div></div>`;
    let vacio = `<div class="col-6"></div>`;
    let kmsemanal = `<div class="col-6"><div class="container-input"><input type="text" id="kmsemanal-${arr[i].ID_RUTA}" class="field" value="${arr[i].KM_SEMANAL}" required><label for="" class="label">Km semanal</label></div></div>`;
    rutas = `<div class="col-6 mb-2 rutas" id="bloq-ruta-${arr[i].ID_RUTA}" data-nuevo="1"><div class="estilo-g"><div class="row">${cerrar}${nombreruta}${origen}${destino}${vecessemana}${contentkmdiario}${vacio}${kmsemanal}</div></div></div>`;
     
    $('#rutas-km').append(`${rutas}`);
    $('.distancia-mapa').on('click', (e) => distanciaRuta(e));
    calcularTotal();
    atrasRutaFrecuente();
}

var calcular = (comp) => {
    let veces_semana = $(`#veces-${comp}`).val();
    let km_diario = $(`#kmdiario-${comp}`).val();
    veces_semana = veces_semana == "" ? 0 : parseFloat(veces_semana);
    km_diario = km_diario == "" ? 0 : parseFloat(km_diario);
    km_semanal = veces_semana * km_diario;
    $(`#kmsemanal-${comp}`).val(Math.round(km_semanal*100)/100);
    calcularTotal();
}

var calcularTotal = () => {
    let total = 0;
    $('[id*="kmsemanal-"]').each((x,y) => {
        debugger;
        let element = $(y).parent().parent().parent().parent().parent()[0].id;
        if ($(`#${element}`).data("nuevo") == 1)
            total += $(y).val() == "" ? 0 : parseFloat($(y).val());
        else if ($(`#${element}`).data("nuevo") == 0)
            if ($(`#${element}`).data("eliminar") == 0)
                total += $(y).val() == "" ? 0 : parseFloat($(y).val());

    });
    $('#totalkm').html(total);
}

var nuevaRuta = (e) => {
    //mostrarMapa();
    //directions.removeRoutes();
    //accion = 0;
    agregarRuta();
}

//var editarRuta = (e) => {
//    mostrarMapa();
//    let id = $(`#${e.currentTarget.id}`);
//    accion = parseInt(e.currentTarget.id.replace('vc-','').replace('cvc-','').replace('ve-','').replace('t1-','').replace('t2-','').replace('t3-','').replace('t4-',''));
//    let arr;
//    if ("vc" == validar_escenario) arr = arr_ruta_vc;
//    if ("cvc" == validar_escenario) arr = arr_ruta_cvc;
//    if ("ve" == validar_escenario) arr = arr_ruta_ve;
//    if ("t1" == validar_escenario) arr = arr_ruta_t1;
//    if ("t2" == validar_escenario) arr = arr_ruta_t2;
//    if ("t3" == validar_escenario) arr = arr_ruta_t3;
//    if ("t4" == validar_escenario) arr = arr_ruta_t4;
//    let v = arr.find(x => { return x.ID_RUTA == accion; }) == undefined ? false : true;
//    if (v) {
//        let i = arr.findIndex(x => { return x.ID_RUTA == accion; });
//        directions.setOrigin(arr[i].ORIGEN);
//        directions.setDestination(arr[i].DESTINO);
//        $('#veces-semana').val(arr[i].VECES_SEMANA);
//    }
//}

var distanciaRuta = (e) => {
    mostrarMapa();
    comp = e.currentTarget.id.replace('distancia-','');
    let arr = retornarArrayRutaTemp();
    let v = arr.find(x => { return x.ID_RUTA == comp; }) == undefined ? false : true;
    if (v) {
        let i = arr.findIndex(x => { return x.ID_RUTA == comp; });
        directions.setOrigin(arr[i].ORIGEN);
        directions.setDestination(arr[i].DESTINO);
        accion = comp;
    }
}

var mostrarMapa = () => {
    $('#seccion-mapa').removeClass('d-none');
    $('#seccion-menu-ruta').addClass('d-none');
    directions.removeRoutes();
    $('#mapbox-directions-origin-input div input').val('');
    $('#mapbox-directions-destination-input div input').val('');
    //$('#veces-semana').val('');
}

var aceptarRuta = () => {
    $('[id*="bloq-ruta-"]').each((x,y) => {
        let id = $(y)[0].id.replace('bloq-ruta-','');
        let arr = retornarArrayRutaTemp();
        let i = arr.findIndex(x => { return x.ID_RUTA == id; });
        if ($(y).data("nuevo") == 0) {
            if ($(y).data("eliminar") == 1) {
                retornarArrayRutaTemp().splice(i, 1);
                $(`#${id}`).parent().parent().parent().parent().remove();
            } else              
                actualizarArrayRuta(id, i);
        } else 
            actualizarArrayRuta(id, i);     
    });
    $('#seccion-menu-ruta').addClass('d-none');
    $('#seccion-principal').removeClass('d-none');
    mostrarKm();
}

var actualizarArrayRuta = (id, i) => {
    retornarArrayRutaTemp()[i].NOMBRE_RUTA = $(`#ruta-${id}`).val() == null ? "" : $(`#ruta-${id}`).val();
    retornarArrayRutaTemp()[i].NOMBRE_ORIGEN = $(`#origen-${id}`).val() == null ? "" : $(`#origen-${id}`).val();;
    retornarArrayRutaTemp()[i].NOMBRE_DESTINO = $(`#destino-${id}`).val() == null ? "" : $(`#destino-${id}`).val();
    retornarArrayRutaTemp()[i].VECES_SEMANA = $(`#veces-${id}`).val() == null ? "" : $(`#veces-${id}`).val();
    retornarArrayRutaTemp()[i].KM_DIARIO = $(`#kmdiario-${id}`).val() == null ? "" : $(`#kmdiario-${id}`).val();
    retornarArrayRutaTemp()[i].KM_SEMANAL = $(`#kmsemanal-${id}`).val() == null ? "" : $(`#kmsemanal-${id}`).val();
}

var mostrarKm = () => {
    let km = parseFloat($('#totalkm').html());
    if ("vc" == validar_escenario) $('#kilometro-sem-vc').val(km);
    if ("cvc" == validar_escenario) $('#kilometro-sem-cvc').val(km);
    if ("ve" == validar_escenario) $('#kilometro-sem-ve').val(km);
    if ("t1" == validar_escenario) $('#kilometros-01').val(km);
    if ("t2" == validar_escenario) $('#kilometros-02').val(km);
    if ("t3" == validar_escenario) $('#kilometros-03').val(km);
    if ("t4" == validar_escenario) $('#kilometros-04').val(km);
}

var atrasRuta = () => {    
    $('[id*="bloq-ruta-"]').each((x,y) => {
        //debugger;
        let id = $(y)[0].id.replace('bloq-ruta-','');
        if ($(y).data("nuevo") == 1) {
            let arr = retornarArrayRutaTemp();
            let indice = arr.findIndex(x => { return x.ID_RUTA == id; });
            retornarArrayRutaTemp().splice(indice, 1);
            //if ($(y).data("eliminar") == 1) $(y).data("eliminar", 0);
        }
    });
    calcularTotal();
    $('#seccion-menu-ruta').addClass('d-none'); 
    $('#seccion-principal').removeClass('d-none');
}

var atrasRutaFrecuente = () => {
    $('#seccion-rutas-bd').addClass("d-none");
    $('#seccion-menu-ruta').removeClass("d-none");
}

var obtenerDistancia = () => {
    if (directions.getOrigin().geometry == undefined || directions.getDestination().geometry == undefined) {
        alert("Debe seleccionar el origen y destino"); return;
    }

    origen_longitud = directions.getOrigin().geometry.coordinates[0];
    origen_latitud = directions.getOrigin().geometry.coordinates[1];
    destino_longitud = directions.getDestination().geometry.coordinates[0];
    destino_latitud = directions.getDestination().geometry.coordinates[1];

    actualizarRuta(retornarArrayRutaTemp());

    alert("Se guardó la ruta exitosamente");
    $('#seccion-mapa').addClass('d-none');
    $('#seccion-menu-ruta').removeClass('d-none');
    $(`#kmdiario-${accion}`).val(Math.round((parseFloat(distancia)/1000)*100)/100);
    calcular(accion);
    //listarRutas();
}

var obtenerListaVehiculo = (arr) => {
    debugger;
    if (arr_ruta_vc.length > 0) {
        arr = asignarValoresArray(arr_ruta_vc, arr);
    }

    if (arr_ruta_cvc.length > 0) {
        arr = asignarValoresArray(arr_ruta_cvc, arr);
    }

    if (arr_ruta_ve.length > 0) {
        arr = asignarValoresArray(arr_ruta_ve, arr);
    }
    return arr;
}

var asignarValoresArray = (arrV, arr) => {
    for (var i = 0; i < arrV.length; i++) {
        if (arrV[i].COPIA == 0 && arrV[i].BD == 0) {
            arr.push({
                ID_RUTA: 0,
                NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                VECES_SEMANA: arrV[i].VECES_SEMANA,
                KM_DIARIO: arrV[i].KM_DIARIO,
                KM_SEMANAL: arrV[i].KM_SEMANAL,
                ORIGEN: arrV[i].ORIGEN,
                DESTINO: arrV[i].DESTINO,
                FLAG_ESTADO: arrV[i].ACTIVO,
            });
        } else if (arrV[i].COPIA == 1 && arrV[i].BD == 0) {
            var arrTemp = obtenerArrayVeh(arrV[i].TIPO_ARR);
            let v = arrTemp.find(x => { return x.ID_RUTA == arrV[i].ID_OBJETO;}) == undefined ? false : true;
            if (v) {
                let j = arrTemp.findIndex(x => { return x.ID_RUTA == arrV[i].ID_OBJETO;});                
                if (arrTemp[j].NOMBRE_RUTA != arrV[i].NOMBRE_RUTA ||
                    arrTemp[j].NOMBRE_ORIGEN != arrV[i].NOMBRE_ORIGEN ||
                    arrTemp[j].NOMBRE_DESTINO != arrV[i].NOMBRE_DESTINO ||
                    arrTemp[j].VECES_SEMANA != arrV[i].VECES_SEMANA ||
                    arrTemp[j].KM_DIARIO != arrV[i].KM_DIARIO) {
                    arr.push({
                        ID_RUTA: 0,
                        NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                        NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                        NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                        VECES_SEMANA: arrV[i].VECES_SEMANA,
                        KM_DIARIO: arrV[i].KM_DIARIO,
                        KM_SEMANAL: arrV[i].KM_SEMANAL,
                        ORIGEN: arrV[i].ORIGEN,
                        DESTINO: arrV[i].DESTINO,
                        FLAG_ESTADO: arrV[i].ACTIVO,
                    });
                } 
            } else {
                arr.push({
                    ID_RUTA: 0,
                    NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                    NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                    NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                    VECES_SEMANA: arrV[i].VECES_SEMANA,
                    KM_DIARIO: arrV[i].KM_DIARIO,
                    KM_SEMANAL: arrV[i].KM_SEMANAL,
                    ORIGEN: arrV[i].ORIGEN,
                    DESTINO: arrV[i].DESTINO,
                    FLAG_ESTADO: arrV[i].ACTIVO,
                });
            }                       
        } else if (arrV[i].COPIA == 0 && arrV[i].BD == 1) {
            let j = arr_veh_ruta_bd.findIndex(x => { return x.ID_RUTA == arrV[i].ID_RUTA_BD;});
            if (arr_veh_ruta_bd[j].FLAG_ESTADO == 1) {
                let entidad = arrV[i].OBJETO;
                if (entidad.NOMBRE_RUTA != arrV[i].NOMBRE_RUTA ||
                    entidad.NOMBRE_ORIGEN != arrV[i].NOMBRE_ORIGEN ||
                    entidad.NOMBRE_DESTINO != arrV[i].NOMBRE_DESTINO ||
                    entidad.VECES_SEMANA != arrV[i].VECES_SEMANA ||
                    entidad.KM_DIARIO != arrV[i].KM_DIARIO) {
                    arr.push({
                        ID_RUTA: 0,
                        NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                        NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                        NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                        VECES_SEMANA: arrV[i].VECES_SEMANA,
                        KM_DIARIO: arrV[i].KM_DIARIO,
                        KM_SEMANAL: arrV[i].KM_SEMANAL,
                        ORIGEN: arrV[i].ORIGEN,
                        DESTINO: arrV[i].DESTINO,
                        FLAG_ESTADO: arrV[i].ACTIVO,
                    });
                }
            } else {
                arr.push({
                    ID_RUTA: 0,
                    NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                    NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                    NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                    VECES_SEMANA: arrV[i].VECES_SEMANA,
                    KM_DIARIO: arrV[i].KM_DIARIO,
                    KM_SEMANAL: arrV[i].KM_SEMANAL,
                    ORIGEN: arrV[i].ORIGEN,
                    DESTINO: arrV[i].DESTINO,
                    FLAG_ESTADO: arrV[i].ACTIVO,
                });
            }            
        } else if (arrV[i].COPIA == 1 && arrV[i].BD == 1) {            
            let arrTemp = obtenerArrayVeh(arrV[i].TIPO_ARR);
            let v = arrTemp.find(x => { return x.ID_RUTA == arrV[i].ID_OBJETO;}) == undefined ? false : true;
            let k = arr_veh_ruta_bd.findIndex(x => { return x.ID_RUTA == arrV[i].ID_RUTA_BD;});
            if (v) {
                let j = arrTemp.findIndex(x => { return x.ID_RUTA == arrV[i].ID_OBJETO;}); 
                if (arr_veh_ruta_bd[k].FLAG_ESTADO == 1) {
                    if (arrTemp[j].NOMBRE_RUTA != arrV[i].NOMBRE_RUTA ||
                    arrTemp[j].NOMBRE_ORIGEN != arrV[i].NOMBRE_ORIGEN ||
                    arrTemp[j].NOMBRE_DESTINO != arrV[i].NOMBRE_DESTINO ||
                    arrTemp[j].VECES_SEMANA != arrV[i].VECES_SEMANA ||
                    arrTemp[j].KM_DIARIO != arrV[i].KM_DIARIO) {
                        arr.push({
                            ID_RUTA: 0,
                            NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                            NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                            NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                            VECES_SEMANA: arrV[i].VECES_SEMANA,
                            KM_DIARIO: arrV[i].KM_DIARIO,
                            KM_SEMANAL: arrV[i].KM_SEMANAL,
                            ORIGEN: arrV[i].ORIGEN,
                            DESTINO: arrV[i].DESTINO,
                            FLAG_ESTADO: arrV[i].ACTIVO,
                        });
                    } 
                } else {
                    if (
                        (arrTemp[j].NOMBRE_RUTA != arrV[i].NOMBRE_RUTA || arrTemp[j].NOMBRE_ORIGEN != arrV[i].NOMBRE_ORIGEN || arrTemp[j].NOMBRE_DESTINO != arrV[i].NOMBRE_DESTINO ||
                        arrTemp[j].VECES_SEMANA != arrV[i].VECES_SEMANA || arrTemp[j].KM_DIARIO != arrV[i].KM_DIARIO)
                        &&
                        (arr_veh_ruta_bd[k].NOMBRE_RUTA != arrV[i].NOMBRE_RUTA || arr_veh_ruta_bd[k].NOMBRE_ORIGEN != arrV[i].NOMBRE_ORIGEN || arr_veh_ruta_bd[k].NOMBRE_DESTINO != arrV[i].NOMBRE_DESTINO ||
                        arr_veh_ruta_bd[k].VECES_SEMANA != arrV[i].VECES_SEMANA || arr_veh_ruta_bd[k].KM_DIARIO != arrV[i].KM_DIARIO)                      
                        ) {
                        arr.push({
                            ID_RUTA: 0,
                            NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                            NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                            NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                            VECES_SEMANA: arrV[i].VECES_SEMANA,
                            KM_DIARIO: arrV[i].KM_DIARIO,
                            KM_SEMANAL: arrV[i].KM_SEMANAL,
                            ORIGEN: arrV[i].ORIGEN,
                            DESTINO: arrV[i].DESTINO,
                            FLAG_ESTADO: arrV[i].ACTIVO,
                        });
                    } 
                }
            } else {
                if (arr_veh_ruta_bd[k].FLAG_ESTADO == 0) {
                    arr.push({
                        ID_RUTA: 0,
                        NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                        NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                        NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                        VECES_SEMANA: arrV[i].VECES_SEMANA,
                        KM_DIARIO: arrV[i].KM_DIARIO,
                        KM_SEMANAL: arrV[i].KM_SEMANAL,
                        ORIGEN: arrV[i].ORIGEN,
                        DESTINO: arrV[i].DESTINO,
                        FLAG_ESTADO: arrV[i].ACTIVO,
                    });
                } else {
                    if (arr_veh_ruta_bd[k].NOMBRE_RUTA != arrV[i].NOMBRE_RUTA || arr_veh_ruta_bd[k].NOMBRE_ORIGEN != arrV[i].NOMBRE_ORIGEN || arr_veh_ruta_bd[k].NOMBRE_DESTINO != arrV[i].NOMBRE_DESTINO ||
                        arr_veh_ruta_bd[k].VECES_SEMANA != arrV[i].VECES_SEMANA || arr_veh_ruta_bd[k].KM_DIARIO != arrV[i].KM_DIARIO) {
                        arr.push({
                            ID_RUTA: 0,
                            NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
                            NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
                            NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
                            VECES_SEMANA: arrV[i].VECES_SEMANA,
                            KM_DIARIO: arrV[i].KM_DIARIO,
                            KM_SEMANAL: arrV[i].KM_SEMANAL,
                            ORIGEN: arrV[i].ORIGEN,
                            DESTINO: arrV[i].DESTINO,
                            FLAG_ESTADO: arrV[i].ACTIVO,
                        });
                    } 
                }
            }
        }
    }
    return arr;
}

var obtenerArrayVeh = (accion) => {
    if ("vc" == accion) return arr_ruta_vc;
    if ("cvc" == accion) return arr_ruta_cvc;
    if ("ve" == accion) return arr_ruta_ve;
    if ("t1" == accion) return arr_ruta_t1;
    if ("t2" == accion) return arr_ruta_t2;
    if ("t3" == accion) return arr_ruta_t3;
    if ("t4" == accion) return arr_ruta_t4;
}

//var asignarValoresArray = (arrV, arr) => {
//    for (var i = 0; i < arrV.length; i++) {
//        if (arrV[i].COPIA == 0) {
//            arr.push({
//                ID_RUTA: 0,
//                NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
//                NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
//                NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
//                VECES_SEMANA: arrV[i].VECES_SEMANA,
//                KM_DIARIO: arrV[i].KM_DIARIO,
//                KM_SEMANAL: arrV[i].KM_SEMANAL,
//                ORIGEN: arrV[i].ORIGEN,
//                DESTINO: arrV[i].DESTINO,
//            });
//        } else if (arrV[i].COPIA == 1) {
//            let entidad = arrV[i].OBJETO;
//            if (entidad.NOMBRE_RUTA != arrV[i].NOMBRE_RUTA ||
//                entidad.NOMBRE_ORIGEN != arrV[i].NOMBRE_ORIGEN ||
//                entidad.NOMBRE_DESTINO != arrV[i].NOMBRE_DESTINO ||
//                entidad.VECES_SEMANA != arrV[i].VECES_SEMANA ||
//                entidad.KM_DIARIO != arrV[i].KM_DIARIO) {
//                arr.push({
//                    ID_RUTA: 0,
//                    NOMBRE_RUTA: arrV[i].NOMBRE_RUTA,
//                    NOMBRE_ORIGEN: arrV[i].NOMBRE_ORIGEN,
//                    NOMBRE_DESTINO: arrV[i].NOMBRE_DESTINO,
//                    VECES_SEMANA: arrV[i].VECES_SEMANA,
//                    KM_DIARIO: arrV[i].KM_DIARIO,
//                    KM_SEMANAL: arrV[i].KM_SEMANAL,
//                    ORIGEN: arrV[i].ORIGEN,
//                    DESTINO: arrV[i].DESTINO,
//                });
//            }
//        }
//    }
//    return arr;
//}

var guardarResultados = () => {
    let listaVehiculo = obtenerListaVehiculo(arr_veh_ruta_bd);
    let data = {
        ID_USUARIO: idUsuarioLogin,
        LISTA_LEYENDA: Lista_leyenda,
        LISTA_COSTO_CONVENCIONAL: Lista_convencional,
        LISTA_COSTO_ELECTRICO: Lista_electrico,
        LISTA_CONSUMO_CONVENCIONAL: Lista_consumo_energ_vc,
        LISTA_CONSUMO_ELECTRICO: Lista_consumo_energ_ve,
        LISTA_EMISIONES_CONVENCIONAL: Lista_emision_vc,
        LISTA_EMISIONES_ELECTRICO: Lista_emision_ve,
        LISTA_CONTAMINANTE_LOCAL: Lista_contaminante_local,
        LISTA_VEHICULO_RUTA: listaVehiculo,
        UPD_USUARIO: idUsuarioLogin,
    }
    console.log(JSON.stringify(listaVehiculo));
    //new end_points //decimo
    //let url = `${baseUrl}api/calculo/guardarresultados`; //prioridad 22
    let url = `${baseUrlApi}api/calculo/guardarresultados`;
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) };
    
    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json();
        else return 0;
    })
    .then(registro)
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        return 0;
    });
}

var registro = (j) => {
    $('.alert-add').html('');
    if (j == 0) { alert("Error, comunicarse con el administrador del sistema"); }
    else if (j == null || !(j)) { alert("Error en el registro de resultados"); }
    else {
        alert("Los datos fueron guardados correctamente.");
        //nuevoCalculo();
        location.href = `${baseUrl}Electromovilidad`
    }
}

var nuevoCalculo = () => {
    origen_longitud, origen_latitud, destino_longitud, destino_latitud, distancia, nombre_origen, nombre_destino, veces_semana_g;
    arr_ruta_vc = [], arr_ruta_cvc = [], arr_ruta_ve = [], arr_ruta_t1 = [], arr_ruta_t2 = [], arr_ruta_t3 = [], arr_ruta_t4 = [];
    validar_escenario = "", accion = 0, arr_veh_ruta_bd = [];

    //variable lista para graficos
    Lista_convencional = [], Lista_electrico = [], Lista_leyenda = [], Lista_consumo_energ_vc = [], Lista_consumo_energ_ve = [], Lista_emision_vc = [], Lista_emision_ve = [], Lista_contaminante_local = [];

    rendimiento_vc_g = 0, precio_combustible_vc_g = 0, factor_emision_vc = 0, rendimiento_cvc_g = 0, precio_combustible_cvc_g = 0, factor_emision_cvc_g = 0, precio_vehiculo_cvc_g = 0;
    rendimiento_ve_g = 0, capacidad_bateria_g = 0, precio_cargador_g = 0, costo_instalacion_g = 0, precio_vehiculo_cvc_g = 0, precio_vehiculo_ve_g = 0, tarifa_electricidad_g = 0;

    limpiarTP();
    limpiarVC();
    limpiarCVC();
    limpiarVE();

    $('#rad-e1-si').prop('checked', false);
    $('#rad-e1-no').prop('checked', false);
    $('#rad-e2-si').prop('checked', false);
    $('#rad-e2-no').prop('checked', false);
    $('#rad-e3-si').prop('checked', false);
    $('#rad-e3-no').prop('checked', false);

    $('#seccion-07').addClass('d-none');
    $('#seccion-opciones').addClass('d-none');
    $('#seccion-01').removeClass('d-none');
    $('#anio_evaluacion').val(15);
}

var limpiarTP = () => {
    //$('#servicio-01').val(0);
    //$('#servicio-02').val(0);
    //$('#servicio-03').val(0);
    //$('#servicio-04').val(0);
    arrTransporteMarcar = []
    $('#tipo-transporte-01').val(0);
    $('#tipo-transporte-02').val(0);
    $('#tipo-transporte-03').val(0);
    $('#tipo-transporte-04').val(0);
    $('#costo-movilidad-01').val('');
    $('#costo-movilidad-02').val('');
    $('#costo-movilidad-03').val('');
    $('#costo-movilidad-04').val('');
    $('#kilometros-01').val('');
    $('#kilometros-02').val('');
    $('#kilometros-03').val('');
    $('#kilometros-04').val('');
    $('#meses-01').val(0);
    $('#meses-02').val(0);
    $('#meses-03').val(0);
    $('#meses-04').val(0);
}

var limpiarVC = () => {
    $('#tipo-vehiculo-vc').val(0);
    $('#tipo-combustible-vc').val(0);
    $('#cbo-departamento-vc').val(0);
    $('#rad-ca-si-vc').prop('checked', false);
    $('#rad-ca-no-vc').prop('checked', true);
    $('#rendimiento-vc').val('0');
    $('#precio-combustible-vc').val('0');
    $('#porc-anual-combustible-vc').val('0');
    $('#factor-emision-vc').val('0');
    $('#mantenimiento-vc').val('0');
    $('#seguro-vc').val('0');
    $('#rad-gcs-si-vc').prop('checked', false);
    $('#rad-gcs-no-vc').prop('checked', true);
    $('#gasto-vc').val('0');
    $('#kilometro-sem-vc').val('0');
    $('#meses-vc').val(0);
    cambiarCongVC();
    cambiarCongGCVC();
}

var limpiarCVC = () => {
    $('#tipo-vehiculo-cvc').val(0);
    $('#tipo-combustible-cvc').val(0);
    $('#cbo-departamento-cvc').val(0);
    $('#rad-ca-si-cvc').prop('checked', false);
    $('#rad-ca-no-cvc').prop('checked', true);
    $('#rendimiento-cvc').val('0');
    $('#precio-combustible-cvc').val('0');
    $('#porc-anual-combustible-cvc').val('0');
    $('#factor-emision-cvc').val('0');
    $('#rad-gcs-si-cvc').prop('checked', false);
    $('#rad-gcs-no-cvc').prop('checked', true);
    $('#gasto-cvc').val('0');
    $('#kilometro-sem-cvc').val('0');
    $('#meses-cvc').val(0);
    $('#costo-veh-cvc').val('0');
    $('#tipo-compra-cvc').val(0);
    $('#tasa-interes-cvc').val('0');
    $('#anio-credito-cvc').val('0');
    $('#cuota-inicial-cvc').val('0');
    $('#rad-sv-si-cvc').prop('checked', false);
    $('#rad-sv-no-cvc').prop('checked', true);
    $('#seguro-cvc').val('0');
    cambiarCongCVC();
    cambiarCongGCCVC();
    //cambiarSeguroCVC();
    cambiarTipoCompraCVC();
}

var limpiarVE = () => {
    $('#tipo-vehiculo-ve').val(0);
    $('#modelo-ve').val(0);    
    $('#rad-ca-si-ve').prop('checked', false);
    $('#rad-ca-no-ve').prop('checked', true);
    $('#rendimiento-ve').val('0');
    $('#bateria-ve').val('0');
    $('#tipo-cargador').val(0);
    $('#txt-potencia').val('0');
    $('#cbo-potencia').val(0);
    $('#precio-cargador').val('0');
    $('#costo-instalacion').val('0');
    $('#cbo-departamento').val(0);
    $('#rad-t-si-ve').prop('checked', false);
    $('#rad-t-no-ve').prop('checked', true);
    $('#tarifa-ve').val('0');
    $('#porc-aual-ve').val('0');
    $('#kilometro-sem-ve').val('0');
    $('#meses-ve').val(0);
    $('#costo-veh-ve').val('0');
    $('#tipo-compra-ve').val(0);
    $('#tasa-interes-ve').val('0');
    $('#anio-credito-ve').val('0');
    $('#cuota-inicial-ve').val('0');
    $('#rad-sv-si-ve').prop('checked', false);
    $('#rad-sv-no-ve').prop('checked', true);
    $('#seguro-ve').val('0');
    $('#rad-inc-si-ve').prop('checked', false);
    $('#rad-inc-no-ve').prop('checked', true);
    $('#tipo-incentivo').val(0);
    $('#horizonte').val(0);
    $('#cuota-inc-anual').val('0');
    $('#forma-incentivo').val(0);
    $('#porcentaje-inc').val('0');
    $('#valor-inc-unico').val('0');
    cambiarCongVE();
    cambiarTipoCompraCVE();
    cambiarSeguroCVE();
    cambiarTC();
    cambiarCongTE();
    cambiarCongINC();
    cambiarTI();
    cambiarFI();
}

$(document).on('click', '.viewGrafico', (e) => {
    let id = e.currentTarget.id
    let grafico = $(`#${id}_G`)[0].className.indexOf("d-none")
    if (grafico != -1) $(`#${id}_G`).removeClass('d-none')
    else $(`#${id}_G`).addClass('d-none')
})

$(document).on('change', '.chk-marcar', (e) => {
    //alert('hi')

    let id = e.currentTarget.id.replace('chk-tp-','')
    let estado = $(`#chk-tp-${id}`).prop('checked')

    if (estado) {
        if (arrTransporteMarcar.length < 4){
            arrTransporteMarcar = []
            $('[id*="chk-tp-"]').each((x, y) => {
                if ($(y).prop('checked'))
                    arrTransporteMarcar.push({ ID: $(y).attr("id").replace('chk-tp-','') })
            })
        } else
            $(`#chk-tp-${id}`).prop('checked', false)
    } else {
        let v = arrTransporteMarcar.findIndex(x => { return x.ID == id })
        if (v > -1) {
            arrTransporteMarcar = []
            $('[id*="chk-tp-"]').each((x, y) => {
                if ($(y).prop('checked'))
                    arrTransporteMarcar.push({ ID: $(y).attr("id").replace('chk-tp-','') })
            })
        }
    }
    
})