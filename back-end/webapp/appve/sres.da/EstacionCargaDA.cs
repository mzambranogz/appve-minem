﻿using Dapper;
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
        public bool RegistrarEstacion(EstacionCargaBE entidad, out int idestacion, OracleConnection db)
        {
            bool seGuardo = false;
            idestacion = -1;
            try
            {
                string sp = $"{Package.Calculo}USP_PRC_GUARDAR_ESTACION";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", entidad.ID_ESTACION);
                p.Add("PI_ID_USUARIO", entidad.ID_USUARIO);
                p.Add("PI_LONGITUD", entidad.LONGITUD);
                p.Add("PI_LATITUD", entidad.LATITUD);
                p.Add("PI_DIRECCION", entidad.DIRECCION);
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
                p.Add("PI_ID_ESTADO", entidad.ID_ESTADO);
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
                p.Add("PI_ID_ESTACION", inscripcionDoc.ID_ESTACION);
                //p.Add("PI_ARCHIVO_CONTENIDO", inscripcionDoc.ARCHIVO_CONTENIDO, dbType: OracleDbType.Blob);
                p.Add("PI_ARCHIVO_BASE", inscripcionDoc.ARCHIVO_BASE);
                p.Add("PI_UPD_USUARIO", inscripcionDoc.UPD_USUARIO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0;
            }
            catch (Exception ex) { Log.Error(ex); }

            return seGuardo;
        }

        public bool DeshabilitarImagen(int id_estacion, OracleConnection db)
        {
            bool seGuardo = true;
            try
            {
                string sp = $"{Package.Calculo}USP_DEL_DOCUMENTO_IMG";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", id_estacion);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex) { Log.Error(ex); seGuardo = false; }

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
                p.Add("PI_ID_ESTACION", inscripcionDoc.ID_ESTACION);
                //p.Add("PI_ARCHIVO_CONTENIDO", inscripcionDoc.ARCHIVO_CONTENIDO, dbType: OracleDbType.Blob);
                p.Add("PI_ARCHIVO_BASE", inscripcionDoc.ARCHIVO_BASE);
                p.Add("PI_FLAG_ESTADO", inscripcionDoc.FLAG_ESTADO);
                p.Add("PI_UPD_USUARIO", inscripcionDoc.UPD_USUARIO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seGuardo = filasAfectadas > 0;
            }
            catch (Exception ex) { Log.Error(ex); }

            return seGuardo;
        }

        public List<EstacionCargaBE> getEstacionPorUsuario(int idusuario, OracleConnection db)
        {
            List<EstacionCargaBE> lista = new List<EstacionCargaBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_ESTACION_USUARIO";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_USUARIO", idusuario);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EstacionCargaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<DocumentoBE> getAllEstacionDocumento(EstacionCargaBE item, OracleConnection db)
        {
            List<DocumentoBE> lista = new List<DocumentoBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_ALL_DOCUMENTO";                
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", item.ID_ESTACION);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<DocumentoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<DocumentoBE> getAllEstacionImagen(EstacionCargaBE item, OracleConnection db)
        {
            List<DocumentoBE> lista = new List<DocumentoBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_ALL_IMAGEN";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", item.ID_ESTACION);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<DocumentoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public EstacionCargaBE getEstacion(int idestacion, OracleConnection db)
        {
            EstacionCargaBE obj = new EstacionCargaBE();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_ESTACION";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", idestacion);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                obj = db.Query<EstacionCargaBE>(sp, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return obj;
        }

        public bool EliminarEstacion(int idestacion, OracleConnection db)
        {
            bool v = true;
            try
            {
                string sp = $"{Package.Calculo}USP_DEL_ESTACION";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", idestacion);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                v = filasAfectadas > 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                v = false;
            }

            return v;
        }

        public List<EstacionCargaBE> getEstacionAll(decimal minLng, decimal maxLng, decimal minLat, decimal maxLat, OracleConnection db)
        {
            List<EstacionCargaBE> lista = new List<EstacionCargaBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_ALL_ESTACION";
                var p = new OracleDynamicParameters();
                p.Add("PI_MIN_LNG", minLng);
                p.Add("PI_MAX_LNG", maxLng);
                p.Add("PI_MIN_LAT", minLat);
                p.Add("PI_MAX_LAT", maxLat);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EstacionCargaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EstacionCargaBE> BuscarEstaciones(int nroInforme, string propietario, string empresa, int registros, int pagina, string columna, string orden, OracleConnection db)
        {
            List<EstacionCargaBE> lista = new List<EstacionCargaBE>();

            try
            {
                string sp = $"{Package.Verificacion}USP_SEL_BUSQ_ESTACIONES";
                var p = new OracleDynamicParameters();
                p.Add("PI_CODIGO", nroInforme);
                p.Add("PI_NOMBRES", propietario);
                p.Add("PI_EMPRESA", empresa);
                p.Add("PI_REGISTROS", registros);
                p.Add("PI_PAGINA", pagina);
                p.Add("PI_COLUMNA", columna);
                p.Add("PI_ORDEN", orden);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<EstacionCargaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex) { Log.Error(ex); }

            return lista;
        }

        public bool RevisionEstacion(EstacionCargaBE entidad, OracleConnection db)
        {
            bool v = true;
            try
            {
                string sp = $"{Package.Verificacion}USP_REVISION_ESTACION";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_ESTACION", entidad.ID_ESTACION);
                p.Add("PI_ID_USUARIO", entidad.ID_USUARIO);
                p.Add("PI_FLAG_ESTADO", entidad.FLAG_ESTADO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                v = filasAfectadas > 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                v = false;
            }

            return v;
        }
    }
}
