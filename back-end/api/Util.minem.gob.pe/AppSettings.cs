using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Util.minem.gob.pe
{
    public class AppSettings
    {
        public static T Get<T>(string key)
        {
            T value = default(T);

            if (ConfigurationManager.AppSettings.AllKeys.Contains(key)) value = (T)Convert.ChangeType(ConfigurationManager.AppSettings[key], typeof(T));

            return value;
        }
    }
}
