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
    //let data = { correo, contraseña, token };

    //let url = `${baseUrl}Login/Validar`;
    //let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    let url = `http://161.35.182.46/ApiElectromovilidad/api/login/authenticate`;
    let data = {Username: correo, Password: contrasena};
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    //let request = fetch(url, init).then(r => r.json()).then(e => (validarInicioSesion));
    //debugger;

    //fetch(url, init)
    //.then(r => r.json())
    //.then(validarInicioSesion)


    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json().then(validarInicioSesion);
        else if (response.status == 401) return mostrarMensaje("La contraseña es incorrecta");
        else new Error("");
    })    
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
    });

    //fetch(url, init)
    //.then(res => res.json()).then(validarInicioSesion)
    //.catch(error => console.error('Error:', error))
    //.then(res => {
    //    debugger;
    //    let s = res.status
    // });

    //fetch(url, init)
    //.then(response => {
    //    if (response.status == 200) return response.json();
    //    else if (response.status == 401) return (async() => "La contraseña es incorrecta")();
    //    else new Error("");
    //})
    //.then(validarInicioSesion),
    //ResponseToJson = (response) => {
        
    //}

    //fetch(url, init)
    //.then(function (response) {
    //    debugger;
    //    return response.text();
    //})
    //.then(function (data) {
    //    debugger;
    //    console.log('data = ', data);
    //})
    //.catch(function (err) {
    //    console.error(err);
    //});
}

var mostrarMensaje = (msj) => {
    alert(msj);
}

var validarInicioSesion = (data) => {
    alert("");
    debugger;
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