var idinstitucion = 0;
$(document).ready(() => {
    cargarComponentes();
});
//prioridad 19
var cargarComponentes = () => {
    //let url = `${baseUrl}api/usuario/consultarperfil?idusuario=${idUsuarioLogin}`;
    let url = `${baseUrlApi}api/usuario/consultarperfil?idusuario=${idUsuarioLogin}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } }

    fetch(url, init).then(r => r.json()).then(cargarDatos);
}

var cargarDatos = (data) => {
    if (data == null) return;
    $('#txt-nombre-completo').val(data.NOMBRES == null ? '' : data.NOMBRES);
    $('#rad-01').prop('checked', data.ID_GENERO == 1 ? true : false);
    $('#rad-02').prop('checked', data.ID_GENERO == 2 ? true : false);
    $('#txt-user').val(data.CORREO == null ? '' : data.CORREO);
    debugger;
    if (data.INSTITUCION == null) { $('.datos-empresa').addClass('d-none'); return; }
    idinstitucion = data.INSTITUCION.ID_INSTITUCION;
    $('#txt-ruc').val(data.INSTITUCION.RUC == null ? '' : data.INSTITUCION.RUC);
    $('#txt-razon-social').val(data.INSTITUCION.RAZON_SOCIAL == null ? '' : data.INSTITUCION.RAZON_SOCIAL);
    $('#txt-correo-empresa').val(data.INSTITUCION.CORREO == null ? '' : data.INSTITUCION.CORREO);
    $('#txt-telefono').val(data.INSTITUCION.TELEFONO == null ? '' : data.INSTITUCION.TELEFONO);
    $('#txt-direccion').val(data.INSTITUCION.DIRECCION == null ? '' : data.INSTITUCION.DIRECCION);
}

$('#frmPerfil').on('submit', (e) => {
    e.preventDefault(); actualizarDatos();
});

var actualizarDatos = () => {

    let arrInstitucion = [];
    let nombres = $('#txt-nombre-completo').val();
    let correo = $('#txt-user').val();
    let genero = $('#rad-01').prop('checked') ? 1 : $('#rad-02').prop('checked') ? 2 : 0;
    let ruc = $('#txt-ruc').val();
    let razon_social = $('#txt-razon-social').val();
    let correoempresa = $('#txt-correo-empresa').val();
    let telefono = $('#txt-telefono').val();
    let direccion = $('#txt-direccion').val();

    let message = [];
    if (nombres.trim() == "") message.push("Debe ingresar su nombre completo");
    if (genero == 0) message.push("Debe seleccionar su género");

    if (idinstitucion > 0) {
        if (ruc.length < 11) message.push("El ruc debe contener 11 caracteres");
        if (ruc.substring(0, 2) != '20' && ruc.substring(0, 2) != '10') message.push("El ruc debe iniciar con el número 20 o 10");
        if (razon_social.trim() == "") message.push("Debe ingresar la razón social");
        if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test($("#txt-user").val()))) message.push("Ingrese un correo electrónico válido de la empresa");
        if (telefono.trim() == "") message.push("Debe ingresar el número telefónico");
        if (direccion.trim() == "") message.push("Debe ingresar la dirección de la empresa");
    }    

    if (message.length > 0) {
        $('form > .row:last').alert({ type: 'danger', title: 'Error', message: message.join("<br>") });
        return;
    }

    if (idinstitucion > 0) {
        arrInstitucion = {
            ID_INSTITUCION: idinstitucion,
            RUC: ruc,
            RAZON_SOCIAL: razon_social,
            CORREO: correoempresa,
            TELEFONO: telefono,
            DIRECCION: direccion,
        };
    }
    //prioridad 20
    //let url = `${baseUrl}api/usuario/guardarperfil`;
    let url = `${baseUrlApi}api/usuario/guardarperfil`;
    let data = { ID_USUARIO: idUsuarioLogin, NOMBRES: nombres, ID_GENERO: genero, ID_INSTITUCION: idinstitucion, INSTITUCION: arrInstitucion };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json();
        else return 0;
    })
    .then(actualizarPerfil)
    .catch(error => {
        //console.log('Hubo un problema con la petición Fetch:' + error.message);
        mostrarMensajeError("Ocurrió un problema inténtelo nuevamente");
        return 0;
    });
}

var actualizarPerfil = (data) => {
    debugger;
    if (data == null) { mostrarMensajeError("Ocurrió un problema inténtelo nuevamente"); return; }
    if (data == 400) { mostrarMensajeError("Error en el registro de usuario"); }
    else if (data == 0) { mostrarMensajeError("Ocurrió un problema inténtelo nuevamente"); }
    else {
        if (data) {
            $('.registrar-usuario').addClass('d-none');
            $('form > .row:last').alert({ type: 'success', title: 'BIEN HECHO', message: '¡Se actualizó correctamente!', html: '<p id="redireccionarText" class="text-center estilo-01">Redireccionando en <strong id="txtSegundosRedirigir"></strong> segundos</p>' });
            $('#txtSegundosRedirigir').counter({ start: 3, end: 0, time: 1000, callback: () => location.href = `${baseUrl}Electromovilidad` });
        } else {
            mostrarMensajeError("Ocurrió un problema inténtelo nuevamente");
        }        
    } 
}

var mostrarMensajeError = (msj) => {
    $('form > .row:last').alert({ type: 'danger', title: 'Error', message: msj });
}