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
    [RoutePrefix("api/departamento")]
    public class DepartamentoController : ApiController
    {
        DepartamentoLN depLN = new DepartamentoLN();

        [Route("obteneralldepartamento")]
        [HttpGet]
        public List<DepartamentoBE> ListaDepartamento()
        {
            return depLN.ListaDepartamento();
        }
    }
}
