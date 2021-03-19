using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Oracle.DataAccess.Client;
using System.IO;
using Datos.minem.gob.pe;
using Entidad.minem.gob.pe;
using Util.minem.gob.pe;


namespace Logica.minem.gob.pe
{
    public class EstacionCargaLN : BaseLN
    {
        EstacionCargaDA estacionDa = new EstacionCargaDA();
        UsuarioDA usuDA = new UsuarioDA();
        InstitucionDA instDA = new InstitucionDA();

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
                    if (item.INSTITUCION.ID_INSTITUCION < 0)
                    {
                        seGuardo = instDA.RegistrarInstitucion(item.INSTITUCION, out idinstitucion, cn);
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
                            seGuardo = estacionDa.DeshabilitarImagen(idestacion, cn);
                            foreach (DocumentoBE iDoc in item.LISTA_IMAGEN)
                            {
                                if (seGuardo)
                                {
                                    iDoc.ID_ESTACION = idestacion;
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
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return item.OK;
        }

        public List<EstacionCargaBE> getEstacionPorUsuario(int idusuario)
        {
            List<EstacionCargaBE> lista = new List<EstacionCargaBE>();
            try
            {
                cn.Open();
                lista = estacionDa.getEstacionPorUsuario(idusuario, cn);
                foreach (EstacionCargaBE item in lista)
                {
                    item.LISTA_DOC = estacionDa.getAllEstacionDocumento(item, cn);
                    item.LISTA_IMAGEN = estacionDa.getAllEstacionImagen(item, cn);
                    item.CANTIDAD_IMAGEN = item.LISTA_IMAGEN.Count;
                    string pathFormat = AppSettings.Get<string>("Path.Archivo.Imagen");
                    string pathDirectoryRelative = string.Format(pathFormat, item.ID_USUARIO, item.ID_ESTACION);
                    string pathDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, pathDirectoryRelative);

                    foreach (DocumentoBE img in item.LISTA_IMAGEN)
                    {
                        string pathFile = Path.Combine(pathDirectory, img.ARCHIVO_BASE);
                        if (!Directory.Exists(pathDirectory)) Directory.CreateDirectory(pathDirectory);
                        pathFile = !File.Exists(pathFile) ? null : pathFile;
                        img.ARCHIVO_CONTENIDO = pathFile == null ? null : File.ReadAllBytes(pathFile);
                        img.RUTA = pathDirectoryRelative + "\\" + img.ARCHIVO_BASE;
                    }
                }
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }


        public EstacionCargaBE getEstacion(int idestacion)
        {
            EstacionCargaBE obj = new EstacionCargaBE();
            try
            {
                cn.Open();
                obj = estacionDa.getEstacion(idestacion, cn);
                if (obj != null && obj.ID_ESTACION > 0)
                {
                    obj.LISTA_DOC = estacionDa.getAllEstacionDocumento(obj, cn);
                    obj.LISTA_IMAGEN = estacionDa.getAllEstacionImagen(obj, cn);
                    obj.CANTIDAD_IMAGEN = obj.LISTA_IMAGEN.Count;

                    foreach (DocumentoBE doc in obj.LISTA_DOC)
                    {
                        string pathFormat = AppSettings.Get<string>("Path.Archivo.Documento");
                        string pathDirectoryRelative = string.Format(pathFormat, obj.ID_USUARIO, obj.ID_ESTACION);
                        string pathDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, pathDirectoryRelative);
                        string pathFile = Path.Combine(pathDirectory, doc.ARCHIVO_BASE);
                        if (!Directory.Exists(pathDirectory)) Directory.CreateDirectory(pathDirectory);
                        pathFile = !File.Exists(pathFile) ? null : pathFile;
                        doc.RUTA = !File.Exists(pathFile) ? "" : pathFile;
                        doc.ARCHIVO_CONTENIDO = pathFile == null ? null : File.ReadAllBytes(pathFile);
                    }

                    foreach (DocumentoBE img in obj.LISTA_IMAGEN)
                    {
                        string pathFormat = AppSettings.Get<string>("Path.Archivo.Imagen");
                        string pathDirectoryRelative = string.Format(pathFormat, obj.ID_USUARIO, obj.ID_ESTACION);
                        string pathDirectory = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, pathDirectoryRelative);
                        string pathFile = Path.Combine(pathDirectory, img.ARCHIVO_BASE);
                        if (!Directory.Exists(pathDirectory)) Directory.CreateDirectory(pathDirectory);
                        pathFile = !File.Exists(pathFile) ? null : pathFile;
                        img.RUTA = pathDirectoryRelative + "\\" + img.ARCHIVO_BASE;
                        img.ARCHIVO_CONTENIDO = pathFile == null ? null : File.ReadAllBytes(pathFile);
                    }

                }
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return obj;
        }

        public bool EliminarEstacion(int idestacion)
        {
            bool v = true;
            try
            {
                cn.Open();
                v = estacionDa.EliminarEstacion(idestacion, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return v;
        }

        public List<EstacionCargaBE> getEstacionAll(decimal minLng, decimal maxLng, decimal minLat, decimal maxLat)
        {
            List<EstacionCargaBE> lista = new List<EstacionCargaBE>();
            try
            {
                cn.Open();
                lista = estacionDa.getEstacionAll(minLng, maxLng, minLat, maxLat, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public UsuarioBE getInstitucion(int idUsuario)
        {
            UsuarioBE user = new UsuarioBE();
            try
            {
                cn.Open();
                user = estacionDa.getInstitucion(idUsuario, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return user;
        }

        public List<EstacionCargaBE> BuscarEstaciones(int nroInforme, string propietario, string empresa, int registros, int pagina, string columna, string orden)
        {
            List<EstacionCargaBE> lista = new List<EstacionCargaBE>();

            try
            {
                cn.Open();
                lista = estacionDa.BuscarEstaciones(nroInforme, propietario, empresa, registros, pagina, columna, orden, cn);
            }
            catch (Exception ex) { Log.Error(ex); }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return lista;
        }

        public bool RevisionEstacion(EstacionCargaBE entidad)
        {
            bool v = true;
            try
            {
                cn.Open();
                v = estacionDa.RevisionEstacion(entidad, cn);
            }
            finally { if (cn.State == ConnectionState.Open) cn.Close(); }

            return v;
        }


    }
}
