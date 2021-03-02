using sres.be;
using sres.ln;
using sres.ut;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace sres.app.Controllers.Api
{
    [RoutePrefix("api/formula")]
    public class FormulaController : ApiController
    {
        FormulaLN formLN = new FormulaLN();

        [Route("buscar")]
        [HttpGet]
        public List<FormulaBE> Buscar(string busqueda, int registros, int pagina, string columna, string orden)
        {
            List<FormulaBE> lista = new List<FormulaBE>();
            try
            {
                lista = formLN.ListaBusquedaFormula(new FormulaBE() { CANTIDAD_REGISTROS = registros, ORDER_BY = columna, ORDER_ORDEN = orden, PAGINA = pagina, BUSCAR = busqueda });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return lista;
        }

        [Route("obtener")]
        [HttpGet]
        public FormulaBE Get(int id)
        {
            FormulaBE ent = new FormulaBE();
            try
            {
                ent = formLN.getFormula(new FormulaBE() { ID_FORMULA = id });
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return ent;
        }

        [Route("actualizar")]
        public FormulaBE ActualizarFormula(FormulaBE obj)
        {
            FormulaBE ent = new FormulaBE();
            try
            {
                ent = formLN.ActualizarFormula(obj);
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return ent;
        }
    }
}
