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
    public class TipoVehiculoElectricoLN : BaseLN
    {
        TipoVehiculoElectricoDA tipoDA = new TipoVehiculoElectricoDA();

        public List<TipoVehiculoElectricoBE> BuscarTipoVehiculoElectrico(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<TipoVehiculoElectricoBE> lista = new List<TipoVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.BuscarTipoVehiculoElectrico(busqueda, estado, registros, pagina, columna, orden, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public bool GuardarTipoVehiculoElectrico(TipoVehiculoElectricoBE oTipoVehiculoElectrico)
        {
            bool seGuardo = false;

            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    seGuardo = tipoDA.GuardarTipoVehiculoElectrico(oTipoVehiculoElectrico, cn);

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }


            return seGuardo;
        }

        public TipoVehiculoElectricoBE getTipoVehiculoElectrico(int idTipoVehiculoElectrico)
        {
            TipoVehiculoElectricoBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoVehiculoElectrico(idTipoVehiculoElectrico, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }
        
        public TipoVehiculoElectricoBE EliminarTipoVehiculoElectrico(TipoVehiculoElectricoBE oTipoVehiculoElectrico)
        {
            TipoVehiculoElectricoBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoVehiculoElectrico(oTipoVehiculoElectrico, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<TipoVehiculoElectricoBE> ListadoTipoVehiculoElectrico()
        {
            List<TipoVehiculoElectricoBE> lista = new List<TipoVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoTipoVehiculoElectrico(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<TipoVehiculoElectricoBE> ListadoActivoTipoVehiculoElectrico()
        {
            List<TipoVehiculoElectricoBE> lista = new List<TipoVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoActivoTipoVehiculoElectrico(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

    }
}
