using Entidad.minem.gob.pe;
using Logica.minem.gob.pe;
using System.Collections.Generic;
using System.Net;
using System.Web.Http;
using WebApiElectroMovilidad.Models;
using System;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Web;

namespace WebApiElectroMovilidad.Controllers
{
    [RoutePrefix("api/estacioncarga")]
    public class EstacionCargaController : ApiController
    {
        EstacionCargaLN estacionLN = new EstacionCargaLN();

        [Route("guardarestacion")]
        [HttpPost]
        public bool GuardarEstacion(EstacionCargaBE entidad)
        {
            bool v = estacionLN.GuardarEstacionCarga(entidad);
            return v;
        }

        [Route("obtenerestacionesporusuario")]
        [HttpGet]
        public List<EstacionCargaBE> getEstacionPorUsuario(int idusuario)
        {
            List<EstacionCargaBE> lista = estacionLN.getEstacionPorUsuario(idusuario);
            return lista;
        }

        [Route("obtenerestacion")]
        [HttpGet]
        public EstacionCargaBE getEstacion(int idestacion)
        {
            EstacionCargaBE obj = estacionLN.getEstacion(idestacion);
            return obj;
        }

        [Route("obtenerdocumento")]
        [HttpGet]
        public HttpResponseMessage ObtnerDocumento(string ruta)
        {
            string pathFile = ruta;
            HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.NotFound);
            if (string.IsNullOrEmpty(pathFile)) return response;
            byte[] byteFile = File.ReadAllBytes(pathFile);
            string contentTypeFile = MimeMapping.GetMimeMapping(pathFile);

            response = Request.CreateResponse(HttpStatusCode.OK);
            response.Content = new StreamContent(new MemoryStream(byteFile));
            response.Content.Headers.ContentDisposition = new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = Path.GetFileName(pathFile);
            response.Content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentTypeFile);

            return response;
        }

        [Route("eliminarestacion")]
        [HttpGet]
        public bool EliminarEstacion(int idestacion)
        {
            bool v = estacionLN.EliminarEstacion(idestacion);
            return v;
        }

        [Route("obtenerestacionall")]
        [HttpGet]
        public List<EstacionCargaBE> getEstacionAll(decimal minLng, decimal maxLng, decimal minLat, decimal maxLat)
        {
            List<EstacionCargaBE> lista = estacionLN.getEstacionAll(minLng, maxLng, minLat, maxLat);
            return lista;
        }

        [Route("buscarestaciones")]
        [HttpGet]
        public List<EstacionCargaBE> BuscarEstaciones(string nroInforme, string propietario, string empresa, int registros, int pagina, string columna, string orden)
        {
            List<EstacionCargaBE> estaciones = estacionLN.BuscarEstaciones(nroInforme == "" ? 0 : Convert.ToInt32(nroInforme), propietario, empresa, registros, pagina, columna, orden);
            return estaciones;
        }

        [Route("revisionestacion")]
        [HttpPost]
        public bool RevisionEstacion(EstacionCargaBE entidad)
        {
            return estacionLN.RevisionEstacion(entidad);
        }

        [Route("obtenerestacionesporusuarioweb")]
        [HttpGet]
        public List<EstacionCargaBE> getEstacionPorUsuarioWeb(int idusuario)
        {
            List<EstacionCargaBE> lista = estacionLN.getEstacionPorUsuarioWeb(idusuario);
            return lista;
        }

        [Route("obtenerestacionmovil")]
        [HttpGet]
        public EstacionCargaBE getEstacionMovil(int idestacion)
        {
            EstacionCargaBE obj = estacionLN.getEstacionMovil(idestacion);
            return obj;
        }

        [Route("obtenerestacionweb")]
        [HttpGet]
        public EstacionCargaBE getEstacionWeb(int idestacion)
        {
            EstacionCargaBE obj = estacionLN.getEstacionWeb(idestacion);
            return obj;
        }

    }
}
