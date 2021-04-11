$(document).ready(() => {
    if (idUsuarioLogin == null) $('#txt-act').parent().parent().remove();
    $('form').submit((e) => {
        sendLogin(e);
    })
    $('#txt-pswd').on('blur', (e) => seguridadinicial());
});

var sendLogin = (e) => {
    e.preventDefault();    
    $('.alert-add').html('');
    let arr = [];

    //if (($("#txt-act").val() || '').trim() === "" && idUsuarioLogin != null) arr.push("Debe ingresar la contraseña actual");
    if ($("#txt-pswd").val().trim() === $("#txt-con").val().trim()) {
        //if (!(/[a-zñ]/.test($("#txt-pswd").val().trim()) && /[A-ZÑ]/.test($("#txt-pswd").val().trim()) && /[0-9]/.test($("#txt-pswd").val().trim()) && /[!@#$&*]/.test($("#txt-pswd").val().trim()))) arr.push("La contraseña debe contener minúscula(s), mayúscula(s), número(s) y caracter(es) especial(es) [!@#$&*]");
        if ($("#txt-pswd").val().trim().length < 6) arr.push("La contraseña debe contener 6 o más caracteres por seguridad"); }
    else arr.push("Las contraseñas no coinciden");

    if (arr.length > 0) {
        let error = '';
        $.each(arr, function (ind, elem) { error += '<li><small class="mb-0">' + elem + '</small></li>'; });
        error = `<ul>${error}</ul>`;
        $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: error });
        return;
    }

    let contrasena = $('#txt-pswd').val().trim();
    //let actualcontrasena = ($('#txt-act').val() || '').trim();

    //let idUsuario = idUsuarioLogin != null ? idUsuarioLogin : location.href.split('/')[5];

    //let url = `${baseUrl}api/usuario/nuevaclaveusuario`; //end point 35
    let url = `${baseUrlApi}api/usuario/nuevaclaveusuario`; //end point 35
    let data = { ID_USUARIO: idusuario, CONTRASENA_NUEVO: contrasena };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        let mensaje = '';
        mensaje = j == 0 ? 'Inténtelo nuevamente por favor.' : j == 1 ? 'Inténtelo nuevamente por favor.' : j == 2 ? 'La contraseña se cambio correctamente.' : '';
        $('.alert-add').html('');
        if (j == 2) { $('#sresBtn').hide(); }
        if (j == 2) $('.alert-add').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: mensaje, close: { time: 4000 }, url: `${baseUrl}Login` });
        else $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: mensaje });
    });
}

$(document).on("keydown", ".sin-espacio", function (e) {
    var key = window.e ? e.which : e.keyCode;
    if (key == 32) return false;
});

var seguridadinicial = () => {
    if ($('#txt-pswd').val().trim() == "") {
        $('.spanNivelesColores').removeClass().addClass('spanNivelesColores');
        $('#nivelseguridad > span').html('');
    }
}

