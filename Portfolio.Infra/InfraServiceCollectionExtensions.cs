namespace Portfolio.Infra;

using Core.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Repositories;

public static class InfraServiceCollectionExtensions
{
  public static IServiceCollection AddInfraServices(this IServiceCollection services) =>
    services.AddDbContext<PortfolioContext>()
      .AddScoped<IEmployerRepository, EmployerRepository>()
      .AddScoped<IJobRepository, JobRepository>()
      .AddScoped<ISkillRepository, SkillRepository>();
}
