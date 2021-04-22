//variable lista para graficos
var Lista_convencional = [], Lista_electrico = [], Lista_leyenda = [], Lista_consumo_energ_vc = [], Lista_consumo_energ_ve = [], Lista_emision_vc = [], Lista_emision_ve = [], Lista_contaminante_local = [];

$(document).ready(() => {
    $('#anio_evaluacion').on('change', (e) => cambiarAnio());
    $('#btnRegresar').on('click', (e) => Regresar());
    cargarComponentes();
});

var Regresar = () => {
    location.href = `${baseUrl}Electromovilidad/mis-consultas-y-resultados`;
}

//end_points onceavo
var cargarComponentes = () => {
        //let urlConsultarLeyenda = `${baseUrl}api/calculo/obtenerleyenda?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        //let urlConsultarCostoVC = `${baseUrl}api/calculo/obtenercostovc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        //let urlConsultarCostoVE = `${baseUrl}api/calculo/obtenercostove?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        //let urlConsultarConsumoVC = `${baseUrl}api/calculo/obtenerconsumovc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        //let urlConsultarConsumoVE = `${baseUrl}api/calculo/obtenerconsumove?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        //let urlConsultarEmisionesVC = `${baseUrl}api/calculo/obteneremisionesvc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        //let urlConsultarEmisionesVE = `${baseUrl}api/calculo/obteneremisionesve?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;      
        //let urlConsultarContaminanteLocal = `${baseUrl}api/calculo/obtenercontaminantelocal?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;

        let urlConsultarLeyenda = `${baseUrlApi}api/calculo/obtenerleyenda?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarCostoVC = `${baseUrlApi}api/calculo/obtenercostovc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarCostoVE = `${baseUrlApi}api/calculo/obtenercostove?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarConsumoVC = `${baseUrlApi}api/calculo/obtenerconsumovc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarConsumoVE = `${baseUrlApi}api/calculo/obtenerconsumove?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarEmisionesVC = `${baseUrlApi}api/calculo/obteneremisionesvc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarEmisionesVE = `${baseUrlApi}api/calculo/obteneremisionesve?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;      
        let urlConsultarContaminanteLocal = `${baseUrlApi}api/calculo/obtenercontaminantelocal?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let init = { method: 'GET', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` } };

        Promise.all([
            fetch(urlConsultarLeyenda, init),
            fetch(urlConsultarCostoVC, init),
            fetch(urlConsultarCostoVE, init),
            fetch(urlConsultarConsumoVC, init),
            fetch(urlConsultarConsumoVE, init),
            fetch(urlConsultarEmisionesVC, init),
            fetch(urlConsultarEmisionesVE, init),
            fetch(urlConsultarContaminanteLocal, init),
        ])
        .then(r => Promise.all(r.map(v => v.json())))
        .then(cargarListas);
}

var cargarListas = ([listaLeyenda, listaCostoVC, listaCostoVE, listaConsumoVC, listaConsumoVE, listaEmisionesVC, listaEmisionesVE, listaContaminanteLocal]) => {
    let anios = `<option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option>`;
    $('#anio_evaluacion').html(anios);
    $('#anio_evaluacion').val(15);
    Lista_convencional = listaCostoVC;
    Lista_electrico = listaCostoVE;
    Lista_leyenda = listaLeyenda;
    Lista_consumo_energ_vc = listaConsumoVC;
    Lista_consumo_energ_ve = listaConsumoVE;
    Lista_emision_vc = listaEmisionesVC;
    Lista_emision_ve = listaEmisionesVE;
    Lista_contaminante_local = listaContaminanteLocal;
    cambiarAnio();
    grafico_costo();
}

var cambiarAnio = () => {
    valoresDiferenciados();
    cambiarAnioVC();
    cambiarAnioVE();
    grafico_costo_por_anio();
    grafico_consumo_energ();
    grafico_consumo_energ_total();
    grafico_emisiones();
    mostrar_contaminante_local();
    $('#seccion-opciones').removeClass('d-none');
}

var valoresDiferenciados = () => {
    let i = $('#anio_evaluacion').val() - 1;
    let total_costo = parseFloat(Lista_convencional[i].TOTAL) - parseFloat(Lista_electrico[i].TOTAL);
    let total_consumo = parseFloat(Lista_consumo_energ_vc[i].TOTAL_PUBLICO) - parseFloat(Lista_consumo_energ_ve[i].TOTAL_PUBLICO);
    let total_emisiones = parseFloat(Lista_emision_vc[i].TOTAL_VC) - parseFloat(Lista_emision_ve[i].TOTAL_VE);

    $('#ahorro-economico-d').html(formatoMiles(total_costo));
    $('#consumo-energetico-d').html(formatoMiles(total_consumo));
    $('#emisiones-d').html(formatoMiles(total_emisiones));
}

var cambiarAnioVC = () => {
    let anio = $('#anio_evaluacion').val() - 1;
    //vehiculo convencional
    $('#eva-cuota-inicial-vc').html(formatoMiles(Lista_convencional[anio].CUOTA_INICIAL));
    $('#eva-incentivo-vc').html(formatoMiles(Lista_convencional[anio].INCENTIVO_ECONOMICO));
    $('#eva-recambio-vc').html(formatoMiles(Lista_convencional[anio].RECAMBIO_BATERIA));
    $('#eva-seguro-vc').html(formatoMiles(Lista_convencional[anio].SEGURO));
    $('#eva-energia-vc').html(formatoMiles(Lista_convencional[anio].ENERGIA));
    $('#eva-mante-continuo-vc').html(formatoMiles(Lista_convencional[anio].MANTENIMIENTO_CONTINUO));
    $('#eva-carga-financiera-vc').html(formatoMiles(Lista_convencional[anio].CARGA_FINANCIERA));
    $('#eva-carga-instalacion-vc').html(formatoMiles(Lista_convencional[anio].CARGA_INSTALACION));
    $('#eva-reventa-vc').html(formatoMiles(Lista_convencional[anio].REVENTA_VEHICULO));
    $('#eva-transporte-vc').html(formatoMiles(Lista_convencional[anio].OTROS_TRANSPORTES));    
    $('#eva-mante-extraordinario-vc').html(formatoMiles(Lista_convencional[anio].MANTENIMIENTO_EXTRAORDINARIO));    
    $('#eva-total-vc').html(formatoMiles(Lista_convencional[anio].TOTAL)); 
}

var cambiarAnioVE = () => {
    let anio = $('#anio_evaluacion').val() - 1;
    //vehiculo electrico
    $('#eva-cuota-inicial-ve').html(formatoMiles(Lista_electrico[anio].CUOTA_INICIAL));
    $('#eva-incentivo-ve').html(formatoMiles(Lista_electrico[anio].INCENTIVO_ECONOMICO));
    $('#eva-recambio-ve').html(formatoMiles(Lista_electrico[anio].RECAMBIO_BATERIA));
    $('#eva-seguro-ve').html(formatoMiles(Lista_electrico[anio].SEGURO));
    $('#eva-energia-ve').html(formatoMiles(Lista_electrico[anio].ENERGIA));
    $('#eva-mante-continuo-ve').html(formatoMiles(Lista_electrico[anio].MANTENIMIENTO_CONTINUO));
    $('#eva-carga-financiera-ve').html(formatoMiles(Lista_electrico[anio].CARGA_FINANCIERA));
    $('#eva-carga-instalacion-ve').html(formatoMiles(Lista_electrico[anio].CARGA_INSTALACION));
    $('#eva-reventa-ve').html(formatoMiles(Lista_electrico[anio].REVENTA_VEHICULO));
    $('#eva-transporte-ve').html(formatoMiles(Lista_electrico[anio].OTROS_TRANSPORTES));    
    $('#eva-mante-extraordinario-ve').html(formatoMiles(Lista_electrico[anio].MANTENIMIENTO_EXTRAORDINARIO));   
    $('#eva-total-ve').html(formatoMiles(Lista_electrico[anio].TOTAL)); 
}

var formatoMiles = (n) => {
    var m = n * 1;
    return m.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}

var tooltipTCO = (anio_n, escenario_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">S/ ${formatoMiles(costo_n)}</span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 120px;padding: 10px">${anio}${escenario}${costo}</div>`;
    return html
}

var grafico_costo = () => {
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Horizonte de evaluación (en años)');
        data.addColumn('number', 'Escenario movilidad eléctrica');
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
        data.addColumn('number', 'Escenario movilidad convencional');
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

        let escenario_convencional = 'Escenario movilidad convencional', esceneario_electrico = 'Escenario movilidad eléctrica'

        data.addRows([
          ['1', Lista_electrico[0].TOTAL, tooltipTCO('1',esceneario_electrico, Lista_electrico[0].TOTAL), Lista_convencional[0].TOTAL, tooltipTCO('1',escenario_convencional, Lista_convencional[0].TOTAL)],
          ['2', Lista_electrico[1].TOTAL, tooltipTCO('2',esceneario_electrico, Lista_electrico[1].TOTAL), Lista_convencional[1].TOTAL, tooltipTCO('2',escenario_convencional, Lista_convencional[1].TOTAL)],
          ['3', Lista_electrico[2].TOTAL, tooltipTCO('3',esceneario_electrico, Lista_electrico[2].TOTAL), Lista_convencional[2].TOTAL, tooltipTCO('3',escenario_convencional, Lista_convencional[2].TOTAL)],
          ['4', Lista_electrico[3].TOTAL, tooltipTCO('4',esceneario_electrico, Lista_electrico[3].TOTAL), Lista_convencional[3].TOTAL, tooltipTCO('4',escenario_convencional, Lista_convencional[3].TOTAL)],
          ['5', Lista_electrico[4].TOTAL, tooltipTCO('5',esceneario_electrico, Lista_electrico[4].TOTAL), Lista_convencional[4].TOTAL, tooltipTCO('5',escenario_convencional, Lista_convencional[4].TOTAL)],
          ['6', Lista_electrico[5].TOTAL, tooltipTCO('6',esceneario_electrico, Lista_electrico[5].TOTAL), Lista_convencional[5].TOTAL, tooltipTCO('6',escenario_convencional, Lista_convencional[5].TOTAL)],
          ['7', Lista_electrico[6].TOTAL, tooltipTCO('7',esceneario_electrico, Lista_electrico[6].TOTAL), Lista_convencional[6].TOTAL, tooltipTCO('7',escenario_convencional, Lista_convencional[6].TOTAL)],
          ['8', Lista_electrico[7].TOTAL, tooltipTCO('8',esceneario_electrico, Lista_electrico[7].TOTAL), Lista_convencional[7].TOTAL, tooltipTCO('8',escenario_convencional, Lista_convencional[7].TOTAL)],
          ['9', Lista_electrico[8].TOTAL, tooltipTCO('9',esceneario_electrico, Lista_electrico[8].TOTAL), Lista_convencional[8].TOTAL, tooltipTCO('9',escenario_convencional, Lista_convencional[8].TOTAL)],
          ['10', Lista_electrico[9].TOTAL, tooltipTCO('10',esceneario_electrico, Lista_electrico[9].TOTAL), Lista_convencional[9].TOTAL, tooltipTCO('10',escenario_convencional, Lista_convencional[9].TOTAL)],
          ['11', Lista_electrico[10].TOTAL, tooltipTCO('11',esceneario_electrico, Lista_electrico[10].TOTAL), Lista_convencional[10].TOTAL, tooltipTCO('11',escenario_convencional, Lista_convencional[10].TOTAL)],
          ['12', Lista_electrico[11].TOTAL, tooltipTCO('12',esceneario_electrico, Lista_electrico[11].TOTAL), Lista_convencional[11].TOTAL, tooltipTCO('12',escenario_convencional, Lista_convencional[11].TOTAL)],
          ['13', Lista_electrico[12].TOTAL, tooltipTCO('13',esceneario_electrico, Lista_electrico[12].TOTAL), Lista_convencional[12].TOTAL, tooltipTCO('13',escenario_convencional, Lista_convencional[12].TOTAL)],
          ['14', Lista_electrico[13].TOTAL, tooltipTCO('14',esceneario_electrico, Lista_electrico[13].TOTAL), Lista_convencional[13].TOTAL, tooltipTCO('14',escenario_convencional, Lista_convencional[13].TOTAL)],
          ['15', Lista_electrico[14].TOTAL, tooltipTCO('15',esceneario_electrico, Lista_electrico[14].TOTAL), Lista_convencional[14].TOTAL, tooltipTCO('15',escenario_convencional, Lista_convencional[14].TOTAL)],
        ]);

        var options = {
            width: 900,
            height: 500,
            tooltip: { isHtml: true },
            legend: { position: 'top', maxLines: 3 },
            lineWidth: 3,
            pointSize: 5,
            visibleInLegend: false,
            isStacked: true
        };
        var chart = new google.visualization.LineChart(document.getElementById('linechart_material'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }
    google.charts.setOnLoadCallback(drawChart);
}

var tooltipTCOGrafico = (anio_n, escenario_n, aspecto_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">S/ ${formatoMiles(costo_n)}</span>`
    let aspecto = `<span style="display: block; font-size: 1rem; color: black"><strong>${aspecto_n}</strong></span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 150px;padding: 10px">${anio}${escenario}${aspecto}${costo}</div>`;
    return html
}


var grafico_costo_por_anio = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartC() {
        let escenario_convencional = 'Movilidad convencional', esceneario_electrico = 'Movilidad eléctrica'
        var data = google.visualization.arrayToDataTable([
            ['Genre', 
             'Mantenimiento extraordinario', { type: 'string', role: 'tooltip', p: { html: true } },
             'Otros transportes', { type: 'string', role: 'tooltip', p: { html: true } },
             'Reventa vehículo', { type: 'string', role: 'tooltip', p: { html: true } },
             'Equipo carga e instalación', { type: 'string', role: 'tooltip', p: { html: true } },
             'Carga financiera', { type: 'string', role: 'tooltip', p: { html: true } },
             'Mantenimiento continuo', { type: 'string', role: 'tooltip', p: { html: true } },
             'Energía', { type: 'string', role: 'tooltip', p: { html: true } },
             'Seguro', { type: 'string', role: 'tooltip', p: { html: true } },
             'Recambio de batería', { type: 'string', role: 'tooltip', p: { html: true } },
             'Incentivo económico', { type: 'string', role: 'tooltip', p: { html: true } },
             'Cuota inicial', { type: 'string', role: 'tooltip', p: { html: true } },
             { role: 'annotation' }],
            ['Movilidad convencional', 
                Lista_convencional[i].MANTENIMIENTO_EXTRAORDINARIO, tooltipTCOGrafico(i+1, escenario_convencional, 'Mantenimiento extraordinario', Lista_convencional[i].MANTENIMIENTO_EXTRAORDINARIO),
                Lista_convencional[i].OTROS_TRANSPORTES, tooltipTCOGrafico(i+1, escenario_convencional, 'Otros transportes', Lista_convencional[i].OTROS_TRANSPORTES),
                Lista_convencional[i].REVENTA_VEHICULO, tooltipTCOGrafico(i+1, escenario_convencional, 'Reventa vehículo', Lista_convencional[i].REVENTA_VEHICULO),
                Lista_convencional[i].CARGA_INSTALACION, tooltipTCOGrafico(i+1, escenario_convencional, 'Equipo de carga e instalación', Lista_convencional[i].CARGA_INSTALACION),
                Lista_convencional[i].CARGA_FINANCIERA, tooltipTCOGrafico(i+1, escenario_convencional, 'Carga financiera', Lista_convencional[i].CARGA_FINANCIERA),
                Lista_convencional[i].MANTENIMIENTO_CONTINUO, tooltipTCOGrafico(i+1, escenario_convencional, 'Mantenimiento continuo', Lista_convencional[i].MANTENIMIENTO_CONTINUO),
                Lista_convencional[i].ENERGIA, tooltipTCOGrafico(i+1, escenario_convencional, 'Energía (combustible)', Lista_convencional[i].ENERGIA),
                Lista_convencional[i].SEGURO, tooltipTCOGrafico(i+1, escenario_convencional, 'Seguro', Lista_convencional[i].SEGURO),
                Lista_convencional[i].RECAMBIO_BATERIA, tooltipTCOGrafico(i+1, escenario_convencional, 'Recambio de batería', Lista_convencional[i].RECAMBIO_BATERIA),
                Lista_convencional[i].INCENTIVO_ECONOMICO, tooltipTCOGrafico(i+1, escenario_convencional, 'Incentivo económico', Lista_convencional[i].INCENTIVO_ECONOMICO),
                Lista_convencional[i].CUOTA_INICIAL, tooltipTCOGrafico(i+1, esceneario_electrico, 'Cuota inicial', Lista_convencional[i].CUOTA_INICIAL),
                ''],
            ['Movilidad eléctrica', 
                Lista_electrico[i].MANTENIMIENTO_EXTRAORDINARIO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Mantenimiento extraordinario', Lista_electrico[i].MANTENIMIENTO_EXTRAORDINARIO),
                Lista_electrico[i].OTROS_TRANSPORTES, tooltipTCOGrafico(i+1, esceneario_electrico, 'Otros transportes', Lista_electrico[i].OTROS_TRANSPORTES),
                Lista_electrico[i].REVENTA_VEHICULO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Reventa vehículo', Lista_electrico[i].REVENTA_VEHICULO),
                Lista_electrico[i].CARGA_INSTALACION, tooltipTCOGrafico(i+1, esceneario_electrico, 'Equipo de carga e instalación', Lista_electrico[i].CARGA_INSTALACION),
                Lista_electrico[i].CARGA_FINANCIERA, tooltipTCOGrafico(i+1, esceneario_electrico, 'Carga financiera', Lista_electrico[i].CARGA_FINANCIERA),
                Lista_electrico[i].MANTENIMIENTO_CONTINUO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Mantenimiento continuo', Lista_electrico[i].MANTENIMIENTO_CONTINUO),
                Lista_electrico[i].ENERGIA, tooltipTCOGrafico(i+1, esceneario_electrico, 'Energía (electricidad)', Lista_electrico[i].ENERGIA),
                Lista_electrico[i].SEGURO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Seguro', Lista_electrico[i].SEGURO),
                Lista_electrico[i].RECAMBIO_BATERIA, tooltipTCOGrafico(i+1, esceneario_electrico, 'Recambio de batería', Lista_electrico[i].RECAMBIO_BATERIA),
                Lista_electrico[i].INCENTIVO_ECONOMICO, tooltipTCOGrafico(i+1, esceneario_electrico, 'Incentivo económico', Lista_electrico[i].INCENTIVO_ECONOMICO),
                Lista_electrico[i].CUOTA_INICIAL, tooltipTCOGrafico(i+1, esceneario_electrico, 'Cuota inicial', Lista_electrico[i].CUOTA_INICIAL),
                '']
        ]);

        var options = {
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Costo total de propiedad (TCO) en (S/)'
            },
            bar: { groupWidth: '75%' },
            isStacked: true, //junta los valores en una columna una columna 
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(data, options);
        $('#headingCTCO_G').addClass('d-none')
    }
    google.charts.setOnLoadCallback(drawChartC);
}

var tooltipTCOGraficoConsumoE = (anio_n, escenario_n, aspecto_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">${formatoMiles(costo_n)} GJ</span>`
    let aspecto = `<span style="display: block; font-size: 1rem; color: black"><strong>${aspecto_n}</strong></span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 150px;padding: 10px">${anio}${escenario}${aspecto}${costo}</div>`;
    return html
}

var grafico_consumo_energ = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCE() {
        let escenario_convencional = 'Movilidad convencional', esceneario_electrico = 'Movilidad eléctrica'
        let arrNombre = [], arrConvencional = [], arrElectrico = [];
        let tamanio = Lista_leyenda.length;
        arrNombre.push('Genre');
        for (var j = 0; j < tamanio; j++) {
            arrNombre.push(Lista_leyenda[j].NOMBRE_TRANSPORTE);
            arrNombre.push({ type: 'string', role: 'tooltip', p: { html: true } });
        }

        arrConvencional.push('Movilidad convencional');
        if (1 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[0].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC));
        } 
        if (2 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[1].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1));
        } 
        if (3 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[2].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2));
        } 
        if (4 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[3].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3));
        } 
        if (5 <= tamanio) {
            arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4);
            arrConvencional.push(tooltipTCOGraficoConsumoE(i+1, escenario_convencional, Lista_leyenda[4].NOMBRE_TRANSPORTE, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4));
        } 

        arrElectrico.push('Movilidad eléctrica');
        if (1 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[0].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE));
        }
        if (2 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_1);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[1].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_1));
        }
        if (3 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_2);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[2].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_2));
        } 
        if (4 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_3);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[3].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_3));
        } 
        if (5 <= tamanio) {
            arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_4);
            arrElectrico.push(tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, Lista_leyenda[4].NOMBRE_TRANSPORTE, Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_4));
        }

        var data = google.visualization.arrayToDataTable([
            arrNombre,
            arrConvencional,
            arrElectrico
        ]);

        var options = {
            width: 900,
            height: 600,            
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Consumo energético (GJ)'
            },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico"));
        chart.draw(data, options);
        $('#headingCEGJ1_G').addClass('d-none')
    }
    google.charts.setOnLoadCallback(drawChartCE);
}

