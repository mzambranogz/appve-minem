$(document).ready(() => {
    $('#btnConsultar').on('click', (e) => consultar());
    $('#btnConsultar')[0].click();
    //$('#cbo-caso').on('change', (e) => changeCaso());
    $('#btnGuardar').on('click', (e) => guardar());
    //consultarListas();
});

var fn_avance_grilla = (boton) => {
    var total = 0, miPag = 0;
    miPag = Number($("#ir-pagina").val());
    total = Number($(".total-paginas").html());

    if (boton == 1) miPag = 1;
    if (boton == 2) if (miPag > 1) miPag--;
    if (boton == 3) if (miPag < total) miPag++;
    if (boton == 4) miPag = total;

    $("#ir-pagina").val(miPag);
    $('#btnConsultar')[0].click();
}

var cambiarPagina = () => {
    $('#btnConsultar')[0].click();
}

$(".columna-filtro").click(function (e) {
    var id = e.target.id;

    $(".columna-filtro").removeClass("fa-sort-up");
    $(".columna-filtro").removeClass("fa-sort-down");
    $(".columna-filtro").addClass("fa-sort");

    if ($("#columna").val() == id) {
        if ($("#orden").val() == "ASC") {
            $("#orden").val("DESC")
            $(`#${id}`).removeClass("fa-sort");
            $(`#${id}`).removeClass("fa-sort-up");
            $(`#${id}`).addClass("fa-sort-down");
        }
        else {
            $("#orden").val("ASC")
            $(`#${id}`).removeClass("fa-sort");
            $(`#${id}`).removeClass("fa-sort-down");
            $(`#${id}`).addClass("fa-sort-up");
        }
    }
    else {
        $("#columna").val(id);
        $("#orden").val("ASC")
        $(`#${id}`).removeClass("fa-sort");
        $(`#${id}`).removeClass("fa-sort");
        $(`#${id}`).addClass("fa-sort-up");
    }

    $('#btnConsultar')[0].click();
});

var consultar = () => {
    let busqueda = $('#txt-descripcion').val();
    let registros = $('#catidad-rgistros').val();
    let pagina = $('#ir-pagina').val();
    let columna = $("#columna").val();
    let orden = $("#orden").val();
    let params = { busqueda, registros, pagina, columna, orden };
    let queryParams = Object.keys(params).map(x => params[x] == null ? x : `${x}=${params[x]}`).join('&');
    let url = `${baseUrl}api/caso/buscar?${queryParams}`;

    fetch(url).then(r => r.json()).then(j => {
        let tabla = $('#tblPrincipal');
        tabla.find('tbody').html('');
        $('#viewPagination').attr('style', 'display: none !important');
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
            $('[data-toggle="tooltip"]').tooltip();
            //tabla.find('.btnCambiarEstado').each(x => {
            //    let elementButton = tabla.find('.btnCambiarEstado')[x];
            //    $(elementButton).on('click', (e) => {
            //        e.preventDefault();
            //        cambiarEstado(e.currentTarget);
            //    });
            //});

            tabla.find('.btnEditar').each(x => {
                let elementButton = tabla.find('.btnEditar')[x];
                $(elementButton).on('click', (e) => {
                    e.preventDefault();
                    consultarDatos(e.currentTarget);
                });
            });
        } else {
            $('#viewPagination').hide(); $('#view-page-result').hide();
            $('.inicio-registros').text('No se encontraron resultados');
        }
    });    
};

var renderizar = (data, cantidadCeldas, pagina, registros) => {
    let deboRenderizar = data.length > 0;
    let contenido = `<tr><th colspan='${cantidadCeldas}'>No existe información</th></tr>`;

    if (deboRenderizar) {
        contenido = data.map((x, i) => {
            let formatoCodigo = '00000000';
            let detalle = '';
            let colNro = `<td class="text-center" data-encabezado="Número de orden" scope="row" data-count="0">${(pagina - 1) * registros + (i + 1)}</td>`;
            let colCodigo = `<td class="text-center" data-encabezado="Código" scope="row"><span>${(`${formatoCodigo}${x.ID_CASO}`).split('').reverse().join('').substring(0, formatoCodigo.length).split('').reverse().join('')}</span></td>`;
            let colCaso = `<td class="text-left" data-encabezado="Caso">${x.NOMBRE}</td>`;
            if (x.LISTA_FACTOR != null) {
                if (x.LISTA_FACTOR.length > 0) {
                    detalle = x.LISTA_FACTOR.map((x, y) => {
                        return `<div class="p-1 text-center border-right"><div class="h6 span badge badge-info w-100 p-3">${x.NOMBRE} <br><span data-toggle="tooltip" data-placement="top" title="Editar valores del ${x.SOBRE_NOMBRE}"><a class="text-white" href="#" data-toggle="modal" data-factor="${x.ID_FACTOR}" data-nomfactor="${x.SOBRE_NOMBRE}" onclick="traerValores(this)" data-target="#modal-valores"><i class="fas fa fa-edit p-1"></i></a></span></div></div>`;
                    }).join('');
                    detalle = `<div class="form-control"><div class="list-group sortable-list m-0">${detalle}</div></div>`;
                }
            }
            let colValores = `<td class="text-center" data-encabezado="Valores">${detalle}</td>`
            let btnEditar = `<a class="dropdown-item estilo-01 btnEditar" href="#" data-id="${x.ID_FORMULA}" data-toggle="modal" data-target="#modal-mantenimiento"><i class="fas fa-edit mr-1"></i>Editar</a>`;
            let colOpciones = `<td class="text-center" data-encabezado="Gestión"><div class="btn-group w-100"><a class="btn btn-sm bg-success text-white w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0">Gestionar</a><div class="dropdown-menu">${btnEditar}</div></div></td>`;
            let fila = `<tr>${colNro}${colCodigo}${colCaso}${colValores}${colOpciones}</tr>`;
            return fila;
        }).join('');
    };

    return contenido;
};

