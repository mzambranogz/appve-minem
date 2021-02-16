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
    public class DepartamentoLN : BaseLN
    {
        DepartamentoDA depDA = new DepartamentoDA();

        public List<DepartamentoBE> ListaDepartamento()
        {
            List<DepartamentoBE> lista = new List<DepartamentoBE>();

            try
            {
                cn.Open();
                lista = depDA.ListaDepartamento(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
