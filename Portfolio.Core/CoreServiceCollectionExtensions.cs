namespace Portfolio.Core;

using Contracts;
using Microsoft.Extensions.DependencyInjection;
using Services;

public static class CoreServiceCollectionExtensions
{
  public static IServiceCollection AddCoreServices(this IServiceCollection services) =>
    services.AddScoped<IEmployerService, EmployerService>()
      .AddScoped<IJobService, JobService>()
      .AddScoped<ISkillService, SkillService>();
}
