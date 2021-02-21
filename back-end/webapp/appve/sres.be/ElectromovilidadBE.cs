using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class ElectromovilidadBE : BaseBE
    {
        public FactorDataBE RENDIMIENTO { get; set; }
        public FactorDataBE PRECIO_COMBUSTIBLE { get; set; }
        public FactorDataBE FACTOR_EMISION { get; set; }
        public FactorDataBE PRECIO_VEHICULO { get; set; }
        public FactorDataBE CAPACIDAD_BATERIA { get; set; }
        public FactorDataBE PRECIO_CARGADOR { get; set; }
        public FactorDataBE COSTO_INSTALACION { get; set; }
        public FactorDataBE TARIFA_ELECTRICIDAD { get; set; }
        public FactorDataBE RENDIMIENTO_PASAJERO { get; set; }
    }
}
