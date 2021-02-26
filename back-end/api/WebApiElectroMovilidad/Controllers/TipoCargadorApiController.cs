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

        [Route("obteneralltipocargador")]
        [HttpGet]
        public List<TipoCargadorBE> ListadoTipoCargador()
        {
            return tipoLN.ListadoTipoCargador();
        }

        [Route("obtenertipocargadoractivos")]
        [HttpGet]
        public List<TipoCargadorBE> ListadoActivoTipoCargador()
        {
            return tipoLN.ListadoActivoTipoCargador();
        }

        [Route("obtenerallcargadorpotencia")]
        [HttpGet]
        public List<CargadorPotenciaBE> ListadoCargadorPotencia()
        {
            return tipoLN.ListadoCargadorPotencia();
        }

        [Route("obtenercargadorpotenciaactivos")]
        [HttpGet]
        public List<CargadorPotenciaBE> ListadoActivoCargadorPotencia()
        {
            return tipoLN.ListadoActivoCargadorPotencia();
        }
    }
}
