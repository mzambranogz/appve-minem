using System.Data;
using Datos.minem.gob.pe;
using Entidad.minem.gob.pe;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Util.minem.gob.pe;

namespace Logica.minem.gob.pe
{
    public class TipoTransporteLN : BaseLN
    {
        TipoTransporteDA tipoDA = new TipoTransporteDA();
        public List<TipoTransporteBE> BuscarTipoTransporte(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<TipoTransporteBE> lista = new List<TipoTransporteBE>();

            try
            {
                cn.Open();
                lista = tipoDA.BuscarTipoTransporte(busqueda, estado, registros, pagina, columna, orden, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
        
        public bool GuardarTipoTransporte(TipoTransporteBE oTipoTransporte)
        {
            bool seGuardo = false;

            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    seGuardo = tipoDA.GuardarTipoTransporte(oTipoTransporte, cn);

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }


            return seGuardo;
        }

        public TipoTransporteBE getTipoTransporte(int idTipoTransporte)
        {
            TipoTransporteBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoTransporte(idTipoTransporte, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoTransporteBE EliminarTipoTransporte(TipoTransporteBE oTipoTransporte)
        {
            TipoTransporteBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoTransporte(oTipoTransporte, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }
    }
}
