﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public partial class CasoBE : BaseBE
    {
        public int ID_CASO { get; set; }
        public string NOMBRE { get; set; }
        public string FLAG_ESTADO { get; set; }
    }
}
