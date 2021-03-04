var storedFiles = [];
var rutas = "";
$(document).ready(() => {
    $('#btnGuardar').on('click', (e) => guardar());
    $('#fle-protocolo').on('change', fileDocChange);
    $('#fle-certificado').on('change', fileDocChange);
    $('#file-foto').on('change', fileImagen);
    inicio();
});

var inicio = () => {
    if (idinstitucion == 0) $('#seccion-empresa').removeClass('d-none');
    else $('#seccion-empresa').addClass('d-none');
    if (idestacion == 0) return;
    cargarEstacion(idestacion);
}

//end points catorceavo
var cargarEstacion = (id) => {

    //let url = `http://161.35.182.46/ApiElectromovilidad/api/login/authenticate`;
    //let data = {Username: "carlos@grupo-zuniga.com", Password: "Flavio2019"};
    //let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    //Promise.all([
    //    fetch(url, init),
    //])
    //.then(r => Promise.all(r.map(v => v.json())))
    //.then(cargarDatos);
    
    let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacion?idestacion=${id}`;
    Promise.all([
        fetch(urlConsultarEstacion),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarDatos);
}

var cargarDatos = ([estacion]) => {
    if (estacion == null) return;
    if (estacion.ID_ESTACION == 0) return;
    $('#txt-descripcion').val(estacion.DESCRIPCION);
    $('#txt-modelo').val(estacion.MODELO);
    $('#txt-marca').val(estacion.MARCA);
    $('#txt-descripcion').val(estacion.DESCRIPCION);
    $('#cantidad-foto').html(estacion.CANTIDAD_IMAGEN);
    $('#txt-potencia').val(estacion.POTENCIA);
    $('#txt-modo-carga').val(estacion.MODO_CARGA);
    $('#txt-tipo-cargador').val(estacion.TIPO_CARGADOR);
    $('#txt-tipo-conector').val(estacion.TIPO_CONECTOR);
    $('#txt-cantidad-conector').val(estacion.CANTIDAD_CONECTOR);
    $('#txt-hora-desde').val(estacion.HORA_DESDE);
    $('#txt-hora-hasta').val(estacion.HORA_HASTA);
    $('#txt-tarifa').val(estacion.TARIFA_SERVICIO);

    if (estacion.LISTA_DOC != null){
        for (var i = 0; i < estacion.LISTA_DOC.length; i++) {
            if (estacion.LISTA_DOC[i].ID_DOCUMENTO == 1) {
                let nombreFileDoc = `<i class="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${estacion.LISTA_DOC[i].ARCHIVO_BASE}</span>`;
                let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`; //end points
                let btnEliminarFileDoc = `<a class="text-sres-verde btnEliminarFile" href="#" data-id="${estacion.LISTA_DOC[i].ID_DOCUMENTO}"><i class="fas fa-trash px-2 py-1"></i></a>`;
                contenidoFileDoc = `<div class="alert alert-success p-1 d-flex w-100"><div class="mr-auto">${nombreFileDoc}</div><div class="ml-auto">${btnDescargaFileDoc}${btnEliminarFileDoc}</div></div>`;
                $('#view-protocolo').html(`<label class="estilo-01">&nbsp;</label>${contenidoFileDoc}`);
                $('#txt-protocolo').val(estacion.LISTA_DOC[i].ARCHIVO_BASE);
                $('#fle-protocolo').data('file', estacion.LISTA_DOC[i].ARCHIVO_CONTENIDO);
                $('#view-protocolo .btnEliminarFile').on('click', btnEliminarFileClick);
            }
            if (estacion.LISTA_DOC[i].ID_DOCUMENTO == 2) {
                let nombreFileDoc = `<i class="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${estacion.LISTA_DOC[i].ARCHIVO_BASE}</span>`;
                let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`;
                let btnEliminarFileDoc = `<a class="text-sres-verde btnEliminarFile" href="#" data-id="${estacion.LISTA_DOC[i].ID_DOCUMENTO}"><i class="fas fa-trash px-2 py-1"></i></a>`;
                contenidoFileDoc = `<div class="alert alert-success p-1 d-flex w-100"><div class="mr-auto">${nombreFileDoc}</div><div class="ml-auto">${btnDescargaFileDoc}${btnEliminarFileDoc}</div></div>`;
                $('#view-certificado').html(`<label class="estilo-01">&nbsp;</label>${contenidoFileDoc}`);
                $('#txt-certificado').val(estacion.LISTA_DOC[i].ARCHIVO_BASE);
                $('#fle-certificado').data('file', estacion.LISTA_DOC[i].ARCHIVO_CONTENIDO);
                $('#view-certificado .btnEliminarFile').on('click', btnEliminarFileClick);
            }
        }        
    }

    if (estacion.LISTA_IMAGEN != null) {
        $('#txt-foto').val(estacion.CANTIDAD_IMAGEN == 1 ? 'Imagen cargada' : estacion.CANTIDAD_IMAGEN > 1 ? 'Imagenes cargadas' : 'Subir imagenes');
        for (var i = 0; i < estacion.LISTA_IMAGEN.length; i++) {
            storedFiles.push({ ID_DOCUMENTO: estacion.LISTA_IMAGEN[i].ID_DOCUMENTO, ARCHIVO_BASE: estacion.LISTA_IMAGEN[i].ARCHIVO_BASE, ARCHIVO_CONTENIDO: estacion.LISTA_IMAGEN[i].ARCHIVO_CONTENIDO, FLAG_ESTADO: '1', UPD_USUARIO: idUsuarioLogin, });
        }
        let ruta_imagenes = '';
        for (var i = 0; i < estacion.LISTA_IMAGEN.length; i++) {
            ruta_imagenes += `<a class="example-image-link" href="${baseUrl}${estacion.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrl}${estacion.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
        }
        $('#marco-imagenes').html(ruta_imagenes);
        $('.imagen-estacion').removeClass('d-none');
    }

}

