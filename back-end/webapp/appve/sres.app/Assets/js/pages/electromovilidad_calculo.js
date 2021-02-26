//variable mapa
var origen_longitud, origen_latitud, destino_longitud, destino_latitud, distancia, nombre_origen, nombre_destino, veces_semana_g, total_km_vc_g, total_km_cvc_g, total_km_ve_g, total_km_t1_g, total_km_t2_g, total_km_t3_g, total_km_t4_g; //variable origen (x, y), destino (x,y), distancia, nombre origen, nombre destino
var directions; //variable mapbox
var arr_ruta_vc = []; // array de rutas VC, CVC, VE, SP
var validar_escenario, accion;

//variable lista para graficos
var Lista_convencional, Lista_electrico, Lista_leyenda, Lista_consumo_energ_vc, Lista_consumo_energ_ve, Lista_emision_vc, Lista_emision_ve;

var rendimiento_vc_g = 0, precio_combustible_vc_g = 0, factor_emision_vc = 0, rendimiento_cvc_g = 0, precio_combustible_cvc_g = 0, factor_emision_cvc_g = 0, precio_vehiculo_cvc_g = 0;
var rendimiento_ve_g = 0, capacidad_bateria_g = 0, precio_cargador_g = 0, costo_instalacion_g = 0, precio_vehiculo_cvc_g = 0, precio_vehiculo_ve_g = 0, tarifa_electricidad_g = 0;

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
    $('#cbo-departamento-cvc').on('change', (e) => cambiarDepartamentoCVC());
    $('#cbo-departamento-vc').on('change', (e) => cambiarDepartamentoVC());

    $('#btnAdd-vc').on('click', (e) => mostrarRutas(e));
    $('#btn-nueva-ruta').on('click', (e) => nuevaRuta(e));
    //$('.editar-mapa').on('click', (e) => editarRuta(e));
    $('#aceptar-ruta').on('click', (e) => ocultarRuta());
    $('#btn-cerrar').on('click', (e) => ocultarMapa());
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
        profile: 'mapbox/driving-traffic'
    });

    map.addControl(directions, 'top-left');

    directions.on('route', function (e) {
        distancia = e.route[0].distance;
        let tm = e.route[0].legs[0].steps.length == 0 ? 0 : e.route[0].legs[0].steps.length - 1;
        nombre_origen = e.route[0].legs[0].steps[0].name;
        nombre_destino = e.route[0].legs[0].steps[tm].name;
        //console.log(e.route[0].distance); // Logs the current route shown in the interface.
    });

    $('.mapboxgl-ctrl-bottom-right').addClass('d-none');
    $('.mapboxgl-ctrl-bottom-left').addClass('d-none');    
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

    //alert(`Origen: [${origen_longitud}, ${origen_latitud}], Destino: [${destino_longitud}, ${destino_latitud}]  Distancia: ${distancia}`);
    let arr = validar_escenario == 'vc' ? arr_ruta_vc : [];
    if (accion == 0) agregarRuta(arr);
    else actualizarRuta(arr);  

    alert("Se guardó la ruta exitosamente");
    $('#seccion-mapa').addClass('d-none');
    $('#seccion-menu-ruta').removeClass('d-none');
    listarRutas();
}

var agregarRuta = (arr) => {
    arr.push({
        ID_RUTA: arr_ruta_vc.length + 1,
        ORIGEN: `${origen_longitud}, ${origen_latitud}`,
        DESTINO: `${destino_longitud}, ${destino_latitud}`,
        NOMBRE_ORIGEN: nombre_origen,
        NOMBRE_DESTINO: nombre_destino,
        DISTANCIA: Math.round((parseFloat(distancia)/1000)*100)/100,
        VECES_SEMANA: veces_semana_g
    });
}

