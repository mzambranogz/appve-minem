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
    public class FormulaLN : BaseLN
    {
        FormulaDA formDA = new FormulaDA();

        public List<FormulaBE> ListaBusquedaFormula(FormulaBE entidad)
        {
            List<FormulaBE> lista = new List<FormulaBE>();

            try
            {
                cn.Open();
                lista = formDA.ListarBusquedaFormula(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public FormulaBE getFormula(FormulaBE entidad)
        {
            FormulaBE item = null;
            try
            {
                cn.Open();
                item = formDA.getFormula(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public FormulaBE ActualizarFormula(FormulaBE entidad)
        {
            FormulaBE item = null;
            try
            {
                cn.Open();
                item = formDA.ActualizarFormula(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }
    }
}
