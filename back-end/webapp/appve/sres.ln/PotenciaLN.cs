using System;
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
    public class PotenciaLN : BaseLN
    {
        PotenciaDA PotenciaDA = new PotenciaDA();
        public List<PotenciaBE> ListaPotencia()
        {
            List<PotenciaBE> lista = new List<PotenciaBE>();

            try
            {
                cn.Open();
                lista = PotenciaDA.ListaPotencia(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
