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
    public class TipoVehiculoElectricoDA : BaseDA
    {
        #region PAQUETE MANTENIMIENTO

        public List<TipoVehiculoElectricoBE> BuscarTipoVehiculoElectrico(string busqueda, int registros, int pagina, string columna, string orden, OracleConnection db)
        {
            List<TipoVehiculoElectricoBE> lista = null;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LISTA_BUSQ_VEH_ELEC";
                var p = new OracleDynamicParameters();
                p.Add("PI_BUSCAR", busqueda);
                p.Add("PI_REGISTROS", registros);
                p.Add("PI_PAGINA", pagina);
                p.Add("PI_COLUMNA", columna);
                p.Add("PI_ORDEN", orden);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<dynamic>(sp, p, commandType: CommandType.StoredProcedure)
                    .Select(x => new TipoVehiculoElectricoBE
                    {
                        ID_TIPO_VEHICULO_ELEC = (int)x.ID_USUARIO,
                        NOMBRE = (string)x.NOMBRES,
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

        public TipoVehiculoElectricoBE getTipoVehiculoElectrico(int idTipoVehiculoElectrico, OracleConnection db)
        {
            TipoVehiculoElectricoBE item = null;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_GET_TIPO_VEH_ELEC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_ELEC", idTipoVehiculoElectrico);
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                item = db.QueryFirstOrDefault<TipoVehiculoElectricoBE>(sp, p, commandType: CommandType.StoredProcedure);
            }
            catch (Exception ex) { Log.Error(ex); }

            return item;
        }

        public bool GuardarTipoVehiculoElectrico(TipoVehiculoElectricoBE oTipoVehiculoElectrico, OracleConnection db)
        {
            bool seActualizo = false;

            try
            {
                string sp = $"{Package.Mantenimiento}USP_PRC_GUARDAR_TIPO_VEH_ELEC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_ELEC", oTipoVehiculoElectrico.ID_TIPO_VEHICULO_ELEC);
                p.Add("PI_NOMBRE", oTipoVehiculoElectrico.NOMBRE);
                p.Add("PI_UPD_USUARIO", oTipoVehiculoElectrico.UPD_USUARIO);
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

        public TipoVehiculoElectricoBE EliminarTipoVehiculoElectrico(TipoVehiculoElectricoBE oTipoVehiculoElectrico, OracleConnection db)
        {
            try
            {
                string sp = $"{Package.Mantenimiento}USP_DEL_TIPO_VEH_ELEC";
                var p = new OracleDynamicParameters();
                p.Add("PI_ID_TIPO_VEHICULO_ELEC", oTipoVehiculoElectrico.ID_TIPO_VEHICULO_ELEC);
                p.Add("PI_UPD_USUARIO", oTipoVehiculoElectrico.UPD_USUARIO);
                db.ExecuteScalar(sp, p, commandType: CommandType.StoredProcedure);
                oTipoVehiculoElectrico.OK = true;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                oTipoVehiculoElectrico.OK = false;
            }

            return oTipoVehiculoElectrico;
        }

        #endregion

    }
}
