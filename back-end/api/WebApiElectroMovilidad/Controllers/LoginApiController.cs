using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using WebApiElectroMovilidad.Models;

namespace WebApiElectroMovilidad.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    public class LoginApiController : ApiController
    {
        UsuarioLN usuarioLN = new UsuarioLN();

        [HttpGet]
        [Route("echoping")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("echouser")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
        }

        [HttpPost]
        [Route("authenticate")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {
            UsuarioBE usuario = null;

            if (login == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            //TODO: Validate credentials Correctly, this code is only for demo !!
            bool isCredentialValid = new UsuarioLN().ValidarUsuario(login.Username, login.Password, out usuario);  //(login.Password == "123456");
            if (isCredentialValid)
            {
                if (usuario.FLAG_ESTADO == "0" || usuario.FLAG_ESTADO == "2")
                {
                    return StatusCode(HttpStatusCode.Conflict);
                }
                var token = TokenGenerator.GenerateTokenJwt(login.Username);
                return Ok(token);
            }
            else
            {
                return Unauthorized();
            }

        }

        [HttpPut]
        [Route("reset")]
        public IHttpActionResult RecuperarClave(LoginRequest login)
        {
            if (login == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            bool guardoReset = false;

            guardoReset = usuarioLN.ResetClave(login.Username);
            if (guardoReset)
            {
                return Ok(guardoReset);
            }
            else
            {
                return BadRequest();
            }

        }

        //[HttpPost]
        //[Route("authenticate")]
        //public IHttpActionResult Authenticate(LoginRequest login)
        //{
        //    if (login == null)
        //        throw new HttpResponseException(HttpStatusCode.BadRequest);

        //    //TODO: Validate credentials Correctly, this code is only for demo !!
        //    bool isCredentialValid = (login.Password == ConfigurationManager.AppSettings["JWT_CLAVE"]); //(login.Password == "123456");
        //    if (isCredentialValid)
        //    {
        //        var token = TokenGenerator.GenerateTokenJwt(login.Username);
        //        return Ok(token);
        //    }
        //    else
        //    {
        //        return Unauthorized();
        //    }

        //}
    }
}
