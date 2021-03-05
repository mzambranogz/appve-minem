using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class EscenarioContaminanteLocalBE : BaseBE
    {
        public decimal TOTAL_NOX { get; set; }
        public decimal TOTAL_CO { get; set; }
        public decimal TOTAL_PM25 { get; set; }
        public decimal TOTAL_BC { get; set; }
    }
}
