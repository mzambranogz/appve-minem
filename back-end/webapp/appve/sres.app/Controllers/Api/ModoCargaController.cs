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
    [RoutePrefix("api/modocarga")]
    public class ModoCargaController : ApiController
    {
        ModoCargaLN ModoCargaLN = new ModoCargaLN();

        [Route("obtenerallmodocarga")]
        [HttpGet]
        public List<ModoCargaBE> ListaModoCarga()
        {
            return ModoCargaLN.ListaModoCarga();
        }
    }
}
