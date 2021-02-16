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
    public class ParametroLN : BaseLN
    {
        ParametroDA paramDA = new ParametroDA();

        public List<ParametroBE> ListaParametro(int idcaso)
        {
            List<ParametroBE> lista = new List<ParametroBE>();
            try
            {
                cn.Open();
                lista = paramDA.ListaParametro(idcaso, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
