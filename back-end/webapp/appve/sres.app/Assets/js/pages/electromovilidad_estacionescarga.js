var imagenes = [];
$(document).ready(() => {
    $('.imagen-estacion').on('click', (e) => mostrarImagen(e));
    //$('#btnNuevaEstacion').on('click', (e) => nuevaEstacion());
    cargarComponentes();
});

//prioridad 17
var cargarComponentes = () => {
    //let urlConsultarTipoTransporte = `${baseUrl}api/estacioncarga/obtenerestacionesporusuario?idusuario=${idUsuarioLogin}`;
    let urlConsultarTipoTransporte = `${baseUrlApi}api/estacioncarga/obtenerestacionesporusuario?idusuario=${idUsuarioLogin}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
    Promise.all([
        fetch(urlConsultarTipoTransporte, init),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarDatos);
}

var cargarDatos = ([listaDatos]) => {
    if (listaDatos == null) { $('#sin-estacion').removeClass('d-none'); return;};
    if (listaDatos.length > 0){
        let estaciones = listaDatos.map((x,y) => {
            let lista = [];
            if (x.LISTA_IMAGEN.length > 0) {
                x.LISTA_IMAGEN.map((w,z) => {
                    lista.push({ID_IMAGEN: w.ID_DOCUMENTO, RUTA: `${baseUrl}${w.RUTA}`});
                });
            }
            imagenes.push({ ID_ESTACION: x.ID_ESTACION, LISTA_IMAGEN: lista });

            let seccion_titulo = `<div class="row">`;
            seccion_titulo += `<div class="col-10"><div class="row"><div class="col-12"><h6 style="color: blue;">Descripción de la estación de carga</h6></div></div></div>`;
            //seccion_titulo += `<div class="col-2"><div class="row"><div class="col-12 ml-3"><a href="#"><i class="fas fa-tools mr-1"></i></a></div></div></div>`;
            let editar = `<a class="dropdown-item estilo-01" href="${baseUrl}Electromovilidad/${x.ID_ESTACION}/Estacion"><i class="fas fa-history mr-1"></i>Editar</a>`;
            let eliminar = `<a class="dropdown-item estilo-01 EliminarEstacion" id="eliminar-${x.ID_ESTACION}" data-valor="${x.ID_ESTACION}" href="javascript:void(0)"><i class="fas fa-history mr-1"></i>Eliminar</a>`;
            seccion_titulo += `<div class="col-2"><div class="row"><div class="col-12 ml-3"><a class="btn btn-sm bg-success text-white w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0"><i class="fas fa-tools mr-1"></i></a><div class="dropdown-menu">${editar}${eliminar}</div></div></div></div>`;            
            seccion_titulo += `<div class="col-12"><hr /></div></div>`;
                        
            let seccion_modelo_marca = `<div class="row">`;
            seccion_modelo_marca += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Modelo</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MODELO}</span></div></div></div>`;
            seccion_modelo_marca += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Marca</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MARCA}</span></div></div></div>`;        
            seccion_modelo_marca += `<div class="col-12"><hr /></div></div>`;        
                        
            let seccion_foto_direccion = `<div class="row">`;
            seccion_foto_direccion += `<div class="col-6 "><div class="row"><div class="col-9"><span style="color: brown;">Fotos</span></div><div class="col-3"><a class="imagen-estacion" id="estacion-${x.ID_ESTACION}" href="javascript:void(0);" data-valor="${x.ID_ESTACION}" data-toggle="modal" data-target="#modal-foto"><i class="fas fa-camera mr-1"></i></a></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.CANTIDAD_IMAGEN} de 5</span></div></div></div>`;
            seccion_foto_direccion += `<div class="col-6 "><div class="row"><div class="col-9"><span style="color: brown;">Dirección</span></div><div class="col-3"><a href="#"><i class="fas fa-map-marked mr-1"></i></a></div></div><div class="row"><div class="col-12"><span style="color: blue;">Av. Javier Prado 536</span></div></div></div>`;
            seccion_foto_direccion += `<div class="col-12"><hr /></div></div>`;           
                        
            let seccion_potencia_modo_carga = `<div class="row">`;
            seccion_potencia_modo_carga += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Potencia</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.POTENCIA}</span></div></div></div>`;
            seccion_potencia_modo_carga += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Modo de carga</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.MODO_CARGA}</span></div></div></div>`;
            seccion_potencia_modo_carga += `<div class="col-12"><hr /></div></div>`;
            
            let seccion_tipo_cargador_cantidad = `<div class="row">`;
            seccion_tipo_cargador_cantidad += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tipo de cargador</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TIPO_CARGADOR}</span></div></div></div>`;
            seccion_tipo_cargador_cantidad += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Cantidad de conectores</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.CANTIDAD_CONECTOR}</span></div></div></div>`;
            seccion_tipo_cargador_cantidad += `<div class="col-12"><hr /></div></div>`;

            let hora_desde_hasta = `<div class="row">`;
            hora_desde_hasta += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Horario desde</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.HORA_DESDE}</span></div></div></div>`;
            hora_desde_hasta += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Horario hasta</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.HORA_HASTA}</span></div></div></div>`;
            hora_desde_hasta += `<div class="col-12"><hr /></div></div>`;
                        
            let seccion_tarifa_protocolo = `<div class="row">`;
            seccion_tarifa_protocolo += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Tarifa de servicio</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">${x.TARIFA_SERVICIO}</span></div></div></div>`;
            seccion_tarifa_protocolo += `<div class="col-6 "><div class="row"><div class="col-12"><span style="color: brown;">Cumplimiento del protocolo</span></div></div><div class="row"><div class="col-12"><span style="color: blue;">Si</span></div></div>`;
            seccion_tarifa_protocolo += `</div></div>`;

            return `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">${seccion_titulo}${seccion_modelo_marca}${seccion_foto_direccion}${seccion_potencia_modo_carga}${seccion_tipo_cargador_cantidad}${hora_desde_hasta}${seccion_tarifa_protocolo}</div></div></div>`;   
        }).join('');
        $('#seccion-estacion').html(estaciones);
        $('#sin-estacion').addClass('d-none');
    } else  {
        $('#sin-estacion').removeClass('d-none');
        $('#seccion-estacion').html('');
    }
}

