﻿using Dapper;
using Entidad.minem.gob.pe;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Util.minem.gob.pe;

namespace Datos.minem.gob.pe
{
    public class TipoCargadorDA : BaseDA
    {
        public List<TipoCargadorBE> ListadoTipoCargador(OracleConnection db)
        {
            List<TipoCargadorBE> lista = new List<TipoCargadorBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_TIPO_CARGADOR";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<TipoCargadorBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<TipoCargadorBE> ListadoActivoTipoCargador(OracleConnection db)
        {
            List<TipoCargadorBE> lista = new List<TipoCargadorBE>();
            List<TipoCargadorBE> listaActivosTipoCargador = new List<TipoCargadorBE>();
            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_TIPO_CARGADOR";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<TipoCargadorBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                var listaActivos = lista.Where(s => s.FLAG_ESTADO == "1").Select(s => s);
                listaActivosTipoCargador = listaActivos.ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<CargadorPotenciaBE> ListadoCargadorPotencia(OracleConnection db)
        {
            List<CargadorPotenciaBE> lista = new List<CargadorPotenciaBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_CARGADOR_POTENC";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<CargadorPotenciaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<CargadorPotenciaBE> ListadoActivoCargadorPotencia(OracleConnection db)
        {
            List<CargadorPotenciaBE> lista = new List<CargadorPotenciaBE>();
            List<CargadorPotenciaBE> listaActivosCargadorPotencia = new List<CargadorPotenciaBE>();

            try
            {
                string sp = $"{Package.Calculo}USP_SEL_LIST_CARGADOR_POTENC";
                var p = new OracleDynamicParameters();
                p.Add("PO_REF", dbType: OracleDbType.RefCursor, direction: ParameterDirection.Output);
                lista = db.Query<CargadorPotenciaBE>(sp, p, commandType: CommandType.StoredProcedure).ToList();
                var listaActivos = lista.Where(s => s.FLAG_ESTADO == "1").Select(s => s);
                listaActivosCargadorPotencia = listaActivos.ToList();
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }
    }
}
