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
    public class DepartamentoLN : BaseLN
    {
        DepartamentoDA tipoDA = new DepartamentoDA();
        public List<DepartamentoBE> ListadoDepartamento()
        {
            List<DepartamentoBE> lista = new List<DepartamentoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoDepartamento(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<DepartamentoBE> ListadoActivoDepartamento()
        {
            List<DepartamentoBE> lista = new List<DepartamentoBE>();

            try
            {
                cn.Open();
                lista = tipoDA.ListadoActivoDepartamento(cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
