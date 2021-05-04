var storedFiles = [];
var rutas = "";
var marker;
var arrTempUbicacion = [], arrUbicacion = [];
var mapboxgl, map;
var docprotocolo = "", doccertificado = "";
var geocoder
//var currentMarkers=[];
$(document).ready(() => {
    $('#btnGuardar').on('click', (e) => guardar());
    $('#fle-protocolo').on('change', fileDocChange);
    $('#fle-certificado').on('change', fileDocChange);
    $('#file-foto').on('change', fileImagen);
    $('#btnUbicacion').on('click', abrirUbicacion);
    $('#btnGuardarU').on('click', guardarUbicacion);
    $('#btnCerrarU').on('click', cerrarUbicacion);
    //mapa();
    //inicio();
    cargarComponentes()
});

//3 end point prioridad 
var cargarComponentes = () => {
    let urlConsultarPotencia = `${baseUrl}api/potencia/obtenerallpotencia`; 
    let urlConsultarTipoConector = `${baseUrl}api/tipoconector/obteneralltipoconector`;
    let urlConsultarModoCargar = `${baseUrl}api/modocarga/obtenerallmodocarga`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}};

    Promise.all([
        fetch(urlConsultarPotencia, init),
        fetch(urlConsultarTipoConector, init),
        fetch(urlConsultarModoCargar, init),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarListas);
}

var cargarListas = ([listaPotencia, listaTipoConector, listaModoCarga]) => {
    let option = '<option value="0">seleccione</option>';
    let opcionesp = listaPotencia.length == 0 ? '' : listaPotencia.map(x => `<option value="${x.ID_POTENCIA}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-potencia`).html(`${option}${opcionesp}`);

    let opcionestc = listaTipoConector.length == 0 ? '' : listaTipoConector.map(x => `<option value="${x.ID_TIPO_CONECTOR}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-tipo-conector`).html(`${option}${opcionestc}`);

    let opcionesmc = listaModoCarga.length == 0 ? '' : listaModoCarga.map(x => `<option value="${x.ID_MODO_CARGA}">${x.NOMBRE}</option>`).join('');
    $(`#cbo-modo-carga`).html(`${option}${opcionesmc}`);

    inicio();
}

var inicio = () => {
    if (idinstitucion == 0) $('#seccion-empresa').removeClass('d-none');
    else $('#seccion-empresa').addClass('d-none');
    if (idestacion == 0) { mapa(-77.03101439999999, -12.016025599999999); return;}
    cargarEstacion(idestacion);
}

var cargarEstacion = (id) => {

    //prioridad 15
    //let urlConsultarEstacion = `${baseUrl}api/estacioncarga/obtenerestacion?idestacion=${id}`;
    let urlConsultarEstacion = `${baseUrlApi}api/estacioncarga/obtenerestacion?idestacion=${id}`;
    let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };
    Promise.all([
        fetch(urlConsultarEstacion, init),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarDatos);
}

