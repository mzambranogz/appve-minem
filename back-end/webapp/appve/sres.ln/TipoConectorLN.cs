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
    public class TipoConectorLN : BaseLN
    {
        TipoConectorDA tipoDA = new TipoConectorDA();

        public List<TipoConectorBE> ListaBusquedaTipoConector(TipoConectorBE entidad)
        {
            List<TipoConectorBE> lista = new List<TipoConectorBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListarBusquedaTipoConector(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public TipoConectorBE GuardarTipoConector(TipoConectorBE entidad)
        {
            TipoConectorBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.GuardarTipoConector(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoConectorBE getTipoConector(TipoConectorBE entidad)
        {
            TipoConectorBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoConector(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoConectorBE EliminarTipoConector(TipoConectorBE entidad)
        {
            TipoConectorBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoConector(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<TipoConectorBE> ListaTipoConector()
        {
            List<TipoConectorBE> lista = new List<TipoConectorBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaTipoConector(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
