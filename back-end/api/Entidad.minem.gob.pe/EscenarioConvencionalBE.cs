using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class EscenarioConvencionalBE: BaseBE
    {
        public decimal CUOTA_INICIAL { get; set; }
        public decimal INCENTIVO_ECONOMICO { get; set; }
        public decimal RECAMBIO_BATERIA { get; set; }
        public decimal SEGURO { get; set; }
        public decimal ENERGIA { get; set; }
        public decimal MANTENIMIENTO_CONTINUO { get; set; }
        public decimal CARGA_FINANCIERA { get; set; }
        public decimal CARGA_INSTALACION { get; set; }
        public decimal REVENTA_VEHICULO { get; set; }
        public decimal OTROS_TRANSPORTES { get; set; }
        public decimal MANTENIMIENTO_EXTRAORDINARIO { get; set; }
        public decimal TOTAL { get; set; }
    }
}