var cargarDatos = ([estacion]) => {
    if (estacion == null) return;
    if (estacion.ID_ESTACION == 0) return;
    mapa(estacion.LONGITUD, estacion.LATITUD);
    $('#txt-direccion-estacion').val(estacion.DIRECCION);
    $('#txt-descripcion').val(estacion.DESCRIPCION);
    $('#txt-modelo').val(estacion.MODELO);
    $('#txt-marca').val(estacion.MARCA);
    $('#txt-descripcion').val(estacion.DESCRIPCION);
    $('#cantidad-foto').html(estacion.CANTIDAD_IMAGEN);
    $('#txt-potencia').val(formatoMilesDecimales(estacion.POTENCIA));
    $('#txt-modo-carga').val(estacion.MODO_CARGA);
    $('#txt-tipo-cargador').val(estacion.TIPO_CARGADOR);
    $('#txt-tipo-conector').val(estacion.TIPO_CONECTOR);
    $('#txt-cantidad-conector').val(formatoMilesEnteros(estacion.CANTIDAD_CONECTOR));
    $('#txt-hora-desde').val(estacion.HORA_DESDE);
    $('#txt-hora-hasta').val(estacion.HORA_HASTA);
    $('#txt-tarifa').val(formatoMilesDecimales(estacion.TARIFA_SERVICIO));

    if (estacion.LISTA_DOC != null){
        for (var i = 0; i < estacion.LISTA_DOC.length; i++) {
            if (estacion.LISTA_DOC[i].ID_DOCUMENTO == 1) {
                let nombreFileDoc = `<i class="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${estacion.LISTA_DOC[i].ARCHIVO_BASE}</span>`;
                //let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`; //end points
                //let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrlApi}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`; //end points
                let btnDescargaFileDoc = `<a class="text-sres-verde" href="javascript:void(0)" onClick="mostrarDocumento(1)"><i class="fas fa-download px-2 py-1"></i></a>`; //end points
                docprotocolo = `${baseUrlApi}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}`;
                let btnEliminarFileDoc = `<a class="text-sres-verde btnEliminarFile" href="#" data-id="${estacion.LISTA_DOC[i].ID_DOCUMENTO}"><i class="fas fa-trash px-2 py-1"></i></a>`;
                contenidoFileDoc = `<div class="alert alert-success p-1 d-flex w-100"><div class="mr-auto">${nombreFileDoc}</div><div class="ml-auto">${btnDescargaFileDoc}${btnEliminarFileDoc}</div></div>`;
                $('#view-protocolo').html(`<label class="estilo-01">&nbsp;</label>${contenidoFileDoc}`);
                $('#txt-protocolo').val(estacion.LISTA_DOC[i].ARCHIVO_BASE);
                $('#fle-protocolo').data('file', estacion.LISTA_DOC[i].ARCHIVO_CONTENIDO);
                $('#view-protocolo .btnEliminarFile').on('click', btnEliminarFileClick);
            }
            //prioridad 16  "/api/estacioncarga/obtenerdocumento?ruta=D:\ESCRITORIO\...." 
            if (estacion.LISTA_DOC[i].ID_DOCUMENTO == 2) {
                let nombreFileDoc = `<i class="fas fa-check-circle px-2 py-1"></i><span class="estilo-01">${estacion.LISTA_DOC[i].ARCHIVO_BASE}</span>`;
                //let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrl}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`;
                //let btnDescargaFileDoc = `<a class="text-sres-verde" href="${baseUrlApi}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}"><i class="fas fa-download px-2 py-1"></i></a>`;
                let btnDescargaFileDoc = `<a class="text-sres-verde" href="javascript:void(0)" onClick="mostrarDocumento(2)"><i class="fas fa-download px-2 py-1"></i></a>`;
                doccertificado = `${baseUrlApi}api/estacioncarga/obtenerdocumento?ruta=${estacion.LISTA_DOC[i].RUTA}`;
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
            //ruta_imagenes += `<a class="example-image-link" href="${baseUrl}${estacion.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrl}${estacion.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
            ruta_imagenes += `<a class="example-image-link" href="${baseUrlApi}${estacion.LISTA_IMAGEN[i].RUTA}" data-lightbox="example-set" data-title=""><img class="example-image img-fluid" width="20%" height="30%" src="${baseUrlApi}${estacion.LISTA_IMAGEN[i].RUTA}" alt="" /></a>`;
        }
        $('#marco-imagenes').html(ruta_imagenes);
        $('.imagen-estacion').removeClass('d-none');
    }

    arrUbicacion.push(estacion.LONGITUD);
    arrUbicacion.push(estacion.LATITUD);
    $('#situar-estacion').html('Listo&nbsp;<i class="fas fa-check-circle"></i>').removeClass('text-danger').addClass('text-success')
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
    if ($('#txt-direccion-estacion').val().trim() == "") message.push("Debe ingresar la dirección de la estación de carga");
    if (arrUbicacion.length == 0) message.push("No ha seleccionado la ubicacion para la estación de carga");
    if ($('#txt-descripcion').val().trim() == "") message.push("Debe ingresar una descripción");
    if ($('#txt-modelo').val().trim() == "") message.push("Debe ingresar el modelo");
    if ($('#txt-marca').val().trim() == "") message.push("Debe ingresar la marca");
    //if ($('#txt-potencia').val().trim() == "") message.push("Debe ingresar la potencia");
    //if ($('#txt-modo-carga').val().trim() == "") message.push("Debe ingresar el modo de carga");
    if ($('#cbo-potencia').val() == 0) message.push("Debe seleccionar una potencia");
    if ($('#cbo-modo-carga').val() == 0) message.push("Debe seleccionar un modo de carga");
    if ($('#txt-tipo-cargador').val().trim() == "") message.push("Debe ingresar el tipo de cargador");
    //if ($('#txt-tipo-conector').val().trim() == "") message.push("Debe ingresar el tipo de conector");
    if ($('#cbo-tipo-conector').val() == 0) message.push("Debe seleccionar un tipo de conector");
    if ($('#cbo-cable').val() == 0) message.push("Debe indicar si posee cable o no");
    if ($('#txt-cantidad-conector').val().trim() == "") message.push("Debe ingresar la cantidad de conectores");
    if ($('#txt-hora-desde').val().trim() == "") message.push("Debe ingresar la hora desde la apertura de la estación de carga");
    if ($('#txt-hora-hasta').val().trim() == "") message.push("Debe ingresar la hora hasta el cierre de la estación de carga");
    if ($('#txt-tarifa').val().trim() == "") message.push("Debe ingresar la tarifa");

    if (storedFiles.length == 0) message.push("Debe subir al menos una imagen de la estación de carga");
    if ($('#fle-protocolo').data('file') == undefined) message.push("Debe subir cumplimiento de protocolo");
    if ($('#fle-certificado').data('file') == undefined) message.push("Debe subir el certificado de fabricante");

    if (message.length > 0) {
        $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: message.join("<br>") });
        return;
    }

    arrEmpresa = {
        //ID_INSTITUCION: idinstitucion == 2, //solo de prueba el idinstitucion solo es un numero de prueba
        ID_INSTITUCION: idinstitucion == 0 ? -1 : idinstitucion, //verdadero
        RUC: ruc,
        RAZON_SOCIAL: razon_social,
        CORREO: correo,
        TELEFONO: telefono,
        DIRECCION: direccion,
        UPD_USUARIO: idUsuarioLogin,
    };

    let direccion_estacion = $('#txt-direccion-estacion').val();
    let descripcion = $('#txt-descripcion').val();
    let modelo = $('#txt-modelo').val();
    let marca = $('#txt-marca').val();
    //let potencia = $('#txt-potencia').val();
    //let modo_carga = $('#txt-modo-carga').val();
    let potencia = $('#cbo-potencia').val();
    let modo_carga = $('#cbo-modo-carga').val();
    let tipo_cargador = $('#txt-tipo-cargador').val();
    //let tipo_conector = $('#txt-tipo-conector').val();
    let tipo_conector = $('#cbo-tipo-conector').val();
    let cable = $('#cbo-cable').val()
    let cantidad = $('#txt-cantidad-conector').val();
    let hora_desde = $('#txt-hora-desde').val();
    let hora_hasta = $('#txt-hora-hasta').val();
    let tarifa = $('#txt-tarifa').val();

    arrDoc.push({ ID_DOCUMENTO: 1, ARCHIVO_BASE: $('#txt-protocolo').val(), ARCHIVO_CONTENIDO: $('#fle-protocolo').data('file') });
    arrDoc.push({ ID_DOCUMENTO: 2, ARCHIVO_BASE: $('#txt-certificado').val(), ARCHIVO_CONTENIDO: $('#fle-certificado').data('file') });
    //prioridad 14
    //let url = `${baseUrl}api/estacioncarga/guardarestacion`;
    let url = `${baseUrlApi}api/estacioncarga/guardarestacion`;
    let data = { ID_ESTACION: idestacion == 0 ? -1 : idestacion, INSTITUCION: arrEmpresa, LONGITUD: arrUbicacion[0], LATITUD: arrUbicacion[1], DIRECCION: direccion_estacion, DESCRIPCION: descripcion, MODELO: modelo, MARCA: marca, 
                //POTENCIA: potencia, MODO_CARGA: modo_carga,
                TIPO_CARGADOR: tipo_cargador,
                //TIPO_CONECTOR: tipo_conector, 
                ID_POTENCIA: potencia, ID_TIPO_CONECTOR: tipo_conector, ID_MODO_CARGA: modo_carga,
                CABLE: cable,
                CANTIDAD_CONECTOR: cantidad, HORA_DESDE: hora_desde, HORA_HASTA: hora_hasta, TARIFA_SERVICIO: tarifa,
                ID_USUARIO: idUsuarioLogin, ID_ESTADO: 1, LISTA_IMAGEN: storedFiles, LISTA_DOC: arrDoc, UPD_USUARIO: idUsuarioLogin,
    };
    //console.log(data);
    //console.log(JSON.stringify(data));
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify(data) };

    //console.log(init);

    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        if (j != null) {
            j == true ? $('#btnGuardar').parent().hide() : '';
            j == true ? $('.alert-add').html('').alertSuccess({ type: 'success', title: 'BIEN HECHO', message: 'Se guardó su estación de carga exitosamente.', close: { time: 4000 }, url: '' }) : $('.alert-add').alertError({ type: 'danger', title: 'ERROR', message: 'Inténtelo nuevamente por favor.' });
            if (j == true && idinstitucion <= 0) actualizarDatosSesion();
            else if (j == true) setTimeout(redireccionar, 3000);
        }
    });
}

