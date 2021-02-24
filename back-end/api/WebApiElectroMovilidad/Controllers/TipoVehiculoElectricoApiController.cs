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
    [RoutePrefix("api/tipovehiculoelectrico")]
    public class TipoVehiculoElectricoApiController : ApiController
    {
        TipoVehiculoElectricoLN tipoLN = new TipoVehiculoElectricoLN();

        [Route("buscar")]
        [HttpGet]
        public List<TipoVehiculoElectricoBE> Buscar(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<TipoVehiculoElectricoBE> lista = new List<TipoVehiculoElectricoBE>();
            try
            {
                lista = tipoLN.BuscarTipoVehiculoElectrico(busqueda, estado, registros, pagina, columna, orden);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarTipoVehiculoElectrico(TipoVehiculoElectricoBE oTipoVehiculoElectrico)
        {
            bool exito = false;

            exito = tipoLN.GuardarTipoVehiculoElectrico(oTipoVehiculoElectrico);
            if (exito)
            {
                return Ok(oTipoVehiculoElectrico);
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("obtener")]
        [HttpGet]
        public TipoVehiculoElectricoBE GetTipoVehiculoElectrico(int id)
        {
            TipoVehiculoElectricoBE ent = new TipoVehiculoElectricoBE();
            try
            {
                ent = tipoLN.getTipoVehiculoElectrico(id);
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
        public bool EliminarTipoVehiculoElectrico(TipoVehiculoElectricoBE oTipoVehiculoElectrico)
        {
            TipoVehiculoElectricoBE c = tipoLN.EliminarTipoVehiculoElectrico(oTipoVehiculoElectrico);
            return c.OK;
        }


    }
}