var actualizarRuta = (arr) => {
    v = arr.find(x => { return x.ID_RUTA == accion; }) == undefined ? false : true;
    if (v) {
        let i = arr.findIndex(x => { return x.ID_RUTA == accion; });
        arr[i].ORIGEN = `${origen_longitud}, ${origen_latitud}`;
        arr[i].DESTINO = `${destino_longitud}, ${destino_latitud}`;
        arr[i].NOMBRE_ORIGEN = nombre_origen;
        arr[i].NOMBRE_DESTINO = nombre_destino;
        arr[i].DISTANCIA = Math.round((parseFloat(distancia)/1000)*100)/100;
        arr[i].VECES_SEMANA = veces_semana_g
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
    let dp = $('#cbo-departamento-vc').val() > 0 ? true : false;
    let rendimiento = $('#rendimiento-vc').val() >= 0 ? true : false;
    let precio_comb = $('#precio-combustible-vc').val() >= 0 ? true : false;
    let porc_comb = $('#porc-anual-combustible-vc').val() >= 0 ? true : false;
    let factor_emision = $('#factor-emision-vc').val() >= 0 ? true : false;
    let mantenimiento = $('#mantenimiento-vc').val() >= 0 ? true : false;
    let seguro = $('#seguro-vc').val() >= 0 ? true : false;
    let gasto_comb = $('#rad-gcs-si-vc').prop('checked') ? $('#seguro-vc').val() >= 0 ? true : false : true;
    let kilometros = $('#kilometro-sem-vc').val() >= 0 ? true : false;
    let meses = $('#meses-vc').val() > 0 ? true : false;
    if (!(tv && tc && dp && rendimiento && precio_comb && porc_comb && factor_emision && mantenimiento && seguro && gasto_comb && kilometros && meses))  {alert('Debe completar todos los campos'); return;}
    
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
    let gasto_comb = $('#rad-gcs-si-cvc').prop('checked') ? $('#seguro-cvc').val() >= 0 ? true : false : true;
    let kilometros = $('#kilometro-sem-cvc').val() >= 0 ? true : false;
    let meses = $('#meses-cvc').val() > 0 ? true : false;
    let costo_vehiculo = $('#costo-veh-cvc').val() >= 0 ? true : false;
    let tipo_compra = $('#tipo-compra-cvc').val() > 0 ? true : false;
    let financiamiento = $('#tipo-compra-cvc').val() == 2 ? costo_vehiculo : $('#tipo-compra-cvc').val() == 1 ? $('#tasa-interes-cvc').val() >= 0 && $('#anio-credito-cvc').val() > 0 && $('#cuota-inicial-cvc').val() >= 0 ? true : false : false;
    let seguro = $('#rad-sv-si-cvc').prop('checked') ? $('#seguro-cvc').val() >= 0 ? true : false : true;

    if (!(tv && tc && dp && rendimiento && precio_comb && porc_comb && factor_emision && gasto_comb && kilometros && meses && costo_vehiculo && tipo_compra && financiamiento && seguro))  {alert('Debe completar todos los campos'); return;}

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
        $('#rendimiento-vc').val(rendimiento_vc_g);
        $('#precio-combustible-vc').val(precio_combustible_vc_g);
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
        $('#rendimiento-cvc').val(rendimiento_cvc_g);
        $('#precio-combustible-cvc').val(precio_combustible_cvc_g);
        $('#porc-anual-combustible-cvc').val(2);
        $('#factor-emision-cvc').val(factor_emision_cvc_g);
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

//end_points //Segundo
var evaluarTipoVehTipoCombVC = () => {
    cambiarDepartamentoVC();
    if ($('#tipo-vehiculo-vc').val() == 0 || $('#tipo-combustible-vc').val() == 0) return;
    let tipovehiculo = $('#tipo-vehiculo-vc').val();
    let tipocombustible = $('#tipo-combustible-vc').val();

    let url = `${baseUrl}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-vc').val(j.RENDIMIENTO.FACTOR);
            $('#unidad-rend-vc').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_vc_g = parseFloat(j.RENDIMIENTO.FACTOR);           
        }
        if (j.FACTOR_EMISION != null){
            $('#factor-emision-vc').val(j.FACTOR_EMISION.FACTOR);
            factor_emision_vc = parseFloat(j.FACTOR_EMISION.FACTOR);           
        }
        $('#porc-anual-combustible-vc').val(2);
    });
}

//end_points igual a 430
var evaluarTipoVehTipoCombCVC = () => {
    cambiarDepartamentoCVC();
    if ($('#tipo-vehiculo-cvc').val() == 0 || $('#tipo-combustible-cvc').val() == 0) return;
    let tipovehiculo = $('#tipo-vehiculo-cvc').val();
    let tipocombustible = $('#tipo-combustible-cvc').val();    

    let url = `${baseUrl}api/calculo/obtenervaloresvctc?tipovehiculo=${tipovehiculo}&tipocombustible=${tipocombustible}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-cvc').val(j.RENDIMIENTO.FACTOR);
            $('#unidad-rend-cvc').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_vc_g = parseFloat(j.RENDIMIENTO.FACTOR);           
        }
        if (j.FACTOR_EMISION != null){
            $('#factor-emision-cvc').val(j.FACTOR_EMISION.FACTOR);
            factor_emision_vc = parseFloat(j.FACTOR_EMISION.FACTOR);           
        }
        if (j.PRECIO_VEHICULO != null){
            $('#costo-veh-cvc').val(j.PRECIO_VEHICULO.FACTOR);
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
        $('#rendimiento-ve').val(rendimiento_ve_g);
        $('#batería-ve').val(capacidad_bateria_g);
    }
}

var cambiarCongTE = () => {
    var v = $('input[name="rad-t-ve"]:checked').val() == 1 ? true : false;
    if (v) $('#tarifa-e-ve').removeClass('d-none');
    else {
        $('#tarifa-e-ve').addClass('d-none');
        $('#tarifa-ve').val(precio_vehiculo_cvc_g);
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
                rendimiento_ve_g = parseFloat(j.RENDIMIENTO.FACTOR);           
            }

            if (j.CAPACIDAD_BATERIA != null){
                $('#bateria-ve').val(j.CAPACIDAD_BATERIA.FACTOR);
                capacidad_bateria_g = parseFloat(j.CAPACIDAD_BATERIA.FACTOR);           
            }

            if (j.PRECIO_VEHICULO != null){
                $('#costo-veh-ve').val(j.PRECIO_VEHICULO.FACTOR);
                precio_vehiculo_ve_g = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
            }
        });
    }
}

