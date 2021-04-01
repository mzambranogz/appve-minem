using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System.Collections.Generic;
using System.Web.Http;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/caso")]
    public class CasoController : ApiController
    {
        CasoLN casoln = new CasoLN();
        [Route("buscar")]
        [HttpGet]
        public List<CasoBE> BuscarComponenteFactor(string busqueda, int registros, int pagina, string columna, string orden)
        {
            return casoln.ListaCasoFactor(new CasoBE() { CANTIDAD_REGISTROS = registros, ORDER_BY = columna, ORDER_ORDEN = orden, PAGINA = pagina, BUSCAR = busqueda == null ? "" : busqueda });
        }

        [Route("obtenerallcaso")]
        [HttpGet]
        public List<CasoBE> ListaCaso()
        {
            return casoln.ListaCaso();
        }
    }
}
