var cantidadtotal = 0, contadorcantidad = 0, listatransporte = '', listacombustible = '';
var poder_calorico,consumo_energetico,emisiones_anuales;
$(document).on('click','.acordeon', (e) => {
    let c = $('#' + $(e)[0].target.id).next().next();
    let v = c[0].className.indexOf('d-none');
    if (v == -1) c.addClass('d-none');
    else c.removeClass('d-none');
});

$(document).ready(() => {
    $('#btnComenzar').on('click', (e) => verificarCantidad());
    $('#btnSiguiente').on('click', (e) => verificarCantidadVehiculos());
    cargarComponentes();
});

var cargarComponentes = () => {
    let urlConsultarTipoTransporte = `${baseUrl}api/tipotransporte/obteneralltipotransporte`;
    let urlConsultarTipoCombustible = `${baseUrl}api/tipocombustible/obteneralltipocombustible`;
    Promise.all([
        fetch(urlConsultarTipoTransporte),
        fetch(urlConsultarTipoCombustible),
    ])
    .then(r => Promise.all(r.map(v => v.json())))
    .then(cargarListas);
}

var cargarListas = ([listaTipoTransporte, listaTipoCombustible]) => {
    listatransporte = listaTipoTransporte.length == 0 ? '' : listaTipoTransporte.map(x => `<option value="${x.ID_TIPO_TRANSPORTE}">${x.NOMBRE}</option>`).join('');
    listacombustible = listaTipoCombustible.length == 0 ? '' : listaTipoCombustible.map(x => `<option value="${x.ID_TIPO_COMBUSTIBLE}">${x.NOMBRE}</option>`).join('');
}

var cargar = () => {
    if (++contadorcantidad > cantidadtotal) return;
    let opcioncombustible = `<select id="cbo-combustible-${contadorcantidad}" class="form-control"><option value="0">seleccione</option>${listacombustible}</select>`;
    let opciontransporte = `<select id="cbo-servicio-transporte-${contadorcantidad}" class="form-control"><option value="0">seleccione</option>${listatransporte}</select>`;

    let titulo = `<h4 id="vehiculo-0${contadorcantidad}" class="acordeon">Vehículo 0${contadorcantidad}</h4><div class="dropdown-divider"></div>`;
    let seccionmensaje = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><div class="alert-add-${contadorcantidad}"></div></div></div>`;
    let rowtabla = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><table class="table table-sm" id="tablapublico-${contadorcantidad}"><thead><tr><th>Nombre de la ruta</th><th>Origen</th><th>Destino</th><th>Veces por semana</th><th>Km de la ruta</th><th>km total</th><th>Ver</th></tr></thead><tbody></tbody></table></div></div>`;
    let rowboton = `<div class="col-lg-2"><div class="form-group mt-2"><label class="estilo-01 text-sres-oscuro">&nbsp;</label><div class="input-group"><button class="btn btn-primary w-100" id="btnComenzar" data-toggle="modal" data-target="#modal-mapa">Agregar ruta</button></div></div></div>`;
    let rowkilometros = `<div class="col-sm-10 col-md-10 col-lg-10"><div class="form-group mt-2"><label class="estilo-01" for="txt-kilometros-${contadorcantidad}">Kilometros recorridos en una semana:</label><span class="text-danger font-weight-bold">&nbsp;(*)&nbsp;</span><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-comment-alt"></i></span></div><input class="form-control estilo-01 text-sres-gris" type="text" id="txt-kilometros-${contadorcantidad}" placeholder="Ingrese los kilómetros recorridos en una semana"></div></div></div>`;
    let rowkilometroboton = `<div class="row">${rowkilometros}${rowboton}</div>`;
    let listameses = `<select id="meses-transporte-${contadorcantidad}" class="form-control"><option value="0">seleccione</option><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option></select>`;
    let rowmeses = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><div class="form-group mt-2"><label class="estilo-01" for="txt-meses">Meses al año que usa este transporte:</label><span class="text-danger font-weight-bold">&nbsp;(*)&nbsp;</span><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-comment-alt"></i></span></div>${listameses}</div></div></div></div>`;
    let rowgastosemana = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><div class="form-group mt-2"><label class="estilo-01" for="txt-gasto-semana">Gasto promedio a la semana:</label><span class="text-danger font-weight-bold">&nbsp;(*)&nbsp;</span><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-comment-alt"></i></span></div><input class="form-control estilo-01 text-sres-gris" type="text" id="txt-gasto-semana-${contadorcantidad}" placeholder="Ingrese el gasto promedio a la semana"></div></div></div></div>`;
    let rowtipocombustible = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><div class="form-group mt-2"><label class="estilo-01" for="cbo-combustible">Tipo de combustible que usa:</label><span class="text-danger font-weight-bold">&nbsp;(*)&nbsp;</span><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-comment-alt"></i></span></div>${opcioncombustible}</div></div></div></div>`;
    let rowtipotransporte = `<div class="row"><div class="col-sm-12 col-md-12 col-lg-12"><div class="form-group mt-2"><label class="estilo-01" for="cbo-servicio-transporte">Tipo de servicio de transporte:</label><span class="text-danger font-weight-bold">&nbsp;(*)&nbsp;</span><div class="input-group"><div class="input-group-prepend"><span class="input-group-text"><i class="fas fa-comment-alt"></i></span></div>${opciontransporte}</div></div></div></div>`;
    let divgrupo = `<div id="grupo-${contadorcantidad}" class="mr-5 ml-5 pr-5 pl-5">${rowtipotransporte}${rowtipocombustible}${rowgastosemana}${rowmeses}${rowkilometroboton}${rowtabla}${seccionmensaje}</div>`;
    let bloque = `${titulo}${divgrupo}`;
    $('#seccion-grupos').append(bloque);
}

var verificarCantidad = () => {
    let cantidad = $('#txt-cantidad-vehiculo').val().trim();
    if (cantidad > 0) { $('#seccion-cantidad').next().html(''); cantidadtotal = cantidad; cargar(); }
    else $('#seccion-cantidad').next().alertError({ type: 'danger', title: 'ERROR', message: 'La cantidad debe ser mayor cero' })
}

var verificarCantidadVehiculos = () => {
    if (cantidadtotal > contadorcantidad) {
        cargar();
        if (cantidadtotal == contadorcantidad) $('#btnSiguiente').html('Calcular');
    }else
        calcular();
}

var calcular = () => {
    let listaParam = [];
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

var mostrarResultado = (parametro, i) => {
    let emisionesanuales = `<div class="row"><label class="estilo-01 text-sres-oscuro bg-info">Emisiones anuales</label><div class="input-group"><span>${parseFloat(parametro[7].VALOR)}</span></div></div>`;
    let consumoenergetico = `<div class="row"><label class="estilo-01 text-sres-oscuro bg-info">Consumo energético</label><div class="input-group"><span>${parseFloat(parametro[6].VALOR)}</span></div></div>`;
    let podercalorifico = `<div class="row"><label class="estilo-01 text-sres-oscuro bg-info">Poder calorífico</label><div class="input-group"><span>${parseFloat(parametro[5].VALOR)}</span></div></div>`
    let tipocombustible = `<div class="row"><label class="estilo-01 text-sres-oscuro bg-info">Tipo de combustible</label><div class="input-group"><span>${parametro[1].NOMBRE}</span></div></div>`;
    let content = `<div><h4>Vehiculo 0${i}</h4>${tipocombustible}${podercalorifico}${consumoenergetico}${emisionesanuales}</div>`;
    $('#resultados').append(content);
}