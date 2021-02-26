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
   public class TipoTransporteDA : BaseDA
    {
        #region PAQUETE MANTENIMIENTO

        public List<TipoTransporteBE> BuscarTipoTransporte(string busqueda, string estado, int registros, int pagina, string columna, string orden, OracleConnection db)
        {
            List<TipoTransporteBE> lista = null;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LISTA_BUSQ_TRANSP";
                var p = new OracleDynamicParameters();
                p.Add("PI_BUSCAR", busqueda);
                p.Add("PI_FLAG_ESTADO", estado);
                p.Add("PI_REGISTROS", registros);
                p.Add("PI_PAGINA", pagina);
                p.Add("PI_COLUMNA", columna);
                p.Add("PI_ORDEN", orden);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<dynamic>(sp, p, commandType: CommandType.StoredProcedure)
                    .Select(x => new TipoTransporteBE
                    {
                        ID_TIPO_TRANSPORTE = (int)x.ID_TIPO_TRANSPORTE,
                        NOMBRE = (string)x.NOMBRE,                                                
                        FLAG_ESTADO = (string)x.FLAG_ESTADO,
                        TOTAL_PAGINAS = (int)x.TOTAL_PAGINAS,
                        PAGINA = (int)x.PAGINA,
                        CANTIDAD_REGISTROS = (int)x.CANTIDAD_REGISTROS,
                        TOTAL_REGISTROS = (int)x.TOTAL_REGISTROS
                    })
                    .ToList();
            }
            catch (Exception ex) { Log.Error(ex); }

            return lista;
        }

        public TipoTransporteBE getTipoTransporte(int idTipoTransporte, OracleConnection db)
        {
            TipoTransporteBE item = null;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_GET_TIPO_TRANSP";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_TRANSPORTE", idTipoTransporte);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                item = db.QueryFirstOrDefault<TipoTransporteBE>(sp, p, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex) { Log.Error(ex); }

            return item;
        }

        public bool GuardarTipoTransporte(TipoTransporteBE oTipoTransporte, OracleConnection db)
        {
            bool seActualizo = false;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_PRC_GUARDAR_TIPO_TRANSP";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_TRANSPORTE", oTipoTransporte.ID_TIPO_TRANSPORTE);
                p.Add("PI_NOMBRE", oTipoTransporte.NOMBRE);
                p.Add("PI_UPD_USUARIO", oTipoTransporte.UPD_USUARIO);
                p.Add("PO_ROWAFFECTED", dbType: OracleDbType.Int32, direction: ParameterDirection.Output);
                db.Execute(sp, p, commandType: CommandType.StoredProcedure);
                int filasAfectadas = (int)p.Get<dynamic>("PO_ROWAFFECTED").Value;
                seActualizo = filasAfectadas > 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return seActualizo;
        }

        public TipoTransporteBE EliminarTipoTransporte(TipoTransporteBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Mantenimiento}USP_DEL_TIPO_TRANSP";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_TRANSPORTE", entidad.ID_TIPO_TRANSPORTE);
                p.Add("PI_UPD_USUARIO", entidad.UPD_USUARIO);
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

        public List<TipoTransporteBE> ListadoTipoTransporte(OracleConnection db)
        {
            List<TipoTransporteBE> lista = new List<TipoTransporteBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_TIPO_TRANSP";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<TipoTransporteBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<TipoTransporteBE> ListadoActivoTipoTransporte(OracleConnection db)
        {
            List<TipoTransporteBE> lista = new List<TipoTransporteBE>();
            List<TipoTransporteBE> listaActivosTipoTransporte = new List<TipoTransporteBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_TIPO_TRANSP";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<TipoTransporteBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                var listaActivos = lista.Where(s => s.FLAG_ESTADO == "1").Select(s => s);
                listaActivosTipoTransporte = listaActivos.ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        #endregion
    }
}
