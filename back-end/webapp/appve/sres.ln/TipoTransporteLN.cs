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
    public class TipoTransporteLN : BaseLN
    {
        TipoTransporteDA tipoDA = new TipoTransporteDA();

        public List<TipoTransporteBE> ListaBusquedaTipoTransporte(TipoTransporteBE entidad)
        {
            List<TipoTransporteBE> lista = new List<TipoTransporteBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListarBusquedaTipoTransporte(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public TipoTransporteBE GuardarTipoTransporte(TipoTransporteBE entidad)
        {
            TipoTransporteBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.GuardarTipoTransporte(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoTransporteBE getTipoTransporte(TipoTransporteBE entidad)
        {
            TipoTransporteBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoTransporte(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoTransporteBE EliminarTipoTransporte(TipoTransporteBE entidad)
        {
            TipoTransporteBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoTransporte(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<TipoTransporteBE> ListaTipoTransporte()
        {
            List<TipoTransporteBE> lista = new List<TipoTransporteBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaTipoTransporte(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
