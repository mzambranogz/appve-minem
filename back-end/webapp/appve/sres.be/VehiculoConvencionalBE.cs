using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace sres.be
{
    public class VehiculoConvencionalBE : BaseBE
    {
        public string P1 { get; set; }
        public string P2 { get; set; }
        public string P3 { get; set; }
        public decimal COSTO_VEHICULO_VC { get; set; }
        public int MESES_USO_VC { get; set; }
        public decimal PORC_AUMENTO_COMBUSTIBLE_VC { get; set; }
        public int TIPO_COMPRA_VC { get; set; }
        public decimal PORC_CUOTA_INICIAL_VC { get; set; }
        public decimal TASA_INTERES_VC { get; set; }
        public int ANIO_CREDITO_VC { get; set; }
        public string P_SEGURO_VC { get; set; }
        public decimal SEGURO_VC { get; set; }
        public string P_GASTO_COMBUSTIBLE { get; set; }
        public decimal GASTO_COMBUSTIBLE_VC { get; set; }
        public decimal PRECIO_COMBUSTIBLE_VC { get; set; }
        public decimal KILOMETRO_SEMANAL_VC { get; set; }
        public decimal RENDIMIENTO_VC { get; set; }
        public List<ServicioPublicoBE> LISTA_SERVICIO_PUBLICO { get; set; }
    }
}
