using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class ParametroBE : BaseBE
    {
        public int ID_PARAMETRO { get; set; }
        public string VALOR { get; set; }
        public string NOMBRE { get; set; }
        public List<ParametroBE> PARAMETROS { get; set; }
    }
}
