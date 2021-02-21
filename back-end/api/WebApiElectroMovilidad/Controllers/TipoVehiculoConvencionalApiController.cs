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

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/tipovehiculoconvencional")]
    public class TipoVehiculoConvencionalApiController : ApiController
    {
        TipoVehiculoConvencionalLN tipoLN = new TipoVehiculoConvencionalLN();

        [HttpGet]
        [Route("buscar")]
        public List<TipoVehiculoConvencionalBE> Buscar(string busqueda, int registros, int pagina, string columna, string orden)
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();
            try
            {
                lista = tipoLN.BuscarTipoVehiculoConvencional(busqueda, registros, pagina, columna, orden);
            }
            catch (Exception ex)
            {
                return null;
            }
            return lista;
        }

        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarTipoVehiculoConvencional(TipoVehiculoConvencionalBE oTipoVehiculoConvencional)
        {
            bool exito = false;

            exito = tipoLN.GuardarTipoVehiculoConvencional(oTipoVehiculoConvencional);
            if (exito)
            {
                return Ok(oTipoVehiculoConvencional);
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("obtener")]
        [HttpGet]
        public TipoVehiculoConvencionalBE GetTipoVehiculoConvencional(int id)
        {
            TipoVehiculoConvencionalBE ent = new TipoVehiculoConvencionalBE();
            try
            {
                ent = tipoLN.getTipoVehiculoConvencional(id);
            }
            catch (Exception ex)
            {
                return null;
            }
            return ent;
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool EliminarTipoVehiculoConvencional(TipoVehiculoConvencionalBE oTipoVehiculoConvencional)
        {
            TipoVehiculoConvencionalBE c = tipoLN.EliminarTipoVehiculoConvencional(oTipoVehiculoConvencional);
            return c.OK;
        }


    }
}
