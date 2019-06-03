using System;
using Microsoft.AspNet.OData.Query;

namespace TicketLight.Api
{
    public class ODataValidationService
    {
        public static ODataValidationSettings Settings
        {
            get
            {
                // should get default settings from config
                return new ODataValidationSettings();
            }
        }
    }
}
