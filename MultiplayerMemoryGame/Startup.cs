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
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddSingleton(_ => ActorSystem.Create("MemoryGameSystem", ConfigurationLoader.Load()));

            services.AddSingleton<GameControllerActorProvider>(provider =>
            {
                var actorSystem = provider.GetService<ActorSystem>();
                var gameControllerActor = actorSystem.ActorOf(Props.Create(() => new GameControllerActor()));
                return () => gameControllerActor;
            });

            services.AddSingleton<SignalRBridgeActorProvider>(provider =>
            {
                var actorSystem = provider.GetService<ActorSystem>();
                var gameControllerActorProvider = provider.GetService<GameControllerActorProvider>();
                var hubContext = provider.GetService<IHubContext<GameHub>>();
                var signalRBridgeActor = actorSystem.ActorOf(Props.Create(
                    () => new SignalRBridgeActor(new SignalRGameEventsPusher(hubContext), gameControllerActorProvider)
                    ));
                return () => signalRBridgeActor;
            });

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
            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            lifetime.ApplicationStarted.Register(() =>
            {
                app.ApplicationServices.GetService<ActorSystem>();
            });

            lifetime.ApplicationStopping.Register(() =>
            {
                app.ApplicationServices.GetService<ActorSystem>().Terminate().Wait();
            });

            app.UseSignalR(routes =>
            {
                routes.MapHub<GameHub>("/game");
            });
            app.UseMvcWithDefaultRoute();
        }
    }
}
