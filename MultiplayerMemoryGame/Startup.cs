using Akka.Actor;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ActorModel.Actors;
using MultiplayerMemoryGame.Models;
using Microsoft.AspNetCore.SignalR;
using ActorModel.Actors.ActorInstances;
using ActorModel.ExternalSystems;

namespace MultiplayerMemoryGame
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            //var actorSystem = ActorSystem.Create("MemoryGameSystem", ConfigurationLoader.Load());
            //services.AddSingleton<ActorSystem>(actorSystem);

            //services.AddSingleton(typeof(ActorSystem), (serviceProvider) => actorSystem);

            //var gameController = new GameControllerActorInstance(actorSystem);

            //services.AddSingleton<IGameControllerActorInstance>(new GameControllerActorInstance(ActorSystem.Create("MemoryGameSystem", ConfigurationLoader.Load())));
            //services.AddSingleton(typeof(IGameControllerActorInstance), (provider) => gameController);

            //services.AddSingleton<IGameEventsPusher, SignalRGameEventsPusher>();

            //services.AddSingleton<ISignalRBridgeActorInstance, SignalRBridgeActorInstance>();

            //services.AddSingleton(typeof(ISignalRBridgeActorInstance), (provider) =>
            //{
            //    var hubContext = provider.GetService<IHubContext<GameHub>>();
            //    var signalRBridgeActorInstance = new SignalRBridgeActorInstance(actorSystem, new SignalRGameEventsPusher(hubContext), gameController);
               
            //    return signalRBridgeActorInstance;
            //});
               

            
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, IApplicationLifetime lifetime)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }           
            

            app.UseHttpsRedirection();
            app.UseStaticFiles();
         //   app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            ////lifetime.ApplicationStarted.Register(() =>
            ////{
            ////    app.ApplicationServices.GetService<ActorSystem>();
            ////});

            ////lifetime.ApplicationStopping.Register(() =>
            ////{
            ////    app.ApplicationServices.GetService<ActorSystem>().Terminate().Wait();
            ////});

            //app.Use(async (context, next) =>
            //{
            //    var hubContext = context.RequestServices
            //});
            app.UseCors(builder => {
                builder.AllowAnyMethod()
                    .AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });

            app.UseSignalR(routes =>
            {
                routes.MapHub<GameHub>("/gameHub");
            });
            app.UseMvc();
        }
    }
}
