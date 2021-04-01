using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System.Collections.Generic;
using System.Web.Http;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/modelovehiculo")]
    public class ModeloVehiculoElectricoController : ApiController
    {
        ModeloVehiculoElectricoLN tipoLN = new ModeloVehiculoElectricoLN();

        [Route("obtenerall")]
        [HttpGet]
        public List<ModeloVehiculoElectricoBE> ListadoModeloVehiculo()
        {
            return tipoLN.ListadoModeloVehiculo();
        }

        [Route("obteneractivos")]
        [HttpGet]
        public List<ModeloVehiculoElectricoBE> ListadoActivoModeloVehiculo()
        {
            return tipoLN.ListadoActivoModeloVehiculo();
        }
    }
}
