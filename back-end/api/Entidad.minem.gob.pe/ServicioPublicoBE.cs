using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class ServicioPublicoBE: BaseBE
    {
        public int ID_TIPO_TRANSPORTE { get; set; }
        public decimal COSTO_MOVILIDAD { get; set; }
        public int MESES_USO { get; set; }
        public decimal KILOMETRO_SEMANAL { get; set; }
    }
}
