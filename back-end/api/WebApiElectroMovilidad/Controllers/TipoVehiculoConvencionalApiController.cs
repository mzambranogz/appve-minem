using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Util.minem.gob.pe;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/tipovehiculoconvencional")]
    public class TipoVehiculoConvencionalApiController : ApiController
    {
        TipoVehiculoConvencionalLN tipoLN = new TipoVehiculoConvencionalLN();

        [HttpGet]
        [Route("buscar")]
        public List<TipoVehiculoConvencionalBE> Buscar(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();
            try
            {
                lista = tipoLN.BuscarTipoVehiculoConvencional(busqueda, estado, registros, pagina, columna, orden);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
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
                Log.Error(ex);
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

        [Route("obtenerall")]
        [HttpGet]
        public List<TipoVehiculoConvencionalBE> ListadoTipoVehiculoConvencional()
        {
            return tipoLN.ListadoTipoVehiculoConvencional();
        }

        [Route("obteneractivos")]
        [HttpGet]
        public List<TipoVehiculoConvencionalBE> ListadoActivoTipoVehiculoConvencional()
        {
            return tipoLN.ListadoActivoTipoVehiculoConvencional();
        }
    }
}
