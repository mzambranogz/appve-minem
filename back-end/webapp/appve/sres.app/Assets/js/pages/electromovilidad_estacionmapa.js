var mapboxgl, map;
var minLng, minLtd, maxLng, maxLtd;
var arrMarkers = [];
var potencia = 0, modo_carga = 0, tipo_conector = 0
var currentMarkers = []

$(document).ready(() => {
    $('#btn-buscar').on('click', (e) => buscarEstaciones())
    $('#cbo-tipo-conector').on('change', filtrarModoCarga)
    cargar()
    mapa();    
});

var filtrarModoCarga = () => {
    let tc = $('#cbo-tipo-conector').val()   
    $('#cbo-modo-carga').val(0)
    if (tc == 0){        
        $('#cbo-modo-carga option').prop('hidden', true)
    } else if (tc == 1){
        $('#cbo-modo-carga option[value=1]').prop('hidden', false)
        $('#cbo-modo-carga option[value=2]').prop('hidden', false)
        $('#cbo-modo-carga option[value=3]').prop('hidden', true)
        $('#cbo-modo-carga option[value=4]').prop('hidden', true)
    } else if (tc == 2){
        $('#cbo-modo-carga option[value=1]').prop('hidden', true)
        $('#cbo-modo-carga option[value=2]').prop('hidden', false)
        $('#cbo-modo-carga option[value=3]').prop('hidden', false)
        $('#cbo-modo-carga option[value=4]').prop('hidden', true)
    } else if (tc == 3){
        $('#cbo-modo-carga option[value=1]').prop('hidden', true)
        $('#cbo-modo-carga option[value=2]').prop('hidden', false)
        $('#cbo-modo-carga option[value=3]').prop('hidden', false)
        $('#cbo-modo-carga option[value=4]').prop('hidden', true)
    } else if (tc == 4){
        $('#cbo-modo-carga option[value=1]').prop('hidden', true)
        $('#cbo-modo-carga option[value=2]').prop('hidden', true)
        $('#cbo-modo-carga option[value=3]').prop('hidden', true)
        $('#cbo-modo-carga option[value=4]').prop('hidden', false)
        $('#cbo-modo-carga').val(4)
    } else if (tc == 5){
        $('#cbo-modo-carga option[value=1]').prop('hidden', true)
        $('#cbo-modo-carga option[value=2]').prop('hidden', false)
        $('#cbo-modo-carga option[value=3]').prop('hidden', false)
        $('#cbo-modo-carga option[value=4]').prop('hidden', false)
    } else if (tc == 6){
        $('#cbo-modo-carga option[value=1]').prop('hidden', true)
        $('#cbo-modo-carga option[value=2]').prop('hidden', false)
        $('#cbo-modo-carga option[value=3]').prop('hidden', false)
        $('#cbo-modo-carga option[value=4]').prop('hidden', false)
    }else if (tc == 7){
        $('#cbo-modo-carga option[value=1]').prop('hidden', true)
        $('#cbo-modo-carga option[value=2]').prop('hidden', true)
        $('#cbo-modo-carga option[value=3]').prop('hidden', true)
        $('#cbo-modo-carga option[value=4]').prop('hidden', false)
        $('#cbo-modo-carga').val(4)
    }
}

