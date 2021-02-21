
$(document).ready(() => {
    $('#btnGuardar').on('click', (e) => guardar());
    $('#fle-protocolo').on('change', fileDocChange);
    $('#fle-certificado').on('change', fileDocChange);
    $('#file-foto').on('change', fileImagen);
});

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
        //$(e.currentTarget).removeData('type');
        return;
    }

    //var idElement = $(e.currentTarget).attr("data-id");
    $(`#${id}`).val(fileContent.name);

    let reader = new FileReader();
    reader.onload = function (e) {
        let base64 = e.currentTarget.result.split(',')[1];
        elFile.data('file', base64);
        elFile.data('fileContent', e.currentTarget.result);
        //elFile.data('type', fileContent.type);
        let content = `<label class="estilo-01">&nbsp;</label><div class ="alert alert-success p-1 d-flex w-100"><div class ="mr-auto"><i class ="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${fileContent.name}</span></div><div class ="ml-auto"><a class ="text-sres-verde" href="${e.currentTarget.result}" download="${fileContent.name}"><i class ="fas fa-download px-2 py-1"></i></a><a class ="text-sres-verde btnEliminarFile" data-id="${id.replace('txt','del')}" href="#"><i class ="fas fa-trash px-2 py-1"></i></a></div></div>`
        $(`#${id.replace('txt','view')}`).html(content);
        $(`#${id.replace('txt', 'view')} .btnEliminarFile`).on('click', btnEliminarFileClick);
    }
    reader.readAsDataURL(e.currentTarget.files[0]);
}

var btnEliminarFileClick = () => {
}

var storedFiles = [];
var fileImagen = (e) => {
    storedFiles = [];
    let obj_file = $(`#${e.target.id}`);
    $(obj_file).parent().alert('remove');    
    let files = e.target.files; // FileList object
    let cantidad = files.length;
    if (cantidad > 5) {
        obj_file.val("");
        storedFiles = [];
        $('#cantidad-foto').html(0);
        $(obj_file).parent().alertWarning({ type: 'warning', title: 'ADVERTENCIA', message: `Solo está permitido subir 5 fotos` });
        return false;
    }
    //var extension = "fa-file-word";
    for (var i = 0, f; f = files[i]; i++) {
        if (f.size > 4194304) {
            obj_file.val("");
            storedFiles = [];
            $('#cantidad-foto').html(0);
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
                $(obj_file).parent().alertWarning({ type: 'warning', title: 'ADVERTENCIA', message: `formato de archivo no válido` });
                return false;
                break;
        }

        let name = e.currentTarget.files[i].name;
        let reader = new FileReader();
        reader.onload = function (e) {
            let base64 = e.currentTarget.result.split(',')[1];
            storedFiles.push({ ID_DOCUMENTO: storedFiles.length + 1, ARCHIVO_BASE: name, ARCHIVO_CONTENIDO: base64, FLAG_ESTADO: '1', UPD_USUARIO: idUsuarioLogin, });
        }
        reader.readAsDataURL(e.currentTarget.files[i]);
    }
    $('#cantidad-foto').html(cantidad);
}

var guardar = () => {
    let arrEmpresa = [];
    let arrDoc = [];
    let ruc = $('#txt-ruc').val();
    let razon_social = $('#txt-razon-social').val();
    let correo = $('#txt-correo').val();
    let telefono = $('#txt-telefono').val();
    let direccion = $('#txt-direccion').val();

    arrEmpresa = {
        ID_INSTITUCION: -1,
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
    let data = { ID_ESTACION: -1, INSTITUCION: arrEmpresa, DESCRIPCION: descripcion, MODELO: modelo, MARCA: marca, POTENCIA: potencia, MODO_CARGA: modo_carga, 
                 TIPO_CARGADOR: tipo_cargador, TIPO_CONECTOR: tipo_conector, CANTIDAD_CONECTOR: cantidad, HORA_DESDE: hora_desde, HORA_HASTA: hora_hasta, TARIFA_SERVICIO: tarifa,
                 ID_USUARIO: idUsuarioLogin, ID_ESTADO: 1, LISTA_IMAGEN: storedFiles, LISTA_DOC: arrDoc, UPD_USUARIO: idUsuarioLogin,
    };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        if (j != null) {
            j ? $('#btnGuardar').parent().hide() : '';
            j ? $('.alert-add').html('').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Se registró su estación de carga exitosamente.', close: { time: 4000 }, url: `${baseUrl}Electromovilidad/menu-estacion-carga` }) : $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
        }
    });
}