//end_points //Quinto
var cambiarMVE = () => {
    if ($('#modelo-ve').val() == 0) return;

    let url = `${baseUrl}api/calculo/obtenervalorestvem?valor1=${$('#modelo-ve').val()}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.RENDIMIENTO != null){
            $('#rendimiento-ve').val(j.RENDIMIENTO.FACTOR);
            $('#unidad-rend-ve').html(j.RENDIMIENTO.UNIDAD);
            rendimiento_ve_g = parseFloat(j.RENDIMIENTO.FACTOR);           
        }

        if (j.CAPACIDAD_BATERIA != null){
            $('#bateria-ve').val(j.CAPACIDAD_BATERIA.FACTOR);
            capacidad_bateria = parseFloat(j.CAPACIDAD_BATERIA.FACTOR);           
        }

        if (j.PRECIO_VEHICULO != null){
            $('#costo-veh-ve').val(j.PRECIO_VEHICULO.FACTOR);
            precio_vehiculo_ve_g = parseFloat(j.PRECIO_VEHICULO.FACTOR);           
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

//end_points //Sexto
var cambiarCP = () => {
    if ($('#cbo-potencia').val() == 0) return;

    let url = `${baseUrl}api/calculo/obtenervalorestccp?valor1=${$('#tipo-cargador').val()}&valor2=${$('#cbo-potencia').val()}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_CARGADOR != null){
            $('#precio-cargador').val(j.PRECIO_CARGADOR.FACTOR);
            precio_cargador_g = parseFloat(j.PRECIO_CARGADOR.FACTOR);          
        }

        if (j.COSTO_INSTALACION != null){
            $('#costo-instalacion').val(j.COSTO_INSTALACION.FACTOR);
            costo_instalacion_g = parseFloat(j.COSTO_INSTALACION.FACTOR);           
        }
    });
}

//end_points //Septimo
var cambiarDP = () => {
    if ($('#cbo-departamento').val() == 0) return;

    let url = `${baseUrl}api/calculo/obtenervaloresdp?valor1=${$('#cbo-departamento').val()}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.TARIFA_ELECTRICIDAD != null){
            $('#tarifa-ve').val(j.TARIFA_ELECTRICIDAD.FACTOR/100);
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

    let url = `${baseUrl}api/calculo/obtenervalorpreciocomb?valor1=${tipo_veh}&valor2=${tipo_comb}&valor3=${dep}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_COMBUSTIBLE != null){
            $('#precio-combustible-cvc').val(j.PRECIO_COMBUSTIBLE.FACTOR);
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

    let url = `${baseUrl}api/calculo/obtenervalorpreciocomb?valor1=${tipo_veh}&valor2=${tipo_comb}&valor3=${dep}`;
    fetch(url).then(r => r.json()).then(j => {
        if (j == null) return;
        if (j.PRECIO_COMBUSTIBLE != null){
            $('#precio-combustible-vc').val(j.PRECIO_COMBUSTIBLE.FACTOR);
            $('#precio-comb-vc').html(j.PRECIO_COMBUSTIBLE.UNIDAD);
            precio_combustible_vc_g = parseFloat(j.PRECIO_COMBUSTIBLE.FACTOR);           
        }
    });
}

//=======================================

