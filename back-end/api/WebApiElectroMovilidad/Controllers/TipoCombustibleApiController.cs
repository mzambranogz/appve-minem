﻿using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Web.Http;
using Util.minem.gob.pe;

namespace WebApiElectroMovilidad.Controllers
{
    [Authorize]
    [RoutePrefix("api/tipocombustible")]
    public class TipoCombustibleApiController : ApiController
    {
        TipoCombustibleLN tipoLN = new TipoCombustibleLN();

        [HttpGet]
        [Route("buscar")]
        public List<TipoCombustibleBE> Buscar(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<TipoCombustibleBE> lista = new List<TipoCombustibleBE>();
            try
            {
                lista = tipoLN.BuscarTipoCombustible(busqueda, estado, registros, pagina, columna, orden);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
            return lista;
        }

        [HttpPost]
        [Route("agregar")]
        public IHttpActionResult AgregarTipoCombustible(TipoCombustibleBE oTipoCombustible)
        {
            bool exito = false;

            exito = tipoLN.GuardarTipoCombustible(oTipoCombustible);
            if (exito)
            {
                return Ok(oTipoCombustible);
            }
            else
            {
                return BadRequest();
            }
        }

        [Route("obtener")]
        [HttpGet]
        public TipoCombustibleBE GetTipoCombustible(int id)
        {
            TipoCombustibleBE ent = new TipoCombustibleBE();
            try
            {
                ent = tipoLN.getTipoCombustible(id);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
                return null;
            }
            return ent;
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool EliminarTipoCombustible(TipoCombustibleBE oTipoCombustible)
        {
            TipoCombustibleBE c = tipoLN.EliminarTipoCombustible(oTipoCombustible);
            return c.OK;
        }


        [Route("obtenerall")]
        [HttpGet]
        public List<TipoCombustibleBE> ListadoTipoCombustible()
        {
            return tipoLN.ListadoTipoCombustible();
        }

        [Route("obteneractivos")]
        [HttpGet]
        public List<TipoCombustibleBE> ListadoActivoTipoCombustible()
        {
            return tipoLN.ListadoActivoTipoCombustible();
        }
    }
}
