using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class EmisionesElectricoBE : BaseBE
    {
        public int TIPO_VEHICULO_ELECTRICO_VE { get; set; }
        public decimal CAPACIDAD_BATERIA_VE { get; set; }
        public decimal KILOMETRO_SEMANAL_VE { get; set; }
        public int MESES_USO_VE { get; set; }
        public decimal RENDIMIENTO_VE { get; set; }
    }
}