var grafico_consumo_energ_total = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCET() {
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Genre');
        data.addColumn('number', 'Vehículo propio');
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });
        data.addColumn('number', 'Total servicios de transporte');
        data.addColumn({ type: 'string', role: 'tooltip', p: { html: true } });

        let escenario_convencional = 'Escenario movilidad convencional', esceneario_electrico = 'Escenario movilidad eléctrica'
        data.addRows([
          ['Movilidad convencional', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, tooltipTCOGraficoConsumoE(i+1, escenario_convencional, 'Vehículo propio', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC), Lista_consumo_energ_vc[i].TOTAL_PUBLICO, tooltipTCOGraficoConsumoE(i+1, escenario_convencional, 'Total servicios de transporte', Lista_consumo_energ_vc[i].TOTAL_PUBLICO)],
          ['Movilidad eléctrica', Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE, tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, 'Vehículo propio', Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE), Lista_consumo_energ_ve[i].TOTAL_PUBLICO, tooltipTCOGraficoConsumoE(i+1, esceneario_electrico, 'Total servicios de transporte', Lista_consumo_energ_ve[i].TOTAL_PUBLICO)],
        ]);

        var options = {
            width: 900,
            height: 600,            
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Consumo energético total (GJ)'
            },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico_total"));
        chart.draw(data, options);
        $('#headingCEGJ2_G').addClass('d-none')
    }
    google.charts.setOnLoadCallback(drawChartCET);
}

