using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using WebApiElectroMovilidad.Models;

namespace WebApiElectroMovilidad.Controllers
{

    [Authorize]
    [RoutePrefix("api/usuario")]
    public class UsuarioController : ApiController
    {
        UsuarioLN usuarioLN = new UsuarioLN();
        RolLN rolLN = new RolLN();

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

        [HttpGet]
        [Route("GetByFilter")]
        public UsuarioBE LeerUsuario(int idUsuario)
        {
            UsuarioBE entidad = null;

            entidad = usuarioLN.ObtenerUsuario(idUsuario);
            return entidad;
        }

    }
}