var traerValores = (e) => {
    $('.alert-add').html('');
    $('#btnGuardar').show();
    $('#btnGuardar').next().html('Cancelar');
    let id = $(e).attr('data-factor');
    let nom = $(e).attr('data-nomfactor');
    let url = `${baseUrl}api/factor/obtenerfactorvalor?id=${id}`;
    fetch(url)
    .then(r => r.json())
    .then(j => {
        cargarDatos(j, id, nom);
    });
}

var cargarDatos = (data, id_factor, nom) => {
    if (data == null) return;
    $('#titulo-factor').html(nom);
    if (data.LISTA_PARAM_FACTOR.length > 0) {
        let columnas = data.LISTA_PARAM_FACTOR.map((x, y) => {
            return `<th scope="col" width="auto"><div class ="d-flex flex-column justify-content-between align-items-start"><div class ="d-flex justify-content-between align-items-center w-100"><div class ="pl-1">${x.NOMBRE_DETALLE}&nbsp;</div></div></div></th>`;
        }).join('');
        
        let filtros = [];
        data.LISTA_PARAM_FACTOR.map((x, y) => {
            let lista = x.LIST_PARAMDET.map((m, n) => {
                return `<option value="${m.ID_DETALLE}">${m.NOMBRE}</option>`;
            });
            filtros.push({ ID_PARAMETRO: x.ID_PARAMETRO, SELECT: lista, NOMBRE: x.NOMBRE });
        });

        let content = "";
        if (data.LISTA_FAC_DATA.length > 0) {
            let filas = data.LISTA_FAC_DATA.map((x, y) => {
                let fila = filtros.map((z, w) => {
                    return `<td data-encabezado="${z.NOMBRE}"><div class="form-group m-0"><select class="form-control form-control-sm get-valor-param" data-param="${z.ID_PARAMETRO}" id="cbo-param-${y+1}-${z.ID_PARAMETRO}" disabled><option value="0">-seleccionar-</option>${z.SELECT}</select></div></td>`;
                }).join('');
                let number = `<td class="text-center" data-encabezado="Número" scope="row">${y+1}</td>`;
                let factorb = `<td data-encabezado="Factor"><div class="form-group m-0"><input class="form-control form-control-sm numero-punto get-valor-factor text-right" type="text" placeholder="Ingrese el valor del factor" id="factor-${y + 1}" data-validar="1" value="${x.FACTOR}" maxlength="22"></div></td>`;
                let unidadb = `<td data-encabezado="Unidad"><div class="form-group m-0"><input class="form-control form-control-sm get-valor-unidad text-right" type="text" placeholder="Ingrese la unidad" id="unidad-${y + 1}" data-validar="1" value="${x.UNIDAD == null ? `` : x.UNIDAD}" maxlength="50"></div></td>`;
                //let masb = `<td class="text-center" data-encabezado=""><div class="btn btn-info btn-sm estilo-01" type="button" onclick="eliminarFila(this);"><i class="fas fa-minus-circle mr-1"></i>Quitar</div></td>`;
                //addFila = `<tr id="fila-${y + 1}" data-ind="0" data-factor="${id_factor}">${number}${fila}<td data-encabezado="FACTOR"><div class="form-group m-0"><input class="form-control form-control-sm numero-punto get-valor-factor" type="text" placeholder="Ingrese el valor del factor" id="factor-${y + 1}" data-validar="1" value="" maxlength="22"></div></td><td data-encabezado="UNIDAD"><div class="form-group m-0"><input class="form-control form-control-sm get-valor-unidad" type="text" placeholder="Ingrese la unidad" id="unidad-${y + 1}" data-validar="1" value="" maxlength="50"></div></td>${masb}</tr>`;
                //return `<tr id="fila-${y + 1}" data-ind="${x.ID_DETALLE}" data-factor="${id_factor}">${number}${fila}${factorb}${unidadb}${masb}</tr>`;
                return `<tr id="fila-${y + 1}" data-ind="${x.ID_DETALLE}" data-factor="${id_factor}">${number}${fila}${factorb}${unidadb}</tr>`;
            });
            $('#body-factor').html(filas);
        } else {
            let fila = filtros.map((x, y) => {
                return `<td data-encabezado="${x.NOMBRE}"><div class="form-group m-0"><select class="form-control form-control-sm get-valor-param" data-param="${x.ID_PARAMETRO}" id="cbo-param-1-${x.ID_PARAMETRO}"><option value="0">-seleccionar-</option>${x.SELECT}</select></div></td>`;
            }).join('');
            let number = `<td class="text-center" data-encabezado="Número" scope="row">1</td>`;
            let factorb = `<td data-encabezado="Factor"><div class="form-group m-0"><input class="form-control form-control-sm numero-punto get-valor-factor" type="text" placeholder="Ingrese el valor del factor" id="factor-1" data-validar="1" value="" maxlength="22"></div></td>`;
            let unidadb = `<td data-encabezado="Unidad"><div class="form-group m-0"><input class="form-control form-control-sm get-valor-unidad" type="text" placeholder="Ingrese la unidad" id="unidad-1" data-validar="1" value="" maxlength="50"></div></td>`;
            //let masb = `<td class="text-center" data-encabezado=""><div class="btn btn-info btn-sm estilo-01" type="button" onclick="eliminarFila(this);"><i class="fas fa-minus-circle mr-1"></i>Quitar</div></td>`;
            //addFila = `<tr id="fila-1" data-ind="0" data-factor="${id_factor}">${number}${fila}${factorb}${unidadb}${masb}</tr>`;
            //$('#body-factor').html(`<tr id="fila-1" data-ind="0" data-factor="${id_factor}">${number}${fila}${factorb}${unidadb}${masb}</tr>`);
            $('#body-factor').html(`<tr id="fila-1" data-ind="0" data-factor="${id_factor}">${number}${fila}${factorb}${unidadb}</tr>`);
        }

        let num_orden = `<th scope="col" width="3%"><div class="d-flex flex-column justify-content-between align-items-start"><div class="d-flex justify-content-between align-items-center w-100">N°&nbsp;</div></div></th>`;
        let factor = `<th scope="col" width="auto"><div class ="d-flex flex-column justify-content-between align-items-start"><div class ="d-flex justify-content-between align-items-center w-100"><div class ="pl-1">Factor&nbsp;</div></div></div></th>`;
        let unidad = `<th scope="col" width="auto"><div class ="d-flex flex-column justify-content-between align-items-start"><div class ="d-flex justify-content-between align-items-center w-100"><div class ="pl-1">Unidad&nbsp;</div></div></div></th>`;
        let head = `<tr>${num_orden}${columnas}${factor}${unidad}</tr>`;
        //let mas = `<th scope="col" width="5%"><div class="d-flex flex-column justify-content-center align-items-center"><div class="btn btn-warning btn-sm estilo-01" type="button" onclick="agregarFila()"><i class="fas fa-plus-circle mr-1"></i>Agregar</div></div></th>`;        
        //let head = `<tr>${num_orden}${columnas}${factor}${unidad}${mas}</tr>`;
        $('#head-factor').html(head);

        if (data.LISTA_FAC_DATA.length > 0) {
            data.LISTA_FAC_DATA.map((x, y) => {
                $.each(x.PARAMETROS.split('|'), (z, w) => {
                    $.each(x.VALORES.split('|'), (m, n) => {
                        if (z == m) $(`#cbo-param-${y+1}-${w}`).val(n);
                    });
                });
            });
        }
    }    
}

