using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;

namespace sres.app.Controllers.Api
{
    [RoutePrefix("api/usuario")]
    public class UsuarioController : ApiController
    {
        UsuarioLN usuarioLN = new UsuarioLN();

        Mailing mailing = new Mailing();

        [Route("buscarusuario")]
        [HttpGet]
        public List<UsuarioBE> BuscarUsuario(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            return usuarioLN.BuscarUsuario(busqueda, estado , registros, pagina, columna, orden);
        }

        [Route("obtenerusuario")]
        [HttpGet]
        public UsuarioBE ObtenerUsuario(int idUsuario)
        {
            return usuarioLN.ObtenerUsuario(idUsuario);
        }

        [Route("obtenerusuarioporinstitucioncorreo")]
        [HttpGet]
        public Dictionary<string, object> ObtenerUsuarioPorInstitucionCorreo(int idInstitucion, string correo)
        {
            UsuarioBE usuario = usuarioLN.ObtenerUsuarioPorInstitucionCorreo(idInstitucion, correo);
            return new Dictionary<string, object>
            {
                ["EXISTE"] = usuario != null,
                ["USUARIO"] = usuario
            };
        }

        [Route("validarusuarioporcorreo")]
        [HttpGet]
        public Dictionary<string, object> ObtenerUsuarioPorCorreo(string correo)
        {
            UsuarioBE usuario = usuarioLN.ObtenerUsuarioPorCorreo(correo);
            return new Dictionary<string, object>
            {
                ["EXISTE"] = usuario != null,
                ["USUARIO"] = usuario
            };
        }

        [Route("guardarusuario")]
        [HttpPost]
        public bool GuardarUsuario(UsuarioBE usuario)
        {
            //bool esRegistroNuevo = usuario.ID_USUARIO < 1;
            //string estado = esRegistroNuevo ? "0" : usuarioLN.ObtenerUsuario(usuario.ID_USUARIO).FLAG_ESTADO;
            bool seGuardo = usuarioLN.GuardarUsuario(usuario);
            return seGuardo;
        }

        [Route("obtenerallevaluador")]
        [HttpGet]
        public List<UsuarioBE> ObtenerEvaluador()
        {
            try
            {
                return usuarioLN.getAllEvaluador();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [Route("cambiarclaveusuario")]
        [HttpPost]
        public int CambiarClave(UsuarioBE usuario)
        {
            int estado = 0;
            try
            {
                estado = usuarioLN.CambiarClave(usuario);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return estado;
        }

        [Route("enviarlinkrecuperarcontraseña")]
        [HttpGet]
        public Dictionary<string, object> EnviarLinkRecuperarContraseña(string correo, int flagrecuperar)
        {
            UsuarioBE usuario = usuarioLN.ObtenerUsuarioPorCorreo(correo);

            if (usuario == null) return new Dictionary<string, object>
            {
                ["tipo"] = 1,
                ["success"] = false,
                ["message"] = "correo no existe",
                ["usuario"] = 0,
                ["flagrecuperar"] = 0
            };

            if (usuario.TIPO_REGISTRO == 2 || usuario.TIPO_REGISTRO == 3) return new Dictionary<string, object>
            {
                ["tipo"] = 5,
                ["success"] = false,
                ["message"] = "No se puede recuperar la contraseña porque esta cuenta esta asociado a una red social (Facebook | Google)",
                ["usuario"] = 0,
                ["flagrecuperar"] = 0
            };

            if (usuario.FLAG_RECUPERAR == 1)
            {
                return new Dictionary<string, object>
                {
                    ["tipo"] = 2,
                    ["success"] = true,
                    ["message"] = "",
                    ["usuario"] = usuario.ID_USUARIO,
                    ["flagrecuperar"] = usuario.FLAG_RECUPERAR
                };
            }

            usuario.FLAG_RECUPERAR = flagrecuperar;
            bool v = usuarioLN.ActualizarRecuperar(usuario);

            if (v)
            {
                string fechaHoraExpiracion = DateTime.Now.AddMinutes(10).ToString("yyyy-MM-ddTHH:mm:ss.fffK");
                string idUsuario = usuario.ID_USUARIO.ToString();

                string fieldServer = "[SERVER]", fieldNombres = "[NOMBRES]", fieldMensaje = "[MENSAJE]";
                string[] fields = new string[] { fieldServer, fieldNombres, fieldMensaje };
                string[] fieldsRequire = new string[] { fieldServer, fieldNombres, fieldMensaje };
                string mensaje = "";
                if (flagrecuperar == 2)
                    mensaje = $"<td style='padding: 5px;'><span style='font-family: sans-serif;'>Hola " + usuario.NOMBRES + ", puedes restablecer tu contraseña de la plataforma Electromovilidad accediendo a este enlace:</span><br /><span><a href='" + AppSettings.Get<string>("Server") + "Login/CambiarContraseña/" + usuario.ID_USUARIO.ToString() + "'>" + AppSettings.Get<string>("Server") + "Login/CambiarContraseña/" + usuario.ID_USUARIO.ToString() + "</a></span></td>";
                else
                    mensaje = $"<td style='padding: 5px;'><span style='font-family: sans-serif;'>Hemos recibido su solicitud de recuperación de clave, por favor abra su aplicación móvil y diríjase nuevamente a la opción ¿Olvidaste tu contraseña?, para cambiar su contraseña.</span></td>";
                Dictionary<string, string> dataBody = new Dictionary<string, string> { [fieldServer] = AppSettings.Get<string>("Server"), [fieldNombres] = usuario.NOMBRES, [fieldMensaje] = mensaje };
                string subject = $"{usuario.NOMBRES}, recupere su contraseña";
                MailAddressCollection mailTo = new MailAddressCollection();
                mailTo.Add(new MailAddress(usuario.CORREO, $"{usuario.NOMBRES}"));

                Task.Factory.StartNew(() => mailing.SendMail(Mailing.Templates.RecuperacionClave, dataBody, fields, fieldsRequire, subject, mailTo));

                return new Dictionary<string, object>
                {
                    ["tipo"] = 3,
                    ["success"] = true,
                    ["message"] = $"se envió link al correo {correo}",
                    ["usuario"] = 0,
                    ["flagrecuperar"] = 0
                };
            }
            else
            {
                return new Dictionary<string, object>
                {
                    ["tipo"] = 4,
                    ["success"] = true,
                    ["message"] = $"ocurrió un problema en el proceso de recuperar contraseña, intentelo nuevamente",
                    ["usuario"] = 0,
                    ["flagrecuperar"] = 0
                };
            }

        }

        [Route("verificarcorreo")]
        [HttpGet]
        public bool VerificarCorreo(string correo)
        {
            return usuarioLN.VerificarCorreo(correo);
        }

        [Route("consultarperfil")]
        [HttpGet]
        public UsuarioBE ConsultarPerfil(int idusuario)
        {
            return usuarioLN.ConsultarPerfil(idusuario);
        }

        [Route("guardarperfil")]
        [HttpPost]
        public bool GuardarPerfil(UsuarioBE usuario)
        {
            return usuarioLN.GuardarPerfil(usuario);
        }

        [Route("nuevaclaveusuario")]
        [HttpPost]
        public int NuevaClave(UsuarioBE usuario)
        {
            int estado = 0;
            try
            {
                estado = usuarioLN.NuevaClave(usuario);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return estado;
        }
    }
}
