using sres.app.Controllers._Base;
using sres.app.Models;
using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sres.app.Repositorio;

namespace sres.app.Controllers
{
    [RoutePrefix("Electromovilidad")]
    public class ElectromovilidadController : BaseController
    {
        // GET: Electromovilidad
        [SesionOut]
        public ActionResult Index()
        {
            return View();
        }

        [SesionOut]
        [Route("usuario-transpore-publico")]
        public ActionResult UsuarioTransportePublico()
        {
            return View();
        }

        [SesionOut]
        [Route("usuario-vehiculo-convencional")]
        public ActionResult UsuarioVehiculoConvencional()
        {
            return View();
        }

        [SesionOut]
        [Route("usuario-comprar-evaluacion")]
        public ActionResult UsuarioComprarEvaluacion()
        {
            return View();
        }

        [SesionOut]
        [Route("menu-estacion-carga")]
        public ActionResult MenuEstacionCarga()
        {
            return View();
        }

        [SesionOut]
        [Route("registro-estacion-de-carga")]
        public ActionResult EstacionCarga()
        {
            return View();
        }

        [SesionOut]
        [Route("inicio-electromovilidad")]
        public ActionResult MenuElectromovilidad()
        {
            return View();
        }
    }
}