using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using sres.be;
using sres.ln;
using sres.ut;

namespace sres.app.Controllers.Api
{
    [RoutePrefix("api/calculo")]
    public class ElectromovilidadController : ApiController
    {
        ElectromovilidadLN elecLN = new ElectromovilidadLN();

        [Route("obtenervalorestve")]
        [HttpGet]
        public ElectromovilidadBE ValoresVehiculoElectrico(int valor1)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.RENDIMIENTO = elecLN.ListaFactor1P(5, 3, valor1);
            obj.PRECIO_VEHICULO = elecLN.ListaFactor1P(7, 3, valor1);
            obj.CAPACIDAD_BATERIA = elecLN.ListaFactor1P(9, 3, valor1);
            return obj;
        }

        [Route("obtenervalorestvem")]
        [HttpGet]
        public ElectromovilidadBE ValoresModeloVehiculoElectrico(int valor1)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.RENDIMIENTO = elecLN.ListaFactor1P(6, 4, valor1);
            obj.PRECIO_VEHICULO = elecLN.ListaFactor1P(8, 4, valor1);
            obj.CAPACIDAD_BATERIA = elecLN.ListaFactor1P(10, 4, valor1);
            return obj;
        }

        [Route("obtenervaloresvctc")]
        [HttpGet]
        public ElectromovilidadBE ValoresVehiculoConvencional(int tipovehiculo, int tipocombustible)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.RENDIMIENTO = elecLN.ListaFactor2P(1, 1, 2, tipovehiculo, tipocombustible);
            obj.FACTOR_EMISION = elecLN.ListaFactor2P(3, 1, 2, tipovehiculo, tipocombustible);
            obj.PRECIO_VEHICULO = elecLN.ListaFactor2P(4, 1, 2, tipovehiculo, tipocombustible);
            return obj;
        }

        [Route("obtenervalorestccp")]
        [HttpGet]
        public ElectromovilidadBE ValoresCargador(int valor1, int valor2)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.PRECIO_CARGADOR = elecLN.ListaFactor2P(11, 5, 6, valor1, valor2);
            obj.COSTO_INSTALACION = elecLN.ListaFactor2P(12, 5, 6, valor1, valor2);
            return obj;
        }

        [Route("obtenervaloresdp")]
        [HttpGet]
        public ElectromovilidadBE ValoresTarifaElectricidad(int valor1)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.TARIFA_ELECTRICIDAD = elecLN.ListaFactor1P(13, 7, valor1);
            return obj;
        }

        [Route("obtenervalorpreciocomb")]
        [HttpGet]
        public ElectromovilidadBE ValoresPrecioCombustible(int valor1, int valor2, int valor3)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.PRECIO_COMBUSTIBLE = elecLN.ListaFactor3P(2, 1, 2, 7, valor1, valor2, valor3);
            return obj;
        }

        [Route("calcularvehiculoconvencional")]
        [HttpPost]
        public List<EscenarioConvencionalBE> CalcularVC(VehiculoConvencionalBE entidad)
        {
            List<EscenarioConvencionalBE> lista = new List<EscenarioConvencionalBE>();
            lista = elecLN.CalcularVC(entidad);
            return lista;
        }

        [Route("calcularvehiculoelectrico")]
        [HttpPost]
        public List<EscenarioElectromovilidadBE> CalcularVE(VehiculoElectricoBE entidad)
        {
            List<EscenarioElectromovilidadBE> lista = new List<EscenarioElectromovilidadBE>();
            lista = elecLN.CalcularVE(entidad);
            return lista;
        }

        [Route("obtenerleyendas")]
        [HttpPost]
        public List<TransportePublicoBE> ObtenerLeyenda(ConsumoEnergeticoConvencionalBE entidad)
        {
            List<TransportePublicoBE> lista = new List<TransportePublicoBE>();
            lista = elecLN.ObtenerLyendas(entidad);
            return lista;
        }

        [Route("calcularconsumoenergeticoconvencional")]
        [HttpPost]
        public List<EscenarioConvencionalConsumoEnergBE> CalcularVCCE(ConsumoEnergeticoConvencionalBE entidad)
        {
            List<EscenarioConvencionalConsumoEnergBE> lista = new List<EscenarioConvencionalConsumoEnergBE>();
            lista = elecLN.CalcularVCCE(entidad);
            return lista;
        }

        [Route("calcularconsumoenergeticoelectrico")]
        [HttpPost]
        public List<EscenarioElectricoConsumoEnergBE> CalcularVECE(ConsumoEnergeticoElectricoBE entidad)
        {
            List<EscenarioElectricoConsumoEnergBE> lista = new List<EscenarioElectricoConsumoEnergBE>();
            lista = elecLN.CalcularVECE(entidad);
            return lista;
        }

        [Route("calcularemisionesconvencional")]
        [HttpPost]
        public List<EscenarioConvencionalEmisionesBE> CalcularEmisionesConvencional(EmisionesConvencionalBE entidad)
        {
            List<EscenarioConvencionalEmisionesBE> lista = new List<EscenarioConvencionalEmisionesBE>();
            lista = elecLN.CalcularEmisionesVC(entidad);
            return lista;
        }

        [Route("calcularemisioneselectrico")]
        [HttpPost]
        public List<EscenarioElectricoEmisionesBE> CalcularEmisionesElectrico(EmisionesElectricoBE entidad)
        {
            List<EscenarioElectricoEmisionesBE> lista = new List<EscenarioElectricoEmisionesBE>();
            lista = elecLN.CalcularEmisionesVE(entidad);
            return lista;
        }

        [Route("calcularcontaminantelocal")]
        [HttpPost]
        public List<EscenarioContaminanteLocalBE> CalcularContaminantesLocales(ContaminanteLocalBE entidad)
        {
            List<EscenarioContaminanteLocalBE> lista = new List<EscenarioContaminanteLocalBE>();
            lista = elecLN.CalcularContaminantesLocales(entidad);
            return lista;
        }

        [Route("guardarresultados")]
        [HttpPost]
        public bool GuardarResultados(ResultadosBE entidad)
        {
            bool v = elecLN.GuardarResultados(entidad);
            return v;
        }

        [Route("obtenerallresultados")]
        [HttpGet]
        public List<ResultadosBE> ObtenerResultados(int idusuario)
        {
            List<ResultadosBE> lista = new List<ResultadosBE>();
            lista = elecLN.ObtenerResultados(idusuario);
            return lista;
        }

        [Route("obtenerleyenda")]
        [HttpGet]
        public List<TransportePublicoBE> ObtenerLeyenda(int idresultado, int idusuario)
        {
            List<TransportePublicoBE> lista = new List<TransportePublicoBE>();
            lista = elecLN.ObtenerLeyenda(idresultado, idusuario);
            return lista;
        }

        [Route("obtenercostovc")]
        [HttpGet]
        public List<EscenarioConvencionalBE> ObtenerCostoVC(int idresultado, int idusuario)
        {
            List<EscenarioConvencionalBE> lista = new List<EscenarioConvencionalBE>();
            lista = elecLN.ObtenerCostoVC(idresultado, idusuario);
            return lista;
        }

        [Route("obtenercostove")]
        [HttpGet]
        public List<EscenarioElectromovilidadBE> ObtenerCostoVE(int idresultado, int idusuario)
        {
            List<EscenarioElectromovilidadBE> lista = new List<EscenarioElectromovilidadBE>();
            lista = elecLN.ObtenerCostoVE(idresultado, idusuario);
            return lista;
        }

        [Route("obtenerconsumovc")]
        [HttpGet]
        public List<EscenarioConvencionalConsumoEnergBE> ObtenerConsumoVC(int idresultado, int idusuario)
        {
            List<EscenarioConvencionalConsumoEnergBE> lista = new List<EscenarioConvencionalConsumoEnergBE>();
            lista = elecLN.ObtenerConsumoVC(idresultado, idusuario);
            return lista;
        }

        [Route("obtenerconsumove")]
        [HttpGet]
        public List<EscenarioElectricoConsumoEnergBE> ObtenerConsumoVE(int idresultado, int idusuario)
        {
            List<EscenarioElectricoConsumoEnergBE> lista = new List<EscenarioElectricoConsumoEnergBE>();
            lista = elecLN.ObtenerConsumoVE(idresultado, idusuario);
            return lista;
        }

        [Route("obteneremisionesvc")]
        [HttpGet]
        public List<EscenarioConvencionalEmisionesBE> ObtenerEmisionesVC(int idresultado, int idusuario)
        {
            List<EscenarioConvencionalEmisionesBE> lista = new List<EscenarioConvencionalEmisionesBE>();
            lista = elecLN.ObtenerEmisionesVC(idresultado, idusuario);
            return lista;
        }

        [Route("obteneremisionesve")]
        [HttpGet]
        public List<EscenarioElectricoEmisionesBE> ObtenerEmisionesVE(int idresultado, int idusuario)
        {
            List<EscenarioElectricoEmisionesBE> lista = new List<EscenarioElectricoEmisionesBE>();
            lista = elecLN.ObtenerEmisionesVE(idresultado, idusuario);
            return lista;
        }

        [Route("obtenercontaminantelocal")]
        [HttpGet]
        public List<EscenarioContaminanteLocalBE> ObtenerContaminanteLocal(int idresultado, int idusuario)
        {
            List<EscenarioContaminanteLocalBE> lista = new List<EscenarioContaminanteLocalBE>();
            lista = elecLN.ObtenerContaminanteLocal(idresultado, idusuario);
            return lista;
        }

        [Route("obtenerrutasall")]
        [HttpGet]
        public List<VehiculoRutaBE> ObtenerRutasAll(int idusuario)
        {
            List<VehiculoRutaBE> lista = new List<VehiculoRutaBE>();
            lista = elecLN.ObtenerRutasAll(idusuario);
            return lista;
        }

        [Route("eliminarresultado")]
        [HttpGet]
        public bool EliminarResultado(int idresultado, int idusuario)
        {
            bool v = elecLN.EliminarResultado(idresultado, idusuario);
            return v;
        }
    }
}
