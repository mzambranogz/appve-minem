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
    public class ModoCargaLN: BaseLN
    {
        ModoCargaDA ModoCargaDA = new ModoCargaDA();
        public List<ModoCargaBE> ListaModoCarga()
        {
            List<ModoCargaBE> lista = new List<ModoCargaBE>();

            try
            {
                cn.Open();
                lista = ModoCargaDA.ListaModoCarga(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