var fileDocChange = (e) => {
    let elFile = $(e.currentTarget);
    let id = `${elFile[0].id}`.replace('fle', 'txt');;
    var fileContent = e.currentTarget.files[0];
    let verificar;

    switch (fileContent.name.substring(fileContent.name.lastIndexOf('.') + 1).toLowerCase()) {
        //case 'pdf': case 'jpg': case 'jpeg': case 'png': case 'doc': case 'docx': case 'xls': case 'xlsx': case 'xlsm': break;
        case 'pdf': case 'docx': case 'doc': break;
        default: $(elFile).parent().parent().parent().parent().alertWarning({ type: 'warning', title: 'ADVERTENCIA', message: `El archivo tiene una extensión no permitida` }); return false; break;
    }

    if (fileContent.size > 4194304) { $(elFile).parent().parent().parent().parent().alertWarning({ type: 'warning', title: 'ADVERTENCIA', message: `El archivo debe tener un peso máximo de 4MB` }); return false; }
    else
        $(elFile).parent().parent().parent().parent().alert('remove');

    if (e.currentTarget.files.length == 0) {
        $(e.currentTarget).removeData('file');
        $(e.currentTarget).removeData('fileContent');
        return;
    }

    $(`#${id}`).val(fileContent.name);

    let reader = new FileReader();
    reader.onload = function (e) {
        let base64 = e.currentTarget.result.split(',')[1];
        elFile.data('file', base64);
        elFile.data('fileContent', e.currentTarget.result);
        let content = `<label class="estilo-01">&nbsp;</label><div class ="alert alert-success p-1 d-flex w-100"><div class ="mr-auto"><i class ="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${fileContent.name}</span></div><div class ="ml-auto"><a class ="text-sres-verde" href="${e.currentTarget.result}" download="${fileContent.name}"><i class ="fas fa-download px-2 py-1"></i></a><a class ="text-sres-verde btnEliminarFile" data-id="${id.replace('txt','del')}" href="#"><i class ="fas fa-trash px-2 py-1"></i></a></div></div>`
        $(`#${id.replace('txt','view')}`).html(content);
        $(`#${id.replace('txt', 'view')} .btnEliminarFile`).on('click', btnEliminarFileClick);
    }
    reader.readAsDataURL(e.currentTarget.files[0]);
}

