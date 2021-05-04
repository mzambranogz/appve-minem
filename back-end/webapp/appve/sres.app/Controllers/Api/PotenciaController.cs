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
    [RoutePrefix("api/potencia")]
    public class PotenciaController : ApiController
    {
        PotenciaLN PotenciaLN = new PotenciaLN();

        [Route("obtenerallpotencia")]
        [HttpGet]
        public List<PotenciaBE> ListaPotencia()
        {
            return PotenciaLN.ListaPotencia();
        }
    }
}