//end_points 8 //Primero
var cargarComponentes = () => {
    //let urlConsultarTipoTransporte = `${baseUrl}api/tipotransporte/obteneralltipotransporte`;
    let urlConsultarTipoTransporte = `http://161.35.182.46/ApiElectromovilidad/api/TipoTransporte/obtenerall`;
    //let urlConsultarTipoCombustible = `${baseUrl}api/tipocombustible/obteneralltipocombustible`;
    let urlConsultarTipoCombustible = `http://161.35.182.46/ApiElectromovilidad/api/TipoCombustible/obtenerall`;
    //let urlConsultarTipoVehiculoConvencional = `${baseUrl}api/tipovehiculoconvencional/obteneralltipovehiculoconvencional`;
    let urlConsultarTipoVehiculoConvencional = `http://161.35.182.46/ApiElectromovilidad/api/TipoVehiculoConvencional/obtenerall`;
    //let urlConsultarTipoVehiculoElectrico = `${baseUrl}api/tipovehiculoelectrico/obteneralltipovehiculoelectrico`;
    let urlConsultarTipoVehiculoElectrico = `http://161.35.182.46/ApiElectromovilidad/api/TipovehiculoElectrico/obtenerall`;
    //let urlConsultarModeloVehiculoElectrico = `${baseUrl}api/tipovehiculoelectrico/obtenerallmodelovehiculoelectrico`;
    let urlConsultarModeloVehiculoElectrico = `http://161.35.182.46/ApiElectromovilidad/api/modelovehiculo/obtenerall`;
    //let urlConsultarTipoCargador = `${baseUrl}api/tipocargador/obteneralltipocargador`;
    let urlConsultarTipoCargador = `http://161.35.182.46/ApiElectromovilidad/api/TipoCargador/obteneralltipocargador`;
    //let urlConsultarCargadorPotencia = `${baseUrl}api/tipocargador/obtenerallcargadorpotencia`;
    let urlConsultarCargadorPotencia = `http://161.35.182.46/ApiElectromovilidad/api/TipoCargador/obtenerallcargadorpotencia`;
    //let urlConsultarDepartamento = `${baseUrl}api/departamento/obteneralldepartamento`;
    let urlConsultarDepartamento = `http://161.35.182.46/ApiElectromovilidad/api/Departamento/obteneralldepartamento`;
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

    let opcionestv = listaTipoVehiculoConvencional.length == 0 ? '' : listaTipoVehiculoConvencional.map(x => `<option value="${x.ID_TIPO_VEHICULO_CONV}">${x.NOMBRE == null ? "" : x.NOMBRE}</option>`).join('');
    $(`#tipo-vehiculo-vc`).html(`${option}${opcionestv}`);
    $(`#tipo-vehiculo-cvc`).html(`${option}${opcionestv}`);

    let opcioneste = listaTipoVehiculoElectrico.length == 0 ? '' : listaTipoVehiculoElectrico.map(x => `<option value="${x.ID_TIPO_VEHICULO_ELEC}">${x.NOMBRE == null ? "" : x.NOMBRE}</option>`).join('');
    $(`#tipo-vehiculo-ve`).html(`${option}${opcioneste}`);

    let opcionestm = listaModeloVehiculoElectrico.length == 0 ? '' : listaModeloVehiculoElectrico.map(x => `<option value="${x.ID_MODELO}">${x.NOMBRE}</option>`).join('');
    $(`#modelo-ve`).html(`${option}${opcionestm}`);

    let opcionestpc = urlConsultarTipoCargador.length == 0 ? '' : urlConsultarTipoCargador.map(x => `<option value="${x.ID_CARGADOR}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-cargador`).html(`${option}${opcionestpc}<option value="100">Otro</option>`);

    let opcionescp = urlConsultarCargadorPotencia.length == 0 ? '' : urlConsultarCargadorPotencia.map(x => `<option value="${x.ID_POTENCIA}" data-idcargador="${x.ID_CARGADOR}">${x.POTENCIA}</option>`).join('');
    $(`#cbo-potencia`).html(`${option}${opcionescp}`);

    let opcionesdp = urlConsultarDepartamento.length == 0 ? '' : urlConsultarDepartamento.map(x => `<option value="${x.ID_DEPARTAMENTO}">${x.NOMBRE}</option>`).join('');
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
    let data_vc = {}, data_ve = {}, data_ce_vc = {}, data_ce_ve = {}, data_l = {}, data_em_vc = {}, data_em_ve = {};

    //vehiculo convencional costo
    let p1 = $('#rad-e1-si').prop('checked') ? '1' : '0';
    let p2 = $('#rad-e2-si').prop('checked') ? '1' : '0';
    let p3 = $('#rad-e3-si').prop('checked') ? '1' : '0';
    let p_seguro_vc = $('#rad-sv-si-cvc').prop('checked') ? '1' : '0';
    let p_gasto_combustible = p2 == '1' ? $('#rad-gcs-si-cvc').prop('checked') ? '1' : '0' : p1 == '1' ? $('#rad-gcs-si-vc').prop('checked') ? '1' : '0' : '0';
    let costo_vehiculo_vc = 0, meses_uso_vc = 0, porc_aumento_comb_vc = 0, tipo_compra_vc = 0;
    let porc_cuota_inicial_vc = 0, tasa_interes_vc = 0, anio_credito_vc = 0, seguro_vc = 0;
    let gasto_combustible_vc = 0, precio_combustible_vc = 0, kilometro_semanal_vc = 0, rendimiento_vc = 0, mantenimiento_vc = 0;
    let factor_emisionvc = 0, tipo_combustible_vc = 0;
    let lista_servicio_publico = [];
    if (p2 == '1') {
        costo_vehiculo_vc = parseFloat($('#costo-veh-cvc').val());
        meses_uso_vc = $('#meses-cvc').val();
        porc_aumento_comb_vc = $('#porc-anual-combustible-cvc').val() / 100;
        factor_emisionvc = $('#factor-emision-cvc').val();
        tipo_combustible_vc = $('#tipo-combustible-cvc').val();
        tipo_compra_vc = $('#tipo-compra-cvc').val();
        if (tipo_compra_vc == 1){
            porc_cuota_inicial_vc = parseFloat($('#cuota-inicial-cvc').val())/100; 
            tasa_interes_vc = parseFloat($('#tasa-interes-cvc').val())/100;
            anio_credito_vc = $('#anio-credito-cvc').val();
        }
        if (p_seguro_vc == '1') seguro_vc = $('#seguro-cvc').val();
        if (p_gasto_combustible == '1') gasto_combustible_vc = $('#gasto-cvc').val();
        else {
            precio_combustible_vc = $('#precio-combustible-cvc').val();
            kilometro_semanal_vc = $('#kilometro-sem-cvc').val();
            rendimiento_vc = $('#rendimiento-cvc').val();
        }                
    } else if (p1 == '1') {
        meses_uso_vc = $('#meses-vc').val();
        porc_aumento_comb_vc = $('#porc-anual-combustible-vc').val() / 100;
        factor_emisionvc = $('#factor-emision-vc').val();
        tipo_combustible_vc = $('#tipo-combustible-vc').val();
        seguro_vc = $('#seguro-vc').val();
        if (p_gasto_combustible == '1') gasto_combustible_vc = $('#gasto-vc').val();
        else {
            precio_combustible_vc = $('#precio-combustible-vc').val();
            kilometro_semanal_vc = $('#kilometro-sem-vc').val();
            rendimiento_vc = $('#rendimiento-vc').val();
        }
        mantenimiento_vc = $('#mantenimiento-vc').val();
    }

    if (p3 == '1'){
        if ($('#servicio-01').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-01').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-01').val(),
                KILOMETRO_SEMANAL: $('#kilometros-01').val(),
                MESES_USO: $('#meses-01').val(),
            }
            lista_servicio_publico.push(r);
        }
        if ($('#servicio-02').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-02').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-02').val(),
                KILOMETRO_SEMANAL: $('#kilometros-02').val(),
                MESES_USO: $('#meses-02').val(),
            }
            lista_servicio_publico.push(r);
        }
        if ($('#servicio-03').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-03').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-03').val(),
                KILOMETRO_SEMANAL: $('#kilometros-03').val(),
                MESES_USO: $('#meses-03').val(),
            }
            lista_servicio_publico.push(r);
        }
        if ($('#servicio-04').val() > 0){
            let r = {
                ID_TIPO_TRANSPORTE: $('#tipo-transporte-04').val(),
                COSTO_MOVILIDAD: $('#costo-movilidad-04').val(),
                KILOMETRO_SEMANAL: $('#kilometros-04').val(),
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

    //Vehiculo electrico costo
    let p_incentivo = $('#rad-inc-si-ve').prop('checked') ? '1' : '0';
    let p_seguro_ve = $('#rad-sv-si-ve').prop('checked') ? '1' : '0';
    let costo_vehiculo_ve = parseFloat($('#costo-veh-ve').val());
    let tipo_incentivo = 0, horizonte = 0, cuota_incentivo_anual = 0, forma_incentivo = 0, porcentaje_incentivo = 0, incentivo_unico = 0;
    if (p_incentivo == '1'){
        tipo_incentivo = $('#tipo-incentivo').val();
        if (tipo_incentivo == 1){
            horizonte = $('#horizonte').val();
            cuota_incentivo_anual = $('#cuota-inc-anual').val();
        } else if (tipo_incentivo == 2) {
            forma_incentivo = $('#forma-incentivo').val();
            if (forma_incentivo == 1) {
                porcentaje_incentivo = $('#porcentaje-inc').val() / 100;
            } else if (forma_incentivo == 2){
                incentivo_unico = $('#valor-inc-unico').val();
            }
        }
    }
    let tipo_compra_ve = $('#tipo-compra-ve').val();
    let porc_cuota_inicial_ve = 0, tasa_interes_ve = 0, anio_credito_ve = 0;
    if (tipo_compra_ve == 1){
        porc_cuota_inicial_ve = parseFloat($('#cuota-inicial-ve').val())/100; 
        tasa_interes_ve = parseFloat($('#tasa-interes-ve').val())/100;
        anio_credito_ve = $('#anio-credito-ve').val();
    }
    let seguro_ve = 0;
    if (p_seguro_ve == '1') seguro_ve = $('#seguro-ve').val();
    let porcentaje_anual_ve = $('#porc-aual-ve').val() / 100;
    let km_semanal_ve = $('#kilometro-sem-ve').val();
    let meses_ve = $('#meses-ve').val();
    let rendimiento_ve = $('#rendimiento-ve').val();
    let tarifa_ve = $('#tarifa-ve').val();
    let precio_cargador = parseFloat($('#precio-cargador').val());
    let costo_instalacion = parseFloat($('#costo-instalacion').val());
    let capacidad_bateria_ve = $('#bateria-ve').val();

    data_ve = { 
        P_INCENTIVO: p_incentivo, P_SEGURO_VE: p_seguro_ve, COSTO_VEHICULO_VE: costo_vehiculo_ve, TIPO_INCENTIVO_VE: tipo_incentivo, HORIZONTE: horizonte, CUOTA_INCENTIVO_ANUAL: cuota_incentivo_anual,
        FORMA_INCENTIVO_VE: forma_incentivo, PORCENTAJE_INCENTIVO: porcentaje_incentivo, INCENTIVO_UNICO: incentivo_unico, TIPO_COMPRA_VE: tipo_compra_ve, PORC_CUOTA_INICIAL_VE: porc_cuota_inicial_ve, TASA_INTERES_VE: tasa_interes_ve,
        ANIO_CREDITO_VE: anio_credito_ve, SEGURO_VE: seguro_ve, PORCENTAJE_ANUAL_VE: porcentaje_anual_ve, KILOMETRO_SEMANAL_VE: km_semanal_ve, MESES_USO_VE: meses_ve, RENDIMIENTO_VE: rendimiento_ve, TARIFA_VE: tarifa_ve,
        PRECIO_CARGADOR: precio_cargador, COSTO_INSTALACION: costo_instalacion,
    };

    //Leyendas
    data_l ={
        LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    }

    //Consumo energetivo convencional
    data_ce_vc = {
        P1: p1, P2: p2, KILOMETRO_SEMANAL_VC: kilometro_semanal_vc, MESES_USO_VC: meses_uso_vc, ID_TIPO_COMBUSTIBLE_VC: tipo_combustible_vc, LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    }

    //Consumo energetivo electrico
    data_ce_ve = {
        KILOMETRO_SEMANAL_VE: km_semanal_ve, MESES_USO_VE: meses_ve, RENDIMIENTO_VE: rendimiento_ve,
    }

    //Emisiones Convencional
    data_em_vc = {
        P1: p1, P2: p2, KILOMETRO_SEMANAL_VC: kilometro_semanal_vc, MESES_USO_VC: meses_uso_vc, FACTOR_EMISION_VC: factor_emisionvc, LISTA_SERVICIO_PUBLICO: lista_servicio_publico,
    }

    //Emisiones Electrico
    data_em_ve = {
        CAPACIDAD_BATERIA_VE: capacidad_bateria_ve, KILOMETRO_SEMANAL_VE: km_semanal_ve, MESES_USO_VE: meses_ve, RENDIMIENTO_VE: rendimiento_ve,
    }

    //end_points 7 //Octavo Final
    //Calculo
    let urlvc = `${baseUrl}api/calculo/calcularvehiculoconvencional`;
    let datavc = data_vc;
    let initvc = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datavc) };

    let urlve = `${baseUrl}api/calculo/calcularvehiculoelectrico`;
    let datave = data_ve;
    let initve = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datave) };

    let urll = `${baseUrl}api/calculo/obtenerleyendas`;
    let datal = data_l;
    let initl = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datal) };

    let urlvcce = `${baseUrl}api/calculo/calcularconsumoenergeticoconvencional`;
    let datavcce = data_ce_vc;
    let initvcce = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datavcce) };

    let urlvece = `${baseUrl}api/calculo/calcularconsumoenergeticoelectrico`;
    let datavece = data_ce_ve;
    let initvece = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(datavece) };

    let urlemvc = `${baseUrl}api/calculo/calcularemisionesconvencional`;
    let dataemvc = data_em_vc;
    let initemvc = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataemvc) };

    let urlemve = `${baseUrl}api/calculo/calcularemisioneselectrico`;
    let dataemve = data_em_ve;
    let initemve = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(dataemve) };

    Promise.all([
        fetch(urlvc, initvc),
        fetch(urlve, initve),
        fetch(urll, initl),
        fetch(urlvcce, initvcce),
        fetch(urlvece, initvece),
        fetch(urlemvc, initemvc),
        fetch(urlemve, initemve),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarVCVE);

}

