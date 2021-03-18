var storedFiles = [];
var rutas = "";
var marker;
var arrTempUbicacion = [], arrUbicacion = [];
var mapboxgl, map;
$(document).ready(() => {
    $('#aprobar-estacion').on('click', (e) => revisionEstacion(e));
    $('#observar-estacion').on('click', (e) => revisionEstacion(e));
    inicio();
});

var inicio = () => {
    cargarEstacion(idestacion);
}

var cargarEstacion = (id) => {
    let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacion?idestacion=${id}`;
    Promise.all([
        fetch(urlConsultarEstacion),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarDatos);
}

var cargarDatos = ([estacion]) => {
    if (estacion == null) return;
    if (estacion.ID_ESTACION == 0) return;
    mapa(estacion.LATITUD, estacion.LONGITUD);
    $('#txt-direccion-estacion').val(estacion.DIRECCION);
    $('#txt-descripcion').val(estacion.DESCRIPCION);
    $('#txt-modelo').val(estacion.MODELO);
    $('#txt-marca').val(estacion.MARCA);
    $('#txt-descripcion').val(estacion.DESCRIPCION);
    $('#cantidad-foto').html(estacion.CANTIDAD_IMAGEN);
    $('#txt-potencia').val(estacion.POTENCIA);
    $('#txt-modo-carga').val(estacion.MODO_CARGA);
    $('#txt-tipo-cargador').val(estacion.TIPO_CARGADOR);
    $('#txt-tipo-conector').val(estacion.TIPO_CONECTOR);
    $('#txt-cantidad-conector').val(estacion.CANTIDAD_CONECTOR);
    $('#txt-hora-desde').val(estacion.HORA_DESDE);
    $('#txt-hora-hasta').val(estacion.HORA_HASTA);
    $('#txt-tarifa').val(estacion.TARIFA_SERVICIO);

    if (estacion.LISTA_DOC != null){
        for (var i = 0; i < estacion.LISTA_DOC.length; i++) {
            if (estacion.LISTA_DOC[i].ID_DOCUMENTO == 1) {
                //let nombreFileDoc = `<i class="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${estacion.LISTA_DOC[i].ARCHIVO_BASE}</span>`;
                //let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`; //end points
                //let btnEliminarFileDoc = `<a class="text-sres-verde btnEliminarFile" href="#" data-id="${estacion.LISTA_DOC[i].ID_DOCUMENTO}"><i class="fas fa-trash px-2 py-1"></i></a>`;
                //contenidoFileDoc = `<div class="alert alert-success p-1 d-flex w-100"><div class="mr-auto">${nombreFileDoc}</div><div class="ml-auto">${btnDescargaFileDoc}${btnEliminarFileDoc}</div></div>`;
                //$('#view-protocolo').html(`<label class="estilo-01">&nbsp;</label>${contenidoFileDoc}`);
                //$('#txt-protocolo').val(estacion.LISTA_DOC[i].ARCHIVO_BASE);
                //$('#fle-protocolo').data('file', estacion.LISTA_DOC[i].ARCHIVO_CONTENIDO);

                let tituloDoc = `<label class="estilo-01">Cumplimiento de protocolo:</label>`;
                let nombreFileDoc = `<input class="form-control form-control-sm cursor-pointer txt-file-control" type="text" id="txt-protocolo" value="${estacion.LISTA_DOC[i].ARCHIVO_BASE}" readonly>`;
                let btnDescargaDoc = `<div class="input-group-append"><a class="input-group-text cursor-pointer estilo-01" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}" download><i class="fas fa-download mr-1"></i>Bajar archivo</a></div>`;
                let fileDoc = `<div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-file"></i></span></div>${nombreFileDoc}${btnDescargaDoc}</div>`;
                let contenidoFileDoc = `<div class="col-lg-12 col-md-12 col-sm-12">${tituloDoc}${fileDoc}</div>`;
                $('#protocolo-doc').html(contenidoFileDoc);
            }
            
            if (estacion.LISTA_DOC[i].ID_DOCUMENTO == 2) {
                //let nombreFileDoc = `<i class="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${estacion.LISTA_DOC[i].ARCHIVO_BASE}</span>`;
                //let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`;
                //let btnEliminarFileDoc = `<a class="text-sres-verde btnEliminarFile" href="#" data-id="${estacion.LISTA_DOC[i].ID_DOCUMENTO}"><i class="fas fa-trash px-2 py-1"></i></a>`;
                //contenidoFileDoc = `<div class="alert alert-success p-1 d-flex w-100"><div class="mr-auto">${nombreFileDoc}</div><div class="ml-auto">${btnDescargaFileDoc}${btnEliminarFileDoc}</div></div>`;
                //$('#view-certificado').html(`<label class="estilo-01">&nbsp;</label>${contenidoFileDoc}`);
                //$('#txt-certificado').val(estacion.LISTA_DOC[i].ARCHIVO_BASE);
                //$('#fle-certificado').data('file', estacion.LISTA_DOC[i].ARCHIVO_CONTENIDO);
                //$('#view-certificado .btnEliminarFile').on('click', btnEliminarFileClick);

                let tituloDoc = `<label class="estilo-01">Certificado de fabricante:</label>`;
                let nombreFileDoc = `<input class="form-control form-control-sm cursor-pointer txt-file-control" type="text" id="txt-certificado" value="${estacion.LISTA_DOC[i].ARCHIVO_BASE}" readonly>`;
                let btnDescargaDoc = `<div class="input-group-append"><a class="input-group-text cursor-pointer estilo-01" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}" download><i class="fas fa-download mr-1"></i>Bajar archivo</a></div>`;
                let fileDoc = `<div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-file"></i></span></div>${nombreFileDoc}${btnDescargaDoc}</div>`;
                let contenidoFileDoc = `<div class="col-lg-12 col-md-12 col-sm-12"><div class="form-group text-left">${tituloDoc}${fileDoc}</div></div>`;
                $('#certificado-doc').html(contenidoFileDoc);
            }
        }        
    }

    if (estacion.LISTA_IMAGEN != null) {
        $('#txt-foto').val(estacion.CANTIDAD_IMAGEN == 1 ? 'Imagen cargada' : estacion.CANTIDAD_IMAGEN > 1 ? 'Imagenes cargadas' : 'Subir imagenes');
        for (var i = 0; i < estacion.LISTA_IMAGEN.length; i++) {
            storedFiles.push({ ID_DOCUMENTO: estacion.LISTA_IMAGEN[i].ID_DOCUMENTO, ARCHIVO_BASE: estacion.LISTA_IMAGEN[i].ARCHIVO_BASE, ARCHIVO_CONTENIDO: estacion.LISTA_IMAGEN[i].ARCHIVO_CONTENIDO, FLAG_ESTADO: '1', UPD_USUARIO: idUsuarioLogin, });
        }
        let ruta_imagenes = '';
        for (var i = 0; i < estacion.LISTA_IMAGEN.length; i++) {
            ruta_imagenes += `<a class="example-image-link" href="${baseUrl}${estacion.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrl}${estacion.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
        }
        $('#marco-imagenes').html(ruta_imagenes);
        $('.imagen-estacion').removeClass('d-none');
    }

}

var mapa = (lat, lng) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3phcmtsb3oiLCJhIjoiY2tsaDRoenNjMjRjcDJ2cXR4a2FrOHFtMSJ9.IubP7nyb7i-2Rvoyg_bLlA';
    //var map = new mapboxgl.Map({
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 13
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

    $('.mapboxgl-ctrl-bottom-right').addClass('d-none');
    $('.mapboxgl-ctrl-bottom-left').addClass('d-none');


    map.on('click', function (e) {
        arrTempUbicacion = [];
        if (marker != undefined) eliminarMarker();
        let coord = JSON.stringify(e.lngLat);
        coord = JSON.parse(coord);
        //let lng = coord["lng"];
        //let lat = coord["lat"];
        //agregarMarker(lng, lat);
        agregarMarker(coord.lng, coord.lat);
        arrTempUbicacion.push(coord.lng);
        arrTempUbicacion.push(coord.lat);
    });   

    marker = new mapboxgl.Marker({
        color: "#FF5733",
        draggable: false
    }).setLngLat([lng, lat]).addTo(map);

}

var revisionEstacion = (e) => {
    let flg = $(`#${e.target.id}`).data("validar");
    let url = `${baseUrl}api/estacioncarga/revisionestacion`; //prioridad 24
    let data = { ID_ESTACION: idestacion, FLAG_ESTADO: `${flg}`, ID_USUARIO: idUsuarioLogin, UPD_USUARIO: idUsuarioLogin };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        if (flg == 2) $('#modalAprobacion').html('');
        if (flg == 3) $('#modalObservacion').html('');
        if (flg == 2) if (j) {$('#modalAprobarBoton').addClass('d-none'); $('#pieCorrectoAprobacion').removeClass('d-none');}
        if (flg == 3) if (j) {$('#modalObservarBoton').addClass('d-none'); $('#pieCorrectoObservacion').removeClass('d-none');}
        if (flg == 2) j ? $('#modalAprobacion').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Se guardó la revisión correctamente.', close: { time: 1000 }, url: `` }) : $('#modalAprobacion').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
        if (flg == 3) j ? $('#modalObservacion').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Se guardó la revisión correctamnte.', close: { time: 1000 }, url: `` }) : $('#modalObservacion').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
        if (j) setTimeout(redireccionar, 3000);
    });
}

var redireccionar = () => {
    location.href = `${baseUrl}Electromovilidad`;
}

$("#aprobar-revision").on("hidden.bs.modal", function () {
    redireccionar();
});

$("#observar-revision").on("hidden.bs.modal", function () {
    redireccionar();
});