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
    public class TipoCargadorLN : BaseLN
    {
        TipoCargadorDA tipoDA = new TipoCargadorDA();
        public List<TipoCargadorBE> ListaTipoCargador()
        {
            List<TipoCargadorBE> lista = new List<TipoCargadorBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaTipoCargador(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<CargadorPotenciaBE> ListaCargadorPotencia()
        {
            List<CargadorPotenciaBE> lista = new List<CargadorPotenciaBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListaCargadorPotencia(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
