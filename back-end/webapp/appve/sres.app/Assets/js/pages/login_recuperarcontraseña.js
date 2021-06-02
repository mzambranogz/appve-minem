var enviarMail = (e) => {
    debugger;
    e.preventDefault();
    let correo = $('#txt-user').val();

    let url = `${baseUrl}api/usuario/enviarlinkrecuperarcontraseña?correo=${correo}&flagrecuperar=2`; //end point 34
    //let url = `${baseUrlApi}api/usuario/enviarlinkrecuperarcontrasenia?correo=${correo}&flagrecuperar=2`; //end point 34

    console.log(url);

    fetch(url)
    .then(r => r.json())
    .then(responseEnvioMail);
};

var responseEnvioMail = (data) => {
    let success = data.success;
    let message = data.message;
    if (success == true) {
        $('form > *:last').alert({ type: 'success', title: 'Bien hecho', message});
        setTimeout(redirigir, 5000);
    }
    else {
        $('form > *:last').alert({ type: 'danger', title: 'Error', message });
        setTimeout(limpiarAlert, 4000);
    } 

};

var redirigir = () => {
    location.href = `${baseUrl}Login`;
}

var limpiarAlert = () => {
    $('form > *:last').remove();
}

$(document).ready(() => {
    $('#frmLogin').submit(enviarMail);
});