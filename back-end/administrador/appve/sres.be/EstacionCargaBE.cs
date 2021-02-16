using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class EstacionCargaBE : BaseBE
    {
        public int ID_ESTACION { get; set; }
        public string DESCRIPCION { get; set; }
        public string MODELO { get; set; }
        public string MARCA { get; set; }
        public decimal POTENCIA { get; set; }
        public string MODO_CARGA { get; set; }
        public string TIPO_CARGADOR { get; set; }
        public string TIPO_CONECTOR { get; set; }
        public string CANTIDAD_CONECTOR { get; set; }
        public string HORA_DESDE { get; set; }
        public string HORA_HASTA { get; set; }
        public string TARIFA_SERVICIO { get; set; }
        public InstitucionBE INSTITUCION { get; set; }
        public List<DocumentoBE> LISTA_IMAGEN { get; set; }
        public List<DocumentoBE> LISTA_DOC { get; set; }
        public string FLAG_ESTADO { get; set; }
    }
}
