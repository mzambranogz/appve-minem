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

        public bool GuardarEstacionCarga(EstacionCargaBE item)
        {
            try
            {
                cn.Open();
                using (OracleTransaction ot = cn.BeginTransaction(System.Data.IsolationLevel.ReadCommitted))
                {
                    bool seGuardo = true;
                    int idinstitucion = -1;
                    int idestacion = -1;
                    if (item.INSTITUCION.ID_INSTITUCION < 0) {
                        seGuardo = estacionDa.RegistrarInstitucion(item.INSTITUCION, out idinstitucion, cn);
                        item.INSTITUCION.ID_INSTITUCION = idinstitucion;
                    }
                    if (seGuardo)
                    {                        
                        seGuardo = estacionDa.RegistrarEstacion(item, out idestacion, cn);
                        item.ID_ESTACION = idestacion;
                        if (item.LISTA_DOC != null)
                        {
                            foreach (DocumentoBE iDoc in item.LISTA_DOC)
                            {
                                if (seGuardo)
                                {
                                    iDoc.ID_ESTACION = idestacion;
                                    if (iDoc.ARCHIVO_CONTENIDO != null && iDoc.ARCHIVO_CONTENIDO.Length > 0)
                                    {
                                        string pathFormat = AppSettings.Get<string>("Path.Archivo.Documento");
                                        string pathDirectoryRelative = string.Format(pathFormat, item.UPD_USUARIO, item.ID_ESTACION);
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
                                    iDoc.ID_ESTACION = idestacion;
                                    if (!(seGuardo = estacionDa.DeshabilitarImagen(idestacion, cn))) break;
                                    if (iDoc.ARCHIVO_CONTENIDO != null && iDoc.ARCHIVO_CONTENIDO.Length > 0)
                                    {
                                        string pathFormat = AppSettings.Get<string>("Path.Archivo.Imagen");
                                        string pathDirectoryRelative = string.Format(pathFormat, item.UPD_USUARIO, item.ID_ESTACION);
                                        string pathDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, pathDirectoryRelative);
                                        string pathFile = Path.Combine(pathDirectory, iDoc.ARCHIVO_BASE);
                                        if (!Directory.Exists(pathDirectory)) Directory.CreateDirectory(pathDirectory);
                                        File.WriteAllBytes(pathFile, iDoc.ARCHIVO_CONTENIDO);
                                    }
                                    seGuardo = estacionDa.GuardarImagen(iDoc, cn);
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

            return item.OK;
        }

        public List<EstacionCargaBE> getAllEstacion()
        {
            List<EstacionCargaBE> lista = new List<EstacionCargaBE>();
            try
            {
                cn.Open();
                lista = estacionDa.getAllEstacion(cn);
                foreach (EstacionCargaBE item in lista)
                {
                    item.LISTA_DOC = estacionDa.getAllEstacionDocumento(item, cn);
                    item.LISTA_IMAGEN = estacionDa.getAllEstacionImagen(item, cn);
                    item.CANTIDAD_IMAGEN = item.LISTA_IMAGEN.Count;
                    string pathFormat = AppSettings.Get<string>("Path.Archivo.Imagen");
                    string pathDirectoryRelative = string.Format(pathFormat, item.ID_USUARIO, item.ID_ESTACION);
                    foreach (DocumentoBE img in item.LISTA_IMAGEN)                                           
                        img.RUTA = pathDirectoryRelative + "\\"+ img.ARCHIVO_BASE;
                }
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }
    }
}
