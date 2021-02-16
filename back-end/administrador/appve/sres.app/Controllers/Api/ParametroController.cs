using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace sres.app.Controllers.Api
{
    [RoutePrefix("api/parametro")]
    public class ParametroController : ApiController
    {
        ParametroLN paramLN = new ParametroLN();

        [Route("obtenerallparametro")]
        [HttpGet]
        public List<ParametroBE> ListaParametro(int idcaso)
        {
            return paramLN.ListaParametro(idcaso);
        }
    }
}