var actualizarDatosSesion = () => 
{
    //let url = `${baseUrl}api/usuario/obtenerusuario?idUsuario=${idUsuarioLogin}`;
    let url = `${baseUrlApi}api/usuario/GetByFilter?idUsuario=${idUsuarioLogin}`;
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
    debugger;
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

var mapa = (lng, lat) => {
    mapboxgl.accessToken = 'pk.eyJ1Ijoia3phcmtsb3oiLCJhIjoiY2tsaDRoenNjMjRjcDJ2cXR4a2FrOHFtMSJ9.IubP7nyb7i-2Rvoyg_bLlA';
    //var map = new mapboxgl.Map({
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 7
    });

    var nav = new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true
    });

    geocoder = new MapboxGeocoder({
        // Initialize the geocoder
        accessToken: mapboxgl.accessToken, // Set the access token
        mapboxgl: mapboxgl, // Set the mapbox-gl instance
        marker: false, // Do not use the default marker style
        placeholder: 'Buscar lugares cercanos', // Placeholder text for the search bar
        bbox: [-81.33531256420639, -18.35532317840149, -68.64771000999576, -0.03322135965653], // Boundary for Berkeley
        proximity: {
            longitude: -77.04013282606473,
            latitude: -12.0613481350845
        } // Coordinates of UC Berkeley
    });

    // Add the geocoder to the map
    map.addControl(geocoder);

    console.log(geocoder);

    map.addControl(nav);

    map.addControl(new mapboxgl.FullscreenControl());
    //map.addControl(new mapboxgl.GeolocateControl({
    //    positionOptions: {
    //        enableHighAccuracy: true
    //    },
    //    trackUserLocation: true
    //}));

    const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    })
    map.addControl(geolocate)

    //map.on('mousemove', function (e) {
    //    document.getElementById('coordenadas').innerHTML = JSON.stringify(e.lngLat);
    //});

    $('.mapboxgl-ctrl-bottom-right').addClass('d-none');
    $('.mapboxgl-ctrl-bottom-left').addClass('d-none');

    var nuevoCSS = { "width": '1500px' };
    $('.mapboxgl-ctrl-top-right').css(nuevoCSS);
    $('.mapboxgl-ctrl-geocoder--input').addClass('text-right')

    map.on('click', function (e) {
        arrTempUbicacion = [];
        if (marker != undefined) eliminarMarker();
        let coord = JSON.stringify(e.lngLat);
        coord = JSON.parse(coord);
        agregarMarker(coord.lng, coord.lat);
        arrTempUbicacion.push(coord.lng);
        arrTempUbicacion.push(coord.lat);
    });       

    //geolocate.on('geolocate', function()
    //{

    //    //Get the updated user location, this returns a javascript object.
    //    var userlocation = geolocate._lastKnownPosition;

    //    //Your work here - Get coordinates like so
    //    var lat = userlocation.coords.latitude;
    //    var lng = userlocation.coords.longitude;

    //    console.log(geocoder);

    //});

    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on('load', function () {
        map.addSource('single-point', {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        });
 
        map.addLayer({
            'id': 'point',
            'source': 'single-point',
            'type': 'circle',
            'paint': {
                'circle-radius': 10,
                'circle-color': '#448ee4'
            }
        });
 
        // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
        //  Add a marker at the result's coordinates
        geocoder.on('result', function (e) {
            map.getSource('single-point').setData(e.result.geometry);
        });
    });

    //setTimeout(function() {
    //    $(".mapboxgl-ctrl-geolocate").click();
    //},2000);
}

