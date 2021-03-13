﻿using sres.app.Controllers._Base;
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
        EstacionCargaLN estacionLN = new EstacionCargaLN();
        // GET: Electromovilidad
        [SesionOut]
        public ActionResult Index()
        {
            return View();
        }

        [SesionOut]
        [Route("mis-consultas-y-resultados")]
        public ActionResult ConsultasResultados()
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
        [Route("estaciones-de-carga")]
        public ActionResult EstacionesCarga()
        {
            return View();
        }

        [SesionOut]
        [Route("estacion-de-carga")]
        public ActionResult EstacionCarga()
        {
            UsuarioBE usuario = ObtenerUsuarioLogin();
            //usuario = estacionLN.getInstitucion(usuario.ID_USUARIO);
            ViewData["usuario"] = usuario;
            ViewData["estacion"] = 0;
            return View();
        }

        [SesionOut]
        [Route("inicio-electromovilidad")]
        public ActionResult MenuElectromovilidad()
        {
            return View();
        }

        [SesionOut]
        [Route("{idEstacion}/Estacion")]
        public ActionResult EstacionCarga(int idEstacion)
        {
            UsuarioBE usuario = ObtenerUsuarioLogin();
            //usuario = estacionLN.getInstitucion(usuario.ID_USUARIO);
            ViewData["usuario"] = usuario;
            ViewData["estacion"] = idEstacion;
            return View();
        }

        [SesionOut]
        [Route("ver-resultado/{idresultado}")]
        public ActionResult VerResultado(int idresultado)
        {
            UsuarioBE usuario = ObtenerUsuarioLogin();
            //usuario = estacionLN.getInstitucion(usuario.ID_USUARIO);
            ViewData["usuario"] = usuario;
            ViewData["resultado"] = idresultado;
            return View();
        }

        [SesionOut]
        [Route("estaciones-mapa")]
        public ActionResult EstacionesMapa()
        {
            return View();
        }

        [SesionOut]
        [Route("ver-perfil")]
        public ActionResult Perfil()
        {
            return View();
        }

        [SesionOut]
        [Route("{idestacion}/revision-estacion-de-carga")]
        public ActionResult EstacionCargaRevision(int idestacion)
        {
            ViewData["estacion"] = idestacion;
            return View();
        }
    }
}