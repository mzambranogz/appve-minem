using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using WebApiElectroMovilidad.Models;

namespace WebApiElectroMovilidad.Controllers
{
    [RoutePrefix("api/rol")]
    public class RolController : ApiController
    {
        RolLN rolLN = new RolLN();

        [Route("buscarobjeto")]
        [HttpGet]
        public List<RolBE> BuscarObjeto(string busqueda, string estado, int registros, int pagina, string columna, string orden)
        {
            List<RolBE> lista = new List<RolBE>();
            try
            {
                lista = rolLN.ListaBusquedaRol(new RolBE() { CANTIDAD_REGISTROS = registros, FLAG_ESTADO = estado, ORDER_BY = columna, ORDER_ORDEN = orden, PAGINA = pagina, BUSCAR = busqueda });
            }
            catch (Exception ex)
            {
                lista = null;
            }
            return lista;
        }

        [Route("obtenerobjeto")]
        [HttpGet]
        public RolBE ObtenerObjeto(int id)
        {
            RolBE ent = new RolBE();
            try
            {
                ent = rolLN.getRol(new RolBE() { ID_ROL = id });
            }
            catch (Exception ex)
            {
                ent = null;
            }
            return ent;
        }

        [Route("guardarobjeto")]
        public bool GuardarObjeto(RolBE obj)
        {
            bool f;
            try
            {
                RolBE ent = rolLN.GuardarRol(obj);
                f = ent.OK;
            }
            catch (Exception ex)
            {
                f = false;
            }
            return f;
        }
        
        [Route("listarrolporestado")]
        [HttpGet]
        public List<RolBE> ListarRolPorEstado(string flagEstado)
        {
            List<RolBE> lista = new List<RolBE>();
            try
            {
                lista = rolLN.ListarRolPorEstado(flagEstado);
            }
            catch (Exception ex)
            {
                lista = null;
            }
            return lista;
        }

        [Route("obtenerall")]
        [HttpGet]
        public List<RolBE> ListadoRol()
        {
            return rolLN.ListaRol();
        }

        [Route("cambiarestado")]
        [HttpPost]
        public bool EliminarRol(RolBE oRol)
        {
            RolBE c = rolLN.EliminarRol(oRol);
            return c.OK;
        }

    }
}
