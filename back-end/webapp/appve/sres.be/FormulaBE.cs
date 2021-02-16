using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public partial class FormulaBE : BaseBE
    {
        public int ID_FORMULA { get; set; }
        public int ID_CASO { get; set; }
        public int PARAMETRO { get; set; }
        public string NOMBRE { get; set; }
        public string COMPORTAMIENTO { get; set; }
        public string FORMULA { get; set; }
        public string FORMULA_ARMADO { get; set; }
    }
}