var cargar = () => {
    let urlConsultarPotencia = `${baseUrlApi}api/potencia/obtenerallpotencia`;
    let urlConsultarTipoConector = `${baseUrlApi}api/tipoconector/obteneralltipoconector`;
    let urlConsultarModoCargar = `${baseUrlApi}api/modocarga/obtenerallmodocarga`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    Promise.all([
        fetch(urlConsultarPotencia, init),
        fetch(urlConsultarTipoConector, init),
        fetch(urlConsultarModoCargar, init),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarListas)
}

var cargarListas = ([listaPotencia, listaTipoConector, listaModoCarga]) => {
    let optionp = '<option value="0">seleccione una potencia</option>'
    let opcionesp = listaPotencia.length == 0 ? '' : listaPotencia.map(x => `<option value="${x.ID_POTENCIA}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-potencia`).html(`${optionp}${opcionesp}`)

    let optiontc = '<option value="0">seleccione un tipo conector</option>'
    let opcionestc = listaTipoConector.length == 0 ? '' : listaTipoConector.map(x => `<option value="${x.ID_TIPO_CONECTOR}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-tipo-conector`).html(`${optiontc}${opcionestc}`)

    let optionmc = '<option value="0">seleccione un modo de carga</option>'
    let opcionesmc = listaModoCarga.length == 0 ? '' : listaModoCarga.map(x => `<option value="${x.ID_MODO_CARGA}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-modo-carga`).html(`${optionmc}${opcionesmc}`)

    filtrarModoCarga()
}

var buscarEstaciones = () => {

    if (currentMarkers.length > 0) {
        for (var i = currentMarkers.length - 1; i >= 0; i--) {
            currentMarkers[i].remove();
        }
    }
    currentMarkers = []

    /*potencia = $('#txt-potencia').val().replace(/,/gi, '')
    potencia = potencia == "" ? 0 : potencia
    modo_carga = $('#txt-modo-carga').val()
    tipo_cargador = $('#txt-tipo-cargador').val()
    tipo_conector = $('#txt-tipo-conector').val()*/

    potencia = $('#cbo-potencia').val() == null ? 0 : $('#cbo-potencia').val()
    modo_carga = $('#cbo-modo-carga').val()  == null ? 0 : $('#cbo-modo-carga').val()
    tipo_conector = $('#cbo-tipo-conector').val()  == null ? 0 : $('#cbo-tipo-conector').val()

    var coord = map.getBounds();
    minLng = coord._sw.lng;
    minLtd = coord._sw.lat;
    maxLng = coord._ne.lng;
    maxLtd = coord._ne.lat;
    cargarComponentes(minLng, minLtd, maxLng, maxLtd);
}

var mapa = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3phcmtsb3oiLCJhIjoiY2tsaDRoenNjMjRjcDJ2cXR4a2FrOHFtMSJ9.IubP7nyb7i-2Rvoyg_bLlA';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.03101439999999, -12.016025599999999],
        zoom: 7
    });

    geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: 'Buscar ubicación', // Placeholder text for the search bar
        bbox: [-81.33531256420639, -18.35532317840149, -68.64771000999576, -0.03322135965653], // Boundary for Berkeley
        proximity: {
            longitude: -77.04013282606473,
            latitude: -12.0613481350845
        } // Coordinates of UC Berkeley
    });

    // Add the geocoder to the map
    map.addControl(geocoder);

    /*potencia = $('#txt-potencia').val().replace(/,/gi, '')
    potencia = potencia == "" ? 0 : potencia
    modo_carga = $('#txt-modo-carga').val()
    tipo_cargador = $('#txt-tipo-cargador').val()
    tipo_conector = $('#txt-tipo-conector').val()*/

    potencia = $('#cbo-potencia').val() == null ? 0 : $('#cbo-potencia').val()
    modo_carga = $('#cbo-modo-carga').val()  == null ? 0 : $('#cbo-modo-carga').val()
    tipo_conector = $('#cbo-tipo-conector').val()  == null ? 0 : $('#cbo-tipo-conector').val()

    var coord = map.getBounds();
    minLng = coord._sw.lng;
    minLtd = coord._sw.lat;
    maxLng = coord._ne.lng;
    maxLtd = coord._ne.lat;
    cargarComponentes(minLng, minLtd, maxLng, maxLtd);    

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

    var nuevoCSS = { "width": '1500px' };
    $('.mapboxgl-ctrl-top-right').css(nuevoCSS);
    $('.mapboxgl-ctrl-geocoder--input').addClass('text-right')

    map.on('load', function () {
        map.addSource('single-point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        });

        map.addLayer({
            'id': 'point',
            'source': 'single-point',
            'type': 'circle',
            'paint': {
                'circle-radius': 10,
                'circle-color': '#448ee4'
            }
        });

        // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on('result', function (e) {
            map.getSource('single-point').setData(e.result.geometry);
        });
    });

    //this.geolocation.getCurrentPosition().then((resp) => {
    //    console.log(resp);
    //    this.latitude = resp.coords.latitude
    //    this.longitude = resp.coords.longitude
    //    this.setLocationViewMap(this.longitude, this.latitude)
    //}).catch((error) => {
    //    console.log('Error getting location', error);
    //});

    //map.on('mousemove', function (e) {
    //    document.getElementById('coordenadas').innerHTML = JSON.stringify(e.lngLat);
    //});

    $('.mapboxgl-ctrl-bottom-right').addClass('d-none');
    $('.mapboxgl-ctrl-bottom-left').addClass('d-none');
      
    map.on('zoomend', function () {
        var bounds = map.getBounds();
        evaluarCoordenadas(bounds);
        //console.log('A zoomend event occurred.');
    });

    map.on('dragend', function () {
        var bounds = map.getBounds();
        evaluarCoordenadas(bounds);
        //console.log('A dragend event occurred.');
    });

    map.on('touchstart', function () {
        var bounds = map.getBounds();
        evaluarCoordenadas(bounds);
        //console.log('A touchstart event occurred.');
    });

    map.on('rotateend', function () {
        var bounds = map.getBounds();
        evaluarCoordenadas(bounds);
        //console.log('A rotateend event occurred.');
    });

    map.on('resize', function () {
        var bounds = map.getBounds();
        evaluarCoordenadas(bounds);
        //console.log('A resize event occurred.');
    });

}

