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
    [RoutePrefix("api/tipocombustible")]
    public class TipoCombustibleController : ApiController
    {
        TipoCombustibleLN tipoLN = new TipoCombustibleLN();

        [Route("buscar")]
        [HttpGet]
        public List<TipoCombustibleBE> Buscar(string busqueda, int registros, int pagina, string columna, string orden)
        {
            List<TipoCombustibleBE> lista = new List<TipoCombustibleBE>();
            try
            {
                lista = tipoLN.ListaBusquedaTipoCombustible(new TipoCombustibleBE() { CANTIDAD_REGISTROS = registros, ORDER_BY = columna, ORDER_ORDEN = orden, PAGINA = pagina, BUSCAR = busqueda });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        [Route("guardar")]
        public bool Guardar(TipoCombustibleBE obj)
        {
            bool f;
            try
            {
                TipoCombustibleBE ent = tipoLN.GuardarTipoCombustible(obj);
                f = ent.OK;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                f = false;
            }
            return f;
        }

        [Route("obtener")]
        [HttpGet]
        public TipoCombustibleBE Get(int id)
        {
            TipoCombustibleBE ent = new TipoCombustibleBE();
            try
            {
                ent = tipoLN.getTipoCombustible(new TipoCombustibleBE() { ID_TIPO_COMBUSTIBLE = id });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return ent;
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool CambiarEstado(TipoCombustibleBE entidad)
        {
            TipoCombustibleBE c = tipoLN.EliminarTipoCombustible(entidad);
            return c.OK;
        }

        [Route("obteneralltipocombustible")]
        [HttpGet]
        public List<TipoCombustibleBE>ListaTipoCombustible()
        {
            return tipoLN.ListaTipoCombustible();
        }
    }
}
