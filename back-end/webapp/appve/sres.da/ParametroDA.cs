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
    public class ParametroDA : BaseDA
    {
        public List<ParametroBE> ListaParametro(int idcaso, OracleConnection db)
        {
            List<ParametroBE> lista = new List<ParametroBE>();
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LIST_PARAMETRO";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_CASO", idcaso);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<ParametroBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }
    }
}
