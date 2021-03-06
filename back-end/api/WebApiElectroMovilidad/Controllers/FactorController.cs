using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using WebApiElectroMovilidad.Models;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace WebApiElectroMovilidad.Controllers
{
    [RoutePrefix("api/factor")]
    public class FactorController : ApiController
    {
        FactorLN factorLN = new FactorLN();

        [Route("obtenerallfactor")]
        [HttpGet]
        public List<FactorBE> ListaFactor(int idcaso)
        {
            return factorLN.ListaFactor(idcaso);
        }

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
