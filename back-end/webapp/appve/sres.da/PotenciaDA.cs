﻿using Dapper;
using Oracle.DataAccess.Client;
using sres.be;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.da
{
    public class PotenciaDA : BaseDA
    {
        public List<PotenciaBE> ListaPotencia(OracleConnection db)
        {
            List<PotenciaBE> lista = new List<PotenciaBE>();

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LIST_POTENCIA";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<PotenciaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }
    }
}
