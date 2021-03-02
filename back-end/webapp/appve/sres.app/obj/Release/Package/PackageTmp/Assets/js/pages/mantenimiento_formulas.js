$(document).ready(() => {
    $('#btnConsultar').on('click', (e) => consultar());
    $('#btnConsultar')[0].click();
    $('#cbo-caso').on('change', (e) => changeCaso());
    $('#btnGuardar').on('click', (e) => guardar());
    consultarListas();
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
    let url = `${baseUrl}api/formula/buscar?${queryParams}`;

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
            let colCodigo = `<td class="text-center" data-encabezado="Código" scope="row"><span>${(`${formatoCodigo}${x.ID_FORMULA}`).split('').reverse().join('').substring(0, formatoCodigo.length).split('').reverse().join('')}</span></td>`;
            let colCaso = `<td class="text-left" data-encabezado="Caso">${x.CASO}</td>`;
            let colNombre = `<td class="text-left" data-encabezado="Nombre">${x.NOMBRE}</td>`;
            let colFormula = `<td class="text-left" data-encabezado="Fórmula">${x.FORMULA}</td>`;
            let btnEditar = `<a class="dropdown-item estilo-01 btnEditar" href="#" data-id="${x.ID_FORMULA}" data-toggle="modal" data-target="#modal-mantenimiento"><i class="fas fa-edit mr-1"></i>Editar</a>`;
            let colOpciones = `<td class="text-center" data-encabezado="Gestión"><div class="btn-group w-100"><a class="btn btn-sm bg-success text-white w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0">Gestionar</a><div class="dropdown-menu">${btnEditar}</div></div></td>`;
            let fila = `<tr>${colNro}${colCodigo}${colCaso}${colNombre}${colFormula}${colOpciones}</tr>`;
            return fila;
        }).join('');
    };

    return contenido;
};

var consultarDatos = (element) => {
    limpiarFormulario();
    $('.alert-add').html('');
    $('#btnGuardar').show();
    $('#btnGuardar').next().html('Cancelar');
    $('#exampleModalLabel').html('ACTUALIZAR FÓRMULA');

    let id = $(element).attr('data-id');
    let url = `${baseUrl}api/formula/obtener?id=${id}`;
    fetch(url)
    .then(r => r.json())
    .then(j => {
        cargarDatos(j);
    });
}

var cargarDatos = (data) => {
    if (data == null) return false;
    $('#frm').data('id', data.ID_FORMULA);
    $('#cbo-caso').prop('disabled', true);
    $('#cbo-caso').val(data.ID_CASO);
    $('#txt-nombre').val(data.NOMBRE);
    changeCaso();

    if (data.FORMULA != null) {
        let formula = "", valoresformula = "";
        if (data.FORMULA_ARMADO != null && data.FORMULA_ARMADO != ""){
            $.each(data.FORMULA_ARMADO.split('|'), (x, y) => {
                let color = y.indexOf('F') != -1 ? "info" : y.indexOf('P') != -1 ? "primary" : y.indexOf('C') != -1 ? "warning" : "secondary";
                let icono = `<i class="fas fa-2x fa-arrows-alt"></i>`;
                let small = `<small class="badge badge-${color}">${y}</small>`;
                let delet = `<i class="fas fa-minus-circle cursor-pointer delete-columna-detalle" data-toggle="tooltip"  data-placement="top" title="" data-enfoque="1" data-original-title="Eliminar"></i>`;
                let cnt = `<div class="list-group-item sortable-item" data-value="${y}">${icono}${small}${delet}</div>`;
                formula += y;
                valoresformula += cnt;
            });
        }
        $('#columnas-enfoque').append(valoresformula);
        $('#txa-enfoque').val(formula);
    }
}

var guardar = () => {
    $('.alert-add').html('');

    let arr = [];
    if ($('#txt-nombre').val().trim() == "") arr.push("Debe ingresar un nombre representativo");
    if ($('#columnas-enfoque').html() == '') arr.push("Debe ingresar la fórmula");

    if (arr.length > 0) {
        let error = '';
        $.each(arr, function (ind, elem) { error += '<li><small class="mb-0">' + elem + '</li></small>'; });
        error = `<ul>${error}</ul>`;
        $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: error });
        return;
    }

    let id = $('#frm').data('id');
    let nombre = $('#txt-nombre').val();
    let formula = $('#txa-enfoque').val();
    let formula_armado = $('#txa-enfoque').data('r') == null ? "" : $('#txa-enfoque').data('r').length == 0 ? "" : $('#txa-enfoque').data('r').substring(0, $('#txa-enfoque').data('r').length - 1);
    let data = { ID_FORMULA: id, NOMBRE: nombre, FORMULA: formula, FORMULA_ARMADO: formula_armado, USUARIO_GUARDAR: idUsuarioLogin };
    let url = `${baseUrl}api/formula/actualizar`;
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        $('.alert-add').html('');
        if (j.OK) { $('#btnGuardar').hide(); $('#btnGuardar').next().html('Cerrar'); }
        j ? $('.alert-add').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Los datos fueron guardados correctamente.', close: { time: 1000 }, url: `` }) : $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
        if (j.OK) $('#btnConsultar')[0].click();
    });
}

var limpiarFormulario = () => {
    $('#frm').removeData();
    $('#txt-nombre').val('');
    $("#columnas-enfoque").html('');
    $('#txa-enfoque').val('');
    $('#cbo-caso').val(0);
}

var consultarListas = () => {
    let urlCaso = `${baseUrl}api/caso/obtenerallcaso`;
    Promise.all([
        fetch(urlCaso),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(([jCaso]) => {
        
        let caso = ``;
        if (jCaso.length > 0) {
            caso = jCaso.map((x, y) => {
                return `<option value="${x.ID_CASO}">${x.NOMBRE}</option>`;
            }).join('');
        }
        $('#cbo-caso').html(`<option value="0">-seleccione-</option>${caso}`);
    });
}

var changeCaso = () => {
    let urlParametro = `${baseUrl}api/parametro/obtenerallparametro?idcaso=${$('#cbo-caso').val()}`;
    let urlFactor = `${baseUrl}api/factor/obtenerallfactor?idcaso=${$('#cbo-caso').val()}`;
    Promise.all([
        fetch(urlParametro),
        fetch(urlFactor),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(([jParametro, jFactor]) => {
        
        let parametro = ``;
        if (jParametro.length > 0) {
            caso = jParametro.map((x, y) => {
                return `<option value="P${x.ID_PARAMETRO}">[P${x.ID_PARAMETRO}] ${x.NOMBRE}</option>`;
            }).join('');
        }
        $('#cbo-parametros').html(`<option value="0">-seleccione-</option>${caso}`);

        let factor = ``;
        if (jFactor.length > 0) {
            caso = jFactor.map((x, y) => {
                return `<option value="F${x.ID_FACTOR}">[F${x.ID_FACTOR}] ${x.NOMBRE}</option>`;
            }).join('');
        }
        $('#cbo-factores').html(`<option value="0">-seleccione-</option>${caso}`);
    });
}