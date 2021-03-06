using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class EscenarioElectricoEmisionesBE : BaseBE
    {
        public decimal FABRICACION_BATERIA_VE { get; set; }
        public decimal OPERACION_VEHICULO_VE { get; set; }
        public decimal FABRICACION_VEHICULO_VE { get; set; }
        public decimal SERVICIO_TRANSPORTE { get; set; }
        public decimal TOTAL_VE { get; set; }
    }
}
