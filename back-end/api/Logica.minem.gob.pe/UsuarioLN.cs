using Datos.minem.gob.pe;
using Entidad.minem.gob.pe;
using Oracle.DataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Util.minem.gob.pe;

namespace Logica.minem.gob.pe
{
    public class UsuarioLN : BaseLN
    {
        UsuarioDA usuarioDA = new UsuarioDA();
        InstitucionDA instDA = new InstitucionDA();
        public List<UsuarioBE> ListaUsuario()
        {
            List<UsuarioBE> lista = new List<UsuarioBE>();

            try
            {
                cn.Open();
                lista = usuarioDA.ListaUsuario(cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public UsuarioBE ObtenerUsuarioPorCorreo(string correo)
        {
            UsuarioBE item = null;

            try
            {
                cn.Open();
                item = usuarioDA.ObtenerUsuarioPorCorreo(correo, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public List<UsuarioBE> BuscarUsuario(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<UsuarioBE> lista = new List<UsuarioBE>();

            try
            {
                cn.Open();
                lista = usuarioDA.BuscarUsuario(busqueda, estado, registros, pagina, columna, orden, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<UsuarioBE> ListarUsuarioPorRol(int idRol)
        {
            List<UsuarioBE> lista = new List<UsuarioBE>();

            try
            {
                cn.Open();
                lista = usuarioDA.ListarUsuarioPorRol(idRol, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public UsuarioBE ObtenerUsuario(int idUsuario)
        {
            UsuarioBE item = null;

            try
            {
                cn.Open();
                item = usuarioDA.ObtenerUsuario(idUsuario, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public UsuarioBE ObtenerUsuarioPorInstitucionCorreo(int idInstitucion, string correo)
        {
            UsuarioBE item = null;

            try
            {
                cn.Open();
                item = usuarioDA.ObtenerUsuarioPorInstitucionCorreo(idInstitucion, correo, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public bool CambiarEstadoUsuario(UsuarioBE usuario)
        {
            bool valor = false;

            try
            {
                cn.Open();
                valor = usuarioDA.CambiarEstadoUsuario(usuario, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return valor;
        }

        public bool GuardarUsuario(UsuarioBE usuario)
        {
            bool seGuardo = false;

            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    usuario.CONTRASENA = string.IsNullOrEmpty(usuario.CONTRASENA) ? null : Seguridad.hashSal(usuario.CONTRASENA);
                    seGuardo = usuarioDA.GuardarUsuario(usuario, cn);

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }


            return seGuardo;
        }

        public bool ValidarUsuario(string correo, string contraseña, out UsuarioBE outUsuario)
        {
            outUsuario = null;

            bool esValido = false;

            try
            {
                cn.Open();
                outUsuario = usuarioDA.ObtenerUsuarioPorCorreo(correo, cn);
                esValido = outUsuario != null;
                if (esValido) esValido = Seguridad.CompararHashSal(contraseña, outUsuario.CONTRASENA);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return esValido;
        }

        public List<UsuarioBE> getAllEvaluador()
        {
            List<UsuarioBE> lista = new List<UsuarioBE>();

            try
            {
                cn.Open();
                lista = usuarioDA.getAllEvaluador(cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        
        public List<UsuarioBE> ListarUsuarioResponsable(int idConvocatoria)
        {
            List<UsuarioBE> lista = new List<UsuarioBE>();

            try
            {
                cn.Open();
                lista = usuarioDA.ListarUsuarioResponsable(idConvocatoria, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<UsuarioBE> ListarUsuarioResponsableAll(int idConvocatoria)
        {
            List<UsuarioBE> lista = new List<UsuarioBE>();

            try
            {
                cn.Open();
                lista = usuarioDA.ListarUsuarioResponsableAll(idConvocatoria, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public int CambiarClave(UsuarioBE usuario)
        {
            int estado = 0;
            bool cambio = false;
            try
            {
                cn.Open();
                UsuarioBE usu = usuarioDA.ObtenerClave(usuario.ID_USUARIO, cn);
                estado = usu != null ? 0 : 1;
                if (estado == 0)
                {
                    cambio = string.IsNullOrEmpty(usuario.CONTRASENA) ? true : Seguridad.CompararHashSal(usuario.CONTRASENA, usu.CONTRASENA);
                    estado = cambio ? 0 : 2;
                    if (estado == 0)
                    {
                        usuario.CONTRASENA_NUEVO = string.IsNullOrEmpty(usuario.CONTRASENA_NUEVO) ? null : Seguridad.hashSal(usuario.CONTRASENA_NUEVO);
                        estado = usuario.CONTRASENA_NUEVO == null ? 1 : 0;
                        if (estado == 0)
                        {
                            cambio = usuarioDA.CambiarClave(usuario.ID_USUARIO, usuario.CONTRASENA_NUEVO, cn);
                            estado = cambio ? 3 : 1;
                        }
                    }
                }
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }
            return estado;
        }


        public bool VerificarCorreo(string correo)
        {
            bool valor = false;

            try
            {
                cn.Open();
                valor = usuarioDA.VerificarCorreo(correo, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return valor;
        }

        public bool ResetClave(string correo)
        {
            bool valor = false;
            string contrasenaClaro = "";
            string contrasenaEncryptada = "";
            try
            {
                cn.Open();
                contrasenaClaro = Seguridad.GenerarPassword(8);
                contrasenaEncryptada = string.IsNullOrEmpty(contrasenaClaro) ? null : Seguridad.hashSal(contrasenaClaro);
                valor = usuarioDA.ResetClave(correo, contrasenaEncryptada, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return valor;
        }

        public UsuarioBE EliminarUsuario(UsuarioBE oUsuario)
        {
            UsuarioBE item = null;

            try
            {
                cn.Open();
                item = usuarioDA.EliminarUsuario(oUsuario, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public UsuarioBE ConsultarPerfil(int idusuario)
        {
            UsuarioBE item = null;
            try
            {
                cn.Open();
                item = usuarioDA.ObtenerUsuario(idusuario, cn);
                if (item != null)
                    if (item.ID_INSTITUCION > 0)
                        item.INSTITUCION = instDA.ObtenerInstitucion(item.ID_INSTITUCION, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }

        public bool GuardarPerfil(UsuarioBE usuario)
        {
            bool seGuardo = false;
            int idinstitucion = 0;
            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    seGuardo = usuarioDA.GuardarPerfil(usuario, cn);
                    if (seGuardo)
                        if (usuario.ID_INSTITUCION > 0)
                            seGuardo = instDA.RegistrarInstitucion(usuario.INSTITUCION, out idinstitucion, cn);

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }


            return seGuardo;
        }
    }
}
