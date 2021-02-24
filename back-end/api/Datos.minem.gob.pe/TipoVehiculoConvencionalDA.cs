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
    public class TipoVehiculoConvencionalDA : BaseDA
    {
        #region PAQUETE MANTENIMIENTO

        public List<TipoVehiculoConvencionalBE> BuscarTipoVehiculoConvencional(string busqueda, string estado, int registros, int pagina, string columna, string orden, OracleConnection db)
        {
            List<TipoVehiculoConvencionalBE> lista = null;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LISTA_BUSQ_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_BUSCAR", busqueda);
                p.Add("PI_FLAG_ESTADO", estado);
                p.Add("PI_REGISTROS", registros);
                p.Add("PI_PAGINA", pagina);
                p.Add("PI_COLUMNA", columna);
                p.Add("PI_ORDEN", orden);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<dynamic>(sp, p, commandType: CommandType.StoredProcedure)
                    .Select(x => new TipoVehiculoConvencionalBE
                    {
                        ID_TIPO_VEHICULO_CONV = (int)x.ID_TIPO_VEHICULO_CONV,
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

        public TipoVehiculoConvencionalBE getTipoVehiculoConvencional(int idTipoVehiculoConvencional, OracleConnection db)
        {
            TipoVehiculoConvencionalBE item = null;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_GET_TIPO_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_CONV", idTipoVehiculoConvencional);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                item = db.QueryFirstOrDefault<TipoVehiculoConvencionalBE>(sp, p, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex) { Log.Error(ex); }

            return item;
        }

        public bool GuardarTipoVehiculoConvencional(TipoVehiculoConvencionalBE oTipoVehiculoConvencional, OracleConnection db)
        {
            bool seActualizo = false;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_PRC_GUARDAR_TIPO_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_CONV", oTipoVehiculoConvencional.ID_TIPO_VEHICULO_CONV);
                p.Add("PI_NOMBRE", oTipoVehiculoConvencional.NOMBRE);
                p.Add("PI_UPD_USUARIO", oTipoVehiculoConvencional.UPD_USUARIO);
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

        public TipoVehiculoConvencionalBE EliminarTipoVehiculoConvencional(TipoVehiculoConvencionalBE oTipoVehiculoConvencional, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Mantenimiento}USP_DEL_TIPO_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_CONV", oTipoVehiculoConvencional.ID_TIPO_VEHICULO_CONV);
                p.Add("PI_UPD_USUARIO", oTipoVehiculoConvencional.UPD_USUARIO);
                db.ExecuteScalar(sp, p, commandType: CommandType.StoredProcedure);
                oTipoVehiculoConvencional.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                oTipoVehiculoConvencional.OK = false;
            }

            return oTipoVehiculoConvencional;
        }
        #endregion
    }
}
