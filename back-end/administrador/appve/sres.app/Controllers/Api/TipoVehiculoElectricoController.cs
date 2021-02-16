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
    [RoutePrefix("api/tipovehiculoelectrico")]
    public class TipoVehiculoElectricoController : ApiController
    {
        TipoVehiculoElectricoLN tipoLN = new TipoVehiculoElectricoLN();

        [Route("buscar")]
        [HttpGet]
        public List<TipoVehiculoElectricoBE> Buscar(string busqueda, int registros, int pagina, string columna, string orden)
        {
            List<TipoVehiculoElectricoBE> lista = new List<TipoVehiculoElectricoBE>();
            try
            {
                lista = tipoLN.ListaBusquedaTipoVehiculoElectrico(new TipoVehiculoElectricoBE() { CANTIDAD_REGISTROS = registros, ORDER_BY = columna, ORDER_ORDEN = orden, PAGINA = pagina, BUSCAR = busqueda });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        [Route("guardar")]
        public bool Guardar(TipoVehiculoElectricoBE obj)
        {
            bool f;
            try
            {
                TipoVehiculoElectricoBE ent = tipoLN.GuardarTipoVehiculoElectrico(obj);
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
        public TipoVehiculoElectricoBE Get(int id)
        {
            TipoVehiculoElectricoBE ent = new TipoVehiculoElectricoBE();
            try
            {
                ent = tipoLN.getTipoVehiculoElectrico(new TipoVehiculoElectricoBE() { ID_TIPO_VEHICULO_ELEC = id });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return ent;
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool CambiarEstado(TipoVehiculoElectricoBE entidad)
        {
            TipoVehiculoElectricoBE c = tipoLN.EliminarTipoVehiculoElectrico(entidad);
            return c.OK;
        }

        [Route("obteneralltipovehiculoelectrico")]
        [HttpGet]
        public List<TipoVehiculoElectricoBE> ListaTipoVehiculoElectrico()
        {
            return tipoLN.ListaTipoVehiculoElectrico();
        }

        [Route("obtenerallmodelovehiculoelectrico")]
        [HttpGet]
        public List<ModeloVehiculoElectricoBE> ListaModeloVehiculoElectrico()
        {
            return tipoLN.ListaModeloVehiculoElectrico();
        }
    }
}
