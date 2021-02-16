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
    public class TipoCombustibleLN : BaseLN
    {
        TipoCombustibleDA tipoDA = new TipoCombustibleDA();

        public List<TipoCombustibleBE> ListaBusquedaTipoCombustible(TipoCombustibleBE entidad)
        {
            List<TipoCombustibleBE> lista = new List<TipoCombustibleBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListarBusquedaTipoCombustible(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public TipoCombustibleBE GuardarTipoCombustible(TipoCombustibleBE entidad)
        {
            TipoCombustibleBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.GuardarTipoCombustible(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoCombustibleBE getTipoCombustible(TipoCombustibleBE entidad)
        {
            TipoCombustibleBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.getTipoCombustible(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public TipoCombustibleBE EliminarTipoCombustible(TipoCombustibleBE entidad)
        {
            TipoCombustibleBE item = null;

            try
            {
                cn.Open();
                item = tipoDA.EliminarTipoCombustible(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<TipoCombustibleBE> ListaTipoCombustible()
        {
            List<TipoCombustibleBE> lista = new List<TipoCombustibleBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaTipoCombustible(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
