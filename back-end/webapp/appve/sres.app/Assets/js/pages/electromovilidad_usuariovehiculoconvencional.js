
$(document).ready(() => {
    $('#btnComienza').on('click', (e) => verificarInicio());
    $('#btnCalcular').on('click', (e) => calcular());
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

var verificarInicio = () => {    
    let tipotransporte = $('#tipo-transporte-convencional').val();
    let mascomb = $('#rad-si').prop('checked') ? 1 : $('#rad-no').prop('checked') ? 2 : 0;
    let meses = $('#meses-transporte').val();

    let message = [];
    if (tipotransporte == 0) message.push("Debe seleccionar un tipo de transporte convencional");
    if (mascomb == 0) message.push("Debe seleccionar si/no usa más de un tipo de combustible");
    if (meses == 0) message.push("Debe seleccionar los meses al año que utiliza el transporte");

    $('#mensaje-inicio').html('');
    if (message.length > 0) {
        $('#mensaje-inicio').alertError({ type: 'danger', title: 'Error', message: message.join("<br>") });
        return;
    }
    limpiar();
    let validarcomb = $('#rad-si').prop('checked') ? true : false;
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
    $('#seccion-calculo').removeClass('d-none');
}

var limpiar = () => {
    $('#tipo-combustible-1').val(0);
    $('#tipo-combustible-2').val(0);
    $('#gatos-1').val('');
    $('#gatos-2').val('');
    $('#gasto-promedio').val('');
    $('#gasto-anual-seguro').val('');
    $('#kilometros-recorrido').val('');
}

var calcular = () => {
    let listaParam = [];
    let validarcomb = $('#rad-si').prop('checked') ? true : false;
    if (validarcomb){

    } else{

    }
    $('[id*=grupo-]').each((x, y) => {
        let arr = [];
        let transporte = $(`#cbo-servicio-transporte-${x+1}`).val();
        let combustible = $(`#cbo-combustible-${x+1}`).val();
        let gastosemana = $(`#txt-gasto-semana-${x+1}`).val();
        let meses = $(`#meses-transporte-${x+1}`).val();
        let kilometros = $(`#txt-kilometros-${x+1}`).val();
        arr.push({ID_PARAMETRO: 1, VALOR: transporte, NOMBRE: $(`#cbo-servicio-transporte-${x+1} option:selected`).text()});
        arr.push({ID_PARAMETRO: 2, VALOR: combustible, NOMBRE: $(`#cbo-combustible-${x+1} option:selected`).text()});
        arr.push({ID_PARAMETRO: 3, VALOR: gastosemana});
        arr.push({ID_PARAMETRO: 4, VALOR: meses});
        arr.push({ID_PARAMETRO: 5, VALOR: kilometros});
        listaParam.push({PARAMETROS: arr});
    });

    let url = `${baseUrl}api/usuariotransportepublico/calcularusuariotransportepublico`;
    let data = { LISTA_PARAM: listaParam, ID_CASO: 1, USUARIO_GUARDAR: idUsuarioLogin };
    let init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data)};
    fetch(url, init)
    .then(r => r.json())
    .then(j => {
        if (j != null){  
            $.each(j.LISTA_PARAM, (x,y) => {  
                mostrarResultado(y.PARAMETROS, x+1);
            });   
        } 
    });
}