var evaluarCoordenadas = (coord) => {
    if (coord._sw.lng < minLng && (-81.33531256420639 < coord._sw.lng || minLng > -81.33531256420639)) {
        console.log("minimo Lng nuevo valor entre: {0} : {1}", coord._sw.lng, minLng);
        cargarComponentes(coord._sw.lng, minLtd, minLng, maxLtd);
        minLng = coord._sw.lng;        
    }

    if (coord._ne.lng > maxLng && (-68.64771000999576 > coord._ne.lng || maxLng < -68.64771000999576)) {
        console.log("maximo Lng nuevo valor entre: {0} : {1}", maxLng, coord._ne.lng);
        cargarComponentes(maxLng, minLtd, coord._ne.lng, maxLtd);
        maxLng = coord._ne.lng;
    }

    if (coord._sw.lat < minLtd && (-18.35532317840149 < coord._sw.lat || minLtd > -18.35532317840149)) {
        console.log("minimo Lat nuevo valor entre: {0} : {1}", coord._sw.lat, minLtd);
        cargarComponentes(minLng, coord._sw.lat, maxLng, minLtd);
        minLtd = coord._sw.lat;
    }

    if (coord._ne.lat > maxLtd && (-0.03322135965653 > coord._ne.lat || maxLtd < -0.03322135965653)) {
        console.log("maximo Lat nuevo valor entre: {0} : {1}", maxLtd, coord._ne.lat);
        cargarComponentes(minLng, maxLtd, maxLng, coord._ne.lat);
        maxLtd = coord._ne.lat;
    }
}

//FORMA 1 PARA UBICAR EN EL MAPA (SEGUNDA OPCION)
//function showLocation(position) {
//    var latitude = position.coords.latitude;
//    var longitude = position.coords.longitude;
//    var m = new mapboxgl.Marker({
//        color: "#FF5733",
//        draggable: true
//    }).setLngLat([longitude, latitude]).addTo(map);
//    alert("Latitude : " + latitude + " Longitude: " + longitude);
//}

//function errorHandler(err) {
//    if (err.code == 1) {
//        alert("Error: Access is denied!");
//    } else if (err.code == 2) {
//        alert("Error: Position is unavailable!");
//    }
//}

//function getLocation() {
//    if (navigator.geolocation) {
//        // timeout at 60000 milliseconds (60 seconds)
//        var options = { timeout: 60000 };
//        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
//    } else {
//        alert("Sorry, browser does not support geolocation!");
//    }    
//}

