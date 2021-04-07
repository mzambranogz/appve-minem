using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public partial class UsuarioBE : BaseBE
    {
        public int ID_USUARIO { get; set; }
        public string NOMBRES { get; set; }
        public int ID_GENERO { get; set; }
        public string CORREO { get; set; }
        public string CONTRASENA { get; set; }
        public int? ID_ROL { get; set; }
        public RolBE ROL { get; set; }
        public int ID_INSTITUCION { get; set; }
        public string PROPIETARIO { get; set; }
        public InstitucionBE INSTITUCION { get; set; }
        public int FLAG_RECUPERAR { get; set; }
        public string FLAG_ESTADO { get; set; }
    }
}
