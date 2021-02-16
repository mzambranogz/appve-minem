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
    [RoutePrefix("api/estacioncarga")]
    public class EstacionCargaController : ApiController
    {
        [Route("guardarestacion")]
        [HttpPost]
        public EstacionCargaBE GuardarEstacion(EstacionCargaBE entidad) {
            return entidad;
        }
    }
}
