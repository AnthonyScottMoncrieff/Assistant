using Assistant.DataAccess.DataHandlers.Commands;
using Assistant.DataAccess.DataHandlers.ContextActionHandlers;
using Assistant.DataAccess.DataHandlers.ContextActionHandlers.Interfaces;
using Assistant.DataAccess.DataHandlers.Interfaces;
using Assistant.DataAccess.DataHandlers.Queries;
using Assistant.Domain;
using Assistant.Domain.Interfaces;
using Assistant.Logging;
using Assistant.Logging.Interfaces;
using Assistant.Models.Entities;
using Assistant.Models.Entities.Validators;
using Exceptionless;
using FluentValidation;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Assistant
{
    public static class IOC
    {
        public static void RegisterDependencies(IServiceCollection services, IConfiguration config)
        {
            RegisterExceptionless(config);
            RegisterLogging(services);
            RegisterDbContextItems(services);
            RegisterUtilities(services);
            RegisterDomain(services);
            RegisterValidators(services);
        }

        private static void RegisterValidators(IServiceCollection services)
        {
            services.AddTransient<IValidator<TvShow>, TvShowValidation>();
        }

        private static void RegisterUtilities(IServiceCollection services)
        {
            services.AddTransient<IUserContextManager, UserContextManager>();
        }

        private static void RegisterDomain(IServiceCollection services)
        {
            services.AddTransient<IUserTVShowMappingManager, UserTVShowMappingManager>();
        }

        private static void RegisterDbContextItems(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IQueryActionHandlers, QueryActionHandlers>();
            serviceCollection.AddTransient<ICommandActionHandlers, CommandActionHandlers>();

            serviceCollection.AddTransient<IGetTVShowsByUser, GetTVShowsByUser>();
            serviceCollection.AddTransient<IAddUserTVShowMapping, AddUserTVShowMapping>();
            serviceCollection.AddTransient<IDeleteUserTvShowMapping, DeleteUserTvShowMapping>();
        }

        private static void RegisterExceptionless(IConfiguration configuration)
        {
            ExceptionlessClient.Default.Configuration.ApiKey =
                configuration["Exceptionless:ApiKey"];
            ExceptionlessClient.Default.Configuration.ServerUrl =
                configuration["Exceptionless:ServerUrl"];
        }

        private static void RegisterLogging(IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<ILogger>(instance => new Logger(ExceptionlessClient.Default));
        }
    }
}