var tooltipTCOGraficoEmisiones = (anio_n, escenario_n, aspecto_n, costo_n) => {
    let costo = `<span style="display: block; font-size: 1.5rem; color: #3471DD">${formatoMiles(costo_n)} kgCO<sub>2</sub>e</span>`
    let aspecto = `<span style="display: block; font-size: 1rem; color: black"><strong>${aspecto_n}</strong></span>`
    let escenario = `<span style="display: block; font-size: 1rem; color: gray"><strong>${escenario_n}</strong></span>`
    let anio = `<p style="display: block; font-size: 1rem; color: gray"><strong>${anio_n}° año</strong></p>`
    let html = `<div style="width: 300px; height: 150px;padding: 10px">${anio}${escenario}${aspecto}${costo}</div>`;
    return html
}

var grafico_emisiones = () => {
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartEM() {
        let escenario_convencional = 'Movilidad convencional', esceneario_electrico = 'Movilidad eléctrica'
        var data = google.visualization.arrayToDataTable([
            ['Genre', 
                'Fabricación de baterías', { type: 'string', role: 'tooltip', p: { html: true } },
                'Operación del vehículo', { type: 'string', role: 'tooltip', p: { html: true } },
                'Fabricación del vehículo', { type: 'string', role: 'tooltip', p: { html: true } },
                'Servicios de transporte', { type: 'string', role: 'tooltip', p: { html: true } },
                { role: 'annotation' }],
            ['Movilidad convencional', 
                Lista_emision_vc[i].FABRICACION_BATERIA_VC, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Fabricación de baterías', Lista_emision_vc[i].FABRICACION_BATERIA_VC),
                Lista_emision_vc[i].OPERACION_VEHICULO_VC, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Operación del vehículo', Lista_emision_vc[i].OPERACION_VEHICULO_VC),
                Lista_emision_vc[i].FABRICACION_VEHICULO_VC, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Fabricación del vehículo', Lista_emision_vc[i].FABRICACION_VEHICULO_VC),
                Lista_emision_vc[i].SERVICIO_TRANSPORTE, tooltipTCOGraficoEmisiones(i+1, escenario_convencional, 'Servicios de transporte', Lista_emision_vc[i].SERVICIO_TRANSPORTE),
                ''],
            ['Movilidad eléctrica', 
                Lista_emision_ve[i].FABRICACION_BATERIA_VE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Fabricación de baterías', Lista_emision_ve[i].FABRICACION_BATERIA_VE),
                Lista_emision_ve[i].OPERACION_VEHICULO_VE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Operación del vehículo', Lista_emision_ve[i].OPERACION_VEHICULO_VE),
                Lista_emision_ve[i].FABRICACION_VEHICULO_VE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Fabricación del vehículo', Lista_emision_ve[i].FABRICACION_VEHICULO_VE),
                Lista_emision_ve[i].SERVICIO_TRANSPORTE, tooltipTCOGraficoEmisiones(i+1, esceneario_electrico, 'Servicios de transporte', Lista_emision_ve[i].SERVICIO_TRANSPORTE),
                '']
        ]);

        var options = {
            //title: 'Emisiones GEI totales en kgCO₂e',
            width: 900,
            height: 600,
            tooltip: { isHtml: true },
            vAxis: {
                title: 'Emisiones GEI totales en (kgCO2e)'
            },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("emisiones_totales"));
        chart.draw(data, options);
        $('#headingEmisionesGEI_G').addClass('d-none')
    }
    google.charts.setOnLoadCallback(drawChartEM);
}

var mostrar_contaminante_local = () => {
    let i = $('#anio_evaluacion').val() - 1;
    $('#cl-nox').html(formatoMiles(Lista_contaminante_local[i].TOTAL_NOX));
    $('#cl-co').html(formatoMiles(Lista_contaminante_local[i].TOTAL_CO));
    $('#cl-mp25').html(formatoMiles(Lista_contaminante_local[i].TOTAL_PM25));
    $('#cl-bc').html(formatoMiles(Lista_contaminante_local[i].TOTAL_BC));
}

$(document).on('click', '.viewGrafico', (e) => {
    let id = e.currentTarget.id
    let grafico = $(`#${id}_G`)[0].className.indexOf("d-none")
    if (grafico != -1) $(`#${id}_G`).removeClass('d-none')
    else $(`#${id}_G`).addClass('d-none')
})