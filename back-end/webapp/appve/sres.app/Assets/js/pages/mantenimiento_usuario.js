$(document).ready(() => {
    $('#ir-pagina').on('change', (e) => cambiarPagina());
    $('#catidad-rgistros').on('change', (e) => cambiarPagina());
    $('#btnConsultar').on('click', (e) => consultar());
    $('#btnConsultar')[0].click();
    $('#btnNuevo').on('click', (e) => nuevoUsuario());
    $('#btnGuardar').on('click', (e) => guardarUsuario());
    //$('#txt-user-correo').on('blur', (e) => consultarUsuarioCorreo());
    cargarInformacionInicial();
});
var flag_ndc = '0';
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
    let estado = '1';
    let registros = $('#catidad-rgistros').val();
    let pagina = $('#ir-pagina').val();
    let columna = $("#columna").val();
    let orden = $("#orden").val();
    let params = { busqueda, estado, registros, pagina, columna, orden };
    let queryParams = Object.keys(params).map(x => params[x] == null ? x : `${x}=${params[x]}`).join('&');

    //let url = `${baseUrl}api/usuario/buscarusuario?${queryParams}`;
    let url = `${baseUrlApi}api/usuario/buscarusuario?${queryParams}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    fetch(url, init).then(r => r.json()).then(j => {
        let tabla = $('#tblUsuario');
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
                        consultarUsuario(e.currentTarget);
                    });
                });
            } else {
                $('#viewPagination').hide(); $('#view-page-result').hide();
                $('.inicio-registros').text('No se encontraron resultados');
            }    
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
            let colNro = `<td class="text-center" data-encabezado="Número de orden" scope="row" data-count="0">${(pagina - 1) * registros + (i + 1)}</td>`;
            let colCodigo = `<td class="text-center" data-encabezado="Código" scope="row"><span>${(`${formatoCodigo}${x.ID_USUARIO}`).split('').reverse().join('').substring(0, formatoCodigo.length).split('').reverse().join('')}</span></td>`;
            let colNombres = `<td class="text-left" data-encabezado="Nombre">${x.NOMBRES}</td>`;
            let colCorreo = `<td class="text-left" data-encabezado="Correo">${x.CORREO}</td>`;
            let colNombreRol = `<td class="text-center" data-encabezado="Perfil"><div class="badge badge-${x.ID_ROL == 1 ? 'primary' : x.ID_ROL == 2 ? 'info' : 'secondary'} p-1"><small class="estilo-01">${x.ROL.NOMBRE == null ? '' : x.ROL.NOMBRE}</div></td>`;
            let colEstado = `<td class="text-center" data-encabezado="Estado"><div class="badge badge-${x.FLAG_ESTADO == 0 ? 'danger' : x.FLAG_ESTADO == 1 ? 'success' : 'danger'} p-1"><i class="fas fa-times-circle mr-1"></i><small class="estilo-01">${x.FLAG_ESTADO == 0 ? 'Deshabilitado' : x.FLAG_ESTADO == 1 ? 'Habilitado' : 'Deshabilitado'}</small></div></td>`;
            //let btnCambiarEstado = `${!["0", "1"].includes(x.FLAG_ESTADO) ? "" : `<a href="#" data-id="${x.ID_USUARIO}" data-estado="${x.FLAG_ESTADO}" class="btnCambiarEstado">${x.FLAG_ESTADO == "1" ? "DESHABILITAR" : "HABILITAR"}</a> `}`;
            let btnEditar = `<a class="dropdown-item estilo-01 btnEditar" href="#" data-id="${x.ID_USUARIO}" data-toggle="modal" data-target="#modal-mantenimiento"><i class="fas fa-edit mr-1"></i>Editar</a>`;
            //let colOpciones = `<td>${btnCambiarEstado}${btnEditar}</td>`;
            let colOpciones = `<td class="text-center" data-encabezado="Gestión"><div class="btn-group w-100"><a class="btn btn-sm bg-success text-white w-100 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" tabindex="0">Gestionar</a><div class="dropdown-menu">${btnEditar}</div></div></td>`;
            let fila = `<tr>${colNro}${colCodigo}${colNombres}${colCorreo}${colNombreRol}${colEstado}${colOpciones}</tr>`;
            return fila;
        }).join('');
    };

    return contenido;
};

var nuevoUsuario = () => {
    $('#frmUsuario').removeData('idUsuario');
    $('.alert-add').html('');
    $('#btnGuardar').show();
    $('#btnGuardar').next().html('Cancelar');
    $('#exampleModalLabel').html('REGISTRAR USUARIO');    
    limpiarDatosUsuario();
    cambiarPropiedadLecturaUsuario(true);
    $('#rad-e-01').prop('checked', true);
    $('.editar-usuario-sres').removeClass('d-none');
    $('.admin-edit').removeClass('d-none');
    $('.spanNivelesColores').removeClass().addClass('spanNivelesColores');
    $('#nivelseguridad > span').html('');
}

var consultarUsuarioCorreo = () => {
    if ($('#frmUsuario').data('idUsuario') != null) return;
    let correo = $('#txt-user-correo').val().trim();
    limpiarDatosUsuario();
    if(correo == '') { cambiarPropiedadLecturaUsuario(false); return;}
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correo))) { cambiarPropiedadLecturaUsuario(false); return;}

    let urlValidarUsuarioPorCorreo = `${baseUrl}api/usuario/validarusuarioporcorreo?correo=${correo}`;
    fetch(urlValidarUsuarioPorCorreo)
    .then(r => r.json())
    .then(j => cargarDatosUsuarioCorreo(j));
}

var cargarDatosUsuarioCorreo = (data) => {
    if(!data.EXISTE) cambiarPropiedadLecturaUsuario(true);
    else cambiarPropiedadLecturaUsuario(false);
}

var limpiarDatosUsuario = () => {
    $('#txt-user-correo').val('');
    $('#txt-nombre').val('');
    $('#txt-pswd').val('');
    $('#txt-re-pswd').val('');
    $('#cbo-perfil').val(0);
    $('#rad-01').prop('checked', false);
    $('#rad-02').prop('checked', false);
    $('#rad-e-01').prop('checked', false);
    $('#rad-e-02').prop('checked', false);
}

var cambiarPropiedadLecturaUsuario = (valor) => {
    $('#txt-user-correo').prop('readonly', !valor);
    $('#txt-pswd').prop('readonly', !valor);
    $('#txt-re-pswd').prop('readonly', !valor);
    $('#cbo-perfil').prop('disabled', !valor);
}

var consultarUsuario = (element) => {
    $('.alert-add').html('');
    $('#btnGuardar').show();
    $('#btnGuardar').next().html('Cancelar');
    $('#exampleModalLabel').html('ACTUALIZAR USUARIO');
    $('.editar-usuario-sres').addClass('d-none');
    limpiarDatosUsuario();
    cambiarPropiedadLecturaUsuario(false);

    let idUsuario = $(element).attr('data-id');
    //let urlUsuario = `${baseUrl}api/usuario/obtenerusuario?idUsuario=${idUsuario}`;
    let urlUsuario = `${baseUrlApi}api/usuario/GetByFilter?idUsuario=${idUsuario}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    fetch(urlUsuario, init)
    .then(r => r.json())
    .then (cargarDatosUsuario);
}

