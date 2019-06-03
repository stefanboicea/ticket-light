using System;
using Microsoft.AspNet.OData.Builder;
using Microsoft.OData.Edm;
using Microsoft.OpenApi;
using Microsoft.OpenApi.Extensions;
using Microsoft.OpenApi.Models;
using Microsoft.OpenApi.OData;
using TicketLight.Core.Entities;

namespace TicketLight.OpenApi
{
    class MainClass
    {
        public static void Main(string[] args)
        {

            Console.Write(GenerateOpenApiDescription());
        }

        public static string GenerateOpenApiDescription()
        {
            OpenApiConvertSettings settings = new OpenApiConvertSettings();
            settings.PrefixEntityTypeNameBeforeKey = false;

            IEdmModel model = GetEdmModel();
            OpenApiDocument document = model.ConvertToOpenApi();
            var outputJSON = document.SerializeAsJson(OpenApiSpecVersion.OpenApi3_0);

            return outputJSON;
        }

        public static IEdmModel GetEdmModel()
        {
            var builder = new ODataConventionModelBuilder();
            builder.AddEnumType(typeof(TicketResolution));
            builder.AddEnumType(typeof(TicketPriority));
            builder.EntitySet<Member>("Members");
            builder.EntitySet<Ticket>("Tickets");


            return builder.GetEdmModel();
        }
    }

}
