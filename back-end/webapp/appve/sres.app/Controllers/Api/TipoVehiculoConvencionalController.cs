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
    [RoutePrefix("api/tipovehiculoconvencional")]
    public class TipoVehiculoConvencionalController : ApiController
    {
        TipoVehiculoConvencionalLN tipoLN = new TipoVehiculoConvencionalLN();

        [Route("buscar")]
        [HttpGet]
        public List<TipoVehiculoConvencionalBE> Buscar(string busqueda, int registros, int pagina, string columna, string orden)
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();
            try
            {
                lista = tipoLN.ListaBusquedaTipoVehiculoConvencional(new TipoVehiculoConvencionalBE() { CANTIDAD_REGISTROS = registros, ORDER_BY = columna, ORDER_ORDEN = orden, PAGINA = pagina, BUSCAR = busqueda });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        [Route("guardar")]
        public bool Guardar(TipoVehiculoConvencionalBE obj)
        {
            bool f;
            try
            {
                TipoVehiculoConvencionalBE ent = tipoLN.GuardarTipoVehiculoConvencional(obj);
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
        public TipoVehiculoConvencionalBE Get(int id)
        {
            TipoVehiculoConvencionalBE ent = new TipoVehiculoConvencionalBE();
            try
            {
                ent = tipoLN.getTipoVehiculoConvencional(new TipoVehiculoConvencionalBE() { ID_TIPO_VEHICULO_CONV = id });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return ent;
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool CambiarEstado(TipoVehiculoConvencionalBE entidad)
        {
            TipoVehiculoConvencionalBE c = tipoLN.EliminarTipoVehiculoConvencional(entidad);
            return c.OK;
        }

        [Route("obteneralltipovehiculoconvencional")]
        [HttpGet]
        public List<TipoVehiculoConvencionalBE> ListaTipoVehiculoConvencional()
        {
            return tipoLN.ListaTipoVehiculoConvencional();
        }
    }
}
