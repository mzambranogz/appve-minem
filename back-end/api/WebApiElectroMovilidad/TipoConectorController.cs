using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiElectroMovilidad
{
    [Authorize]
    [RoutePrefix("api/tipoconector")]
    public class TipoConectorController : ApiController
    {
        TipoConectorLN TipoConectorLN = new TipoConectorLN();

        [Route("obteneralltipoconector")]
        [HttpGet]
        public List<TipoConectorBE> ListaTipoConector()
        {
            return TipoConectorLN.ListaTipoConector();
        }
    }
}