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
    public class TipoCombustibleLN : BaseLN
    {
        TipoCombustibleDA tipoDA = new TipoCombustibleDA();

        public List<TipoCombustibleBE> BuscarTipoCombustible(string busqueda, int registros, int pagina, string columna, string orden)
        {
            List<TipoCombustibleBE> lista = new List<TipoCombustibleBE>();

            try
            {
                cn.Open();
                lista = tipoDA.BuscarTipoCombustible(busqueda, registros, pagina, columna, orden, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public bool GuardarTipoCombustible(TipoCombustibleBE oTipoCombustible)
        {
            bool seGuardo = false;

            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    seGuardo = tipoDA.GuardarTipoCombustible(oTipoCombustible, cn);

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return seGuardo;
        }

        public TipoCombustibleBE getTipoCombustible(int idTipoCombustible)
        {
            TipoCombustibleBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoCombustible(idTipoCombustible, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoCombustibleBE EliminarTipoCombustible(TipoCombustibleBE oTipoCombustible)
        {
            TipoCombustibleBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoCombustible(oTipoCombustible, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }
    }
}