var agregarMarker = (lng, lat) => {
    marker = new mapboxgl.Marker({
        color: "#FF5733",
        draggable: true
    }).setLngLat([lng, lat]).addTo(map);   

    //currentMarkers.push(marker);
    
    //marker.on('dragstart', function (e) {
    //    //marker.remove();
    //    if (currentMarkers!==null) {
    //        for (var i = currentMarkers.length - 1; i >= 0; i--) {
    //            currentMarkers[i].remove();
    //        }
    //    }
    //}); 

    //marker.on('dragend', function (e) {
    //    arrTempUbicacion = [];
    //    if (marker != undefined) eliminarMarker();
    //    var lngLat = marker.getLngLat();
    //    agregarMarker(lngLat.lng, lngLat.lat);
    //    arrTempUbicacion.push(lngLat.lng);
    //    arrTempUbicacion.push(lngLat.lat);
    //});  
}

//eliminar marker
var eliminarMarker = () => {
    marker.remove();
}

var abrirUbicacion = () => {
    if (arrUbicacion.length > 0) {
        arrTempUbicacion = arrUbicacion;
        agregarMarker(arrUbicacion[0], arrUbicacion[1]);
    }    
    $("#modal-ubicacion").modal("show");
}

var guardarUbicacion = () => {    
    if (arrTempUbicacion.length > 0) {
        //arrUbicacion = arrTempUbicacion;
        arrUbicacion = [];
        arrUbicacion.push(marker._lngLat.lng);
        arrUbicacion.push(marker._lngLat.lat);
        $('#situar-estacion').html('Listo&nbsp;<i class="fas fa-check-circle"></i>').removeClass('text-danger').addClass('text-success')
        $('#modal-ubicacion').modal("hide");
    } else {
        alert("No ha seleccionado ninguna ubicación");
    }
}

var cerrarUbicacion = () => {    
    $('#modal-ubicacion').modal("hide");
}

$("#modal-ubicacion").on("hidden.bs.modal", function () {
    if (arrTempUbicacion.length > 0) {
        arrTempUbicacion = [];
        marker.remove();
    }
});

var mostrarDocumento = (opc) => {
    let url = "";
    if (opc == 1) url = docprotocolo
    else url = doccertificado

    let init = { method: 'GET', headers: { 'Content-Type':'text/html', 'Authorization': `Bearer ${token}`}};
    fetch(url, init)
    .then((r) => r.blob())
    .then(j => {
        //console.log(j);
        let urlBlob = window.URL.createObjectURL(j);
        window.open(urlBlob, '_blank');
    })
    .finally(() => {

    });
}