using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public partial class EstacionCargaBE : BaseBE
    {
        public int ID_ESTACION { get; set; }
        public int ID_USUARIO { get; set; }
        public string LONGITUD { get; set; }
        public string LATITUD { get; set; }
        public string DIRECCION { get; set; }
        public string DESCRIPCION { get; set; }
        public string MODELO { get; set; }
        public string MARCA { get; set; }
        public int ID_POTENCIA { get; set; }
        public int ID_TIPO_CONECTOR { get; set; }
        public int ID_MODO_CARGA { get; set; }
        public int CABLE { get; set; }
        public string POTENCIA { get; set; }
        public string MODO_CARGA { get; set; }
        public string TIPO_CARGADOR { get; set; }
        public string TIPO_CONECTOR { get; set; }
        public int CANTIDAD_CONECTOR { get; set; }
        public string HORA_DESDE { get; set; }
        public string HORA_HASTA { get; set; }
        public decimal TARIFA_SERVICIO { get; set; }
        public int ID_ESTADO { get; set; }
        public int CANTIDAD_IMAGEN { get; set; }
        public InstitucionBE INSTITUCION { get; set; }
        public List<DocumentoBE> LISTA_IMAGEN { get; set; }
        public List<DocumentoBE> LISTA_DOC { get; set; }
        public string FLAG_ESTADO { get; set; }
    }
}
