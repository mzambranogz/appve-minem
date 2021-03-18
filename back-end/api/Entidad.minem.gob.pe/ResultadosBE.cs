using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidad.minem.gob.pe
{
    public class ResultadosBE : BaseBE
    {
        public int ID_USUARIO { get; set; }
        public int ID_RESULTADO { get; set; }
        public List<TransportePublicoBE> LISTA_LEYENDA { get; set; }
        public List<EscenarioConvencionalBE> LISTA_COSTO_CONVENCIONAL { get; set; }
        public List<EscenarioElectromovilidadBE> LISTA_COSTO_ELECTRICO { get; set; }
        public List<EscenarioConvencionalConsumoEnergBE> LISTA_CONSUMO_CONVENCIONAL { get; set; }
        public List<EscenarioElectricoConsumoEnergBE> LISTA_CONSUMO_ELECTRICO { get; set; }
        public List<EscenarioConvencionalEmisionesBE> LISTA_EMISIONES_CONVENCIONAL { get; set; }
        public List<EscenarioElectricoEmisionesBE> LISTA_EMISIONES_ELECTRICO { get; set; }
        public List<EscenarioContaminanteLocalBE> LISTA_CONTAMINANTE_LOCAL { get; set; }
        public List<VehiculoRutaBE> LISTA_VEHICULO_RUTA { get; set; }
        public string FLAG_ESTADO { get; set; }
        public string FECHA_REGISTRO
        {
            get
            {
                string fecha = REG_FECHA.ToString("dd/MM/yyyy");
                return fecha;
            }
        }
    }

}