//FORMA 2 PARA UBICAR EN EL MAPA (LA MEJOR OPCION)
//var startPos;
//var geoSuccess = function (position) {
//    startPos = position;
//    //document.getElementById('startLat').innerHTML = startPos.coords.latitude;
//    //document.getElementById('startLon').innerHTML = startPos.coords.longitude;
//    var m = new mapboxgl.Marker({
//        color: "#FF5733",
//        draggable: true
//    }).setLngLat([startPos.coords.longitude, startPos.coords.latitude]).addTo(map);
//};
//navigator.geolocation.getCurrentPosition(geoSuccess);

//var cargarComponentes = (minLongitud, minLatitud, maxLongitud, maxLatitud) => {
//    //let url = `${baseUrl}api/estacioncarga/obtenerestacionall?minLng=${minLongitud}&maxLng=${maxLongitud}&minLat=${minLatitud}&maxLat=${maxLatitud}`; //prioridad 26
//    let url = `${baseUrlApi}api/estacioncarga/obtenerestacionall?minLng=${minLongitud}&maxLng=${maxLongitud}&minLat=${minLatitud}&maxLat=${maxLatitud}`;
//    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

//    fetch(url, init)
//        .then(r => r.json())
//        .then(cargarMarker);
//}

var cargarComponentes = (minLongitud, minLatitud, maxLongitud, maxLatitud) => {
    //let url = `${baseUrlApi}api/estacioncarga/obtenerestacionall?minLng=${minLongitud}&maxLng=${maxLongitud}&minLat=${minLatitud}&maxLat=${maxLatitud}&potencia=${potencia}&modocarga=${modo_carga}&tipocargador=${tipo_cargador}&tipoconector=${tipo_conector}`; //prioridad 36
    let url = `${baseUrlApi}api/estacioncarga/obtenerestacionall?minLng=${minLongitud}&maxLng=${maxLongitud}&minLat=${minLatitud}&maxLat=${maxLatitud}&potencia=${potencia}&modocarga=${modo_carga}&tipoconector=${tipo_conector}`; //prioridad 36
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    fetch(url, init)
        .then(r => r.json())
        .then(cargarMarker);
}