var btnEliminarFileClick = (e) => {
    e.preventDefault();
    let v = $(e.currentTarget).attr('data-id');
    if (v == 1) {
        $('#txt-protocolo').val('');
        $('#fle-protocolo').val('');
        $('#fle-protocolo').removeData('file');
        $('#fle-protocolo').removeData('fileContent');
        $(e.currentTarget).closest('.align-items-end').html(`<label class="estilo-01">&nbsp;</label><div class="alert alert-secondary p-1 d-flex w-100"><div class="mr-lg-auto"><i class="fas fa-exclamation-circle px-2 py-1"></i><span class="estilo-01">Aún no ha subido el documento requerido</span></div></div>`);
    } else if (v == 2) {
        $('#txt-certificado').val('');
        $('#fle-certificado').val('');
        $('#fle-certificado').removeData('file');
        $('#fle-certificado').removeData('fileContent');
        $(e.currentTarget).closest('.align-items-end').html(`<label class="estilo-01">&nbsp;</label><div class="alert alert-secondary p-1 d-flex w-100"><div class="mr-lg-auto"><i class="fas fa-exclamation-circle px-2 py-1"></i><span class="estilo-01">Aún no ha subido el documento requerido</span></div></div>`);
    }
}

var fileImagen = (e) => {
    storedFiles = [];
    rutas = "";    
    let obj_file = $(`#${e.target.id}`);
    $(obj_file).parent().alert('remove');    
    let files = e.target.files; // FileList object
    let cantidad = files.length;
    if (cantidad > 5) {
        obj_file.val("");
        storedFiles = [];
        $('#cantidad-foto').html(0);
        $('#txt-foto').val('Subir imagenes');
        $(obj_file).parent().alertWarning({ type: 'warning', title: 'ADVERTENCIA', message: `Solo está permitido subir 5 fotos` });
        return false;
    }
    //var extension = "fa-file-word";
    for (var i = 0, f; f = files[i]; i++) {
        if (f.size > 4194304) {
            obj_file.val("");
            storedFiles = [];
            $('#cantidad-foto').html(0);
            $('#txt-foto').val('Subir imagenes');
            $(obj_file).parent().alertWarning({ type: 'warning', title: 'ADVERTENCIA', message: `Las fotos deben tener un peso menor a 4 MB` });
            return false;
        }

        switch (f.name.substring(f.name.lastIndexOf('.') + 1).toLowerCase()) {
            case 'jpg': case 'jpeg': case 'png':
                break;
            default:
                obj_file.val('');
                storedFiles = [];
                $('#cantidad-foto').html(0);
                $('#txt-foto').val('Subir imagenes');
                $(obj_file).parent().alertWarning({ type: 'warning', title: 'ADVERTENCIA', message: `formato de archivo no válido` });
                return false;
                break;
        }

        let name = e.currentTarget.files[i].name;
        let reader = new FileReader();
        reader.onload = function (e) {
            let base64 = e.currentTarget.result.split(',')[1];
            storedFiles.push({ ID_DOCUMENTO: storedFiles.length + 1, ARCHIVO_BASE: name, ARCHIVO_CONTENIDO: base64, FLAG_ESTADO: '1', UPD_USUARIO: idUsuarioLogin, });
            rutas += `<a class="example-image-link" href="${e.target.result}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${e.target.result}" alt="" /></a>`;
            $('#marco-imagenes').html(rutas);
        }
        reader.readAsDataURL(e.currentTarget.files[i]);
    }
    $('#cantidad-foto').html(cantidad);
    $('#txt-foto').val(cantidad == 1 ? 'Imagen cargada' : cantidad > 1 ? 'Imagenes cargadas' : 'Subir imagenes');
    cantidad > 0 ? $('.imagen-estacion').removeClass('d-none') : $('.imagen-estacion').addClass('d-none');
}

