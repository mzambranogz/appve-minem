using System.Data;
using Datos.minem.gob.pe;
using Entidad.minem.gob.pe;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Util.minem.gob.pe;

namespace Logica.minem.gob.pe
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
