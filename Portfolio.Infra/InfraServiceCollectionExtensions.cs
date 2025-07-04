namespace Portfolio.Infra;

using Core.Contracts;
using Microsoft.Extensions.DependencyInjection;
using Repositories;

public static class InfraServiceCollectionExtensions
{
  public static IServiceCollection AddInfraServices(this IServiceCollection services) =>
    services.AddScoped<ISkillRepository, SkillRepository>()
      .AddScoped<IJobRepository, JobRepository>();
}
