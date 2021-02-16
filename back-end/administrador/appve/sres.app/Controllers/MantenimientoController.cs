using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using sres.be;
using sres.ln;
//using sres.app.Models;
using sres.app.Controllers._Base;

namespace sres.app.Controllers
{
    [SesionOut]
    public class MantenimientoController : Controller
    {
        // GET: Mantenimiento
        public ActionResult TablaMantenimiento()
        {
            return View();
        }

        public ActionResult Usuario()
        {
            return View();
        }

        public ActionResult Anno()
        {
            return View();
        }

        public ActionResult Rol()
        {
            return View();
        }

        public ActionResult TipoVehiculoConvencional()
        {
            return View();
        }

        public ActionResult TipoVehiculoElectrico()
        {
            return View();
        }

        public ActionResult TipoTransporte()
        {
            return View();
        }

        public ActionResult Formula()
        {
            return View();
        }

        public ActionResult ValoresFactor()
        {
            return View();
        }
    }
}