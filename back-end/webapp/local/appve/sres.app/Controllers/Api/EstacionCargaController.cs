using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace sres.app.Controllers.Api
{
    [RoutePrefix("api/estacioncarga")]
    public class EstacionCargaController : ApiController
    {
        EstacionCargaLN estacionLN = new EstacionCargaLN();
        [Route("guardarestacion")]
        [HttpPost]
        public bool GuardarEstacion(EstacionCargaBE entidad) {
            bool v = estacionLN.GuardarEstacionCarga(entidad);
            return v;
        }

        [Route("obtenerallestaciones")]
        [HttpGet]
        public List<EstacionCargaBE> getAllEstacion()
        {
            List<EstacionCargaBE> lista = estacionLN.getAllEstacion();
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
    }
}
