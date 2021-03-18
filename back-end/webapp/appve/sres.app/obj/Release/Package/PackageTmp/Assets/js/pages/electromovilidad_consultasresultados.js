﻿
$(document).ready(() => {
    cargarComponentes();
});

var cargarComponentes = () => {
    //end_points 12
    //let urlConsultarResultados = `${baseUrl}api/calculo/obtenerallresultados?idusuario=${idUsuarioLogin}`;
    let urlConsultarResultados = `${baseUrlApi}api/calculo/obtenerallresultados?idusuario=${idUsuarioLogin}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    Promise.all([
        fetch(urlConsultarResultados, init),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarListas);
}

var cargarListas = ([listaConsultasResultados]) => {
    $('#consultas').html('');
    if (listaConsultasResultados == null) return;
    if (listaConsultasResultados.length > 0) {
        let contenido = listaConsultasResultados.map((x,y) => {
            let seccion_titulo = `<div class="row">`;
            seccion_titulo += `<div class="col-10"><div class="row"><div class="col-12"><h6 style="color: blue;">Fecha: ${x.FECHA_REGISTRO}</h6></div></div></div>`;
            let eliminar = `<a class="dropdown-item estilo-01 EliminarResultado" id="eliminar-${x.ID_RESULTADO}" data-valor="${x.ID_RESULTADO}" href="javascript:void(0)"><i class="fas fa-history mr-1"></i>Eliminar</a>`;
            seccion_titulo += `<div class="col-2"><div class="row"><div class="col-12 ml-3"><a class="btn btn-sm bg-success text-white w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0"><i class="fas fa-tools mr-1"></i></a><div class="dropdown-menu">${eliminar}</div></div></div></div>`;            
            seccion_titulo += `<div class="col-12"><hr /></div></div>`;

            let seccion_nombre = `<div class="row">`;
            seccion_nombre += `<div class="col-11"><div class="row"><div class="col-12"><span style="color: blue;"><a href="${baseUrl}Electromovilidad/ver-resultado/${x.ID_RESULTADO}" >RESULTADO N°${x.ROWNUMBER}</a></span></div></div></div>`;
            seccion_nombre += `<div class="col-1"><div class="row"><div class="col-12"><span style="color: blue;"></span></div></div></div></div>`;     

            return `<div class="col-6 mb-2"><div class="card" style="width: 100%;"><div class="card-body">${seccion_titulo}${seccion_nombre}</div></div></div>`;
        }).join('');
        $('#consultas').html(contenido);
    }    
}

$(document).on('click', '.EliminarResultado', (e) => {
    let id = $(`#${e.currentTarget.id}`).data('valor');
    if (id == null) return;
    if (id <= 0) return;

    //end_points 13
    //let url = `${baseUrl}api/calculo/eliminarresultado?idresultado=${id}&idusuario=${idUsuarioLogin}`;
    let url = `${baseUrlApi}api/calculo/eliminarresultado?idresultado=${id}&idusuario=${idUsuarioLogin}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    fetch(url, init).then(r => r.json()).then((data) => {
        if (data) {
            alert("Resultado eliminado");
            cargarComponentes();
        } else {
            alert("Ocurrió un problema, no se pudo eliminar la estación");
        }
    });
});