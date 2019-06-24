using System;
using Microsoft.Extensions.Configuration;
using TicketLight.Core.Services;

namespace TicketLight.Core.Common
{
    public class AppSettings
    {
        public static AppSettings Instance = new AppSettings();
        public AppSettings()
        {

        }

        public int MaxPageSize
        {
            get { return GetInt("Paging:MaxPageSize") ?? 10; }
        }

        public int CachedSearchValiditySeconds
        {
            get { return GetInt("Caching:SearchValiditySeconds") ?? 900; }
        }

        string GetString(string key)
        {
            return ServiceProvider.Get<IConfiguration>().GetSection(key).Value;
        }

        int? GetInt(string key)
        {
            var sval = ServiceProvider.Get<IConfiguration>().GetSection(key).Value;
            if (sval == null)
                return null;
            int val;
            if (!int.TryParse(sval, out val))
                return null;
            return val;
        }
    }
}
