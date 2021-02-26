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
using Util.minem.gob.pe;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/departamento")]
    public class DepartamentoController : ApiController
    {
        DepartamentoLN depLN = new DepartamentoLN();

        [Route("obteneralldepartamento")]
        [HttpGet]
        public List<DepartamentoBE> ListadoDepartamento()
        {
            return depLN.ListadoDepartamento();
        }
        
        [Route("obteneractivodepartamento")]
        [HttpGet]
        public List<DepartamentoBE> ListadoActivoDepartamento()
        {
            return depLN.ListadoActivoDepartamento();
        }
    }
}
