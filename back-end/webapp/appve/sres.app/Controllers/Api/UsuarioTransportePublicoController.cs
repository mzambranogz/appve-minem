using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web.Http;

namespace sres.app.Controllers.Api
{
    [RoutePrefix("api/usuariotransportepublico")]
    public class UsuarioTransportePublicoController : ApiController
    {
        CalcularLN calLN = new CalcularLN();

        [Route("calcularusuariotransportepublico")]
        [HttpPost]
        public ParametroDataBE Calcular(ParametroDataBE entidad)
        {
            try
            {
                foreach (ParametroBE p in entidad.LISTA_PARAM)
                {
                    p.PARAMETROS = calLN.Calcular(p.PARAMETROS, entidad.ID_CASO);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return entidad;
        }
    }
}
