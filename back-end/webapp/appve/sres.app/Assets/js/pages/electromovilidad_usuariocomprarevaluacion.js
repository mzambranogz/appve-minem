
$(document).ready(() => {
    $('#btnComienza').on('click', (e) => verificarConvencional());
    cargarComponentes();
});

var cargarComponentes = () => {
    let urlConsultarTipoVehiculoConvencional = `${baseUrl}api/tipovehiculoconvencional/obteneralltipovehiculoconvencional`;
    let urlConsultarTipoCombustible = `${baseUrl}api/tipocombustible/obteneralltipocombustible`;
    Promise.all([
        fetch(urlConsultarTipoVehiculoConvencional),
        fetch(urlConsultarTipoCombustible),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarListas);
}

var cargarListas = ([listaTipoVehiculoConvencional, listaTipoCombustible]) => {
    let option = '<option value="0">seleccione</option>';
    let opcionestt = listaTipoVehiculoConvencional.length == 0 ? '' : listaTipoVehiculoConvencional.map(x => `<option value="${x.ID_TIPO_VEHICULO_CONV}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-transporte-convencional`).html(`${option}${opcionestt}`);

    let opcionestc = listaTipoCombustible.length == 0 ? '' : listaTipoCombustible.map(x => `<option value="${x.ID_TIPO_COMBUSTIBLE}">${x.NOMBRE}</option>`).join('');
    $(`#tipo-combustible-1`).html(`${option}${opcionestc}`);
    $(`#tipo-combustible-2`).html(`${option}${opcionestc}`);
}

var verificarConvencional = () => {    
    let tipotransporte = $('#tipo-transporte-convencional').val();
    let mascomb = $('#rad-si').prop('checked') ? 1 : $('#rad-no').prop('checked') ? 2 : 0;
    let meses = $('#meses-transporte-convencional').val();
    let financiamiento = $('#rad-si-financiamiento-conv').prop('checked') ? 1 : $('#rad-no-financiamiento-conv').prop('checked') ? 2 : 0;

    let message = [];
    if (tipotransporte == 0) message.push("Debe seleccionar un tipo de transporte convencional");
    if (mascomb == 0) message.push("Debe seleccionar si/no usa más de un tipo de combustible");
    if (meses == 0) message.push("Debe seleccionar los meses al año que utiliza el transporte");
    if (financiamiento == 0) message.push("Debe seleccionar si/no comprar con financiamiento");

    $('#mensaje-inicio').html('');
    if (message.length > 0) {
        $('#mensaje-inicio').alertError({ type: 'danger', title: 'Error', message: message.join("<br>") });
        return;
    }
    limpiarconvencional();
    let validarcomb = $('#rad-si').prop('checked') ? true : false;
    let validarfinanciamiento = $('#rad-si-financiamiento-conv').prop('checked') ? true : false;
    if (!validarcomb){
        $('#tipo-combustible-1').parent().find('label').html('Tipo de combustible usado a bordo');
        $('#gatos-1').parent().find('label').html('Gasto promedio semanal combustible');
        $('#tipo-combustible-2').parent().addClass('d-none');
        $('#gatos-2').parent().addClass('d-none');
    } else{
        $('#tipo-combustible-1').parent().find('label').html('Tipo de combustible 1 usado a bordo');
        $('#gatos-1').parent().find('label').html('Gasto promedio semanal combustible 1');
        $('#tipo-combustible-2').parent().removeClass('d-none');
        $('#gatos-2').parent().removeClass('d-none');
    }
    if (validarfinanciamiento) $('#seccion-financiamiento-convencional').removeClass('d-none');
    else $('#seccion-financiamiento-convencional').addClass('d-none');
    $('#seccion-calculo-convencional').removeClass('d-none');
}

var limpiarconvencional = () => {
    $('#tipo-combustible-1').val(0);
    $('#tipo-combustible-2').val(0);
    $('#gatos-1').val('');
    $('#gatos-2').val('');
    $('#gasto-promedio').val('');
    $('#gasto-anual-seguro').val('');
    $('#kilometros-recorrido').val('');
    $('#costo-vehiculo').val('');
    $('#interes-financiamiento').val('');
    $('#anio-prestamo').val('');
    $('#porcentaje-cuota').val('');
}