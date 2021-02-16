using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class InstitucionBE : BaseBE
    {
        public int ID_INSTITUCION { get; set; }
        public string RUC { get; set; }
        public string RAZON_SOCIAL { get; set; }
        public string CORREO { get; set; }
        public string TELEFONO { get; set; }
        public string DIRECCION { get; set; }
    }
}
