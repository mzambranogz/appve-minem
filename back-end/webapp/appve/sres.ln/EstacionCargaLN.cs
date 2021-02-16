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
using System.IO;

namespace sres.ln
{
    public class EstacionCargaLN : BaseLN
    {
        EstacionCargaDA estacionDa = new EstacionCargaDA();

        public EstacionCargaBE GuardarCriterioCaso(EstacionCargaBE item)
        {
            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    bool seGuardo = true;
                    int idinstitucion = -1;
                    int idestacion = -1;
                    if (item.INSTITUCION.ID_INSTITUCION < 0) seGuardo = estacionDa.RegistrarInstitucion(item.INSTITUCION, out idinstitucion, cn);
                    if (seGuardo)
                    {
                        seGuardo = estacionDa.RegistrarEstacion(item, out idestacion, cn);
                        item.INSTITUCION.ID_INSTITUCION = idinstitucion;
                        item.ID_ESTACION = idestacion;
                        if (item.LISTA_DOC != null)
                        {
                            foreach (DocumentoBE iDoc in item.LISTA_DOC)
                            {
                                if (seGuardo)
                                {
                                    if (iDoc.ARCHIVO_CONTENIDO != null && iDoc.ARCHIVO_CONTENIDO.Length > 0)
                                    {
                                        string pathFormat = AppSettings.Get<string>("Path.Archivo.Documento");
                                        string pathDirectoryRelative = string.Format(pathFormat, item.INSTITUCION.ID_INSTITUCION, item.ID_ESTACION, iDoc.ID_DOCUMENTO);
                                        string pathDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, pathDirectoryRelative);
                                        string pathFile = Path.Combine(pathDirectory, iDoc.ARCHIVO_BASE);
                                        if (!Directory.Exists(pathDirectory)) Directory.CreateDirectory(pathDirectory);
                                        File.WriteAllBytes(pathFile, iDoc.ARCHIVO_CONTENIDO);
                                    }
                                    seGuardo = estacionDa.GuardarDocumento(iDoc, cn);
                                }
                                else break;
                            }
                        }

                        if (item.LISTA_IMAGEN != null)
                        {
                            foreach (DocumentoBE iDoc in item.LISTA_IMAGEN)
                            {
                                if (seGuardo)
                                {
                                    if (iDoc.ARCHIVO_CONTENIDO != null && iDoc.ARCHIVO_CONTENIDO.Length > 0)
                                    {
                                        string pathFormat = AppSettings.Get<string>("Path.Archivo.Imagen");
                                        string pathDirectoryRelative = string.Format(pathFormat, item.INSTITUCION.ID_INSTITUCION, item.ID_ESTACION, iDoc.ID_DOCUMENTO);
                                        string pathDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, pathDirectoryRelative);
                                        string pathFile = Path.Combine(pathDirectory, iDoc.ARCHIVO_BASE);
                                        if (!Directory.Exists(pathDirectory)) Directory.CreateDirectory(pathDirectory);
                                        File.WriteAllBytes(pathFile, iDoc.ARCHIVO_CONTENIDO);
                                    }
                                    seGuardo = estacionDa.GuardarDocumento(iDoc, cn);
                                }
                                else break;
                            }
                        }
                    }

                    if (seGuardo) ot.Commit();
                    else ot.Rollback();
                    item.OK = seGuardo;
                }
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item;
        }
    }
}
