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
    [RoutePrefix("api/tipocargador")]
    public class TipoCargadorController : ApiController
    {
        TipoCargadorLN tipoLN = new TipoCargadorLN();

        [Route("obteneralltipocargador")]
        [HttpGet]
        public List<TipoCargadorBE> ListaTipoCargador()
        {
            return tipoLN.ListaTipoCargador();
        }

        [Route("obtenerallcargadorpotencia")]
        [HttpGet]
        public List<CargadorPotenciaBE> ListaCargadorPotencia()
        {
            return tipoLN.ListaCargadorPotencia();
        }
    }
}
