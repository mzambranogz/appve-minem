using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class DocumentoBE : BaseBE
    {
        public int ID_DOCUMENTO { get; set; }
        public string ARCHIVO_BASE { get; set; }
        public byte[] ARCHIVO_CONTENIDO { get; set; }
        public string FLAG_ESTADO { get; set; }
    }
}
