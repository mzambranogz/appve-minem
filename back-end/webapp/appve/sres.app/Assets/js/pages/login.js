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
    let contraseña = $('#txt-pswd').val().trim();
    let data = { correo, contraseña, token };

    let url = `${baseUrl}Login/Validar`;
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(r => r.json())
    .then(validarInicioSesion)
}

var validarInicioSesion = (data) => {
    if (data.success == true) {
        location.href = `${baseUrl}Electromovilidad`;
    }
    else
        $('form .form-group:last').alert({ type: 'danger', title: 'Error de acceso', message: "Las credenciales no son válidas", close: { time: 3000 } });
}

$(document).on("keydown", ".solo-numero", function (e) {
    var key = window.e ? e.which : e.keyCode;
    if ((key < 48 || key > 57) && (event.keyCode < 96 || event.keyCode > 105) && key !== 8 && key !== 9 && key !== 37 && key !== 39 && key !== 46) return false;
});