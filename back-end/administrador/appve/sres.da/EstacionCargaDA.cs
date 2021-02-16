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
    public class EstacionCargaDA : BaseDA
    {
        public bool RegistrarInstitucion(InstitucionBE entidad, out int idinstitucion, OracleConnection db) {
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

        public bool RegistrarEstacion(EstacionCargaBE entidad, out int idestacion, OracleConnection db)
        {
            bool seGuardo = false;
            idestacion = -1;
            try
            {
                string sp = $"{Package.Calculo}USP_PRC_GUARDAR_ESTACION";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", entidad.ID_ESTACION);
                p.Add("PI_DESCRIPCION", entidad.DESCRIPCION);
                p.Add("PI_MODELO", entidad.MODELO);
                p.Add("PI_MARCA", entidad.MARCA);
                p.Add("PI_POTENCIA", entidad.POTENCIA);
                p.Add("PI_MODO_CARGA", entidad.MODO_CARGA);
                p.Add("PI_TIPO_CARGADOR", entidad.TIPO_CARGADOR);
                p.Add("PI_TIPO_CONECTOR", entidad.TIPO_CONECTOR);
                p.Add("PI_CANTIDAD_CONECTOR", entidad.CANTIDAD_CONECTOR);
                p.Add("PI_HORA_DESDE", entidad.HORA_DESDE);
                p.Add("PI_HORA_HASTA", entidad.HORA_HASTA);
                p.Add("PI_TARIFA_SERVICIO", entidad.TARIFA_SERVICIO);
                p.Add("PI_UPD_USUARIO", entidad.UPD_USUARIO);
                p.Add("PI_ID_GET", 0, OracleDbType.Int32, ParameterDirection.Output);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                idestacion = (int)p.Get<dynamic>("PI_ID_GET").Value;
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0 && idestacion != -1;
            }
            catch (Exception e)
            {
                Log.Error(e);
            }

            return seGuardo;
        }

        public bool GuardarDocumento(DocumentoBE inscripcionDoc, OracleConnection db)
        {
            bool seGuardo = false;
            try
            {
                string sp = $"{Package.Calculo}USP_PRC_MAN_DOCUMENTO_DATA";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_DOCUMENTO", inscripcionDoc.ID_DOCUMENTO);
                p.Add("PI_ARCHIVO_BASE", inscripcionDoc.ARCHIVO_BASE);
                p.Add("PI_USUARIO_GUARDAR", inscripcionDoc.UPD_USUARIO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0;
            }
            catch (Exception ex) { Log.Error(ex); }

            return seGuardo;
        }

        public bool GuardarImagen(DocumentoBE inscripcionDoc, OracleConnection db)
        {
            bool seGuardo = false;
            try
            {
                string sp = $"{Package.Calculo}USP_PRC_MAN_DOCUMENTO_IMG";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_DOCUMENTO", inscripcionDoc.ID_DOCUMENTO);
                p.Add("PI_ARCHIVO_BASE", inscripcionDoc.ARCHIVO_BASE);
                p.Add("PI_USUARIO_GUARDAR", inscripcionDoc.UPD_USUARIO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0;
            }
            catch (Exception ex) { Log.Error(ex); }

            return seGuardo;
        }
    }
}
