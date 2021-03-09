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
        public Dictionary<string, object> EnviarLinkRecuperarContraseña(string correo)
        {
            UsuarioBE usuario = usuarioLN.ObtenerUsuarioPorCorreo(correo);

            if (usuario == null) return new Dictionary<string, object>
            {
                ["success"] = false,
                ["message"] = "correo no existe"
            };

            string fechaHoraExpiracion = DateTime.Now.AddMinutes(10).ToString("yyyy-MM-ddTHH:mm:ss.fffK");
            string idUsuario = usuario.ID_USUARIO.ToString();

            string fieldServer = "[SERVER]", fieldNombres = "[NOMBRES]", fieldIdUsuario = "[ID_USUARIO]";
            string[] fields = new string[] { fieldServer, fieldNombres, fieldIdUsuario };
            string[] fieldsRequire = new string[] { fieldServer, fieldNombres, fieldIdUsuario };
            Dictionary<string, string> dataBody = new Dictionary<string, string> { [fieldServer] = AppSettings.Get<string>("Server"), [fieldNombres] = usuario.NOMBRES, [fieldIdUsuario] = usuario.ID_USUARIO.ToString() };
            string subject = $"{usuario.NOMBRES}, recupere su contraseña";
            MailAddressCollection mailTo = new MailAddressCollection();
            mailTo.Add(new MailAddress(usuario.CORREO, $"{usuario.NOMBRES}"));

            Task.Factory.StartNew(() => mailing.SendMail(Mailing.Templates.RecuperacionClave, dataBody, fields, fieldsRequire, subject, mailTo));

            return new Dictionary<string, object>
            {
                ["success"] = true,
                ["message"] = $"se envió link al correo {correo}"
            };
        }

        [Route("verificarcorreo")]
        [HttpGet]
        public bool VerificarCorreo(string correo)
        {
            return usuarioLN.VerificarCorreo(correo);
        }
    }
}
