using Dapper;
using Entidad.minem.gob.pe;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Util.minem.gob.pe;

namespace Datos.minem.gob.pe
{
    public class ElectromivilidadDA : BaseDA
    {
        public FactorDataBE ListaFactor1P(int idfactor, int p1, int v1, OracleConnection db)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_FACTOR_1P";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FACTOR", idfactor);
                p.Add("PI_ID_P1", p1);
                p.Add("PI_V_P1", v1);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                obj = db.Query<FactorDataBE>(sp, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return obj;
        }

        public FactorDataBE ListaFactor2P(int idfactor, int p1, int p2, int v1, int v2, OracleConnection db)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_FACTOR_2P";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FACTOR", idfactor);
                p.Add("PI_ID_P1", p1);
                p.Add("PI_ID_P2", p2);
                p.Add("PI_V_P1", v1);
                p.Add("PI_V_P2", v2);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                obj = db.Query<FactorDataBE>(sp, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return obj;
        }

        public FactorDataBE ListaFactor3P(int idfactor, int p1, int p2, int p3, int v1, int v2, int v3, OracleConnection db)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_FACTOR_3P";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FACTOR", idfactor);
                p.Add("PI_ID_P1", p1);
                p.Add("PI_ID_P2", p2);
                p.Add("PI_ID_P3", p3);
                p.Add("PI_V_P1", v1);
                p.Add("PI_V_P2", v2);
                p.Add("PI_V_P3", v3);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                obj = db.Query<FactorDataBE>(sp, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return obj;
        }
    }
}
