using System.Data;
using Datos.minem.gob.pe;
using Entidad.minem.gob.pe;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Util.minem.gob.pe;

namespace Logica.minem.gob.pe
{
    public class ModeloVehiculoElectricoLN : BaseLN
    {
        ModeloVehiculoElectricoDA tipoDA = new ModeloVehiculoElectricoDA();

        public List<ModeloVehiculoElectricoBE> ListadoModeloVehiculo()
        {
            List<ModeloVehiculoElectricoBE> lista = new List<ModeloVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoModeloVehiculo(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<ModeloVehiculoElectricoBE> ListadoActivoModeloVehiculo()
        {
            List<ModeloVehiculoElectricoBE> lista = new List<ModeloVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoActivoModeloVehiculo(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
