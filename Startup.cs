using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Nelibur.ObjectMapper;
using GUSLibrary.Data.User;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GUSLibrary.Classes;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.IdentityModel.Tokens;
using GUSLibrary.Data.LibVendor;

namespace GUSLibrary
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add a reference to the Configuration object for DI
            services.AddSingleton<IConfiguration>(c => { return Configuration; });

            // Add framework services.
            services.AddMvc();
            services.Configure<FormOptions>(x =>
            {
                x.ValueLengthLimit = int.MaxValue;
                x.MultipartBodyLengthLimit = int.MaxValue; // In case of multipart
            });
            services.AddDistributedMemoryCache();
            services.AddSession();
            // Add EntityFramework's Identity support.
            services.AddEntityFramework();

            // Add Identity Services & Stores
            services.AddIdentity<ApplicationUser, UserRole>(config => {
                config.User.RequireUniqueEmail = true;
                config.Password.RequireNonAlphanumeric = false;
                config.Cookies.ApplicationCookie.AutomaticChallenge = false;
            })
            .AddEntityFrameworkStores<GUSLibraryDbContext>().AddDefaultTokenProviders();

            services.AddIdentity<Vendor, UserRole>(config => {
                config.User.RequireUniqueEmail = true;
                config.Password.RequireNonAlphanumeric = false;
                config.Cookies.ApplicationCookie.AutomaticChallenge = false;
            })
            .AddEntityFrameworkStores<GUSLibraryDbContext>().AddDefaultTokenProviders();

            // Add GUSLibraryDbContext
            services.AddDbContext<GUSLibraryDbContext>(options => options.UseSqlServer(Configuration["Data:DefaultConnection:ConnectionString"]));

            // Add GUSLibraryDbContext's DbSeeder
            services.AddSingleton<DbSeeder>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, DbSeeder dbSeeder)
        {
            app.UseSession();
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            // Configure a rewrite rule to auto-lookup for standard default files such as index.html.
            app.UseDefaultFiles();
            // Serve static files (html, css, js, images & more). See also the following URL:
            // https://docs.asp.net/en/latest/fundamentals/static-files.html for further reference.
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = (context) =>
                {
                    // Disable caching for all static files.
                    context.Context.Response.Headers["Cache-Control"] = Configuration["StaticFiles:Headers:Cache-Control"];
                    context.Context.Response.Headers["Pragma"] = Configuration["StaticFiles:Headers:Pragma"];
                    context.Context.Response.Headers["Expires"] = Configuration["StaticFiles:Headers:Expires"];
                }
            });

            // Add a custom Jwt Provider to generate Tokens
            app.UseJwtProvider();
            // Add the Jwt Bearer Header Authentication to validate Tokens
            app.UseJwtBearerAuthentication(new JwtBearerOptions()
            {
                AutomaticAuthenticate = true,
                AutomaticChallenge = true,
                RequireHttpsMetadata = false,
                TokenValidationParameters = new TokenValidationParameters()
                {
                    IssuerSigningKey = JwtProvider.SecurityKey,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = JwtProvider.Issuer,
                    ValidateIssuer = false,
                    ValidateAudience = false
                }
            });

            // Add MVC to the pipeline
            //enable session before MVC
            app.UseSession();
            app.UseMvc();

            // TinyMapper binding configuration
            //TinyMapper.Bind<ApplicationUser, ApplicationUserViewModel>();

            TinyMapper.Bind<LibColor, ColorViewModel>();
            TinyMapper.Bind<LibFabric, FabricViewModel>();
            TinyMapper.Bind<LibAccessory, AccessoryViewModel>();
            TinyMapper.Bind<LibWash, WashViewModel>();
            TinyMapper.Bind<LibSpec, SpecViewModel>();
            TinyMapper.Bind<LibGraphic, GraphicViewModel>();
            TinyMapper.Bind<LibShipping, ShippingViewModel>();
            TinyMapper.Bind<LibTraining, TrainingViewModel>();
            TinyMapper.Bind<LibTrainingItem, TrainingItemViewModel>();
            //TinyMapper.Bind<LibTrainingAndTrainingItem, TrainingAndTrainingItemViewModel>();

            TinyMapper.Bind<LibAccessoryCategory, AccessoryCategoryViewModel>();
            TinyMapper.Bind<LibAccessoryProductName, AccessoryProductNameViewModel>();
            TinyMapper.Bind<LibDepartment, DepartmentViewModel>();
            TinyMapper.Bind<LibEndBuyer, EndBuyerViewModel>();
            TinyMapper.Bind<LibFabricsCategory, FabricsCategoryViewModel>();
            TinyMapper.Bind<LibFabricsProductName, FabricsProductNameViewModel>();
            TinyMapper.Bind<LibFabricsFibreContent, FabricsFibreContentViewModel>();
            TinyMapper.Bind<LibFabricsFinishing, FabricsFinishingViewModel>();
            TinyMapper.Bind<LibFabricsYarnCount, FabricsYarnCountViewModel>();
            TinyMapper.Bind<LibPOM, POMViewModel>();
            TinyMapper.Bind<LibProductType, ProductTypeViewModel>();
            TinyMapper.Bind<LibReasonForAbortingProject, ReasonForAbortingProjectViewModel>();
            TinyMapper.Bind<LibSeason, SeasonViewModel>();
            TinyMapper.Bind<LibShippingType, ShippingTypeViewModel>();
            TinyMapper.Bind<LibSizeRange, SizeRangeViewModel>();
            TinyMapper.Bind<LibWashType, WashTypeViewModel>();
            TinyMapper.Bind<LibWashCategory, WashCategoryViewModel>();
            TinyMapper.Bind<LibWashProductName, WashProductNameViewModel>();
            TinyMapper.Bind<LibYear, YearViewModel>();
            TinyMapper.Bind<LibApplication, ApplicationViewModel>();
            TinyMapper.Bind<LibYear, YearViewModel>();

            TinyMapper.Bind<VendorType, VendorTypeViewModel>();
            TinyMapper.Bind<VendorProductType, VendorProductTypeViewModel>();


            //TinyMapper.Bind<FabricsCategory, FabricsCategoryViewModel>();
            //TinyMapper.Bind<FabricsDesc, FabricsDescViewModel>();
            //TinyMapper.Bind<FabricsYarnCount, FabricsYarnCountViewModel>();
            //TinyMapper.Bind<FabricsFibreContent, FabricsFibreContentViewModel>();
            //TinyMapper.Bind<FabricsFinishing, FabricsFinishingViewModel>();

            // Seed the Database (if needed)


            // session configuration

            app.UseMvcWithDefaultRoute();
            try
            {
                dbSeeder.SeedAsync().Wait();
            }
            catch (AggregateException e)
            {
                throw new Exception(e.ToString());
            }
        }
    }
}
