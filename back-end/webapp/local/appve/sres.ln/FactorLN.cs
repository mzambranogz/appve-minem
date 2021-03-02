using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using sres.da;
using sres.be;
using System.Data;
using Oracle.DataAccess.Client;
using sres.ut;

namespace sres.ln
{
    public class FactorLN : BaseLN
    {
        FactorDA factorda = new FactorDA();

        public List<FactorBE> ListaFactor(int idcaso)
        {
            List<FactorBE> lista = new List<FactorBE>();
            try
            {
                cn.Open();
                lista = factorda.ListaFactor(idcaso, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public FactorBE getFactorValor(FactorBE entidad)
        {
            FactorBE fac = new FactorBE();
            List<FactorDataBE> lista = new List<FactorDataBE>();
            List<FactorParametroBE> listaFP = new List<FactorParametroBE>();
            try
            {
                cn.Open();
                listaFP = factorda.ListaFactorParametro(entidad, cn);
                if (listaFP.Count > 0)
                    foreach (FactorParametroBE p in listaFP)
                        p.LIST_PARAMDET = factorda.ParametroDetalleData(new ParametroBE { ID_PARAMETRO = p.ID_PARAMETRO }, cn);

                lista = factorda.getFactorValor(entidad, cn);
                fac.LISTA_PARAM_FACTOR = listaFP;
                fac.LISTA_FAC_DATA = lista;

            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return fac;
        }

        public bool GuardarFactorValor(FactorBE entidad)
        {
            bool seGuardo = false;
            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    if (entidad.LISTA_FAC_DATA.Count > 0)
                        foreach (FactorDataBE fd in entidad.LISTA_FAC_DATA)
                            if (!(seGuardo = factorda.GuardarFactorValor(fd, cn).OK)) break;

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return seGuardo;
        }
    }
}
