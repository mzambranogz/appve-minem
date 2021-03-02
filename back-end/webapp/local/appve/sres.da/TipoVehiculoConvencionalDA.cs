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
    public class TipoVehiculoConvencionalDA : BaseDA
    {
        public List<TipoVehiculoConvencionalBE> ListarBusquedaTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad, OracleConnection db)
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LISTA_BUSQ_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_BUSCAR", entidad.BUSCAR);
                p.Add("PI_REGISTROS", entidad.CANTIDAD_REGISTROS);
                p.Add("PI_PAGINA", entidad.PAGINA);
                p.Add("PI_COLUMNA", entidad.ORDER_BY);
                p.Add("PI_ORDEN", entidad.ORDER_ORDEN);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<TipoVehiculoConvencionalBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                entidad.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                entidad.OK = false;
            }

            return lista;
        }

        public TipoVehiculoConvencionalBE GuardarTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Mantenimiento}USP_PRC_GUARDAR_TIPO_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_CONV", entidad.ID_TIPO_VEHICULO_CONV);
                p.Add("PI_NOMBRE", entidad.NOMBRE);
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

        public TipoVehiculoConvencionalBE EliminarTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Mantenimiento}USP_DEL_TIPO_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_CONV", entidad.ID_TIPO_VEHICULO_CONV);
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

        public TipoVehiculoConvencionalBE getTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad, OracleConnection db)
        {
            TipoVehiculoConvencionalBE item = new TipoVehiculoConvencionalBE();

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_GET_TIPO_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_CONV", entidad.ID_TIPO_VEHICULO_CONV);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                item = db.Query<TipoVehiculoConvencionalBE>(sp, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
                item.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                item.OK = false;
            }

            return item;
        }

        public List<TipoVehiculoConvencionalBE> ListaTipoVehiculoConvencional(OracleConnection db)
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_TIPO_VEH_CONV";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<TipoVehiculoConvencionalBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }
    }
}
