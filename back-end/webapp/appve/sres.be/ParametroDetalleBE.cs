using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class ParametroDetalleBE : BaseBE
    {
        public int ID_PARAMETRO { get; set; }
        public int ID_DETALLE { get; set; }
        public string NOMBRE { get; set; }
    }
}
