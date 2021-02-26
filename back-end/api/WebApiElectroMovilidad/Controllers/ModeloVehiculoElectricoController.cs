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
