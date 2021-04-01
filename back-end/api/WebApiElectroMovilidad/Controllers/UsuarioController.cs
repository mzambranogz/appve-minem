using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System.Collections.Generic;
using System.Web.Http;

namespace WebApiElectroMovilidad.Controllers
{

    [AllowAnonymous]
    [RoutePrefix("api/usuario")]
    public class UsuarioController : ApiController
    {
        UsuarioLN usuarioLN = new UsuarioLN();
        RolLN rolLN = new RolLN();

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

    }
}
