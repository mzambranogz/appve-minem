using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading;
using WebApiElectroMovilidad.Models;
using Util.minem.gob.pe;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/calculo")]
    public class ElectromovilidadApiController : ApiController
    {
        ElectromovilidadLN tipoLN = new ElectromovilidadLN();

        [Route("obtenervaloresvctc")]
        [HttpGet]
        public ElectromovilidadBE ValoresVehiculoConvencional(int tipovehiculo, int tipocombustible)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.RENDIMIENTO = tipoLN.ListaFactor2P(1, 1, 2, tipovehiculo, tipocombustible);
            obj.FACTOR_EMISION = tipoLN.ListaFactor2P(3, 1, 2, tipovehiculo, tipocombustible);
            obj.PRECIO_VEHICULO = tipoLN.ListaFactor2P(4, 1, 2, tipovehiculo, tipocombustible);
            return obj;
        }

        [Route("obtenervalorestccp")]
        [HttpGet]
        public ElectromovilidadBE ValoresCargador(int valor1, int valor2)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.PRECIO_CARGADOR = tipoLN.ListaFactor2P(11, 5, 6, valor1, valor2);
            obj.COSTO_INSTALACION = tipoLN.ListaFactor2P(12, 5, 6, valor1, valor2);
            return obj;
        }

        [Route("obtenervalorestvem")]
        [HttpGet]
        public ElectromovilidadBE ValoresModeloVehiculoElectrico(int valor1)
        {
            ElectromovilidadBE obj = new ElectromovilidadBE();
            obj.RENDIMIENTO = tipoLN.ListaFactor1P(6, 4, valor1);
            obj.PRECIO_VEHICULO = tipoLN.ListaFactor1P(8, 4, valor1);
            obj.CAPACIDAD_BATERIA = tipoLN.ListaFactor1P(10, 4, valor1);
            return obj;
        }
    }
}
