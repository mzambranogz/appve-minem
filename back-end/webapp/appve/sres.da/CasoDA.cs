using Dapper;
using Oracle.DataAccess.Client;
using sres.be;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.da
{
    public class CasoDA : BaseDA
    {
        public List<CasoBE> ListarBusquedaCasoFactor(CasoBE entidad, OracleConnection db)
        {
            List<CasoBE> lista = new List<CasoBE>();
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LISTA_BUSQ_CASO";
                var p = new OracleDynamicParameters();
                p.Add("PI_BUSCAR", entidad.BUSCAR);
                p.Add("PI_REGISTROS", entidad.CANTIDAD_REGISTROS);
                p.Add("PI_PAGINA", entidad.PAGINA);
                p.Add("PI_COLUMNA", entidad.ORDER_BY);
                p.Add("PI_ORDEN", entidad.ORDER_ORDEN);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<CasoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                entidad.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                entidad.OK = false;
            }

            return lista;
        }

        public List<FactorBE> listaCasoFactor(int idcaso, OracleConnection db)
        {
            List<FactorBE> lista = new List<FactorBE>();
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LIST_CASO_FACTOR";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_CASO", idcaso);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<FactorBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        public List<CasoBE> ListaCaso(OracleConnection db)
        {
            List<CasoBE> lista = new List<CasoBE>();
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LIST_CASO";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<CasoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }
    }
}
