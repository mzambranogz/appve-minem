using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Util.minem.gob.pe;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/TipoTransporte")]
    public class TipoTransporteApiController : ApiController
    {
        TipoTransporteLN tipoLN = new TipoTransporteLN();

        [HttpGet]
        [Route("buscar")]
        public List<TipoTransporteBE> Buscar(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<TipoTransporteBE> lista = new List<TipoTransporteBE>();
            try
            {
                lista = tipoLN.BuscarTipoTransporte(busqueda, estado, registros, pagina, columna, orden);
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
        public IHttpActionResult AgregarTipoTransporte(TipoTransporteBE oTipoTransporte) {
            bool exito = false;

            exito = tipoLN.GuardarTipoTransporte(oTipoTransporte);
            if (exito)
            {
                return Ok(oTipoTransporte);
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("obtener")]
        [HttpGet]
        public TipoTransporteBE GetTipoTransporte(int id)
        {
            TipoTransporteBE ent = new TipoTransporteBE();
            try
            {
                ent = tipoLN.getTipoTransporte(id);
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
        public bool EliminarTipoTransporte(TipoTransporteBE oTipoTransporte)
        {
            TipoTransporteBE c = tipoLN.EliminarTipoTransporte(oTipoTransporte);
            return c.OK;
        }

        [Route("obtenerall")]
        [HttpGet]
        public List<TipoTransporteBE> ListadoTipoTransporte()
        {
            return tipoLN.ListadoTipoTransporte();
        }

        [Route("obteneractivos")]
        [HttpGet]
        public List<TipoTransporteBE> ListadoActivoTipoTransporte()
        {
            return tipoLN.ListadoActivoTipoTransporte();
        }
    }
}
