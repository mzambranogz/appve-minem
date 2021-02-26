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
    public class DepartamentoDA : BaseDA
    {
        public List<DepartamentoBE> ListadoDepartamento(OracleConnection db)
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

        public List<DepartamentoBE> ListadoActivoDepartamento(OracleConnection db)
        {
            List<DepartamentoBE> lista = new List<DepartamentoBE>();
            List<DepartamentoBE> listaActivosDepartamento = new List<DepartamentoBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_DEPARTAMENTO";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<DepartamentoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                var listaActivos = lista.Where(s => s.FLAG_ESTADO == "1").Select(s => s);
                listaActivosDepartamento = listaActivos.ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }
    }
}
