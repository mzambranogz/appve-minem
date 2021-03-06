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
    public class FactorDA : BaseDA
    {

        public List<FactorParametroBE> ListaFactorParametro(FactorBE entidad, OracleConnection db)
        {
            List<FactorParametroBE> lista = new List<FactorParametroBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_FACTOR_PARAMETRO";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FACTOR", entidad.ID_FACTOR);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<FactorParametroBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<FactorDataBE> ListaFactorData(FactorBE entidad, string SQL, OracleConnection db)
        {
            List<FactorDataBE> lista = new List<FactorDataBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_FACTOR_VALOR";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FACTOR", entidad.ID_FACTOR);
                p.Add("PI_SQL_WHERE", SQL);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<FactorDataBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<FactorBE> ListaFactor(int idcaso, OracleConnection db)
        {
            List<FactorBE> lista = new List<FactorBE>();
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LIST_FACTOR";
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

        public List<ParametroDetalleBE> ParametroDetalleData(ParametroBE entidad, OracleConnection db)
        {
            List<ParametroDetalleBE> lista = new List<ParametroDetalleBE>();
            string sql = validarParametro(entidad.ID_PARAMETRO);
            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_DATA_PARAM_DET";
                var p = new OracleDynamicParameters();
                p.Add("PI_SQL", sql);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<ParametroDetalleBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                entidad.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                entidad.OK = false;
            }
            return lista;
        }

        private string validarParametro(int parametro)
        {
            string sql = "SELECT ", campo = "", tabla = "";
            if (parametro == 1) { tabla = "T_GENM_TIPO_VEHICULO_CONV"; campo = "ID_TIPO_VEHICULO_CONV ID_DETALLE, NOMBRE"; }
            if (parametro == 2) { tabla = "T_GENM_TIPO_COMBUSTIBLE"; campo = "ID_TIPO_COMBUSTIBLE ID_DETALLE, NOMBRE"; }
            if (parametro == 3) { tabla = "T_GENM_TIPO_VEHICULO_ELEC"; campo = "ID_TIPO_VEHICULO_ELEC ID_DETALLE, NOMBRE"; }
            if (parametro == 4) { tabla = "T_GENM_MODELO_VEHICULO_ELEC"; campo = "ID_MODELO ID_DETALLE, NOMBRE"; }
            if (parametro == 5) { tabla = "T_GENM_TIPO_CARGADOR"; campo = "ID_CARGADOR ID_DETALLE, NOMBRE"; }
            if (parametro == 6) { tabla = "T_GENM_CARGADOR_POTENCIA"; campo = "ID_POTENCIA ID_DETALLE, NOMBRE"; }
            if (parametro == 7) { tabla = "T_MAE_DEPARTAMENTO"; campo = "ID_DEPARTAMENTO ID_DETALLE, NOMBRE"; }
            if (parametro == 8) { tabla = "T_GENM_TIPO_TRANSPORTE"; campo = "ID_TIPO_TRANSPORTE ID_DETALLE, NOMBRE"; }
            sql += campo + " FROM " + tabla + " WHERE FLAG_ESTADO = '1'";
            return sql;
        }

        public List<FactorDataBE> getFactorValor(FactorBE f, OracleConnection db)
        {
            List<FactorDataBE> item = new List<FactorDataBE>();
            try
            {
                string sp = $"{Package.Mantenimiento}USP_GET_LISTA_FACTOR_VALOR";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FACTOR", f.ID_FACTOR);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                item = db.Query<FactorDataBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return item;
        }

        public FactorDataBE GuardarFactorValor(FactorDataBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Mantenimiento}USP_PRC_MAN_FACTOR_DATA";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_FACTOR", entidad.ID_FACTOR);
                p.Add("PI_ID_DETALLE", entidad.ID_DETALLE);
                p.Add("PI_PARAMETROS", entidad.PARAMETROS);
                p.Add("PI_VALORES", entidad.VALORES);
                p.Add("PI_FACTOR", entidad.FACTOR);
                p.Add("PI_UNIDAD", entidad.UNIDAD);
                p.Add("PI_USUARIO_GUARDAR", entidad.UPD_USUARIO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.ExecuteScalar(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                entidad.OK = filasAfectadas > 0;
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
