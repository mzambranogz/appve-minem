using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using sres.be;
using sres.ut;
using Oracle.DataAccess.Client;
using Dapper;
using System.Data;

namespace sres.da
{
    public class InstitucionDA : BaseDA
    {
        public bool RegistrarInstitucion(InstitucionBE entidad, out int idinstitucion, OracleConnection db)
        {
            bool seGuardo = false;
            idinstitucion = -1;
            try
            {
                string sp = $"{Package.Calculo}USP_PRC_GUARDAR_INSTITUCION";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_INSTITUCION", entidad.ID_INSTITUCION);
                p.Add("PI_RUC", entidad.RUC);
                p.Add("PI_RAZON_SOCIAL", entidad.RAZON_SOCIAL);
                p.Add("PI_CORREO", entidad.CORREO);
                p.Add("PI_TELEFONO", entidad.TELEFONO);
                p.Add("PI_DIRECCION", entidad.DIRECCION);
                p.Add("PI_UPD_USUARIO", entidad.UPD_USUARIO);
                p.Add("PI_ID_GET", 0, OracleDbType.Int32, ParameterDirection.Output);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                idinstitucion = (int)p.Get<dynamic>("PI_ID_GET").Value;
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0 && idinstitucion != -1;
            }
            catch (Exception e)
            {
                Log.Error(e);
            }

            return seGuardo;
        }

        public InstitucionBE ObtenerInstitucion(int idinstitucion, OracleConnection db)
        {
            InstitucionBE item = null;
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_GET_INSTITUCION";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_INSTITUCION", idinstitucion);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                item = db.QueryFirstOrDefault<InstitucionBE>(sp, p, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex) { Log.Error(ex); }

            return item;
        }
    }
}