var cargarVCVE = ([listaVC, listaVE, listaleyenda, listaVCCE, listaVECE, listaEMVC, listaEMVE]) => {
    Lista_convencional = listaVC;
    Lista_electrico = listaVE;
    Lista_leyenda = listaleyenda;
    Lista_consumo_energ_vc = listaVCCE;
    Lista_consumo_energ_ve = listaVECE;
    Lista_emision_vc = listaEMVC;
    Lista_emision_ve = listaEMVE;
    cambiarAnio();
    grafico_costo();
}

var cambiarAnio = () => {
    cambiarAnioVC();
    cambiarAnioVE();
    grafico_costo_por_anio();
    grafico_consumo_energ();
    grafico_consumo_energ_total();
    grafico_emisiones();
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
        data.addColumn('number', 'Horizonte de evaluación (en años)');
        data.addColumn('number', 'Escenario movilidad eléctrica');
        data.addColumn('number', 'Escenario línea base');

        data.addRows([
          [1, Math.round(Lista_electrico[0].TOTAL * 100)/100, Math.round(Lista_convencional[0].TOTAL * 100)/100],
          [2, Lista_electrico[1].TOTAL, Lista_convencional[1].TOTAL],
          [3, Lista_electrico[2].TOTAL, Lista_convencional[2].TOTAL],
          [4, Lista_electrico[3].TOTAL, Lista_convencional[3].TOTAL],
          [5, Lista_electrico[4].TOTAL, Lista_convencional[4].TOTAL],
          [6, Lista_electrico[5].TOTAL, Lista_convencional[5].TOTAL],
          [7, Lista_electrico[6].TOTAL, Lista_convencional[6].TOTAL],
          [8, Lista_electrico[7].TOTAL, Lista_convencional[7].TOTAL],
          [9, Lista_electrico[8].TOTAL, Lista_convencional[8].TOTAL],
          [10, Lista_electrico[9].TOTAL, Lista_convencional[9].TOTAL],
          [11, Lista_electrico[10].TOTAL, Lista_convencional[10].TOTAL],
          [12, Lista_electrico[11].TOTAL, Lista_convencional[11].TOTAL],
          [13, Lista_electrico[12].TOTAL, Lista_convencional[12].TOTAL],
          [14, Lista_electrico[13].TOTAL, Lista_convencional[13].TOTAL],
          [15, Math.round(Lista_electrico[14].TOTAL * 100)/100, Math.round(Lista_convencional[14].TOTAL * 100)/100]
        ]);

        var options = {
            chart: {
                title: 'Electrificación de flota - TCO',
                //subtitle: 'in millions of dollars (USD)'
            },
            width: 900,
            height: 500,
            legend: { position: 'top', maxLines: 3 },
            vAxis: {format: 'decimal'},            
        };

        var chart = new google.charts.Line(document.getElementById('linechart_material'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }
    google.charts.setOnLoadCallback(drawChart);
}

var grafico_costo_por_anio = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartC() {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Mantenimiento extraordinario', 'Otros transportes', 'Reventa vehículo', 'Equipo carga e instalación',
             'Carga financiera', 'Mantenimiento continuo', 'Energía (electricidad o combustible)', 'Seguro', 'Recambio de batería', 'Incentivo económico', 'Cuota inicial', { role: 'annotation' }],
            ['Escenario movilidad convencional', Lista_convencional[i].MANTENIMIENTO_EXTRAORDINARIO, Lista_convencional[i].OTROS_TRANSPORTES, Lista_convencional[i].REVENTA_VEHICULO, Lista_convencional[i].CARGA_INSTALACION, Lista_convencional[i].CARGA_FINANCIERA, Lista_convencional[i].MANTENIMIENTO_CONTINUO, Lista_convencional[i].ENERGIA, Lista_convencional[i].SEGURO, Lista_convencional[i].RECAMBIO_BATERIA, Lista_convencional[i].INCENTIVO_ECONOMICO, Lista_convencional[i].CUOTA_INICIAL, ''],
            ['Escenario electromovilidad', Lista_electrico[i].MANTENIMIENTO_EXTRAORDINARIO, Lista_electrico[i].OTROS_TRANSPORTES, Lista_electrico[i].REVENTA_VEHICULO, Lista_electrico[i].CARGA_INSTALACION, Lista_electrico[i].CARGA_FINANCIERA, Lista_electrico[i].MANTENIMIENTO_CONTINUO, Lista_electrico[i].ENERGIA, Lista_electrico[i].SEGURO, Lista_electrico[i].RECAMBIO_BATERIA, Lista_electrico[i].INCENTIVO_ECONOMICO, Lista_electrico[i].CUOTA_INICIAL, '']
        ]);

        var options = {
            title: 'Comparación TCO',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChartC);
}

