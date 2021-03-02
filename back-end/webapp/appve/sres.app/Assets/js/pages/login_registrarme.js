$(document).ready(() => {
    inicializar();
});

var inicializar = () => {    
    $('#frmRegister').on('submit', (e) => { e.preventDefault(); verificarcorreo(); });
}

var limpiarFormulario = () => {
    $('#txt-nombre-completo').val('');    
    $('#rad-01').prop('checked', false);
    $('#rad-02').prop('checked', false);
    $('#txt-user').val('');
    $('#txt-pswd').val('');
    $('#txt-re-pswd').val('');
    $('form .alert').remove();
}

var verificarcorreo = () => {
    //Deshabilitado porque se debe comprobar si desde la API se verificara el correo que estan usando, si existe o no

    //let correo = $('#txt-user').val().trim(), validar = false;
    //let urlVerificarCorreo = `${baseUrl}api/usuario/verificarcorreo?correo=${correo}`;

    //fetch(urlVerificarCorreo)
    //.then(r => r.json())
    //.then((data) => {
    //    if (data) {
    //        $('form > .row:last').alert({ type: 'danger', title: 'Error', message: "Encontramos que su correo electrónico se encuentra registrado, por favor ingrese otro correo electrónico" });
            
    //    }else
    //        registrarUsuario();
    //});
    
    registrarUsuario();
}

var registrarUsuario = () => {
    let nombres = $('#txt-nombre-completo').val();
    let correo = $('#txt-user').val();
    let genero = $('#rad-01').prop('checked') ? 1 : $('#rad-02').prop('checked') ? 2 : 0;
    let contraseña = $('#txt-pswd').val();
    let reContraseña = $('#txt-re-pswd').val();
    let aceptarTerminosYCondiciones = $('#chk-terminos-condiciones').prop('checked');

    let message = [];
    if (nombres.trim() == "") message.push("Debe ingresar su nombre completo");
    if (genero == 0) message.push("Debe seleccionar su género");
    if (!(/[a-zñ]/.test($("#txt-pswd").val().trim()) && /[A-ZÑ]/.test($("#txt-pswd").val().trim()) && /[0-9]/.test($("#txt-pswd").val().trim()) && /\W/.test($("#txt-pswd").val().trim()))) arr.push("La contraseña debe contener minúscula(s), mayúscula(s), número(s) y caracter(es) especial(es)");
    if (contraseña != reContraseña) message.push("Las contraseñas ingresadas no coinciden");
    if (!aceptarTerminosYCondiciones) message.push("Debe aceptar los términos y condiciones");

    if (message.length > 0) {
        $('form > .row:last').alert({ type: 'danger', title: 'Error', message: message.join("<br>") });
        return;
    }

    debugger;
    let url = `${baseUrl}api/usuario/guardarusuario`;
    //let url = `${baseUrlApi}api/usuario/insert`;
    let data = { ID_USUARIO: -1, NOMBRES: nombres, ID_GENERO: genero, CORREO: correo, CONTRASENA: contraseña, ID_ROL: 3, FLAG_ESTADO: '1'};
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    //fetch(url, init)
    //.then(response => {
    //    if (response.status == 200) return response.json();
    //    else if (response.status == 400) return 400;
    //    else return 0;
    //})
    //.then(registro)
    //.catch(error => {
    //    console.log('Hubo un problema con la petición Fetch:' + error.message);
    //    return 0;
    //});

    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        console.log(j);
        debugger;
        if (j == true) {
            limpiarFormulario();
            $('form > .row:last').alert({ type: 'success', title: 'BIEN HECHO', message: '¡Se registró correctamente!', html: '<p id="redireccionarText" class="text-center estilo-01">Lo estamos redirigiendo en <strong id="txtSegundosRedirigir"></strong> segundos</p>' });
            $('#txtSegundosRedirigir').counter({ start: 5, end: 0, time: 1000, callback: () => location.href = `${baseUrl}Login` });
        }
    });
}

var registro = (j) => {
    if (j == 400) { mostrarMensajeError("Error en el registro de usuario"); }
    else if (j == 0) { mostrarMensajeError("Error, comunicarse con el administrador del sistema"); }
    else {
        //$('.registrar-usuario').addClass('d-none');
        //$('form > .row:last').alert({ type: 'success', title: 'BIEN HECHO', message: '¡Se registró correctamente!', html: '<p id="redireccionarText" class="text-center estilo-01">Lo estamos redirigiendo en <strong id="txtSegundosRedirigir"></strong> segundos</p>' });
        //$('#txtSegundosRedirigir').counter({ start: 5, end: 0, time: 1000, callback: () => location.href = `${baseUrl}Login` });

        if (j == true) {
            limpiarFormulario();
            $('form > .row:last').alert({ type: 'success', title: 'BIEN HECHO', message: '¡Se registró correctamente!', html: '<p id="redireccionarText" class="text-center estilo-01">Lo estamos redirigiendo en <strong id="txtSegundosRedirigir"></strong> segundos</p>' });
            $('#txtSegundosRedirigir').counter({ start: 5, end: 0, time: 1000, callback: () => location.href = `${baseUrl}Login` });
        }
    }        
}

var mostrarMensajeError = (msj) => {
    $('form > .row:last').alert({ type: 'danger', title: 'Error', message: msj });
}

$(document).on("keydown", ".solo-numero", function (e) {
    var key = window.e ? e.which : e.keyCode;
    if ((key < 48 || key > 57) && (event.keyCode < 96 || event.keyCode > 105) && key !== 8 && key !== 9 && key !== 37 && key !== 39 && key !== 46) return false;
});