var guardar = () => {
    factor_data = [];
    let url = `${baseUrl}api/factor/guardarfactorvalor`;

    $('#tbl-factor').find('tbody').find('tr').each((x, y) => {
        let id_factor = $(y).data('factor');
        let detalle = $(y).data('ind');
        let id_parametros = []; $(y).find('.get-valor-param').each((x, y) => { id_parametros.push($(y).data('param')) });
        let valores = []; $(y).find('.get-valor-param').each((x, y) => { valores.push($(y).val()) });
        let factor = $(y).find('.get-valor-factor').val();
        let unidad = $(y).find('.get-valor-unidad').val();

        let r = {
            ID_FACTOR: id_factor,
            ID_DETALLE: detalle,
            PARAMETROS: ordenar(id_parametros),
            VALORES: ordenar(valores),
            FACTOR: factor,
            UNIDAD: unidad,
            USUARIO_GUARDAR: idUsuarioLogin
        }
        factor_data.push(r);
    });

    let data = { LISTA_FAC_DATA: factor_data, USUARIO_GUARDAR: idUsuarioLogin };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        $('.alert-add').html('');
        if (j) { $('#btnGuardar').hide(); $('#btnGuardar').next().html('Cerrar'); }
        j ? $('.alert-add').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Los datos fueron guardados correctamente.', close: { time: 1000 }, url: `` }) : $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
        if (j) $('#btnConsultar')[0].click();
    });
}

var ordenar = (array) => {
    return array.join('|');
}