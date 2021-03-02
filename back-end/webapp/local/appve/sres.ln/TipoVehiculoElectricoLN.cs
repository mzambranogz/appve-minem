using sres.be;
using sres.da;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.ln
{
    public class TipoVehiculoElectricoLN : BaseLN
    {
        TipoVehiculoElectricoDA tipoDA = new TipoVehiculoElectricoDA();

        public List<TipoVehiculoElectricoBE> ListaBusquedaTipoVehiculoElectrico(TipoVehiculoElectricoBE entidad)
        {
            List<TipoVehiculoElectricoBE> lista = new List<TipoVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListarBusquedaTipoVehiculoElectrico(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public TipoVehiculoElectricoBE GuardarTipoVehiculoElectrico(TipoVehiculoElectricoBE entidad)
        {
            TipoVehiculoElectricoBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.GuardarTipoVehiculoElectrico(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoVehiculoElectricoBE getTipoVehiculoElectrico(TipoVehiculoElectricoBE entidad)
        {
            TipoVehiculoElectricoBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoVehiculoElectrico(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoVehiculoElectricoBE EliminarTipoVehiculoElectrico(TipoVehiculoElectricoBE entidad)
        {
            TipoVehiculoElectricoBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoVehiculoElectrico(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<TipoVehiculoElectricoBE> ListaTipoVehiculoElectrico()
        {
            List<TipoVehiculoElectricoBE> lista = new List<TipoVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaTipoVehiculoElectrico(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<ModeloVehiculoElectricoBE> ListaModeloVehiculoElectrico()
        {
            List<ModeloVehiculoElectricoBE> lista = new List<ModeloVehiculoElectricoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaModeloVehiculoElectrico(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