var cargarMarker = (data) => {
    if (data == null) return;    
    if (data.length > 0) {        
        data.map((x, y) => {
            console.log(`nuevo end point estacion: ${x.ID_ESTACION}`);
            color_estado = x.ID_ESTADO == 1 ? "#FF5733" : "#3C53B0";
            var m = new mapboxgl.Marker({
                color: color_estado,
                draggable: false
            })
            m.setLngLat([x.LONGITUD, x.LATITUD]);            

            m.getElement().addEventListener('click', () => {
                //alert("Clicked");
                $(`#img-${x.ID_ESTACION}`).html(``);
                let v = arrMarkers.find(z => { return z.ID_ESTACION == x.ID_ESTACION; }) == undefined ? false : true;
                if (v) {
                    let obj = arrMarkers.find(z => { return z.ID_ESTACION == x.ID_ESTACION; });
                    cargarArrMarker(obj);
                } else {
                    let urlConsultarEstacion = `${baseUrlApi}api/estacioncarga/obtenerestacionweb?idestacion=${x.ID_ESTACION}`;
                    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

                    fetch(urlConsultarEstacion, init)
                    .then(v => v.json())
                    .then(x => {
                        let titulo = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12 text-center"><h3 class="estilo-02 mb-3" style="color: brown;">Descripción de la estación de carga eléctrica</h3></div> </div>`

                        let img = x.ID_ESTADO == 2 ? `icon-marker-estacion-habilitada.svg` : `icon-marker-estacion-deshabilitada.svg`
                        let img_icono = `<div class="row"><div class="col-12 text-center mb-3"><img src="${baseUrl}Assets/images/${img}")" class="img-fluid" /></div></div>`
                        
                        let estado = x.ID_ESTADO == 2 ? 'Estación aprobada' : 'Estación por aprobar'
                        let estado_estacion = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12 text-center"><h5 class="estilo-01 mb-3" style="color: blue;">${estado}</h5></div></div>`

                        let seccion_direccion = `<div class="row">`;
                        seccion_direccion += `<div class="col-12"><div class="row"><div class="col-12"><span style="color: brown;">Dirección</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.DIRECCION}</span></div></div></div>`;                       
                        seccion_direccion += `<div class="col-12"><hr /></div></div>`;

                        let seccion_modelo_marca = `<div class="row">`;
                        seccion_modelo_marca += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Marca</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MARCA}</span></div></div></div>`;
                        seccion_modelo_marca += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Modelo</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MODELO}</span></div></div></div>`;                        
                        seccion_modelo_marca += `<div class="col-12"><hr /></div></div>`;

                        let imagenes = '';
                        if (x.LISTA_IMAGEN != null) {
                            for (var i = 0; i < x.LISTA_IMAGEN.length; i++) {
                                imagenes += `<a class="example-image-link" href="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
                            }
                        }

                        let seccion_fotos = `<div class="row">`;
                        seccion_fotos += `<div class="col-12"><div class="row"><div class="col-12"><span style="color: brown;">Fotos</span></div></div><div class="row"><div class="col-12"><span style="color: brown;">${imagenes}</span></div></div></div>`;
                        seccion_fotos += `<div class="col-12"><hr /></div></div>`;

                        let seccion_potencia_modo_carga = `<div class="row">`;
                        seccion_potencia_modo_carga += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Potencia</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.POTENCIA}</span></div></div></div>`;
                        seccion_potencia_modo_carga += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Modo de carga</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MODO_CARGA}</span></div></div></div>`;
                        seccion_potencia_modo_carga += `<div class="col-12"><hr /></div></div>`;

                        let seccion_tipo_cargador_conector = `<div class="row">`;
                        seccion_tipo_cargador_conector += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tipo de cargador</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TIPO_CARGADOR}</span></div></div></div>`;
                        seccion_tipo_cargador_conector += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tipo de conectores</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TIPO_CONECTOR}</span></div></div></div>`;
                        seccion_tipo_cargador_conector += `<div class="col-12"><hr /></div></div>`;

                        let seccion_cantidad_tarifa = `<div class="row">`;
                        seccion_cantidad_tarifa += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Cantidad de conectores</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.CANTIDAD_CONECTOR}</span></div></div></div>`;
                        seccion_cantidad_tarifa += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tarifa de servicio</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TARIFA_SERVICIO}</span></div></div></div>`;
                        seccion_cantidad_tarifa += `<div class="col-12"><hr /></div></div>`;

                        let hora_desde_hasta = `<div class="row">`;
                        hora_desde_hasta += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Horario desde</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.HORA_DESDE}</span></div></div></div>`;
                        hora_desde_hasta += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Horario hasta</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.HORA_HASTA}</span></div></div></div>`;
                        hora_desde_hasta += `<div class="col-12"><hr /></div></div>`;

                        let seccion_descripcion = `<div class="row">`;
                        seccion_descripcion += `<div class="col-12"><div class="row"><div class="col-12"><span style="color: brown;">Descripción</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.DESCRIPCION}</span></div></div></div>`;
                        seccion_descripcion += `</div>`;

                        $(`#modal-estacion .modal-body`).html(`${titulo}${img_icono}${estado_estacion}${seccion_direccion}${seccion_modelo_marca}${seccion_fotos}${seccion_potencia_modo_carga}${seccion_tipo_cargador_conector}${seccion_cantidad_tarifa}${hora_desde_hasta}${seccion_descripcion}`);
                        arrMarkers.push(x);
                    });

                    console.log('popup was opened' + x.ID_ESTACION);
                }

                $('#modal-estacion').modal('show')
            });

            m.addTo(map);
            currentMarkers.push(m);
        });
    }    
}

