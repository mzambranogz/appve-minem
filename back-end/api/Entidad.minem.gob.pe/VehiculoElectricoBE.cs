using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class VehiculoElectricoBE : BaseBE
    {
        public string P_INCENTIVO { get; set; }
        public string P_SEGURO_VE { get; set; }
        public decimal COSTO_VEHICULO_VE { get; set; }
        public int TIPO_INCENTIVO_VE { get; set; }
        public int HORIZONTE { get; set; }
        public decimal CUOTA_INCENTIVO_ANUAL { get; set; }
        public int FORMA_INCENTIVO_VE { get; set; }
        public decimal PORCENTAJE_INCENTIVO { get; set; }
        public decimal INCENTIVO_UNICO { get; set; }
        public int TIPO_COMPRA_VE { get; set; }
        public decimal PORC_CUOTA_INICIAL_VE { get; set; }
        public decimal TASA_INTERES_VE { get; set; }
        public int ANIO_CREDITO_VE { get; set; }
        public decimal SEGURO_VE { get; set; }
        public decimal PORCENTAJE_ANUAL_VE { get; set; }
        public decimal KILOMETRO_SEMANAL_VE { get; set; }
        public int MESES_USO_VE { get; set; }
        public decimal RENDIMIENTO_VE { get; set; }
        public decimal TARIFA_VE { get; set; }
        public decimal PRECIO_CARGADOR { get; set; }
        public decimal COSTO_INSTALACION { get; set; }
    }
}
