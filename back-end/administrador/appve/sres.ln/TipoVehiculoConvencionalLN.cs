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
    public class TipoVehiculoConvencionalLN : BaseLN
    {
        TipoVehiculoConvencionalDA tipoDA = new TipoVehiculoConvencionalDA();

        public List<TipoVehiculoConvencionalBE> ListaBusquedaTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad)
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListarBusquedaTipoVehiculoConvencional(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public TipoVehiculoConvencionalBE GuardarTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad)
        {
            TipoVehiculoConvencionalBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.GuardarTipoVehiculoConvencional(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoVehiculoConvencionalBE getTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad)
        {
            TipoVehiculoConvencionalBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoVehiculoConvencional(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoVehiculoConvencionalBE EliminarTipoVehiculoConvencional(TipoVehiculoConvencionalBE entidad)
        {
            TipoVehiculoConvencionalBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoVehiculoConvencional(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<TipoVehiculoConvencionalBE> ListaTipoVehiculoConvencional()
        {
            List<TipoVehiculoConvencionalBE> lista = new List<TipoVehiculoConvencionalBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaTipoVehiculoConvencional(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