var cargarDatosUsuario = (data) => {
    $('#frmUsuario').data('idUsuario', data.ID_USUARIO);
    $('#txt-user-correo').val(data.CORREO);
    $('#txt-nombre').val(data.NOMBRES);
    $('#cbo-perfil').val(data.ID_ROL);
    $('#rad-01').prop('checked', data.ID_GENERO == 1 ? true : false);
    $('#rad-02').prop('checked', data.ID_GENERO == 2 ? true : false);
    $('#rad-e-01').prop('checked', data.FLAG_ESTADO == 1 ? true : false);
    $('#rad-e-02').prop('checked', data.FLAG_ESTADO == 0 ? true : false);    
    if (data.ID_ROL == 1) $('.admin-edit').addClass('d-none');
    else $('.admin-edit').removeClass('d-none');
}

var guardarUsuario = () => {
    $('.alert-add').html('');
    let arr = [];
    if ($('#txt-nombre').val().trim() === "") arr.push("Debe ingresar nombres y apellidos");
    if (!$('#rad-01').prop('checked') && !$('#rad-02').prop('checked')) arr.push('Debe seleccionar un género');
    if ($('#cbo-perfil').val() == 0) arr.push("Debe seleccionar un perfil");
    if ($("#frmUsuario").data("idUsuario") == null) {
        if ($("#txt-pswd").val().trim() === $("#txt-re-pswd").val().trim()) {
            if (!(/[a-zñ]/.test($("#txt-pswd").val().trim()) && /[A-ZÑ]/.test($("#txt-pswd").val().trim()) && /[0-9]/.test($("#txt-pswd").val().trim()) && /\W/.test($("#txt-pswd").val().trim()) )) arr.push("La contraseña debe contener minúscula(s), mayúscula(s), número(s) y caracter(es) especial(es)");
            if ($("#txt-pswd").val().trim().length < 6) arr.push("La contraseña debe contener 6 o más caracteres por seguridad"); }
        else arr.push("Las contraseñas no coinciden"); }   
    if (!$('#rad-e-01').prop('checked') && !$('#rad-e-02').prop('checked')) arr.push('Debe seleccionar un estado');

    if (arr.length > 0) {
        let error = '';
        $.each(arr, function (ind, elem) { error += '<li><small class="mb-0">' + elem + '</li></small>'; });
        error = `<ul>${error}</ul>`;
        $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: error });
        return;
    }

    let idUsuario = $('#frmUsuario').data('idUsuario');
    let nombres = $('#txt-nombre').val();
    let correo = $('#txt-user-correo').val();
    let idRol = $('#cbo-perfil').val();
    let contraseña = $('#txt-pswd').val().trim();
    let genero = $('#rad-01').prop('checked') ? 1 : $('#rad-02').prop('checked') ? 2 : 0;
    let flagEstado = $('#rad-e-01').prop('checked') ? '1' : $('#rad-02').prop('checked') ? '2' : '0';

    //let url = `${baseUrl}api/usuario/guardarusuario`;
    let url = `${baseUrlApi}api/usuario/insert`;
    let data = { ID_USUARIO: idUsuario == null ? -1 : idUsuario, CONTRASENA: contraseña, NOMBRES: nombres, CORREO: correo, ID_ROL: idRol, ID_GENERO: genero, TIPO_REGISTRO: 1, FLAG_ESTADO: flagEstado, UPD_USUARIO: idUsuarioLogin };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        $('.alert-add').html('');
        if (j) { $('#btnGuardar').hide(); $('#btnGuardar').next().html('Cerrar'); }
        j ? $('.alert-add').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Los datos fueron guardados correctamente.', close: { time: 1000 }, url: `` }) : $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
        if (j) $('#btnConsultar')[0].click();
    });
}