var grafico_consumo_energ = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCE() {
        let arrNombre = [], arrConvencional = [], arrElectrico = [];
        let tamanio = Lista_leyenda.length;
        arrNombre.push('Genre');
        for (var j = 0; j < tamanio; j++) {
            arrNombre.push(Lista_leyenda[j].NOMBRE_TRANSPORTE);
        }

        arrConvencional.push('Escenario movilidad convencional');
        if (1 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC);
        if (2 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1);
        if (3 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2);
        if (4 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3);
        if (5 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4);

        arrElectrico.push('Escenario movilidad electromovilidad');
        if (1 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE);
        if (2 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_1);
        if (3 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_2);
        if (4 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_3);
        if (5 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_4);

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
            title: 'Consumo Energético Total',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico"));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChartCE);
}

var grafico_consumo_energ_total = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCET() {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Vehículo propio', 'Total servicios de transporte', { role: 'annotation' }],
            ['Escenario movilidad convencional', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, Lista_consumo_energ_vc[i].TOTAL_PUBLICO, ''],
            ['Escenario electromovilidad', Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE, Lista_consumo_energ_ve[i].TOTAL_PUBLICO, '']
        ]);

        var options = {
            title: 'Consumo Energético Total',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico_total"));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChartCET);
}

var grafico_emisiones = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartEM() {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Fabricación de baterías', 'Operación del vehículo', 'Fabricación del vehículo', 'Servicios de transporte', { role: 'annotation' }],
            ['Escenario movilidad convencional', Lista_emision_vc[i].FABRICACION_BATERIA_VC, Lista_emision_vc[i].OPERACION_VEHICULO_VC, Lista_emision_vc[i].FABRICACION_VEHICULO_VC, Lista_emision_vc[i].SERVICIO_TRANSPORTE, ''],
            ['Escenario electromovilidad', Lista_emision_ve[i].FABRICACION_BATERIA_VE, Lista_emision_ve[i].OPERACION_VEHICULO_VE, Lista_emision_ve[i].FABRICACION_VEHICULO_VE, Lista_emision_ve[i].SERVICIO_TRANSPORTE, '']
        ]);

        var options = {
            title: 'Emisiones GEI Totales',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("emisiones_totales"));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChartEM);
}

