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
    public class ModoCargaDA : BaseDA
    {
        public List<ModoCargaBE> ListaModoCarga(OracleConnection db)
        {
            List<ModoCargaBE> lista = new List<ModoCargaBE>();

            try
            {
                string sp = $"{Package.Mantenimiento}USP_SEL_LIST_MODO_CARGA";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<ModoCargaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }
    }
}
