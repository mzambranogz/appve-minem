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
    public class ElectromovilidadLN : BaseLN
    {
        ElectromivilidadDA elecDA = new ElectromivilidadDA();
        
        public FactorDataBE ListaFactor1P(int idfactor, int p1, int v1)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                cn.Open();
                obj = elecDA.ListaFactor1P(idfactor, p1, v1, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return obj;
        }

        public FactorDataBE ListaFactor2P(int idfactor, int p1, int p2, int v1, int v2)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                cn.Open();
                obj = elecDA.ListaFactor2P(idfactor, p1, p2, v1, v2, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return obj;
        }

        public FactorDataBE ListaFactor3P(int idfactor, int p1, int p2, int p3, int v1, int v2, int v3)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                cn.Open();
                obj = elecDA.ListaFactor3P(idfactor, p1, p2, p3, v1, v2, v3, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return obj;
        }
    }
}