//end points
var guardar = () => {
    $('.alert-add').html('');

    let arrEmpresa = [];
    let arrDoc = [];
    let ruc = $('#txt-ruc').val();
    let razon_social = $('#txt-razon-social').val();
    let correo = $('#txt-correo').val();
    let telefono = $('#txt-telefono').val();
    let direccion = $('#txt-direccion').val();

    let message = [];
    if (storedFiles.length == 0) message.push("Debe subir al menos una imagen de la estación de carga");
    if ($('#fle-protocolo').data('file') == undefined) message.push("Debe subir cumplimiento de protocolo");
    if ($('#fle-certificado').data('file') == undefined) message.push("Debe subir el certificado de fabricante");

    if (message.length > 0) {
        $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: message.join("<br>") });
        return;
    }

    arrEmpresa = {
        ID_INSTITUCION: idinstitucion == 0 ? -1 : idinstitucion,
        RUC: ruc,
        RAZON_SOCIAL: razon_social,
        CORREO: correo,
        TELEFONO: telefono,
        DIRECCION: direccion,
        UPD_USUARIO: idUsuarioLogin,
    };

    let descripcion = $('#txt-descripcion').val();
    let modelo = $('#txt-modelo').val();
    let marca = $('#txt-marca').val();
    let potencia = $('#txt-potencia').val();
    let modo_carga = $('#txt-modo-carga').val();
    let tipo_cargador = $('#txt-tipo-cargador').val();
    let tipo_conector = $('#txt-tipo-conector').val();
    let cantidad = $('#txt-cantidad-conector').val();
    let hora_desde = $('#txt-hora-desde').val();
    let hora_hasta = $('#txt-hora-hasta').val();
    let tarifa = $('#txt-tarifa').val();

    arrDoc.push({ ID_DOCUMENTO: 1, ARCHIVO_BASE: $('#txt-protocolo').val(), ARCHIVO_CONTENIDO: $('#fle-protocolo').data('file') });
    arrDoc.push({ ID_DOCUMENTO: 2, ARCHIVO_BASE: $('#txt-certificado').val(), ARCHIVO_CONTENIDO: $('#fle-certificado').data('file') });
    
    let url = `${baseUrl}api/estacioncarga/guardarestacion`;
    let data = { ID_ESTACION: idestacion == 0 ? -1 : idestacion, INSTITUCION: arrEmpresa, DESCRIPCION: descripcion, MODELO: modelo, MARCA: marca, POTENCIA: potencia, MODO_CARGA: modo_carga, 
                 TIPO_CARGADOR: tipo_cargador, TIPO_CONECTOR: tipo_conector, CANTIDAD_CONECTOR: cantidad, HORA_DESDE: hora_desde, HORA_HASTA: hora_hasta, TARIFA_SERVICIO: tarifa,
                 ID_USUARIO: idUsuarioLogin, ID_ESTADO: 1, LISTA_IMAGEN: storedFiles, LISTA_DOC: arrDoc, UPD_USUARIO: idUsuarioLogin,
    };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        if (j != null) {
            j ? $('#btnGuardar').parent().hide() : '';
            j ? $('.alert-add').html('').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Se guardó su estación de carga exitosamente.', close: { time: 4000 }, url: '' }) : $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
            if (j && idinstitucion <= 0) actualizarDatosSesion();
        }
    });
}

var actualizarDatosSesion = () => 
{
    let url = `${baseUrl}api/usuario/obtenerusuario?idUsuario=${idUsuarioLogin}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

    fetch(url, init)
    .then(response => {
        if (response.status == 200) return response.json();
        else return 0;
    })
    .then(ActualizarSesion)
    .catch(error => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
        return 0;
    });
}

var ActualizarSesion = (data) => {
    if (data == 0 || data == null) { Console.log("Ocurrió un error al traer los datos para actualizar la sesión"); }
    else cargarSesion(data);
}

var cargarSesion = (d) => {
    let data = { ID_USUARIO: d.ID_USUARIO, NOMBRES: d.NOMBRES, ID_ROL: d.ID_ROL, NOMBRE_ROL: d.NOMBRE_ROL, ID_INSTITUCION: d.ID_INSTITUCION, PROPIETARIO: d.PROPIETARIO, ROL: {ID_ROL: d.ID_ROL, NOMBRE: d.NOMBRE_ROL}, TOKEN: token};

    let url = `${baseUrl}Login/Validar`;
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };

    fetch(url, init)
    .then(r => r.json())
    .then(validarredireccionar)
}

var validarredireccionar = (data) => {
    if (data.success)
        setTimeout(redireccionar, 3000);        
    else
        mostrarMensajeError("Ocurrió un problema");
}

var redireccionar = () => {
    location.href = `${baseUrl}Electromovilidad`;
}