var mostrarRutas = (e) => {
    $('#seccion-menu-ruta').removeClass('d-none');
    validar_escenario = $(`#${e.target.id}`).data('validar');
    listarRutas();
}

var ocultarMapa = () => {    
    listarRutas();
    $('#seccion-menu-ruta').removeClass('d-none');
    $('#seccion-mapa').addClass('d-none');
}

var listarRutas = () => {
    $('#rutas-km').html('');
    let arr, rutas = "", total_km = 0;
    if ("vc" == validar_escenario) arr = arr_ruta_vc;
    if ("cvc" == validar_escenario) arr_ruta_vc = 0;
    if ("ve" == validar_escenario) arr_ruta_vc = 0;
    if ("t1" == validar_escenario) arr_ruta_vc = 0;
    if ("t2" == validar_escenario) arr_ruta_vc = 0;
    if ("t3" == validar_escenario) arr_ruta_vc = 0;
    if ("t4" == validar_escenario) arr_ruta_vc = 0;

    for (var i = 0; i < arr.length; i++) {
        let total = parseFloat(arr[i].DISTANCIA) * parseFloat(arr[i].VECES_SEMANA);
        total_km += total;        

        let titulo = `<div class="row">`;
        titulo += `<div class="col-10"><div class="row"><div class="col-12"><h6 style="color: blue;">Ruta N° ${arr[i].ID_RUTA}:</h6></div></div></div>`;
        titulo += `<div class="col-2"><div class="row"><div class="col-12 ml-3"><a href="#"><i class="fas fa-window-close mr-1"></i></a></div></div></div>`;
        titulo += `<div class="col-12"><hr /></div></div>`;

        let origen_destino = `<div class="row">`;
        origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Origen</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].NOMBRE_ORIGEN}</span></div></div></div>`;
        origen_destino += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Destino</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].NOMBRE_DESTINO}</span></div></div></div>`;
        origen_destino += `<div class="col-12"><hr /></div></div>  `; 
                        
        let veces_km_semana = `<div class="row">`;  
        veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Veces por semana</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].VECES_SEMANA}</span></div></div></div>`;
        veces_km_semana += `<div class="col-6 "><div class="row"><div class="col-9"><span style="color: brown;">Km de la ruta</span></div><div class="col-3"><a class="editar-mapa" href="#" data-accion="editar" id="${validar_escenario}-${arr[i].ID_RUTA}"><i class="fas fa-map-marked mr-1"></i></a></div></div><div class="row"><div class="col-12"><span style="color: blue;">${arr[i].DISTANCIA} Km</span></div></div></div>`;
        veces_km_semana += `<div class="col-12"><hr /></div></div>`;                                    
        
        let km_total = `<div class="row">`;
        km_total += `<div class="col-6 "></div>`;
        km_total += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Km total</span></div></div><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${Math.round(total * 100) / 100} Km</span></div></div></div>`;
        km_total += `</div>`;

        rutas += `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">${titulo}${origen_destino}${veces_km_semana}${km_total}</div></div></div>`;                    
    }

    total_km = Math.round(total_km * 100) / 100;
    let totales = `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">`;
    totales += `<div class="row"><div class="col-6 "><div class="row"><div class="col-3"><span><i class="fas fa-map-marked mr-1"></i></span></div><div class="col-9"><span style="color: brown;">Kilómetros totales</span></div></div></div>`;
    totales += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: blue; font-size: 2em;">${total_km} Km</span></div></div></div></div>`;
    totales += `</div></div></div>`;

    $('#rutas-km').html(`${rutas}${totales}`);    
    $('.editar-mapa').on('click', (e) => editarRuta(e));
    if (validar_escenario == 'vc') $('#kilometro-sem-vc').val(total_km);    
    if (validar_escenario == 'cvc')$('#kilometro-sem-cvc').val(total_km); 
    if (validar_escenario == 've') $('#kilometro-sem-ve').val(total_km); 
    if (validar_escenario == 't1') $('#kilometros-01').val(total_km); 
    if (validar_escenario == 't2') $('#kilometros-02').val(total_km); 
    if (validar_escenario == 't3') $('#kilometros-03').val(total_km); 
    if (validar_escenario == 't4') $('#kilometros-04').val(total_km);
    //if (validar_escenario == 'vc') total_km_vc_g = total_km;    
    //if (validar_escenario == 'cvc') total_km_cvc_g = total_km;
    //if (validar_escenario == 've') total_km_ve_g = total_km;
    //if (validar_escenario == 't1') total_km_t1_g = total_km;
    //if (validar_escenario == 't2') total_km_t2_g = total_km;
    //if (validar_escenario == 't3') total_km_t3_g = total_km;
    //if (validar_escenario == 't4') total_km_t4_g = total_km;
}

