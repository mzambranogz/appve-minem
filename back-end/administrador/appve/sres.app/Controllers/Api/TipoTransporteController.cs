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
    [RoutePrefix("api/tipotransporte")]
    public class TipoTransporteController : ApiController
    {
        TipoTransporteLN tipoLN = new TipoTransporteLN();

        [Route("buscar")]
        [HttpGet]
        public List<TipoTransporteBE> Buscar(string busqueda, int registros, int pagina, string columna, string orden)
        {
            List<TipoTransporteBE> lista = new List<TipoTransporteBE>();
            try
            {
                lista = tipoLN.ListaBusquedaTipoTransporte(new TipoTransporteBE() { CANTIDAD_REGISTROS = registros, ORDER_BY = columna, ORDER_ORDEN = orden, PAGINA = pagina, BUSCAR = busqueda });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        [Route("guardar")]
        public bool Guardar(TipoTransporteBE obj)
        {
            bool f;
            try
            {
                TipoTransporteBE ent = tipoLN.GuardarTipoTransporte(obj);
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
        public TipoTransporteBE Get(int id)
        {
            TipoTransporteBE ent = new TipoTransporteBE();
            try
            {
                ent = tipoLN.getTipoTransporte(new TipoTransporteBE() { ID_TIPO_TRANSPORTE= id });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return ent;
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool CambiarEstado(TipoTransporteBE entidad)
        {
            TipoTransporteBE c = tipoLN.EliminarTipoTransporte(entidad);
            return c.OK;
        }

        [Route("obteneralltipotransporte")]
        [HttpGet]
        public List<TipoTransporteBE> ListaTipoTransporte()
        {
            return tipoLN.ListaTipoTransporte();
        }
    }
}
