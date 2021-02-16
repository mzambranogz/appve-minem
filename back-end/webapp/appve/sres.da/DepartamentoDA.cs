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
    public class DepartamentoDA : BaseDA
    {
        public List<DepartamentoBE> ListaDepartamento(OracleConnection db)
        {
            List<DepartamentoBE> lista = new List<DepartamentoBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_DEPARTAMENTO";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<DepartamentoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }
    }
}
