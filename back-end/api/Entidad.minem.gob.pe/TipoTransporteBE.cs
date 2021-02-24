using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class TipoTransporteBE : BaseBE
    {
        public int ID_TIPO_TRANSPORTE { get; set; }
        public string NOMBRE { get; set; }
        public string FLAG_ESTADO { get; set; }
        public string USUARIO { get; set; }        
    }
}
