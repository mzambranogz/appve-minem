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
    public class TipoVehiculoConvencionalLN : BaseLN
    {
        TipoVehiculoConvencionalDA tipoDA = new TipoVehiculoConvencionalDA();

        public List<TipoVehiculoConvencionalBE> BuscarTipoVehiculoConvencional(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();

            try
            {
                cn.Open();
                lista = tipoDA.BuscarTipoVehiculoConvencional(busqueda, estado, registros, pagina, columna, orden, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public bool GuardarTipoVehiculoConvencional(TipoVehiculoConvencionalBE oTipoVehiculoConvencional)
        {
            bool seGuardo = false;

            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    seGuardo = tipoDA.GuardarTipoVehiculoConvencional(oTipoVehiculoConvencional, cn);

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }


            return seGuardo;
        }

        public TipoVehiculoConvencionalBE getTipoVehiculoConvencional(int idTipoVehiculoConvencional)
        {
            TipoVehiculoConvencionalBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoVehiculoConvencional(idTipoVehiculoConvencional, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoVehiculoConvencionalBE EliminarTipoVehiculoConvencional(TipoVehiculoConvencionalBE oTipoVehiculoConvencional)
        {
            TipoVehiculoConvencionalBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoVehiculoConvencional(oTipoVehiculoConvencional, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<TipoVehiculoConvencionalBE> ListadoTipoVehiculoConvencional()
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoTipoVehiculoConvencional(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<TipoVehiculoConvencionalBE> ListadoActivoTipoVehiculoConvencional()
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoActivoTipoVehiculoConvencional(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

    }
}
