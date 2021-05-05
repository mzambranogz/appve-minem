using Datos.minem.gob.pe;
using Entidad.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logica.minem.gob.pe
{
    public class PotenciaLN: BaseLN
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
