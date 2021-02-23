using System.Web.Http;
using System.Web.Http.Cors;
using WebApiElectroMovilidad.Controllers;

namespace WebApiElectroMovilidad
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Configuración y servicios de API web
            var cors = new EnableCorsAttribute(origins: "*", headers: "*", methods: "*", exposedHeaders: "X-Custom-Header");
            config.EnableCors(cors);
            // Rutas de API web
            config.MapHttpAttributeRoutes();
            config.MessageHandlers.Add(new TokenValidationHandler());

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
