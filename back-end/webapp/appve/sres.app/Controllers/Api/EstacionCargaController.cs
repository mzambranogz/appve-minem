using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace sres.app.Controllers.Api
{
    [RoutePrefix("api/estacioncarga")]
    public class EstacionCargaController : ApiController
    {
        EstacionCargaLN estacionLN = new EstacionCargaLN();
        [Route("guardarestacion")]
        [HttpPost]
        public bool GuardarEstacion(EstacionCargaBE entidad) {
            bool v = estacionLN.GuardarEstacionCarga(entidad);
            return v;
        }

        [Route("obtenerallestaciones")]
        [HttpGet]
        public List<EstacionCargaBE> getAllEstacion()
        {
            List<EstacionCargaBE> lista = estacionLN.getAllEstacion();
            return lista;
        }
    }
}