//var mostrarImagen = (e) => {
//    debugger;
//    let id = $(`#${e.currentTarget.id}`).data('valor');
//    v = imagenes.find(x => { return x.ID_ESTACION == id; }) == undefined ? false : true;
//    if (v) {
//        let objeto = imagenes.find(x => { return x.ID_ESTACION == id; });
//        let ruta_imagenes = '';
//        for (var i = 0; i < objeto.LISTA_IMAGEN.length; i++) {
//            ruta_imagenes += `<a class="example-image-link" href="${objeto.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${objeto.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
//        }
//        $('#marco-imagenes').html(ruta_imagenes);
//    }
//}

$(document).on('click', '.imagen-estacion', (e) => {
    let id = $(`#${e.currentTarget.id}`).data('valor');
    v = imagenes.find(x => { return x.ID_ESTACION == id; }) == undefined ? false : true;
    if (v) {
        let objeto = imagenes.find(x => { return x.ID_ESTACION == id; });
        let ruta_imagenes = '';
        for (var i = 0; i < objeto.LISTA_IMAGEN.length; i++) {
            ruta_imagenes += `<a class="example-image-link" href="${objeto.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${objeto.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
        }
        $('#marco-imagenes').html(ruta_imagenes);
    }
});

//prioridad 18
$(document).on('click', '.EliminarEstacion', (e) => {
    let id = $(`#${e.currentTarget.id}`).data('valor');
    if (id == null) return;
    if (id <= 0) return;

    //let url = `${baseUrl}api/estacioncarga/eliminarestacion?idestacion=${id}`;
    let url = `${baseUrlApi}api/estacioncarga/eliminarestacion?idestacion=${id}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
    fetch(url).then(r => r.json()).then((data) => {
        if (data) {
            alert("Estación eliminada");
            cargarComponentes();
        } else {
            alert("Ocurrió un problema, no se pudo eliminar la estación");
        }
    });
});