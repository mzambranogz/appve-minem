var mapboxgl, map;

$(document).ready(() => {
    mapa();
    cargarComponentes();

    
});

var mapa = () => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3phcmtsb3oiLCJhIjoiY2tsaDRoenNjMjRjcDJ2cXR4a2FrOHFtMSJ9.IubP7nyb7i-2Rvoyg_bLlA';
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.03101439999999, -12.016025599999999],
        zoom: 7
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

var cargarComponentes = () => {
    let url = `${baseUrl}api/estacioncarga/obtenerestacionall`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    fetch(url, init)
        .then(r => r.json())
        .then(cargarMarker);
}

var cargarMarker = (data) => {
    if (data == null) return;
    if (data.length > 0) {
        data.map((x, y) => {
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
                let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacion?idestacion=${x.ID_ESTACION}`;
                let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

                fetch(urlConsultarEstacion, init)
                .then(v => v.json())
                .then(x => {
                    debugger;
                    let horario = `<span>Abierto desde ${x.HORA_DESDE} a.m. hasta las ${x.HORA_HASTA} p.m.</span>`;
                    let direccion = `<span>${x.DIRECCION}</span><br />`;
                    let descripcion = `<span>${x.DESCRIPCION}</span><br />`;
                    let titulo = `<h4>${x.NOMBRE_INSTITUCION}</h4>`;
                    let content = `<div class="col-12">${titulo}${descripcion}${direccion}${horario}</div>`;

                    let imagenes = '';
                    if (x.LISTA_IMAGEN != null) {                        
                        for (var i = 0; i < x.LISTA_IMAGEN.length; i++) {
                            imagenes += `<a class="example-image-link" href="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrl}${x.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
                        }
                    }                    

                    let contentImg = `<div class="col-12">${imagenes}</div>`;

                    $(`#img-${x.ID_ESTACION}`).html(`${content}${contentImg}`);
                });

                

                console.log('popup was opened'+ x.ID_ESTACION);
            });

            m.setPopup(popup);
            m.addTo(map);

            

            //m.togglePopup();
        });
    }
    
}