using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
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