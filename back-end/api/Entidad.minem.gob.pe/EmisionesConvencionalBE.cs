using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class EmisionesConvencionalBE : BaseBE
    {
        public string P1 { get; set; }
        public string P2 { get; set; }
        public decimal KILOMETRO_SEMANAL_VC { get; set; }
        public int MESES_USO_VC { get; set; }
        public decimal FACTOR_EMISION_VC { get; set; }
        public List<ServicioPublicoBE> LISTA_SERVICIO_PUBLICO { get; set; }
    }
}