var nuevaRuta = (e) => {
    mostrarMapa();
    directions.removeRoutes();
    accion = 0;
}

var editarRuta = (e) => {
    mostrarMapa();
    let id = $(`#${e.currentTarget.id}`);
    accion = parseInt(e.currentTarget.id.replace('vc-','').replace('cvc-','').replace('ve','').replace('t1','').replace('t2','').replace('t3','').replace('t4',''));
    let arr;
    if ("vc" == validar_escenario) arr = arr_ruta_vc;
    if ("cvc" == validar_escenario) arr_ruta_vc = 0;
    if ("ve" == validar_escenario) arr_ruta_vc = 0;
    if ("t1" == validar_escenario) arr_ruta_vc = 0;
    if ("t2" == validar_escenario) arr_ruta_vc = 0;
    if ("t3" == validar_escenario) arr_ruta_vc = 0;
    if ("t4" == validar_escenario) arr_ruta_vc = 0;
    let v = arr.find(x => { return x.ID_RUTA == accion; }) == undefined ? false : true;
    if (v) {
        let i = arr.findIndex(x => { return x.ID_RUTA == accion; });
        directions.setOrigin(arr[i].ORIGEN);
        directions.setDestination(arr[i].DESTINO);
        $('#veces-semana').val(arr[i].VECES_SEMANA);
    }
}

var mostrarMapa = () => {
    $('#seccion-mapa').removeClass('d-none');
    $('#seccion-menu-ruta').addClass('d-none');
    //directions.removeRoutes();
    $('#mapbox-directions-origin-input div input').val('');
    $('#mapbox-directions-destination-input div input').val('');
    $('#veces-semana').val('');
}

var ocultarRuta = () => {
    $('#seccion-menu-ruta').addClass('d-none');
}