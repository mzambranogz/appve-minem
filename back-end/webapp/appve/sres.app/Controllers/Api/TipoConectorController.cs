using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace sres.app.Controllers.Api
{
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
