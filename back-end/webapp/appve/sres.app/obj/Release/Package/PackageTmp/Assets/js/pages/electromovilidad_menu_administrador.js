$(document).ready(() => {
    $('#btnConsultar').on('click', (e) => consultar());
    $('#btnConsultar')[0].click();
});

var consultar = () => {
    let nroInforme = $('#txt-expediente').val();
    let propietario = $('#txt-propietario').val();
    let empresa = $('#txt-empresa').val();
    let registros = $('#catidad-rgistros').val();
    let pagina = $('#ir-pagina').val();;
    let columna = 'ID_ESTACION';
    let orden = 'asc';
    let params = { nroInforme, propietario, empresa, registros, pagina, columna, orden};
    let queryParams = Object.keys(params).map(x => params[x] == null ? x : `${x}=${params[x]}`).join('&');

    //let url = `${baseUrl}api/estacioncarga/buscarestaciones?${queryParams}`; //prioridad 23
    let url = `${baseUrlApi}api/estacioncarga/buscarestaciones?${queryParams}`; //prioridad 23
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    fetch(url, init).then(r => r.json()).then(j => {
        let tabla = $('#tblEstaciones');
        tabla.find('tbody').html('');
        $('#viewPagination').attr('style', 'display: none !important');
        if (j != null) {
            if (j.length > 0) {
                if (j[0].CANTIDAD_REGISTROS == 0) { $('#viewPagination').hide(); $('#view-page-result').hide(); }
                else { $('#view-page-result').show(); $('#viewPagination').show(); }
                $('.inicio-registros').text(j[0].CANTIDAD_REGISTROS == 0 ? 'No se encontraron resultados' : (j[0].PAGINA - 1) * j[0].CANTIDAD_REGISTROS + 1);
                $('.fin-registros').text(j[0].TOTAL_REGISTROS < j[0].PAGINA * j[0].CANTIDAD_REGISTROS ? j[0].TOTAL_REGISTROS : j[0].PAGINA * j[0].CANTIDAD_REGISTROS);
                $('.total-registros').text(j[0].TOTAL_REGISTROS);
                $('.pagina').text(j[0].PAGINA);
                $('#ir-pagina').val(j[0].PAGINA);
                $('#ir-pagina').attr('max', j[0].TOTAL_PAGINAS);
                $('.total-paginas').text(j[0].TOTAL_PAGINAS);
                
                let cantidadCeldasCabecera = tabla.find('thead tr th').length;
                let contenido = renderizar(j, cantidadCeldasCabecera, pagina, registros);
                tabla.find('tbody').html(contenido);
            } else {
                $('#viewPagination').hide(); $('#view-page-result').hide();
                $('.inicio-registros').text('No se encontraron resultados');
            }
        }
        $('html, body').animate({ scrollTop: $('#sectionSearch').offset().top }, 'slow');
    });
};

var renderizar = (data, cantidadCeldas) => {
    let deboRenderizar = data[0].CANTIDAD_REGISTROS > 0;
    let contenido = `<tr><th colspan='${cantidadCeldas}'>No existe información</th></tr>`;

    if (deboRenderizar) {
        contenido = data.map((x, i) => {
            let fechaRegistro = new Date(x.REG_FECHA);
            let formatoCodigo = '00000000';

            let colNro = `<td class="text-center" data-encabezado="Número" scope="row">${(i + 1) + (data[0].PAGINA - 1) * data[0].CANTIDAD_REGISTROS}</td>`
            let colNroInforme = `<td class="text-center" data-encabezado="Número expediente" scope="row">${(`${formatoCodigo}${x.ID_ESTACION}`).split('').reverse().join('').substring(0, formatoCodigo.length).split('').reverse().join('')}</td>`;
            let colNombres = `<td data-encabezado="Progreso"><div class="text-limi-1">${x.NOMBRE_USUARIO}</div></td>`;
            let colEmpresa = `<td data-encabezado="Progreso"><div class="text-limi-1">${x.NOMBRE_INSTITUCION}</div></td>`;
            let colFechaRegistro = `<td class="text-center" data-encabezado="Fecha Fin">${fechaRegistro.toLocaleDateString("es-PE", { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>`;
            //let colEstado = `<td data-encabezado="Estado"><b class="text-sres-verde">${x.NOMBRE_ESTADO}</b></td>`;
            let colEstado = `<td class="text-center" data-encabezado="Estado"><div class="badge badge-${x.ID_ESTADO == 3 ? 'danger' : x.ID_ESTADO == 2 ? 'success' : 'warning'} p-1"><i class="fas fa-times-circle mr-1"></i><small class="estilo-01">${x.NOMBRE_ESTADO}</small></div></td>`;
            let btnDetalles = `<a class="dropdown-item estilo-01 btnEditar" href="${baseUrl}Electromovilidad/${x.ID_ESTACION}/revision-estacion-de-carga"><i class="fas fa-edit mr-1"></i>Revisar</a>`;
            let colOpciones = `<td class="text-center" data-encabezado="Gestión"><div class="btn-group w-100"><a class="btn btn-sm bg-success text-white w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0">Gestionar</a><div class="dropdown-menu">${btnDetalles}</div></div></td>`;
            let fila = `<tr>${colNro}${colNroInforme}${colNombres}${colEmpresa}${colFechaRegistro}${colEstado}${colOpciones}</tr>`;
            return fila;
        }).join('');
    };

    return contenido;
};