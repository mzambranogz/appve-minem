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

        public bool GenerarDetalleResultado(int idusuario, out int iddetalle, OracleConnection db)
        {
            bool seGuardo = false;
            iddetalle = -1;
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GENERAR_DETALLE_RESULT";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_UPD_USUARIO", idusuario);
                p.Add("PI_ID_GET", 0, OracleDbType.Int32, ParameterDirection.Output);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.ExecuteScalar(sp, p, commandType: CommandType.StoredProcedure);
                iddetalle = (int)p.Get<dynamic>("PI_ID_GET").Value;
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0 && iddetalle > 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return seGuardo;
        }

        public TransportePublicoBE GuardarLeyenda(int idusuario, int idresultado, int iddetalle, TransportePublicoBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_LEYENDA";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_NOMBRE_TRANSPORTE", entidad.NOMBRE_TRANSPORTE);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public EscenarioConvencionalBE GuardarCostoVC(int idusuario, int idresultado, int iddetalle, EscenarioConvencionalBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_COSTO_VC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_CUOTA_INICIAL", entidad.CUOTA_INICIAL);
                p.Add("PI_INCENTIVO_ECONOMICO", entidad.INCENTIVO_ECONOMICO);
                p.Add("PI_RECAMBIO_BATERIA", entidad.RECAMBIO_BATERIA);
                p.Add("PI_SEGURO", entidad.SEGURO);
                p.Add("PI_ENERGIA", entidad.ENERGIA);
                p.Add("PI_MANTENIMIENTO_CONTINUO", entidad.MANTENIMIENTO_CONTINUO);
                p.Add("PI_CARGA_FINANCIERA", entidad.CARGA_FINANCIERA);
                p.Add("PI_CARGA_INSTALACION", entidad.CARGA_INSTALACION);
                p.Add("PI_REVENTA_VEHICULO", entidad.REVENTA_VEHICULO);
                p.Add("PI_OTROS_TRANSPORTES", entidad.OTROS_TRANSPORTES);
                p.Add("PI_MANTENIMIENTO_EXTRAORDINA", entidad.MANTENIMIENTO_EXTRAORDINARIO);
                p.Add("PI_TOTAL", entidad.TOTAL);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public EscenarioElectromovilidadBE GuardarCostoVE(int idusuario, int idresultado, int iddetalle, EscenarioElectromovilidadBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_COSTO_VE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_CUOTA_INICIAL", entidad.CUOTA_INICIAL);
                p.Add("PI_INCENTIVO_ECONOMICO", entidad.INCENTIVO_ECONOMICO);
                p.Add("PI_RECAMBIO_BATERIA", entidad.RECAMBIO_BATERIA);
                p.Add("PI_SEGURO", entidad.SEGURO);
                p.Add("PI_ENERGIA", entidad.ENERGIA);
                p.Add("PI_MANTENIMIENTO_CONTINUO", entidad.MANTENIMIENTO_CONTINUO);
                p.Add("PI_CARGA_FINANCIERA", entidad.CARGA_FINANCIERA);
                p.Add("PI_CARGA_INSTALACION", entidad.CARGA_INSTALACION);
                p.Add("PI_REVENTA_VEHICULO", entidad.REVENTA_VEHICULO);
                p.Add("PI_OTROS_TRANSPORTES", entidad.OTROS_TRANSPORTES);
                p.Add("PI_MANTENIMIENTO_EXTRAORDINA", entidad.MANTENIMIENTO_EXTRAORDINARIO);
                p.Add("PI_TOTAL", entidad.TOTAL);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public EscenarioConvencionalConsumoEnergBE GuardarConsumoVC(int idusuario, int idresultado, int iddetalle, EscenarioConvencionalConsumoEnergBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_CONSUMO_VC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_VEHICULO_PROPIO_VC", entidad.VEHICULO_PROPIO_VC);
                p.Add("PI_SERVICIO_PUBLICO_1", entidad.SERVICIO_PUBLICO_1);
                p.Add("PI_SERVICIO_PUBLICO_2", entidad.SERVICIO_PUBLICO_2);
                p.Add("PI_SERVICIO_PUBLICO_3", entidad.SERVICIO_PUBLICO_3);
                p.Add("PI_SERVICIO_PUBLICO_4", entidad.SERVICIO_PUBLICO_4);
                p.Add("PI_TOTAL_PUBLICO", entidad.TOTAL_PUBLICO);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public EscenarioElectricoConsumoEnergBE GuardarConsumoVE(int idusuario, int idresultado, int iddetalle, EscenarioElectricoConsumoEnergBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_CONSUMO_VE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_VEHICULO_PROPIO_VE", entidad.VEHICULO_PROPIO_VE);
                p.Add("PI_SERVICIO_PUBLICO_1", entidad.SERVICIO_PUBLICO_1);
                p.Add("PI_SERVICIO_PUBLICO_2", entidad.SERVICIO_PUBLICO_2);
                p.Add("PI_SERVICIO_PUBLICO_3", entidad.SERVICIO_PUBLICO_3);
                p.Add("PI_SERVICIO_PUBLICO_4", entidad.SERVICIO_PUBLICO_4);
                p.Add("PI_TOTAL_PUBLICO", entidad.TOTAL_PUBLICO);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public EscenarioConvencionalEmisionesBE GuardarEmisionesVC(int idusuario, int idresultado, int iddetalle, EscenarioConvencionalEmisionesBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_EMISIONES_VC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_FABRICACION_BATERIA_VC", entidad.FABRICACION_BATERIA_VC);
                p.Add("PI_OPERACION_VEHICULO_VC", entidad.OPERACION_VEHICULO_VC);
                p.Add("PI_FABRICACION_VEHICULO_VC", entidad.FABRICACION_VEHICULO_VC);
                p.Add("PI_SERVICIO_TRANSPORTE", entidad.SERVICIO_TRANSPORTE);
                p.Add("PI_TOTAL_VC", entidad.TOTAL_VC);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public EscenarioElectricoEmisionesBE GuardarEmisionesVE(int idusuario, int idresultado, int iddetalle, EscenarioElectricoEmisionesBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_EMISIONES_VE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_FABRICACION_BATERIA_VE", entidad.FABRICACION_BATERIA_VE);
                p.Add("PI_OPERACION_VEHICULO_VE", entidad.OPERACION_VEHICULO_VE);
                p.Add("PI_FABRICACION_VEHICULO_VE", entidad.FABRICACION_VEHICULO_VE);
                p.Add("PI_SERVICIO_TRANSPORTE", entidad.SERVICIO_TRANSPORTE);
                p.Add("PI_TOTAL_VE", entidad.TOTAL_VE);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public EscenarioContaminanteLocalBE GuardarContaminanteLocal(int idusuario, int idresultado, int iddetalle, EscenarioContaminanteLocalBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Calculo}USP_INS_GUARDAR_CONTAMINANTE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_DETALLE", iddetalle);
                p.Add("PI_TOTAL_NOX", entidad.TOTAL_NOX);
                p.Add("PI_TOTAL_CO", entidad.TOTAL_CO);
                p.Add("PI_TOTAL_PM25", entidad.TOTAL_PM25);
                p.Add("PI_TOTAL_BC", entidad.TOTAL_BC);
                p.Add("PI_UPD_USUARIO", idusuario);
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

        public List<ResultadosBE> ObtenerResultados(int idusuario, OracleConnection db)
        {
            List<ResultadosBE> lista = new List<ResultadosBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_RESULTADOS";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<ResultadosBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<TransportePublicoBE> ObtenerLeyenda(int idresultado, int idusuario, OracleConnection db)
        {
            List<TransportePublicoBE> lista = new List<TransportePublicoBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_LEYENDA";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<TransportePublicoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioConvencionalBE> ObtenerCostoVC(int idresultado, int idusuario, OracleConnection db)
        {
            List<EscenarioConvencionalBE> lista = new List<EscenarioConvencionalBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_COSTO_VC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EscenarioConvencionalBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioElectromovilidadBE> ObtenerCostoVE(int idresultado, int idusuario, OracleConnection db)
        {
            List<EscenarioElectromovilidadBE> lista = new List<EscenarioElectromovilidadBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_COSTO_VE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EscenarioElectromovilidadBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioConvencionalConsumoEnergBE> ObtenerConsumoVC(int idresultado, int idusuario, OracleConnection db)
        {
            List<EscenarioConvencionalConsumoEnergBE> lista = new List<EscenarioConvencionalConsumoEnergBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_CONSUMO_VC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EscenarioConvencionalConsumoEnergBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioElectricoConsumoEnergBE> ObtenerConsumoVE(int idresultado, int idusuario, OracleConnection db)
        {
            List<EscenarioElectricoConsumoEnergBE> lista = new List<EscenarioElectricoConsumoEnergBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_CONSUMO_VE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EscenarioElectricoConsumoEnergBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioConvencionalEmisionesBE> ObtenerEmisionesVC(int idresultado, int idusuario, OracleConnection db)
        {
            List<EscenarioConvencionalEmisionesBE> lista = new List<EscenarioConvencionalEmisionesBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_EMISIONES_VC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EscenarioConvencionalEmisionesBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioElectricoEmisionesBE> ObtenerEmisionesVE(int idresultado, int idusuario, OracleConnection db)
        {
            List<EscenarioElectricoEmisionesBE> lista = new List<EscenarioElectricoEmisionesBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_EMISIONES_VE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EscenarioElectricoEmisionesBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioContaminanteLocalBE> ObtenerContaminanteLocal(int idresultado, int idusuario, OracleConnection db)
        {
            List<EscenarioContaminanteLocalBE> lista = new List<EscenarioContaminanteLocalBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LISTA_CONTAMINANTE";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EscenarioContaminanteLocalBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public bool EliminarResultado(int idresultado, int idusuario, OracleConnection db)
        {
            bool seGuardo = false;
            try
            {
                string sp = $"{Package.Calculo}USP_DEL_RESULTADO";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_RESULTADO", idresultado);
                p.Add("PI_UPD_USUARIO", idusuario);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.ExecuteScalar(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return seGuardo;
        }
    }
}
