using System.Linq;
using Microsoft.AspNet.OData.Builder;
using Microsoft.AspNet.OData.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OData;
using Microsoft.OData.Edm;
using TicketLight.Core.DataAccess;
using TicketLight.Core.Entities;
using TicketLight.Core.Services;

namespace TicketLight.Api
{
    public class Startup
    {
        readonly string AllowLocalHostOrigins = "_allowLocalHost";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            TicketLight.Core.Services.ServiceProvider.Add<IConfiguration>(configuration);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<TicketScope>();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.AddOData();

            services.AddCors(options =>
            {
                options.AddPolicy(AllowLocalHostOrigins,
                builder =>
                {
                    builder.WithOrigins("http://localhost:4200")
                    .AllowAnyHeader()
                    .AllowAnyMethod(); ;
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(AllowLocalHostOrigins);

            app.UseHttpsRedirection();
            app.UseMvc(builder =>
            {
                builder.EnableDependencyInjection();
                builder.Select().Expand().Filter().OrderBy().MaxTop(100).Count();

                builder.MapODataServiceRoute("odata", "api", config => config
                        .AddService(Microsoft.OData.ServiceLifetime.Singleton, sp => GetEdmModel()));
            });

            Core.Services.ServiceProvider.Add<ICachingService>(new CachingService());
        }

        private static IEdmModel GetEdmModel()
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
