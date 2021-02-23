using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading;
using WebApiElectroMovilidad.Models;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/tipocargador")]
    public class TipoCargadorApiController : ApiController
    {
        TipoCargadorLN tipoLN = new TipoCargadorLN();

        [Route("obtenertipocargador")]
        [HttpGet]
        public List<TipoCargadorBE> ListaTipoCargador()
        {
            return tipoLN.ListaTipoCargador();
        }

        [Route("obtenercargadorpotencia")]
        [HttpGet]
        public List<CargadorPotenciaBE> ListaCargadorPotencia()
        {
            return tipoLN.ListaCargadorPotencia();
        }
    }
}
