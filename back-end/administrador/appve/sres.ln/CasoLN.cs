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
    public class CasoLN : BaseLN
    {
        CasoDA casoda = new CasoDA();

        public List<CasoBE> ListaCasoFactor(CasoBE entidad)
        {
            List<CasoBE> lista = new List<CasoBE>();
            try
            {
                cn.Open();
                lista = casoda.ListarBusquedaCasoFactor(entidad, cn);
                if (lista.Count > 0)
                    foreach (CasoBE c in lista)
                        c.LISTA_FACTOR = casoda.listaCasoFactor(c.ID_CASO, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
        public List<CasoBE> ListaCaso()
        {
            List<CasoBE> lista = new List<CasoBE>();
            try
            {
                cn.Open();
                lista = casoda.ListaCaso(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
