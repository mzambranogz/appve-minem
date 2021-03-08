using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using sres.da;
using sres.be;
using System.Data;
using Oracle.DataAccess.Client;
using sres.ut;

namespace sres.ln
{
    public class ElectromovilidadLN : BaseLN
    {
        ElectromivilidadDA elecDA = new ElectromivilidadDA();

        public FactorDataBE ListaFactor1P(int idfactor, int p1, int v1)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                cn.Open();
                obj = elecDA.ListaFactor1P(idfactor, p1, v1, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return obj;
        }

        public FactorDataBE ListaFactor2P(int idfactor, int p1, int p2, int v1, int v2)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                cn.Open();
                obj = elecDA.ListaFactor2P(idfactor, p1, p2, v1, v2, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return obj;
        }

        public FactorDataBE ListaFactor3P(int idfactor, int p1, int p2, int p3, int v1, int v2, int v3)
        {
            FactorDataBE obj = new FactorDataBE();
            try
            {
                cn.Open();
                obj = elecDA.ListaFactor3P(idfactor, p1, p2, p3, v1, v2, v3, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return obj;
        }

        public List<EscenarioConvencionalBE> CalcularVC(VehiculoConvencionalBE entidad)
        {
            List<EscenarioConvencionalBE> lista = new List<EscenarioConvencionalBE>();
            try
            {
                decimal ipc = Convert.ToDecimal(AppSettings.Get<string>("dato.ipc"));
                decimal reduccion_eficiencia_motor = Convert.ToDecimal(AppSettings.Get<string>("dato.reduccioneficienciamotor"));
                decimal porc_20kmvc = Convert.ToDecimal(AppSettings.Get<string>("dato.porcentaje20kmvc"));
                decimal porc_100kmvc = Convert.ToDecimal(AppSettings.Get<string>("dato.porcentaje100kmvc"));
                decimal mante_extraordinario = Convert.ToDecimal(AppSettings.Get<string>("dato.mantenimientoextraordinario"));
                decimal tasa_descuento = Convert.ToDecimal(AppSettings.Get<string>("dato.tasadescuento"));

                //Porcentaje depreciacion
                decimal dep02 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion02"));
                decimal dep03 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion03"));
                decimal dep04 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion04"));
                decimal dep05 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion05"));
                decimal dep06 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion06"));
                decimal dep07 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion07"));
                decimal dep08 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion08"));
                decimal dep09 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion09"));
                decimal dep10 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion10"));
                decimal dep11 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion11"));
                decimal dep12 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion12"));
                decimal dep13 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion13"));
                decimal dep14 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion14"));
                decimal dep15 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion15"));

                decimal[] arrCargaFinancieraNominalVC = new decimal[15];
                decimal[] arrInversionInicialNominalVC = new decimal[15];
                decimal[] arrSeguroNominalVC = new decimal[15];
                decimal[] arrEnergiaNominalVC = new decimal[15];
                decimal[] arrManteContinuoNominalVC = new decimal[15];
                decimal[] depreciacionVC = new decimal[15];
                decimal[] arrReventaNominalVC = new decimal[15];
                decimal[] arrManteExtraoNominalVC = new decimal[15];
                decimal[] arrServicioPublicoNominalVC = new decimal[15];

                decimal[] arrCargaFinancieraNetoVC = new decimal[15];
                decimal[] arrInversionInicialNetoVC = new decimal[15];
                decimal[] arrSeguroNetoVC = new decimal[15];
                decimal[] arrEnergiaNetoVC = new decimal[15];
                decimal[] arrManteContinuoNetoVC = new decimal[15];
                decimal[] arrReventaNetoVC = new decimal[15];
                decimal[] arrManteExtraoNetoVC = new decimal[15];
                decimal[] arrServicioPublicoNetoVC = new decimal[15];

                decimal[] arrCargaFinancieraAcumuladoVC = new decimal[15];
                decimal[] arrInversionInicialAcumuladoVC = new decimal[15];
                decimal[] arrSeguroAcumuladoVC = new decimal[15];
                decimal[] arrEnergiaAcumuladoVC = new decimal[15];
                decimal[] arrManteContinuoAcumuladoVC = new decimal[15];
                decimal[] arrReventaAcumuladoVC = new decimal[15];
                decimal[] arrManteExtraoAcumuladoVC = new decimal[15];
                decimal[] arrServicioPublicoAcumuladoVC = new decimal[15];

                //Cuota inicial y carga financiera Nominal VC                
                decimal cuota_inicial = 0;
                if (entidad.TIPO_COMPRA_VC == 1)
                {
                    cuota_inicial = entidad.COSTO_VEHICULO_VC * entidad.PORC_CUOTA_INICIAL_VC;
                    decimal primera_carga = (entidad.COSTO_VEHICULO_VC - cuota_inicial) * (1 + entidad.TASA_INTERES_VC);
                    for (int i = 0; i < entidad.ANIO_CREDITO_VC; i++)
                    {
                        if (i == 0) arrCargaFinancieraNominalVC[i] = primera_carga / entidad.ANIO_CREDITO_VC;
                        else arrCargaFinancieraNominalVC[i] = (primera_carga / entidad.ANIO_CREDITO_VC) * (1 + ipc);
                    }
                }
                else if (entidad.TIPO_COMPRA_VC == 2)
                {
                    cuota_inicial = entidad.COSTO_VEHICULO_VC;
                }
                arrInversionInicialNominalVC[0] = cuota_inicial;

                //Cuota inicial Neto VC  
                arrInversionInicialNetoVC[0] = arrInversionInicialNominalVC[0] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + 1));

                //Cuota inicial Acumulado VC 
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrInversionInicialAcumuladoVC[i] = arrInversionInicialNetoVC[i];
                    else arrInversionInicialAcumuladoVC[i] = arrInversionInicialNetoVC[i] + arrInversionInicialAcumuladoVC[i - 1];
                }

                //carga financiera Neto VC
                for (var i = 0; i < entidad.ANIO_CREDITO_VC; i++)
                {
                    arrCargaFinancieraNetoVC[i] = arrCargaFinancieraNominalVC[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //carga financiera Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrCargaFinancieraAcumuladoVC[i] = arrCargaFinancieraNetoVC[i];
                    else arrCargaFinancieraAcumuladoVC[i] = arrCargaFinancieraNetoVC[i] + arrCargaFinancieraAcumuladoVC[i - 1];
                }

                //Seguro Nominal VC
                if (entidad.P2 == "1")
                {
                    if (entidad.P_SEGURO_VC == "1")
                    {
                        for (int i = 0; i < 15; i++)
                        {
                            if (i == 0) arrSeguroNominalVC[i] = entidad.SEGURO_VC;
                            else arrSeguroNominalVC[i] = arrSeguroNominalVC[i - 1] * (1 + ipc);
                        }
                    }
                }
                else if (entidad.P1 == "1")
                {
                    for (int i = 0; i < 15; i++)
                    {
                        if (i == 0) arrSeguroNominalVC[i] = entidad.SEGURO_VC;
                        else arrSeguroNominalVC[i] = arrSeguroNominalVC[i - 1] * (1 + ipc);
                    }
                }                

                //Seguro Neto VC
                for (var i = 0; i < 15; i++)
                {
                    arrSeguroNetoVC[i] = arrSeguroNominalVC[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Seguro Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrSeguroAcumuladoVC[i] = arrSeguroNetoVC[i];
                    else arrSeguroAcumuladoVC[i] = arrSeguroNetoVC[i] + arrSeguroAcumuladoVC[i - 1];
                }

                //Energia (Electricidad y combustible) Nominal VC
                if (entidad.P2 == "1" || entidad.P1 == "1")
                {
                    if (entidad.P_GASTO_COMBUSTIBLE == "1")
                    {
                        for (int i = 0; i < 15; i++)
                        {
                            if (i == 0) arrEnergiaNominalVC[i] = entidad.GASTO_COMBUSTIBLE_VC * 4 * decimal.Parse(entidad.MESES_USO_VC.ToString()); //actualizar el decimal.Parse
                            else arrEnergiaNominalVC[i] = arrEnergiaNominalVC[i - 1] * (1 + ipc) * (1 + reduccion_eficiencia_motor) * (1 + entidad.PORC_AUMENTO_COMBUSTIBLE_VC);
                        }
                    }
                    else
                    {
                        decimal km_anual = (entidad.KILOMETRO_SEMANAL_VC * 52) * (decimal.Parse(entidad.MESES_USO_VC.ToString()) / 12); //actualizar el decimal.Parse
                        for (int i = 0; i < 15; i++)
                        {
                            if (i == 0) arrEnergiaNominalVC[i] = (km_anual / entidad.RENDIMIENTO_VC) * entidad.PRECIO_COMBUSTIBLE_VC;
                            else arrEnergiaNominalVC[i] = arrEnergiaNominalVC[i - 1] * (1 + ipc) * (1 + reduccion_eficiencia_motor) * (1 + entidad.PORC_AUMENTO_COMBUSTIBLE_VC);
                        }
                    }
                }                

                //Energia (Electricidad y combustible) Neto VC
                for (var i = 0; i < 15; i++)
                {
                    arrEnergiaNetoVC[i] = arrEnergiaNominalVC[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Energia (Electricidad y combustible) Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrEnergiaAcumuladoVC[i] = arrEnergiaNetoVC[i];
                    else arrEnergiaAcumuladoVC[i] = arrEnergiaNetoVC[i] + arrEnergiaAcumuladoVC[i - 1];
                }

                //Mantenimiento continuo Nominal VC
                if (entidad.P2 == "1")
                {
                    decimal mantenim_20kmvc = entidad.COSTO_VEHICULO_VC * porc_20kmvc;
                    decimal mantenim_100kmvc = entidad.COSTO_VEHICULO_VC * porc_100kmvc;
                    for (int i = 0; i < 15; i++)
                    {
                        if (i == 0) arrManteContinuoNominalVC[i] = mantenim_20kmvc;
                        else if (i == 1) arrManteContinuoNominalVC[i] = mantenim_100kmvc;
                        else arrManteContinuoNominalVC[i] = arrManteContinuoNominalVC[i - 1] * (1 + ipc);
                    }
                }
                else if (entidad.P1 == "1")
                {
                    for (int i = 0; i < 15; i++)
                    {
                        if (i == 0) arrManteContinuoNominalVC[i] = entidad.MANTENIMIENTO_VC;
                        else if (i == 1) arrManteContinuoNominalVC[i] = entidad.MANTENIMIENTO_VC;
                        else arrManteContinuoNominalVC[i] = arrManteContinuoNominalVC[i - 1] * (1 + ipc);
                    }
                }
                

                //Mantenimiento continuo Neto VC
                for (var i = 0; i < 15; i++)
                {
                    arrManteContinuoNetoVC[i] = arrManteContinuoNominalVC[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Mantenimiento continuo Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrManteContinuoAcumuladoVC[i] = arrManteContinuoNetoVC[i];
                    else arrManteContinuoAcumuladoVC[i] = arrManteContinuoNetoVC[i] + arrManteContinuoAcumuladoVC[i - 1];
                }

                //Depreciacion vehiculo VC
                if (entidad.P2 == "1")
                {
                    for (var i = 0; i < 15; i++)
                    {
                        if (i == 0) depreciacionVC[i] = entidad.COSTO_VEHICULO_VC;
                        else if (i == 1) depreciacionVC[i] = depreciacionVC[i - 1] * dep02;
                        else if (i == 2) depreciacionVC[i] = depreciacionVC[i - 1] * dep03;
                        else if (i == 3) depreciacionVC[i] = depreciacionVC[i - 1] * dep04;
                        else if (i == 4) depreciacionVC[i] = depreciacionVC[i - 1] * dep05;
                        else if (i == 5) depreciacionVC[i] = depreciacionVC[i - 1] * dep06;
                        else if (i == 6) depreciacionVC[i] = depreciacionVC[i - 1] * dep07;
                        else if (i == 7) depreciacionVC[i] = depreciacionVC[i - 1] * dep08;
                        else if (i == 8) depreciacionVC[i] = depreciacionVC[i - 1] * dep09;
                        else if (i == 9) depreciacionVC[i] = depreciacionVC[i - 1] * dep10;
                        else if (i == 10) depreciacionVC[i] = depreciacionVC[i - 1] * dep11;
                        else if (i == 11) depreciacionVC[i] = depreciacionVC[i - 1] * dep12;
                        else if (i == 12) depreciacionVC[i] = depreciacionVC[i - 1] * dep13;
                        else if (i == 13) depreciacionVC[i] = depreciacionVC[i - 1] * dep14;
                        else if (i == 14) depreciacionVC[i] = depreciacionVC[i - 1] * dep15;
                    }
                }                

                //Reventa Nominal VC
                arrReventaNominalVC[14] = depreciacionVC[14];

                //Reventa Neto VC
                arrReventaNetoVC[14] = arrReventaNominalVC[14] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + 15));

                //Reventa Acumulado VC
                arrReventaAcumuladoVC[14] = arrReventaNetoVC[14];

                //Mantenimiento extraordinario Nominal VC
                if (entidad.P2 == "1" || entidad.P1 == "1")
                {
                    for (var i = 7; i < 15; i++)
                    {
                        if (i == 7) arrManteExtraoNominalVC[i] = mante_extraordinario;
                        else arrManteExtraoNominalVC[i] = arrManteExtraoNominalVC[i - 1] * (1 + ipc);
                    }
                }                    

                //Mantenimiento extraordinario Neto VC
                for (var i = 7; i < 15; i++)
                {
                    arrManteExtraoNetoVC[i] = arrManteExtraoNominalVC[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Mantenimiento extraordinario Acumulado VC
                for (var i = 7; i < 15; i++)
                {
                    if (i == 7) arrManteExtraoAcumuladoVC[i] = arrManteExtraoNetoVC[i];
                    else arrManteExtraoAcumuladoVC[i] = arrManteExtraoNetoVC[i] + arrManteExtraoAcumuladoVC[i - 1];
                }

                //Servicio publico Nominal VC
                decimal costo_general_vc = 0;
                foreach (ServicioPublicoBE sp in entidad.LISTA_SERVICIO_PUBLICO)
                {
                    costo_general_vc += sp.COSTO_MOVILIDAD * sp.MESES_USO * 4;
                }

                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrServicioPublicoNominalVC[i] = costo_general_vc;
                    else arrServicioPublicoNominalVC[i] = arrServicioPublicoNominalVC[i - 1] * (1 + ipc);
                }

                //Servicio publico Neto VC
                for (var i = 0; i < 15; i++)
                {
                    arrServicioPublicoNetoVC[i] = arrServicioPublicoNominalVC[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Servicio publico Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrServicioPublicoAcumuladoVC[i] = arrServicioPublicoNetoVC[i];
                    else arrServicioPublicoAcumuladoVC[i] = arrServicioPublicoNetoVC[i] + arrServicioPublicoAcumuladoVC[i - 1];
                }

                for (int i = 0; i < 15; i++)
                {
                    EscenarioConvencionalBE ec = new EscenarioConvencionalBE();
                    ec.CUOTA_INICIAL = arrInversionInicialAcumuladoVC[i];
                    ec.INCENTIVO_ECONOMICO = 0;
                    ec.RECAMBIO_BATERIA = 0;
                    ec.SEGURO = arrSeguroAcumuladoVC[i];
                    ec.ENERGIA = arrEnergiaAcumuladoVC[i];
                    ec.MANTENIMIENTO_CONTINUO = arrManteContinuoAcumuladoVC[i];
                    ec.CARGA_FINANCIERA = arrCargaFinancieraAcumuladoVC[i];
                    ec.CARGA_INSTALACION = 0;
                    ec.REVENTA_VEHICULO = arrReventaAcumuladoVC[i] * -1;
                    ec.OTROS_TRANSPORTES = arrServicioPublicoAcumuladoVC[i];
                    ec.MANTENIMIENTO_EXTRAORDINARIO = arrManteExtraoAcumuladoVC[i];
                    ec.TOTAL = arrInversionInicialAcumuladoVC[i] + arrSeguroAcumuladoVC[i] + arrEnergiaAcumuladoVC[i] + arrManteContinuoAcumuladoVC[i] + arrCargaFinancieraAcumuladoVC[i] - arrReventaAcumuladoVC[i] + arrServicioPublicoAcumuladoVC[i] + arrManteExtraoAcumuladoVC[i];
                    lista.Add(ec);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioElectromovilidadBE> CalcularVE(VehiculoElectricoBE entidad)
        {
            List<EscenarioElectromovilidadBE> lista = new List<EscenarioElectromovilidadBE>();
            try
            {
                decimal ipc = Convert.ToDecimal(AppSettings.Get<string>("dato.ipc"));
                decimal reduccion_eficiencia_motor = Convert.ToDecimal(AppSettings.Get<string>("dato.reduccioneficienciamotor"));
                decimal porc_20kmve = Convert.ToDecimal(AppSettings.Get<string>("dato.porcentaje20kmve"));
                decimal porc_100kmve = Convert.ToDecimal(AppSettings.Get<string>("dato.porcentaje100kmve"));
                decimal tasa_descuento = Convert.ToDecimal(AppSettings.Get<string>("dato.tasadescuento"));
                decimal recambio_bateria = Convert.ToDecimal(AppSettings.Get<string>("dato.recambiobateria"));

                //Porcentaje depreciacion
                decimal dep02 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion02"));
                decimal dep03 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion03"));
                decimal dep04 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion04"));
                decimal dep05 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion05"));
                decimal dep06 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion06"));
                decimal dep07 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion07"));
                decimal dep08 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion08"));
                decimal dep09 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion09"));
                decimal dep10 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion10"));
                decimal dep11 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion11"));
                decimal dep12 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion12"));
                decimal dep13 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion13"));
                decimal dep14 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion14"));
                decimal dep15 = Convert.ToDecimal(AppSettings.Get<string>("dato.depreciacion15"));

                decimal[] arrCargaFinancieraNominalVE = new decimal[15];
                decimal[] arrInversionInicialNominalVE = new decimal[15];
                decimal[] arrSeguroNominalVE = new decimal[15];
                decimal[] arrEnergiaNominalVE = new decimal[15];
                decimal[] arrManteContinuoNominalVE = new decimal[15];
                decimal[] depreciacionVE = new decimal[15];
                decimal[] arrReventaNominalVE = new decimal[15];
                decimal[] arrIncentivoNominalVE = new decimal[15];
                decimal[] arrRecambioNominalVE = new decimal[15];

                decimal[] arrCargaFinancieraNetoVE = new decimal[15];
                decimal[] arrInversionInicialNetoVE = new decimal[15];
                decimal[] arrSeguroNetoVE = new decimal[15];
                decimal[] arrEnergiaNetoVE = new decimal[15];
                decimal[] arrManteContinuoNetoVE = new decimal[15];
                decimal[] arrReventaNetoVE = new decimal[15];
                decimal[] arrIncentivoNetoVE = new decimal[15];
                decimal[] arrRecambioNetoVE = new decimal[15];

                decimal[] arrCargaFinancieraAcumuladoVE = new decimal[15];
                decimal[] arrInversionInicialAcumuladoVE = new decimal[15];
                decimal[] arrSeguroAcumuladoVE = new decimal[15];
                decimal[] arrEnergiaAcumuladoVE = new decimal[15];
                decimal[] arrManteContinuoAcumuladoVE = new decimal[15];
                decimal[] arrReventaAcumuladoVE = new decimal[15];
                decimal[] arrIncentivoAcumuladoVE = new decimal[15];
                decimal[] arrRecambioAcumuladoVE = new decimal[15];
                decimal[] arrCargaInstalacionAcumuladoVE = new decimal[15];

                //Incentivo Nominal VE
                decimal incentivo_unico = 0;
                if (entidad.P_INCENTIVO == "1")
                {
                    if (entidad.TIPO_INCENTIVO_VE == 1)
                    {
                        for (var i = 0; i < entidad.HORIZONTE; i++)
                        {
                            arrIncentivoNominalVE[i] = entidad.CUOTA_INCENTIVO_ANUAL;
                        }

                        //Incentivo Neto VE
                        for (var i = 0; i < 15; i++)
                        {
                            arrIncentivoNetoVE[i] = arrIncentivoNominalVE[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                        }

                        //Incentivo Acumulado VE
                        for (var i = 0; i < 15; i++)
                        {
                            if (i == 0) arrIncentivoAcumuladoVE[i] = arrIncentivoNetoVE[i];
                            else arrIncentivoAcumuladoVE[i] = arrIncentivoNetoVE[i] + arrIncentivoAcumuladoVE[i - 1];
                        }
                    }
                    else if (entidad.TIPO_INCENTIVO_VE == 2)
                    {
                        if (entidad.FORMA_INCENTIVO_VE == 1)
                        {
                            incentivo_unico = entidad.COSTO_VEHICULO_VE * entidad.PORCENTAJE_INCENTIVO;
                        }
                        else if (entidad.FORMA_INCENTIVO_VE == 2)
                        {
                            incentivo_unico = entidad.INCENTIVO_UNICO;
                        }
                    }
                }

                //Recambio bateria Nominal VE
                arrRecambioNominalVE[7] = entidad.COSTO_VEHICULO_VE * recambio_bateria;

                //Recambio bateria Neto VE
                arrRecambioNetoVE[7] = arrRecambioNominalVE[7] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + 8));

                //Recambio bateria Acumulado VE
                for (var i = 7; i < 15; i++)
                {
                    if (i == 7) arrRecambioAcumuladoVE[i] = arrRecambioNetoVE[i];
                    else arrRecambioAcumuladoVE[i] = arrRecambioNetoVE[i] + arrRecambioAcumuladoVE[i - 1];
                }

                //Mantenimiento continuo Nominal VE
                decimal mantenim_20kmve = entidad.COSTO_VEHICULO_VE * porc_20kmve;
                decimal mantenim_100kmve = entidad.COSTO_VEHICULO_VE * porc_100kmve;
                for (int i = 0; i < 15; i++)
                {
                    if (i == 0) arrManteContinuoNominalVE[i] = mantenim_20kmve;
                    else if (i == 1) arrManteContinuoNominalVE[i] = mantenim_100kmve;
                    else arrManteContinuoNominalVE[i] = arrManteContinuoNominalVE[i - 1] * (1 + ipc);
                }

                //Mantenimiento continuo Neto VE
                for (var i = 0; i < 15; i++)
                {
                    arrManteContinuoNetoVE[i] = arrManteContinuoNominalVE[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Mantenimiento continuo Acumulado VE
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrManteContinuoAcumuladoVE[i] = arrManteContinuoNetoVE[i];
                    else arrManteContinuoAcumuladoVE[i] = arrManteContinuoNetoVE[i] + arrManteContinuoAcumuladoVE[i - 1];
                }

                //Depreciacion vehiculo VE
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) depreciacionVE[i] = entidad.COSTO_VEHICULO_VE;
                    else if (i == 1) depreciacionVE[i] = depreciacionVE[i - 1] * dep02;
                    else if (i == 2) depreciacionVE[i] = depreciacionVE[i - 1] * dep03;
                    else if (i == 3) depreciacionVE[i] = depreciacionVE[i - 1] * dep04;
                    else if (i == 4) depreciacionVE[i] = depreciacionVE[i - 1] * dep05;
                    else if (i == 5) depreciacionVE[i] = depreciacionVE[i - 1] * dep06;
                    else if (i == 6) depreciacionVE[i] = depreciacionVE[i - 1] * dep07;
                    else if (i == 7) depreciacionVE[i] = depreciacionVE[i - 1] * dep08;
                    else if (i == 8) depreciacionVE[i] = depreciacionVE[i - 1] * dep09;
                    else if (i == 9) depreciacionVE[i] = depreciacionVE[i - 1] * dep10;
                    else if (i == 10) depreciacionVE[i] = depreciacionVE[i - 1] * dep11;
                    else if (i == 11) depreciacionVE[i] = depreciacionVE[i - 1] * dep12;
                    else if (i == 12) depreciacionVE[i] = depreciacionVE[i - 1] * dep13;
                    else if (i == 13) depreciacionVE[i] = depreciacionVE[i - 1] * dep14;
                    else if (i == 14) depreciacionVE[i] = depreciacionVE[i - 1] * dep15;
                }

                //Reventa Nominal VE
                arrReventaNominalVE[14] = depreciacionVE[14];

                //Reventa Neto VE
                arrReventaNetoVE[14] = arrReventaNominalVE[14] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + 15));

                //Reventa Acumulado VE
                arrReventaAcumuladoVE[14] = arrReventaNetoVE[14];

                //Cuota inicial y carga financiera Nominal VE             
                decimal cuota_inicial = 0;
                entidad.COSTO_VEHICULO_VE -= incentivo_unico;
                if (entidad.TIPO_COMPRA_VE == 1)
                {
                    cuota_inicial = entidad.COSTO_VEHICULO_VE * entidad.PORC_CUOTA_INICIAL_VE;
                    decimal primera_carga = (entidad.COSTO_VEHICULO_VE - cuota_inicial) * (1 + entidad.TASA_INTERES_VE);
                    for (int i = 0; i < entidad.ANIO_CREDITO_VE; i++)
                    {
                        if (i == 0) arrCargaFinancieraNominalVE[i] = primera_carga / entidad.ANIO_CREDITO_VE;
                        else arrCargaFinancieraNominalVE[i] = (primera_carga / entidad.ANIO_CREDITO_VE) * (1 + ipc);
                    }
                }
                else if (entidad.TIPO_COMPRA_VE == 2)
                {
                    cuota_inicial = entidad.COSTO_VEHICULO_VE;
                }
                arrInversionInicialNominalVE[0] = cuota_inicial;

                //Cuota inicial Neto VC  
                arrInversionInicialNetoVE[0] = arrInversionInicialNominalVE[0] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + 1));

                //Cuota inicial Acumulado VC 
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrInversionInicialAcumuladoVE[i] = arrInversionInicialNetoVE[i];
                    else arrInversionInicialAcumuladoVE[i] = arrInversionInicialNetoVE[i] + arrInversionInicialAcumuladoVE[i - 1];
                }

                //carga financiera Neto VE
                for (var i = 0; i < entidad.ANIO_CREDITO_VE; i++)
                {
                    arrCargaFinancieraNetoVE[i] = arrCargaFinancieraNominalVE[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //carga financiera Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrCargaFinancieraAcumuladoVE[i] = arrCargaFinancieraNetoVE[i];
                    else arrCargaFinancieraAcumuladoVE[i] = arrCargaFinancieraNetoVE[i] + arrCargaFinancieraAcumuladoVE[i - 1];
                }

                //Seguro Nominal VC
                if (entidad.P_SEGURO_VE == "1")
                {
                    for (int i = 0; i < 15; i++)
                    {
                        if (i == 0) arrSeguroNominalVE[i] = entidad.SEGURO_VE;
                        else arrSeguroNominalVE[i] = arrSeguroNominalVE[i - 1] * (1 + ipc);
                    }
                }

                //Seguro Neto VC
                for (var i = 0; i < 15; i++)
                {
                    arrSeguroNetoVE[i] = arrSeguroNominalVE[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Seguro Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrSeguroAcumuladoVE[i] = arrSeguroNetoVE[i];
                    else arrSeguroAcumuladoVE[i] = arrSeguroNetoVE[i] + arrSeguroAcumuladoVE[i - 1];
                }

                //Energia (Electricidad y combustible) Nominal VC
                decimal km_anual_ve = (entidad.KILOMETRO_SEMANAL_VE * 52) * (decimal.Parse(entidad.MESES_USO_VE.ToString()) / 12); //actualizar el decimal.Parse
                decimal energia_ve = (km_anual_ve / entidad.RENDIMIENTO_VE) * entidad.TARIFA_VE;
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrEnergiaNominalVE[i] = energia_ve;
                    else arrEnergiaNominalVE[i] = arrEnergiaNominalVE[i - 1] * (1 + ipc) * (1 + entidad.PORCENTAJE_ANUAL_VE);
                }

                //Energia (Electricidad y combustible) Neto VC
                for (var i = 0; i < 15; i++)
                {
                    arrEnergiaNetoVE[i] = arrEnergiaNominalVE[i] / Convert.ToDecimal(Math.Pow(Convert.ToDouble(1 + tasa_descuento), -1 + (i + 1)));
                }

                //Energia (Electricidad y combustible) Acumulado VC
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrEnergiaAcumuladoVE[i] = arrEnergiaNetoVE[i];
                    else arrEnergiaAcumuladoVE[i] = arrEnergiaNetoVE[i] + arrEnergiaAcumuladoVE[i - 1];
                }

                //Equipo carga e instalacion Nominal VE
                decimal carga_instalacion = entidad.PRECIO_CARGADOR + entidad.COSTO_INSTALACION;

                //Equipo carga e instalacion Acumulado VE
                for (var i = 0; i < 15; i++)
                {
                    if (i == 0) arrCargaInstalacionAcumuladoVE[i] = carga_instalacion;
                    else arrCargaInstalacionAcumuladoVE[i] = 0 + arrCargaInstalacionAcumuladoVE[i - 1];
                }

                for (int i = 0; i < 15; i++)
                {
                    EscenarioElectromovilidadBE ec = new EscenarioElectromovilidadBE();
                    ec.CUOTA_INICIAL = arrInversionInicialAcumuladoVE[i];
                    ec.INCENTIVO_ECONOMICO = arrIncentivoAcumuladoVE[i] * -1;
                    ec.RECAMBIO_BATERIA = arrRecambioAcumuladoVE[i];
                    ec.SEGURO = arrSeguroAcumuladoVE[i];
                    ec.ENERGIA = arrEnergiaAcumuladoVE[i];
                    ec.MANTENIMIENTO_CONTINUO = arrManteContinuoAcumuladoVE[i];
                    ec.CARGA_FINANCIERA = arrCargaFinancieraAcumuladoVE[i];
                    ec.CARGA_INSTALACION = arrCargaInstalacionAcumuladoVE[i];
                    ec.REVENTA_VEHICULO = arrReventaAcumuladoVE[i] * -1;
                    ec.OTROS_TRANSPORTES = 0;
                    ec.MANTENIMIENTO_EXTRAORDINARIO = 0;
                    ec.TOTAL = arrInversionInicialAcumuladoVE[i] + arrSeguroAcumuladoVE[i] + arrEnergiaAcumuladoVE[i] + arrManteContinuoAcumuladoVE[i] + arrCargaFinancieraAcumuladoVE[i] + arrCargaInstalacionAcumuladoVE[i] + arrRecambioAcumuladoVE[i] - arrReventaAcumuladoVE[i] - arrIncentivoAcumuladoVE[i];
                    lista.Add(ec);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<TransportePublicoBE> ObtenerLyendas(ConsumoEnergeticoConvencionalBE entidad)
        {
            List<TransportePublicoBE> listatp = new List<TransportePublicoBE>();
            TipoTransporteLN tipoLN = new TipoTransporteLN();
            try
            {
                int tamanio = entidad.LISTA_SERVICIO_PUBLICO.Count();
                string[] arrNombre = new string[5];

                arrNombre[0] = "Vehículo propio";
                for (int i = 0; i < tamanio; i++)
                {
                    string nombre = tipoLN.getTipoTransporte(new TipoTransporteBE() { ID_TIPO_TRANSPORTE = entidad.LISTA_SERVICIO_PUBLICO[i].ID_TIPO_TRANSPORTE }).NOMBRE;
                    arrNombre[i + 1] = nombre;
                }

                for (int i = 0; i < tamanio + 1; i++)
                {
                    TransportePublicoBE tp = new TransportePublicoBE();
                    tp.NOMBRE_TRANSPORTE = arrNombre[i] == null ? "" : arrNombre[i];
                    listatp.Add(tp);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return listatp;
        }

        public List<EscenarioConvencionalConsumoEnergBE> CalcularVCCE(ConsumoEnergeticoConvencionalBE entidad)
        {
            List<EscenarioConvencionalConsumoEnergBE> lista = new List<EscenarioConvencionalConsumoEnergBE>();
            ElectromovilidadLN elecLN = new ElectromovilidadLN();
            try
            {
                int tamanio = entidad.LISTA_SERVICIO_PUBLICO.Count();
                decimal[] arrConsumoEnergetivoVC = new decimal[5];
                decimal vehiculo_ce = 0;

                if (entidad.P2 == "1" || entidad.P1 == "1") {
                    decimal factor_rendimiento = elecLN.ListaFactor1P(17, 2, entidad.ID_TIPO_COMBUSTIBLE_VC).FACTOR;
                    decimal km_anual = (entidad.KILOMETRO_SEMANAL_VC * 52) * (decimal.Parse(entidad.MESES_USO_VC.ToString()) / 12); //actualizar el decimal.Parse
                    vehiculo_ce = km_anual / factor_rendimiento;
                }                

                arrConsumoEnergetivoVC[0] = vehiculo_ce;
                for (int i = 0; i < tamanio; i++)   
                {
                    decimal rendimiento_pasajero = elecLN.ListaFactor1P(16, 8, entidad.LISTA_SERVICIO_PUBLICO[i].ID_TIPO_TRANSPORTE).FACTOR;
                    decimal consumo_energetico = entidad.LISTA_SERVICIO_PUBLICO[i].KILOMETRO_SEMANAL * 4 * decimal.Parse(entidad.LISTA_SERVICIO_PUBLICO[i].MESES_USO.ToString()) / rendimiento_pasajero; //actualizar el decimal.Parse
                    arrConsumoEnergetivoVC[i+1] = consumo_energetico;
                }

                for (int i = 0; i < 15; i++)
                {
                    EscenarioConvencionalConsumoEnergBE ec = new EscenarioConvencionalConsumoEnergBE();
                    ec.VEHICULO_PROPIO_VC = arrConsumoEnergetivoVC[0] * (i + 1);
                    ec.SERVICIO_PUBLICO_1 = arrConsumoEnergetivoVC[1] * (i + 1);
                    ec.SERVICIO_PUBLICO_2 = arrConsumoEnergetivoVC[2] * (i + 1);
                    ec.SERVICIO_PUBLICO_3 = arrConsumoEnergetivoVC[3] * (i + 1);
                    ec.SERVICIO_PUBLICO_4 = arrConsumoEnergetivoVC[4] * (i + 1);
                    ec.TOTAL_PUBLICO = ec.SERVICIO_PUBLICO_1 + ec.SERVICIO_PUBLICO_2 + ec.SERVICIO_PUBLICO_3 + ec.SERVICIO_PUBLICO_4;
                    lista.Add(ec);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioElectricoConsumoEnergBE> CalcularVECE(ConsumoEnergeticoElectricoBE entidad)
        {
            List<EscenarioElectricoConsumoEnergBE> lista = new List<EscenarioElectricoConsumoEnergBE>();
            try
            {
                decimal equivalenteenergetico = Convert.ToDecimal(AppSettings.Get<string>("dato.equivalenteenergetico"));

                decimal[] arrConsumoEnergetivoVE = new decimal[5];

                arrConsumoEnergetivoVE[0] = (((entidad.KILOMETRO_SEMANAL_VE * 52) * (decimal.Parse(entidad.MESES_USO_VE.ToString()) / 12)) / entidad.RENDIMIENTO_VE) * equivalenteenergetico; //actualizar el decimal.Parse

                for (int i = 0; i < 15; i++)
                {
                    EscenarioElectricoConsumoEnergBE ec = new EscenarioElectricoConsumoEnergBE();
                    ec.VEHICULO_PROPIO_VE = arrConsumoEnergetivoVE[0] * (i + 1);
                    ec.SERVICIO_PUBLICO_1 = arrConsumoEnergetivoVE[1] * (i + 1);
                    ec.SERVICIO_PUBLICO_2 = arrConsumoEnergetivoVE[2] * (i + 1);
                    ec.SERVICIO_PUBLICO_3 = arrConsumoEnergetivoVE[3] * (i + 1);
                    ec.SERVICIO_PUBLICO_4 = arrConsumoEnergetivoVE[4] * (i + 1);
                    ec.TOTAL_PUBLICO = ec.SERVICIO_PUBLICO_1 + ec.SERVICIO_PUBLICO_2 + ec.SERVICIO_PUBLICO_3 + ec.SERVICIO_PUBLICO_4;
                    lista.Add(ec);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioConvencionalEmisionesBE> CalcularEmisionesVC(EmisionesConvencionalBE entidad)
        {
            List<EscenarioConvencionalEmisionesBE> lista = new List<EscenarioConvencionalEmisionesBE>();
            ElectromovilidadLN elecLN = new ElectromovilidadLN();
            try
            {
                decimal fabricacion_bateria = Convert.ToDecimal(AppSettings.Get<string>("dato.fabricacionbateria"));
                decimal fabricacion_vehiculo = Convert.ToDecimal(AppSettings.Get<string>("dato.fabricacionvehiculo"));

                int tamanio = entidad.LISTA_SERVICIO_PUBLICO.Count();
                decimal[] arrConsumoEnergetivoVC = new decimal[4];
                decimal[] arrFactorEmisionVC = new decimal[4];
                decimal[] arrFabricacionBateriaVC = new decimal[15];
                decimal[] arrOperacionVehiculoVC = new decimal[15];
                decimal[] arrFabricacionVehiculoVC = new decimal[15];
                decimal[] arrServicioPublicoVC = new decimal[15];

                if (entidad.P2 == "1")
                {
                    for (int i = 0; i < 15; i++)
                    {
                        arrFabricacionBateriaVC[i] = fabricacion_bateria;
                    }

                    for (int i = 0; i < 15; i++)
                    {
                        arrFabricacionVehiculoVC[i] = fabricacion_vehiculo;
                    }
                }                

                for (int i = 0; i < tamanio; i++)
                {
                    arrFactorEmisionVC[i] = elecLN.ListaFactor1P(14, 8, entidad.LISTA_SERVICIO_PUBLICO[i].ID_TIPO_TRANSPORTE).FACTOR;
                    decimal rendimiento_pasajero = elecLN.ListaFactor1P(16, 8, entidad.LISTA_SERVICIO_PUBLICO[i].ID_TIPO_TRANSPORTE).FACTOR;
                    decimal consumo_energetico = entidad.LISTA_SERVICIO_PUBLICO[i].KILOMETRO_SEMANAL * 4 * decimal.Parse(entidad.LISTA_SERVICIO_PUBLICO[i].MESES_USO.ToString()) / rendimiento_pasajero; //actualizar el decimal.Parse
                    arrConsumoEnergetivoVC[i] = consumo_energetico;
                }

                for (int i = 0; i < 15; i++)
                {
                    decimal tp1 = arrConsumoEnergetivoVC[0] * (i + 1) * arrFactorEmisionVC[0];
                    decimal tp2 = arrConsumoEnergetivoVC[1] * (i + 1) * arrFactorEmisionVC[1];
                    decimal tp3 = arrConsumoEnergetivoVC[2] * (i + 1) * arrFactorEmisionVC[2];
                    decimal tp4 = arrConsumoEnergetivoVC[3] * (i + 1) * arrFactorEmisionVC[3];
                    arrServicioPublicoVC[i] = tp1 + tp2 + tp3 + tp4;
                }
                
                if (entidad.P2 == "1" || entidad.P1 == "1")
                {
                    for (int i = 0; i < 15; i++)
                    {
                        arrOperacionVehiculoVC[i] = (entidad.KILOMETRO_SEMANAL_VC * 52) * (decimal.Parse(entidad.MESES_USO_VC.ToString()) / 12) * entidad.FACTOR_EMISION_VC * (i + 1); //actualizar el decimal.Parse
                    }
                }

                for (int i = 0; i < 15; i++)
                {
                    EscenarioConvencionalEmisionesBE ec = new EscenarioConvencionalEmisionesBE();
                    ec.FABRICACION_BATERIA_VC = arrFabricacionBateriaVC[i];
                    ec.OPERACION_VEHICULO_VC = arrOperacionVehiculoVC[i];
                    ec.FABRICACION_VEHICULO_VC = arrFabricacionVehiculoVC[i];
                    ec.SERVICIO_TRANSPORTE = arrServicioPublicoVC[i];
                    ec.TOTAL_VC = arrFabricacionBateriaVC[i] + arrOperacionVehiculoVC[i] + arrFabricacionVehiculoVC[i] + arrServicioPublicoVC[i];
                    lista.Add(ec);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioElectricoEmisionesBE> CalcularEmisionesVE(EmisionesElectricoBE entidad)
        {
            List<EscenarioElectricoEmisionesBE> lista = new List<EscenarioElectricoEmisionesBE>();
            try
            {
                decimal fabricacion_bateria = Convert.ToDecimal(AppSettings.Get<string>("dato.fabricacionbateria"));
                decimal fabricacion_vehiculo = Convert.ToDecimal(AppSettings.Get<string>("dato.fabricacionvehiculo"));
                decimal factor_emision_consumo = Convert.ToDecimal(AppSettings.Get<string>("dato.factoremisionconsumo"));
                decimal perdida_transmision_distribucion = Convert.ToDecimal(AppSettings.Get<string>("dato.perdidatransmisiondistribucion"));

                decimal[] arrFabricacionBateriaVE = new decimal[15];
                decimal[] arrOperacionVehiculoVE = new decimal[15];
                decimal[] arrFabricacionVehiculoVE = new decimal[15];
                decimal[] arrServicioPublicoVE = new decimal[15];

                for (int i = 0; i < 15; i++)
                {
                    arrFabricacionBateriaVE[i] = fabricacion_bateria * entidad.CAPACIDAD_BATERIA_VE;
                }

                decimal operacion_vehiculo = (entidad.KILOMETRO_SEMANAL_VE * 52) * (decimal.Parse(entidad.MESES_USO_VE.ToString()) / 12) / entidad.RENDIMIENTO_VE * (factor_emision_consumo / (1 - perdida_transmision_distribucion)); //actualizar el decimal.Parse
                for (int i = 0; i < 15; i++)
                {
                    arrOperacionVehiculoVE[i] = operacion_vehiculo * (i + 1);
                }

                for (int i = 0; i < 15; i++)
                {
                    arrFabricacionVehiculoVE[i] = fabricacion_vehiculo;
                }

                for (int i = 0; i < 15; i++)
                {
                    EscenarioElectricoEmisionesBE ec = new EscenarioElectricoEmisionesBE();
                    ec.FABRICACION_BATERIA_VE = arrFabricacionBateriaVE[i];
                    ec.OPERACION_VEHICULO_VE = arrOperacionVehiculoVE[i];
                    ec.FABRICACION_VEHICULO_VE = arrFabricacionVehiculoVE[i];
                    ec.SERVICIO_TRANSPORTE = arrServicioPublicoVE[i];
                    ec.TOTAL_VE = arrFabricacionBateriaVE[i] + arrOperacionVehiculoVE[i] + arrFabricacionVehiculoVE[i] + arrServicioPublicoVE[i];
                    lista.Add(ec);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public List<EscenarioContaminanteLocalBE> CalcularContaminantesLocales(ContaminanteLocalBE entidad)
        {
            List<EscenarioContaminanteLocalBE> lista = new List<EscenarioContaminanteLocalBE>();
            ElectromovilidadLN elecLN = new ElectromovilidadLN();
            try
            {
                decimal[] arrContaminanteVC = new decimal[4];
                decimal[] arrContaminanteTP = new decimal[4];

                //Vehiculo convencional
                if (entidad.P1 == "1" || entidad.P2 == "1") {
                    decimal km_anual = (entidad.KILOMETRO_SEMANAL_VC * 52) * (decimal.Parse(entidad.MESES_USO_VC.ToString()) / 12); //actualizar el decimal.Parse
                    decimal nox_vc = elecLN.ListaFactor2P(18, 1, 2, entidad.ID_TIPO_VEHICULO_VC, entidad.ID_TIPO_COMBUSTIBLE_VC).FACTOR;
                    decimal co_vc = elecLN.ListaFactor2P(19, 1, 2, entidad.ID_TIPO_VEHICULO_VC, entidad.ID_TIPO_COMBUSTIBLE_VC).FACTOR;
                    decimal pm25_vc = elecLN.ListaFactor2P(20, 1, 2, entidad.ID_TIPO_VEHICULO_VC, entidad.ID_TIPO_COMBUSTIBLE_VC).FACTOR;
                    decimal bc_vc = elecLN.ListaFactor2P(21, 1, 2, entidad.ID_TIPO_VEHICULO_VC, entidad.ID_TIPO_COMBUSTIBLE_VC).FACTOR;

                    arrContaminanteVC[0] = km_anual * nox_vc;
                    arrContaminanteVC[1] = km_anual * co_vc;
                    arrContaminanteVC[2] = km_anual * pm25_vc;
                    arrContaminanteVC[3] = km_anual * bc_vc;
                }

                foreach (ServicioPublicoBE item in entidad.LISTA_SERVICIO_PUBLICO)
                {
                    decimal nox = elecLN.ListaFactor1P(22, 8, item.ID_TIPO_TRANSPORTE).FACTOR;
                    arrContaminanteTP[0] += nox * item.KILOMETRO_SEMANAL;
                }

                foreach (ServicioPublicoBE item in entidad.LISTA_SERVICIO_PUBLICO)
                {
                    decimal co = elecLN.ListaFactor1P(23, 8, item.ID_TIPO_TRANSPORTE).FACTOR;
                    arrContaminanteTP[1] += co * item.KILOMETRO_SEMANAL;
                }

                foreach (ServicioPublicoBE item in entidad.LISTA_SERVICIO_PUBLICO)
                {
                    decimal pm25 = elecLN.ListaFactor1P(24, 8, item.ID_TIPO_TRANSPORTE).FACTOR;
                    arrContaminanteTP[2] += pm25 * item.KILOMETRO_SEMANAL;
                }

                foreach (ServicioPublicoBE item in entidad.LISTA_SERVICIO_PUBLICO)
                {
                    decimal bc = elecLN.ListaFactor1P(25, 8, item.ID_TIPO_TRANSPORTE).FACTOR;
                    arrContaminanteTP[3] += bc * item.KILOMETRO_SEMANAL;
                }

                for (int i = 0; i < 15; i++)
                {
                    EscenarioContaminanteLocalBE ec = new EscenarioContaminanteLocalBE();
                    ec.TOTAL_NOX = (arrContaminanteVC[0] + arrContaminanteTP[0]) * (i + 1);
                    ec.TOTAL_CO = (arrContaminanteVC[1] + arrContaminanteTP[1]) * (i + 1);
                    ec.TOTAL_PM25 = (arrContaminanteVC[2] + arrContaminanteTP[2]) * (i + 1);
                    ec.TOTAL_BC = (arrContaminanteVC[3] + arrContaminanteTP[3]) * (i + 1);
                    lista.Add(ec);
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }

            return lista;
        }

        public bool GuardarResultados(ResultadosBE entidad)
        {
            bool seGuardo = false;
            int idresultado = 0;
            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    if (entidad != null)
                    {
                        if (seGuardo = elecDA.GenerarDetalleResultado(entidad.ID_USUARIO, out idresultado, cn))
                        {
                            if (entidad.LISTA_LEYENDA != null && seGuardo)
                            {
                                foreach (var tp in entidad.LISTA_LEYENDA.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarLeyenda(entidad.ID_USUARIO, idresultado, tp.index + 1, tp.value, cn).OK)) break;
                                }
                            }
                            if (entidad.LISTA_COSTO_CONVENCIONAL != null && seGuardo)
                            {
                                foreach (var vc in entidad.LISTA_COSTO_CONVENCIONAL.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarCostoVC(entidad.ID_USUARIO, idresultado, vc.index + 1, vc.value, cn).OK)) break;
                                }
                            }
                            if (entidad.LISTA_COSTO_ELECTRICO != null && seGuardo)
                            {
                                foreach (var ve in entidad.LISTA_COSTO_ELECTRICO.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarCostoVE(entidad.ID_USUARIO, idresultado, ve.index + 1, ve.value, cn).OK)) break;
                                }
                            }
                            if (entidad.LISTA_CONSUMO_CONVENCIONAL != null && seGuardo)
                            {
                                foreach (var vc in entidad.LISTA_CONSUMO_CONVENCIONAL.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarConsumoVC(entidad.ID_USUARIO, idresultado, vc.index + 1, vc.value, cn).OK)) break;
                                }
                            }
                            if (entidad.LISTA_CONSUMO_ELECTRICO != null && seGuardo)
                            {
                                foreach (var ve in entidad.LISTA_CONSUMO_ELECTRICO.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarConsumoVE(entidad.ID_USUARIO, idresultado, ve.index + 1, ve.value, cn).OK)) break;
                                }
                            }
                            if (entidad.LISTA_EMISIONES_CONVENCIONAL != null && seGuardo)
                            {
                                foreach (var vc in entidad.LISTA_EMISIONES_CONVENCIONAL.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarEmisionesVC(entidad.ID_USUARIO, idresultado, vc.index + 1, vc.value, cn).OK)) break;
                                }
                            }
                            if (entidad.LISTA_EMISIONES_ELECTRICO != null && seGuardo)
                            {
                                foreach (var ve in entidad.LISTA_EMISIONES_ELECTRICO.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarEmisionesVE(entidad.ID_USUARIO, idresultado, ve.index + 1, ve.value, cn).OK)) break;
                                }
                            }
                            if (entidad.LISTA_CONTAMINANTE_LOCAL != null && seGuardo)
                            {
                                foreach (var ve in entidad.LISTA_CONTAMINANTE_LOCAL.Select((value, index) => new { value, index }))
                                {
                                    if (!(seGuardo = elecDA.GuardarContaminanteLocal(entidad.ID_USUARIO, idresultado, ve.index + 1, ve.value, cn).OK)) break;
                                }
                            }
                        }                                               
                    }

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                }
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return seGuardo;
        }

        public List<ResultadosBE> ObtenerResultados(int idusuario)
        {
            List<ResultadosBE> lista = new List<ResultadosBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerResultados(idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<TransportePublicoBE> ObtenerLeyenda(int idresultado, int idusuario)
        {
            List<TransportePublicoBE> lista = new List<TransportePublicoBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerLeyenda(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<EscenarioConvencionalBE> ObtenerCostoVC(int idresultado, int idusuario)
        {
            List<EscenarioConvencionalBE> lista = new List<EscenarioConvencionalBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerCostoVC(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<EscenarioElectromovilidadBE> ObtenerCostoVE(int idresultado, int idusuario)
        {
            List<EscenarioElectromovilidadBE> lista = new List<EscenarioElectromovilidadBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerCostoVE(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<EscenarioConvencionalConsumoEnergBE> ObtenerConsumoVC(int idresultado, int idusuario)
        {
            List<EscenarioConvencionalConsumoEnergBE> lista = new List<EscenarioConvencionalConsumoEnergBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerConsumoVC(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<EscenarioElectricoConsumoEnergBE> ObtenerConsumoVE(int idresultado, int idusuario)
        {
            List<EscenarioElectricoConsumoEnergBE> lista = new List<EscenarioElectricoConsumoEnergBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerConsumoVE(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<EscenarioConvencionalEmisionesBE> ObtenerEmisionesVC(int idresultado, int idusuario)
        {
            List<EscenarioConvencionalEmisionesBE> lista = new List<EscenarioConvencionalEmisionesBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerEmisionesVC(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<EscenarioElectricoEmisionesBE> ObtenerEmisionesVE(int idresultado, int idusuario)
        {
            List<EscenarioElectricoEmisionesBE> lista = new List<EscenarioElectricoEmisionesBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerEmisionesVE(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public List<EscenarioContaminanteLocalBE> ObtenerContaminanteLocal(int idresultado, int idusuario)
        {
            List<EscenarioContaminanteLocalBE> lista = new List<EscenarioContaminanteLocalBE>();
            try
            {
                cn.Open();
                lista = elecDA.ObtenerContaminanteLocal(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public bool EliminarResultado(int idresultado, int idusuario)
        {
            bool seGuardo = false;
            try
            {
                cn.Open();
                seGuardo = elecDA.EliminarResultado(idresultado, idusuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return seGuardo;
        }
    }
}
