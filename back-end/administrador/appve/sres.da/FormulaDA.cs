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
    public class FormulaDA : BaseDA
    {
        public List<FormulaBE> GetFormulaParametro(FormulaBE entidad, OracleConnection db)
        {
            List<FormulaBE> lista = new List<FormulaBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_GET_FORMULA";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_CASO", entidad.ID_CASO);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<FormulaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        public List<FormulaBE> ListarBusquedaFormula(FormulaBE entidad, OracleConnection db)
        {
            List<FormulaBE> lista = new List<FormulaBE>();

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LISTA_BUSQ_FORMULA";
                var p = new OracleDynamicParameters();
                p.Add("PI_BUSCAR", entidad.BUSCAR);
                p.Add("PI_REGISTROS", entidad.CANTIDAD_REGISTROS);
                p.Add("PI_PAGINA", entidad.PAGINA);
                p.Add("PI_COLUMNA", entidad.ORDER_BY);
                p.Add("PI_ORDEN", entidad.ORDER_ORDEN);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<FormulaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                entidad.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                entidad.OK = false;
            }

            return lista;
        }

        public FormulaBE getFormula(FormulaBE entidad, OracleConnection db)
        {
            FormulaBE item = new FormulaBE();
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_GET_FORMULA";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FORMULA", entidad.ID_FORMULA);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                item = db.Query<FormulaBE>(sp, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
                item.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                item.OK = false;
            }

            return item;
        }

        public FormulaBE ActualizarFormula(FormulaBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Mantenimiento}USP_UPD_FORMULA";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FORMULA", entidad.ID_FORMULA);
                p.Add("PI_NOMBRE", entidad.NOMBRE);
                p.Add("PI_FORMULA", entidad.FORMULA);
                p.Add("PI_FORMULA_ARMADO", entidad.FORMULA_ARMADO);
                p.Add("PI_UPD_USUARIO", entidad.UPD_USUARIO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.ExecuteScalar(sp, p, commandType: CommandType.StoredProcedure);
                entidad.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                entidad.OK = false;
            }

            return entidad;
        }
    }
}