//var cargarMarker = (data) => {
//    if (data == null) return;
//    if (data.length > 0) {
//        data.map((x, y) => {
//            console.log(`nuevo end point estacion: ${x.ID_ESTACION}`);
//            color_estado = x.ID_ESTADO == 1 ? "#FF5733" : "#3C53B0";
//            var m = new mapboxgl.Marker({
//                //color: "#FF5733",
//                color: color_estado,
//                draggable: false
//            })
//            m.setLngLat([x.LONGITUD, x.LATITUD]);

//            let html = `<div class="row mt-2" id="img-${x.ID_ESTACION}"></div>`;

//            var popup = new mapboxgl.Popup(
//                //{ offset: [28,0] }
//            ).setHTML(html);

//            popup.on('open', function () {
//            $(`#img-${x.ID_ESTACION}`).html(``);
//            let v = arrMarkers.find(z => { return z.ID_ESTACION == x.ID_ESTACION; }) == undefined ? false : true;
//            if (v) {
//                let obj = arrMarkers.find(z => { return z.ID_ESTACION == x.ID_ESTACION; });
//                cargarArrMarker(obj);
//            } else {
//                //let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacion?idestacion=${x.ID_ESTACION}`; //prioridad 27
//                //let urlConsultarEstacion = `${baseUrlApi}api/estacioncarga/obtenerestacion?idestacion=${x.ID_ESTACION}`;
//                //let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacionmovil?idestacion=${x.ID_ESTACION}`; //para movil prioridad 29
//                let urlConsultarEstacion = `${baseUrlApi}api/estacioncarga/obtenerestacionweb?idestacion=${x.ID_ESTACION}`; // para web prioridad 30
//                let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

//                fetch(urlConsultarEstacion, init)
//                .then(v => v.json())
//                .then(x => {
//                    let horario = `<span>Abierto desde ${x.HORA_DESDE} a.m. hasta las ${x.HORA_HASTA} p.m.</span>`;
//                    let direccion = `<span>${x.DIRECCION}</span><br />`;
//                    let descripcion = `<span>${x.DESCRIPCION}</span><br />`;
//                    let titulo = `<h4>${x.NOMBRE_INSTITUCION}</h4>`;
//                    let content = `<div class="col-12">${titulo}${descripcion}${direccion}${horario}</div>`;

//                    let imagenes = '';
//                    if (x.LISTA_IMAGEN != null) {
//                        for (var i = 0; i < x.LISTA_IMAGEN.length; i++) {
//                            imagenes += `<a class="example-image-link" href="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
//                        }
//                    }

//                    let contentImg = `<div class="col-12">${imagenes}</div>`;

//                    $(`#img-${x.ID_ESTACION}`).html(`${content}${contentImg}`);
//                    arrMarkers.push(x);
//                });

//                console.log('popup was opened' + x.ID_ESTACION);
//            }

//            });

//            m.setPopup(popup);
//            m.addTo(map);
//            currentMarkers.push(m); //add
//            //m.togglePopup(); //abre el popup al iniciar
//        });
//    }
//}

//var cargarArrMarker = (x) => {
//    let horario = `<span>Abierto desde ${x.HORA_DESDE} a.m. hasta las ${x.HORA_HASTA} p.m.</span>`;
//    let direccion = `<span>${x.DIRECCION}</span><br />`;
//    let descripcion = `<span>${x.DESCRIPCION}</span><br />`;
//    let titulo = `<h4>${x.NOMBRE_INSTITUCION}</h4>`;
//    let content = `<div class="col-12">${titulo}${descripcion}${direccion}${horario}</div>`;

//    let imagenes = '';
//    if (x.LISTA_IMAGEN != null) {
//        for (var i = 0; i < x.LISTA_IMAGEN.length; i++) {
//            //imagenes += `<a class="example-image-link" href="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
//            imagenes += `<a class="example-image-link" href="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
//        }
//    }

//    let contentImg = `<div class="col-12">${imagenes}</div>`;

//    $(`#img-${x.ID_ESTACION}`).html(`${content}${contentImg}`);
//}

