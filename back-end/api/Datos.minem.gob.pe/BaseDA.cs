using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Util.minem.gob.pe;

namespace Datos.minem.gob.pe
{
    public class BaseDA
    {
        string User { get { return AppSettings.Get<string>("UserBD"); } }

        protected dynamic Package
        {
            get
            {
                return new
                {
                    Admin = $"{User}.PKG_ELECTROMOV_ADMIN.",
                    Mantenimiento = $"{User}.PKG_ELECTROMOV_MANTENIMIENTO.",
                    Calculo = $"{User}.PKG_ELECTROMOV_CALCULO.",
                    Verificacion = $"{User}.PKG_ELECTROMOV_VERIFICACION."
                };
            }
        }

    }
}
