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
    public class ModeloVehiculoElectricoDA : BaseDA
    {
        public List<ModeloVehiculoElectricoBE> ListadoModeloVehiculo(OracleConnection db)
        {
            List<ModeloVehiculoElectricoBE> lista = new List<ModeloVehiculoElectricoBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_MODELO_VEH";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<ModeloVehiculoElectricoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<ModeloVehiculoElectricoBE> ListadoActivoModeloVehiculo(OracleConnection db)
        {
            List<ModeloVehiculoElectricoBE> lista = new List<ModeloVehiculoElectricoBE>();
            List<ModeloVehiculoElectricoBE> listaActivosModelo = new List<ModeloVehiculoElectricoBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_MODELO_VEH";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<ModeloVehiculoElectricoBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                var listaActivos = lista.Where(s => s.FLAG_ESTADO == "1").Select(s => s);
                listaActivosModelo = listaActivos.ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }
    }
}
