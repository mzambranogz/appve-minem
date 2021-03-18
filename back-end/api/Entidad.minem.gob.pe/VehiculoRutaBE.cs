using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class VehiculoRutaBE : BaseBE
    {
        public int ID_RUTA { get; set; }
        public string NOMBRE_RUTA { get; set; }
        public string NOMBRE_ORIGEN { get; set; }
        public string NOMBRE_DESTINO { get; set; }
        public int VECES_SEMANA { get; set; }
        public decimal KM_DIARIO { get; set; }
        public decimal KM_SEMANAL { get; set; }
        public string ORIGEN { get; set; }
        public string DESTINO { get; set; }
        public string FLAG_ESTADO { get; set; }
    }
}
