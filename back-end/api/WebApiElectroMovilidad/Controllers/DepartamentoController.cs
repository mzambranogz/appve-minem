using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System.Collections.Generic;
using System.Web.Http;

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
