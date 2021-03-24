$(document).ready(() => {
    $('form').submit((e) => {
        let id = e.currentTarget.id;
        if (id == "frmLogin") sendLogin(e);
    })
});

var sendLogin = (e) => {
    e.preventDefault();
    $('form .form-group:last').alert({ type: 'info', title: 'Validando credenciales', message: 'Espere un momento por favor.' })

    grecaptcha.ready(() => {
        grecaptcha.execute(key).then(iniciarSesionConCaptcha);
    });
}

var iniciarSesionConCaptcha = (token) => {
    let correo = $('#txt-user').val().trim();
    let contrasena = $('#txt-pswd').val().trim();

    let url = `${baseUrlApi}api/login/authenticate`;
    let data = { Username: correo, Password: contrasena };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json();
        else if (response.status == 401) return 401;
        else return 0;
    })
    .then(validarInicioSesion)
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        return 0;
    });
}

var validarInicioSesion = (data) => {
    if (data == 401) { mostrarMensajeError("Las credenciales no son válidas"); }
    else if (data == 0) { mostrarMensajeError("Error de acceso"); }
    else cargarSesion(data);
}

var mostrarMensajeError = (msj) => {
    $('form .form-group:last').alert({ type: 'danger', title: 'Error de acceso', message: msj, close: { time: 3000 } });
}

var cargarSesion = (d) => {
    let data = { ID_USUARIO: d.ID_USUARIO, NOMBRES: d.NOMBRES, ID_ROL: d.ID_ROL, NOMBRE_ROL: d.NOMBRE_ROL, ROL: { ID_ROL: d.ID_ROL, NOMBRE: d.NOMBRE_ROL }, ID_INSTITUCION: d.ID_INSTITUCION, PROPIETARIO: d.PROPIETARIO, TOKEN: d.TOKEN, TOKEN_EXPIRACION: d.TOKEN_EXPIRACION };

    let url = `${baseUrl}Login/Validar`;
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(r => r.json())
    .then(redireccionar)
}

var redireccionar = (data) => {
    if (data.success)
        location.href = `${baseUrl}Electromovilidad`;
    else
        mostrarMensajeError("Ocurrió un problema");
}

$(document).on("keydown", ".solo-numero", function (e) {
    var key = window.e ? e.which : e.keyCode;
    if ((key < 48 || key > 57) && (event.keyCode < 96 || event.keyCode > 105) && key !== 8 && key !== 9 && key !== 37 && key !== 39 && key !== 46) return false;
});