using sres.be;
using sres.da;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Globalization;
using Microsoft.JScript.Vsa;
using Microsoft.JScript;

namespace sres.ln
{
    public class CalcularLN : BaseLN
    {
        CalcularDA cal = new CalcularDA();

        public List<ParametroBE> Calcular(List<ParametroBE> lista, int id_caso)
        {
            List<ParametroBE> listaparam = new List<ParametroBE>();
            List<FormulaBE> listaf = new List<FormulaBE>();
            decimal ldecImporte = 0;
            decimal lde_porcentaje = 0;
            FormulaBE formulaBE = new FormulaBE() { ID_CASO = id_caso };
            try
            {
                cn.Open();
                listaf = new FormulaDA().GetFormulaParametro(formulaBE, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            foreach (FormulaBE f in listaf)
            {
                switch (f.COMPORTAMIENTO)
                {
                    case "%":
                    case "=":
                        //Analizamos la formula
                        int ll_ancho, ll_x;
                        string lc_dato = "";
                        string ls_formulanew = "", ls_subformula = "";
                        string lstrFormula = f.FORMULA.Trim();

                        ll_ancho = lstrFormula.Trim().Length;
                        for (ll_x = 0; ll_x < ll_ancho; ll_x++)
                        {
                            lc_dato = lstrFormula.Substring(ll_x, 1);
                            switch (lc_dato)
                            {
                                case "[":
                                    int ll_finoperando, ll_long;
                                    string ls_operando;

                                    ll_finoperando = lstrFormula.IndexOf("]", ll_x);         //Ubica Posicion Fin del Operando
                                    ll_long = ll_finoperando - ll_x - 1;                     //Determina longitud del Operando
                                    ls_operando = lstrFormula.Substring(ll_x + 1, ll_long);  //Captura Operando
                                    ll_x = ll_finoperando;                                   //Lleva puntero al final de operando
                                                                                             //Quita Espacios en Blanco dentro del Operando
                                    ls_operando = ls_operando.Replace(" ", "");
                                    //Verificando Operando 
                                    ls_subformula = VerificaOperando(ls_operando, lista);
                                    break;

                                default:
                                    ls_subformula = lc_dato;
                                    break;
                            }
                            ls_formulanew += ls_subformula;
                        }
                        //Si la formula esta vacia
                        if (ls_formulanew == "")
                        {
                            ls_formulanew = "0";
                        }

                        decimal lde_Aux = 0;

                        lde_Aux = Calculate(ls_formulanew);
                        if (f.COMPORTAMIENTO == "COMPORTAMIENTO")
                        {
                            ldecImporte = lde_Aux * lde_porcentaje;
                        }
                        else
                        {
                            ldecImporte = lde_Aux;
                        }
                        break;
                }
                ParametroBE param = new ParametroBE{ ID_PARAMETRO = f.PARAMETRO, VALOR = ldecImporte.ToString()};
                lista.Add(param);
            }            
            return lista;
        }

        private string VerificaOperando(string istrOperando, List<ParametroBE> listaEntidad)
        {
            string ls_subformula = "";
            decimal lde_importecida = 0;
            string ls_cida = "";

            switch (istrOperando.Substring(0, 1))
            {
                case "C":
                    ls_cida = istrOperando.Substring(1);
                    ls_subformula = ls_cida.Trim();
                    break;
                case "P":
                    //'Captura del Operando el Codigo del Parametro
                    ls_cida = istrOperando.Substring(1, istrOperando.Length - 1);
                    //Captura Importe ingresado para el Parametro
                    ParametroBE item = listaEntidad.Find(A => A.ID_PARAMETRO.Equals(int.Parse(ls_cida)));
                    if (item != null)
                    {
                        lde_importecida = decimal.Parse(item.VALOR);
                    }
                    else
                    {
                        lde_importecida = 0;
                    }
                    ls_subformula = lde_importecida.ToString();
                    break;
                case "F":
                    //Recupero información de factor
                    ls_cida = istrOperando.Substring(1);
                    FactorBE Fentidad = new FactorBE() { ID_FACTOR = int.Parse(ls_cida) };

                    List<FactorParametroBE> lFactorBE;
                    try
                    {
                        cn.Open();
                        lFactorBE = new FactorDA().ListaFactorParametro(Fentidad, cn);
                    }
                    finally { if (cn.State == ConnectionState.Open) cn.Close(); }

                    if (lFactorBE != null)
                    {
                        string SQL = "";
                        string SQL_PARAMETRO = "'";
                        string SQL_VALOR = "'";
                        int I = 1;
                        foreach (FactorParametroBE param in lFactorBE)
                        {
                            ParametroBE data = listaEntidad.Find(A => A.ID_PARAMETRO.Equals(param.ID_PARAMETRO));
                            SQL_PARAMETRO += param.ID_PARAMETRO.ToString() + (I == lFactorBE.Count ? "" : "|");
                            SQL_VALOR += data.VALOR + (I == lFactorBE.Count ? "" : "|");
                            I++;
                        }
                        SQL_PARAMETRO += "'";
                        SQL_VALOR += "'";
                        SQL += "AND F.PARAMETROS = " + SQL_PARAMETRO + " AND  F.VALORES = " + SQL_VALOR;

                        List<FactorDataBE> lFactorDataBE;
                        try
                        {
                            cn.Open();
                            lFactorDataBE = new FactorDA().ListaFactorData(Fentidad, SQL, cn);
                        }
                        finally { if (cn.State == ConnectionState.Open) cn.Close(); }

                        //List<FactorDataBE> lFactorDataBE = new FactorDA().ListaFactorParametroData(Fentidad, SQL);
                        if (lFactorDataBE != null)
                        {
                            if (lFactorDataBE.Count > 0)
                                lde_importecida = lFactorDataBE[0].FACTOR;
                            else
                                lde_importecida = 0;
                        }
                    }
                    else
                    {
                        lde_importecida = 0;
                    }
                    ls_subformula = lde_importecida.ToString();

                    break;
            }
            return ls_subformula;
        }

        private static decimal Calculate(string istrExpresion)
        {
            decimal dblResultado = 0;
            string strExpression = istrExpresion.Trim();

            if (istrExpresion.Trim() != "")
            {
                CultureInfo cul = new CultureInfo("es-PE", true);
                strExpression = strExpression.Replace(cul.NumberFormat.NumberDecimalSeparator, ".");
                dblResultado = EvaluateNumericExpression(strExpression);
            }

            return dblResultado;
        }

        private static decimal EvaluateNumericExpression(string istrExpresion)
        {
            VsaEngine engine = VsaEngine.CreateEngine();
            try
            {
                object resultado = Eval.JScriptEvaluate(istrExpresion, engine);
                return System.Convert.ToDecimal(resultado);
            }
            catch
            {
                return 0;
            }
            engine.Close();
        }
    }
}
