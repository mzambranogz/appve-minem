using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class EscenarioElectricoConsumoEnergBE : BaseBE
    {
        public decimal VEHICULO_PROPIO_VE { get; set; }
        public decimal SERVICIO_PUBLICO_1 { get; set; }
        public decimal SERVICIO_PUBLICO_2 { get; set; }
        public decimal SERVICIO_PUBLICO_3 { get; set; }
        public decimal SERVICIO_PUBLICO_4 { get; set; }
        public decimal TOTAL_PUBLICO { get; set; }
    }
}
