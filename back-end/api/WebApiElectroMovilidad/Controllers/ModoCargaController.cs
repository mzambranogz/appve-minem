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