var cargarInformacionInicial = () => {
    //let urlListaRol = `${baseUrl}api/rol/listarrolporestado?flagEstado=1`;
    let urlListaRol = `${baseUrlApi}api/rol/listarrolporestado?flagEstado=1`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
    Promise.all([
        fetch(urlListaRol, init),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(([listaRol]) => {
        cargarComboRol('#cbo-perfil', listaRol);
    })
}

var cargarComboRol = (selector, data) => {
    let options = data.length == 0 ? '' : data.map(x => `<option class="badge badge-${x.ID_ROL == 1 ? 'primary' : x.ID_ROL == 2 ? 'info' : 'secondary'} font-weight-bold" value="${x.ID_ROL}">${x.NOMBRE}</option>`).join('');
    options = `<option value="0">-Seleccione un perfil-</option>${options}`;
    $(selector).html(options);
}

$(document).on("keydown", ".solo-numero", function (e) {
    var key = window.e ? e.which : e.keyCode;
    //var id = $("#" + e.target.id)[0].type;
    if ((key < 48 || key > 57) && (event.keyCode < 96 || event.keyCode > 105) && key !== 8 && key !== 9 && key !== 37 && key !== 39 && key !== 46) return false;
});

$(document).on("keydown", ".sin-espacio", function (e) {
    var key = window.e ? e.which : e.keyCode;
    if (key == 32) return false;
});
