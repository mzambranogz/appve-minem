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
    public class RolLN: BaseLN
    {

        RolDA rolDA = new RolDA();
        public RolBE GuardarRol(RolBE entidad)
        {
            RolBE item = null;

            try
            {
                cn.Open();
                item = rolDA.GuardarRol(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public RolBE getRol(RolBE entidad)
        {
            RolBE item = null;

            try
            {
                cn.Open();
                item = rolDA.getRol(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public RolBE ObtenerRol(int idRol)
        {
            RolBE item = null;

            try
            {
                cn.Open();
                item = rolDA.ObtenerRol(idRol, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<RolBE> ListaBusquedaRol(RolBE entidad)
        {
            List<RolBE> lista = new List<RolBE>();

            try
            {
                cn.Open();
                lista = rolDA.ListarBusquedaRol(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<RolBE> ListarRolPorEstado(string flagEstado)
        {
            List<RolBE> lista = new List<RolBE>();

            try
            {
                cn.Open();
                lista = rolDA.ListarRolPorEstado(flagEstado, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<RolBE> ListaRol()
        {
            List<RolBE> lista = new List<RolBE>();

            try
            {
                cn.Open();
                lista = rolDA.ListaRol(cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
        public RolBE EliminarRol(RolBE oRol)
        {
            RolBE item = null;

            try
            {
                cn.Open();
                item = rolDA.EliminarRol(oRol, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }



    }
}