var cargarArrMarker = (x) => {
    let titulo = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12 text-center"><h3 class="estilo-02 mb-3" style="color: brown;">Descripción de la estación de carga eléctrica</h3></div> </div>`

    let img = x.ID_ESTADO == 2 ? `icon-marker-estacion-habilitada.svg` : `icon-marker-estacion-deshabilitada.svg`
    let img_icono = `<div class="row"><div class="col-12 text-center mb-3"><img src="${baseUrl}Assets/images/${img}")" class="img-fluid" /></div></div>`

    let estado = x.ID_ESTADO == 2 ? 'Estación aprobada' : 'Estación por aprobar'
    let estado_estacion = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12 text-center"><h5 class="estilo-01 mb-3" style="color: blue;">${estado}</h5></div></div>`

    let seccion_direccion = `<div class="row">`;
    seccion_direccion += `<div class="col-12"><div class="row"><div class="col-12"><span style="color: brown;">Dirección</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.DIRECCION}</span></div></div></div>`;
    seccion_direccion += `<div class="col-12"><hr /></div></div>`;

    let seccion_modelo_marca = `<div class="row">`;
    seccion_modelo_marca += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Marca</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MARCA}</span></div></div></div>`;
    seccion_modelo_marca += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Modelo</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MODELO}</span></div></div></div>`;
    seccion_modelo_marca += `<div class="col-12"><hr /></div></div>`;

    let imagenes = '';
    if (x.LISTA_IMAGEN != null) {
        for (var i = 0; i < x.LISTA_IMAGEN.length; i++) {
            imagenes += `<a class="example-image-link" href="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
        }
    }

    let seccion_fotos = `<div class="row">`;
    seccion_fotos += `<div class="col-12"><div class="row"><div class="col-12"><span style="color: brown;">Fotos</span></div></div><div class="row"><div class="col-12"><span style="color: brown;">${imagenes}</span></div></div></div>`;
    seccion_fotos += `<div class="col-12"><hr /></div></div>`;

    let seccion_potencia_modo_carga = `<div class="row">`;
    seccion_potencia_modo_carga += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Potencia</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.POTENCIA}</span></div></div></div>`;
    seccion_potencia_modo_carga += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Modo de carga</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MODO_CARGA}</span></div></div></div>`;
    seccion_potencia_modo_carga += `<div class="col-12"><hr /></div></div>`;

    let seccion_tipo_cargador_conector = `<div class="row">`;
    seccion_tipo_cargador_conector += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tipo de cargador</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TIPO_CARGADOR}</span></div></div></div>`;
    seccion_tipo_cargador_conector += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tipo de conectores</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TIPO_CONECTOR}</span></div></div></div>`;
    seccion_tipo_cargador_conector += `<div class="col-12"><hr /></div></div>`;

    let seccion_cantidad_tarifa = `<div class="row">`;
    seccion_cantidad_tarifa += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Cantidad de conectores</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.CANTIDAD_CONECTOR}</span></div></div></div>`;
    seccion_cantidad_tarifa += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tarifa de servicio</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TARIFA_SERVICIO}</span></div></div></div>`;
    seccion_cantidad_tarifa += `<div class="col-12"><hr /></div></div>`;

    let hora_desde_hasta = `<div class="row">`;
    hora_desde_hasta += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Horario desde</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.HORA_DESDE}</span></div></div></div>`;
    hora_desde_hasta += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Horario hasta</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.HORA_HASTA}</span></div></div></div>`;
    hora_desde_hasta += `<div class="col-12"><hr /></div></div>`;

    let seccion_descripcion = `<div class="row">`;
    seccion_descripcion += `<div class="col-12"><div class="row"><div class="col-12"><span style="color: brown;">Descripción</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.DESCRIPCION}</span></div></div></div>`;
    seccion_descripcion += `</div>`;

    $(`#modal-estacion .modal-body`).html(`${titulo}${img_icono}${estado_estacion}${seccion_direccion}${seccion_modelo_marca}${seccion_fotos}${seccion_potencia_modo_carga}${seccion_tipo_cargador_conector}${seccion_cantidad_tarifa}${hora_desde_hasta}${seccion_descripcion}`);
    $('#modal-estacion').modal('show')
}