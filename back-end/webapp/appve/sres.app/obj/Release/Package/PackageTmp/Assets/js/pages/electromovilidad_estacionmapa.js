﻿var mapboxgl, map;
var minLng, minLtd, maxLng, maxLtd;
var arrMarkers = [];

$(document).ready(() => {
    mapa();
});

var mapa = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3phcmtsb3oiLCJhIjoiY2tsaDRoenNjMjRjcDJ2cXR4a2FrOHFtMSJ9.IubP7nyb7i-2Rvoyg_bLlA';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.03101439999999, -12.016025599999999],
        zoom: 7
    });

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

var cargarComponentes = (minLongitud, minLatitud, maxLongitud, maxLatitud) => {
    //let url = `${baseUrl}api/estacioncarga/obtenerestacionall?minLng=${minLongitud}&maxLng=${maxLongitud}&minLat=${minLatitud}&maxLat=${maxLatitud}`; //prioridad 26
    let url = `${baseUrlApi}api/estacioncarga/obtenerestacionall?minLng=${minLongitud}&maxLng=${maxLongitud}&minLat=${minLatitud}&maxLat=${maxLatitud}`;
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
                //color: "#FF5733",
                color: color_estado,
                draggable: false
            })
            m.setLngLat([x.LONGITUD, x.LATITUD]);            
            
            let html = `<div class="row mt-2" id="img-${x.ID_ESTACION}"></div>`;

            var popup = new mapboxgl.Popup(
	            //{ offset: [28,0] }
            ).setHTML(html);

            popup.on('open', function () {
                $(`#img-${x.ID_ESTACION}`).html(``);
                let v = arrMarkers.find(z => { return z.ID_ESTACION == x.ID_ESTACION; }) == undefined ? false : true;
                if (v) {
                    let obj = arrMarkers.find(z => { return z.ID_ESTACION == x.ID_ESTACION; });
                    cargarArrMarker(obj);
                } else {
                    //let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacion?idestacion=${x.ID_ESTACION}`; //prioridad 27
                    //let urlConsultarEstacion = `${baseUrlApi}api/estacioncarga/obtenerestacion?idestacion=${x.ID_ESTACION}`;
                    //let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacionmovil?idestacion=${x.ID_ESTACION}`; //para movil prioridad 29
                    let urlConsultarEstacion = `${baseUrlApi}api/estacioncarga/obtenerestacionweb?idestacion=${x.ID_ESTACION}`; // para web prioridad 30
                    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

                    fetch(urlConsultarEstacion, init)
                    .then(v => v.json())
                    .then(x => {
                        let horario = `<span>Abierto desde ${x.HORA_DESDE} a.m. hasta las ${x.HORA_HASTA} p.m.</span>`;
                        let direccion = `<span>${x.DIRECCION}</span><br />`;
                        let descripcion = `<span>${x.DESCRIPCION}</span><br />`;
                        let titulo = `<h4>${x.NOMBRE_INSTITUCION}</h4>`;
                        let content = `<div class="col-12">${titulo}${descripcion}${direccion}${horario}</div>`;

                        let imagenes = '';
                        if (x.LISTA_IMAGEN != null) {
                            for (var i = 0; i < x.LISTA_IMAGEN.length; i++) {
                                //imagenes += `<a class="example-image-link" href="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
                                imagenes += `<a class="example-image-link" href="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
                            }
                        }

                        let contentImg = `<div class="col-12">${imagenes}</div>`;

                        $(`#img-${x.ID_ESTACION}`).html(`${content}${contentImg}`);
                        arrMarkers.push(x);
                    });
                    
                    console.log('popup was opened' + x.ID_ESTACION);
                }

                
            });

            m.setPopup(popup);
            m.addTo(map);
            //m.togglePopup();
        });
    }    
}

var cargarArrMarker = (x) => {
    let horario = `<span>Abierto desde ${x.HORA_DESDE} a.m. hasta las ${x.HORA_HASTA} p.m.</span>`;
    let direccion = `<span>${x.DIRECCION}</span><br />`;
    let descripcion = `<span>${x.DESCRIPCION}</span><br />`;
    let titulo = `<h4>${x.NOMBRE_INSTITUCION}</h4>`;
    let content = `<div class="col-12">${titulo}${descripcion}${direccion}${horario}</div>`;

    let imagenes = '';
    if (x.LISTA_IMAGEN != null) {
        for (var i = 0; i < x.LISTA_IMAGEN.length; i++) {
            //imagenes += `<a class="example-image-link" href="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
            imagenes += `<a class="example-image-link" href="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrlApi}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
        }
    }

    let contentImg = `<div class="col-12">${imagenes}</div>`;

    $(`#img-${x.ID_ESTACION}`).html(`${content}${contentImg}`);
}