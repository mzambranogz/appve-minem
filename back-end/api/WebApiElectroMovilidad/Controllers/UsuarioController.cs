using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web.Http;
using Util.minem.gob.pe;

namespace WebApiElectroMovilidad.Controllers
{

    [AllowAnonymous]
    [RoutePrefix("api/usuario")]
    public class UsuarioController : ApiController
    {
        UsuarioLN usuarioLN = new UsuarioLN();
        RolLN rolLN = new RolLN();
        Mailing mailing = new Mailing();


        [Route("buscarusuario")]
        [HttpGet]
        public List<UsuarioBE> BuscarUsuario(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            return usuarioLN.BuscarUsuario(busqueda, estado, registros, pagina, columna, orden);
        }

        [HttpGet]
        [Route("GetByFilter")]
        public UsuarioBE LeerUsuario(int idUsuario)
        {
            UsuarioBE entidad = null;

            entidad = usuarioLN.ObtenerUsuario(idUsuario);
            return entidad;
        }

        [HttpPost]
        [Route("insert")]
        public IHttpActionResult AgregarUsuario(UsuarioBE entidad)
        {
            bool guardoUsuario = false;

            guardoUsuario = usuarioLN.GuardarUsuario(entidad);
            if (guardoUsuario)
            {
                return Ok(entidad);
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("obtenerall")]
        [HttpGet]
        public List<UsuarioBE> ListadoUsuario()
        {
            return usuarioLN.ListaUsuario();
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool EliminarTipoCombustible(UsuarioBE oUsuario)
        {
            UsuarioBE c = usuarioLN.EliminarUsuario(oUsuario);
            return c.OK;
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

        [Route("verificarcorreo")]
        [HttpGet]
        public bool VerificarCorreo(string correo)
        {
            return usuarioLN.VerificarCorreo(correo);
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
    }
}
