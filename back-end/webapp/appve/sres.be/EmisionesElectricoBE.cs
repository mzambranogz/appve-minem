using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class EmisionesElectricoBE : BaseBE
    {
        public decimal CAPACIDAD_BATERIA_VE { get; set; }
        public decimal KILOMETRO_SEMANAL_VE { get; set; }
        public int MESES_USO_VE { get; set; }
        public decimal RENDIMIENTO_VE { get; set; }
    }
}
