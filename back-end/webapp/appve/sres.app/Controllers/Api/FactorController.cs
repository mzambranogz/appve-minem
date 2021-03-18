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
    [RoutePrefix("api/factor")]
    public class FactorController : ApiController
    {
        FactorLN factorLN = new FactorLN();

        //[Route("obtenerallfactor")]
        //[HttpGet]
        //public List<FactorBE> ListaFactor(int idcaso)
        //{
        //    return factorLN.ListaFactor(idcaso);
        //}

        [Route("obtenerfactorvalor")]
        [HttpGet]
        public FactorBE ObtenerFactorValor(int id)
        {
            return factorLN.getFactorValor(new FactorBE() { ID_FACTOR = id });
        }

        [Route("guardarfactorvalor")]
        public bool GuardarFactorValor(FactorBE entidad)
        {
            return factorLN.GuardarFactorValor(entidad);
        }
    }
}
