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

var cargarComponentes = () => {
        let urlConsultarLeyenda = `${baseUrl}api/calculo/obtenerleyenda?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarCostoVC = `${baseUrl}api/calculo/obtenercostovc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarCostoVE = `${baseUrl}api/calculo/obtenercostove?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarConsumoVC = `${baseUrl}api/calculo/obtenerconsumovc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarConsumoVE = `${baseUrl}api/calculo/obtenerconsumove?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarEmisionesVC = `${baseUrl}api/calculo/obteneremisionesvc?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;
        let urlConsultarEmisionesVE = `${baseUrl}api/calculo/obteneremisionesve?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;      
        let urlConsultarContaminanteLocal = `${baseUrl}api/calculo/obtenercontaminantelocal?idresultado=${idresultado}&idusuario=${idUsuarioLogin}`;

        Promise.all([
            fetch(urlConsultarLeyenda),
            fetch(urlConsultarCostoVC),
            fetch(urlConsultarCostoVE),
            fetch(urlConsultarConsumoVC),
            fetch(urlConsultarConsumoVE),
            fetch(urlConsultarEmisionesVC),
            fetch(urlConsultarEmisionesVE),
            fetch(urlConsultarContaminanteLocal),
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

var grafico_costo = () => {
    function drawChart() {
        var data = new google.visualization.DataTable();
        data.addColumn('number', 'Horizonte de evaluación (en años)');
        data.addColumn('number', 'Escenario movilidad eléctrica');
        data.addColumn('number', 'Escenario línea base');

        data.addRows([
          [1, Math.round(Lista_electrico[0].TOTAL * 100)/100, Math.round(Lista_convencional[0].TOTAL * 100)/100],
          [2, Lista_electrico[1].TOTAL, Lista_convencional[1].TOTAL],
          [3, Lista_electrico[2].TOTAL, Lista_convencional[2].TOTAL],
          [4, Lista_electrico[3].TOTAL, Lista_convencional[3].TOTAL],
          [5, Lista_electrico[4].TOTAL, Lista_convencional[4].TOTAL],
          [6, Lista_electrico[5].TOTAL, Lista_convencional[5].TOTAL],
          [7, Lista_electrico[6].TOTAL, Lista_convencional[6].TOTAL],
          [8, Lista_electrico[7].TOTAL, Lista_convencional[7].TOTAL],
          [9, Lista_electrico[8].TOTAL, Lista_convencional[8].TOTAL],
          [10, Lista_electrico[9].TOTAL, Lista_convencional[9].TOTAL],
          [11, Lista_electrico[10].TOTAL, Lista_convencional[10].TOTAL],
          [12, Lista_electrico[11].TOTAL, Lista_convencional[11].TOTAL],
          [13, Lista_electrico[12].TOTAL, Lista_convencional[12].TOTAL],
          [14, Lista_electrico[13].TOTAL, Lista_convencional[13].TOTAL],
          [15, Math.round(Lista_electrico[14].TOTAL * 100)/100, Math.round(Lista_convencional[14].TOTAL * 100)/100]
        ]);

        var options = {
            chart: {
                title: 'Electrificación de flota - TCO',
                //subtitle: 'in millions of dollars (USD)'
            },
            width: 900,
            height: 500,
            legend: { position: 'top', maxLines: 3 },
            vAxis: {format: 'decimal'},            
        };

        var chart = new google.charts.Line(document.getElementById('linechart_material'));
        chart.draw(data, google.charts.Line.convertOptions(options));
    }
    google.charts.setOnLoadCallback(drawChart);
}

var grafico_costo_por_anio = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartC() {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Mantenimiento extraordinario', 'Otros transportes', 'Reventa vehículo', 'Equipo carga e instalación',
             'Carga financiera', 'Mantenimiento continuo', 'Energía (electricidad o combustible)', 'Seguro', 'Recambio de batería', 'Incentivo económico', 'Cuota inicial', { role: 'annotation' }],
            ['Escenario movilidad convencional', Lista_convencional[i].MANTENIMIENTO_EXTRAORDINARIO, Lista_convencional[i].OTROS_TRANSPORTES, Lista_convencional[i].REVENTA_VEHICULO, Lista_convencional[i].CARGA_INSTALACION, Lista_convencional[i].CARGA_FINANCIERA, Lista_convencional[i].MANTENIMIENTO_CONTINUO, Lista_convencional[i].ENERGIA, Lista_convencional[i].SEGURO, Lista_convencional[i].RECAMBIO_BATERIA, Lista_convencional[i].INCENTIVO_ECONOMICO, Lista_convencional[i].CUOTA_INICIAL, ''],
            ['Escenario electromovilidad', Lista_electrico[i].MANTENIMIENTO_EXTRAORDINARIO, Lista_electrico[i].OTROS_TRANSPORTES, Lista_electrico[i].REVENTA_VEHICULO, Lista_electrico[i].CARGA_INSTALACION, Lista_electrico[i].CARGA_FINANCIERA, Lista_electrico[i].MANTENIMIENTO_CONTINUO, Lista_electrico[i].ENERGIA, Lista_electrico[i].SEGURO, Lista_electrico[i].RECAMBIO_BATERIA, Lista_electrico[i].INCENTIVO_ECONOMICO, Lista_electrico[i].CUOTA_INICIAL, '']
        ]);

        var options = {
            title: 'Comparación TCO',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChartC);
}

var grafico_consumo_energ = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCE() {
        let arrNombre = [], arrConvencional = [], arrElectrico = [];
        let tamanio = Lista_leyenda.length;
        arrNombre.push('Genre');
        for (var j = 0; j < tamanio; j++) {
            arrNombre.push(Lista_leyenda[j].NOMBRE_TRANSPORTE);
        }

        arrConvencional.push('Escenario movilidad convencional');
        if (1 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC);
        if (2 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1);
        if (3 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2);
        if (4 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3);
        if (5 <= tamanio) arrConvencional.push(Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4);

        arrElectrico.push('Escenario movilidad electromovilidad');
        if (1 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE);
        if (2 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_1);
        if (3 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_2);
        if (4 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_3);
        if (5 <= tamanio) arrElectrico.push(Lista_consumo_energ_ve[i].SERVICIO_PUBLICO_4);

        //var data = google.visualization.arrayToDataTable([
        //    ['Genre', Lista_leyenda[0].NOMBRE_TRANSPORTE, Lista_leyenda[1].NOMBRE_TRANSPORTE, Lista_leyenda[2].NOMBRE_TRANSPORTE, Lista_leyenda[3].NOMBRE_TRANSPORTE, Lista_leyenda[4].NOMBRE_TRANSPORTE, { role: 'annotation' }],
        //    ['Escenario movilidad convencional', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4, ''],
        //    ['Escenario electromovilidad', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_1, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_2, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_3, Lista_consumo_energ_vc[i].SERVICIO_PUBLICO_4, '']
        //]);

        var data = google.visualization.arrayToDataTable([
            arrNombre,
            arrConvencional,
            arrElectrico
        ]);

        var options = {
            title: 'Consumo Energético Total',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico"));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChartCE);
}

var grafico_consumo_energ_total = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartCET() {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Vehículo propio', 'Total servicios de transporte', { role: 'annotation' }],
            ['Escenario movilidad convencional', Lista_consumo_energ_vc[i].VEHICULO_PROPIO_VC, Lista_consumo_energ_vc[i].TOTAL_PUBLICO, ''],
            ['Escenario electromovilidad', Lista_consumo_energ_ve[i].VEHICULO_PROPIO_VE, Lista_consumo_energ_ve[i].TOTAL_PUBLICO, '']
        ]);

        var options = {
            title: 'Consumo Energético Total',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("consumo_energetico_total"));
        chart.draw(data, options);
    }
    google.charts.setOnLoadCallback(drawChartCET);
}

var grafico_emisiones = () => {   
    let i = $('#anio_evaluacion').val() - 1;
    function drawChartEM() {
        var data = google.visualization.arrayToDataTable([
            ['Genre', 'Fabricación de baterías', 'Operación del vehículo', 'Fabricación del vehículo', 'Servicios de transporte', { role: 'annotation' }],
            ['Escenario movilidad convencional', Lista_emision_vc[i].FABRICACION_BATERIA_VC, Lista_emision_vc[i].OPERACION_VEHICULO_VC, Lista_emision_vc[i].FABRICACION_VEHICULO_VC, Lista_emision_vc[i].SERVICIO_TRANSPORTE, ''],
            ['Escenario electromovilidad', Lista_emision_ve[i].FABRICACION_BATERIA_VE, Lista_emision_ve[i].OPERACION_VEHICULO_VE, Lista_emision_ve[i].FABRICACION_VEHICULO_VE, Lista_emision_ve[i].SERVICIO_TRANSPORTE, '']
        ]);

        var options = {
            title: 'Emisiones GEI Totales',
            width: 900,
            height: 800,
            tooltip: { isHtml: true },
            bar: { groupWidth: '75%' },
            isStacked: true,
        };

        var chart = new google.visualization.ColumnChart(document.getElementById("emisiones_totales"));
        chart.draw(data, options);
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
