namespace Portfolio.Infra;

using Core.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using Microsoft.Extensions.DependencyInjection;
using Repositories;

public static class InfraServiceCollectionExtensions
{
  public static IServiceCollection AddInfraServices(this IServiceCollection services) =>
    services.AddDbContext<PortfolioContext>(o => o.UseSqlite("Data Source = Portfolio.db"))
      .AddScoped<IEmployerRepository, EmployerRepository>()
      .AddScoped<IJobRepository, JobRepository>()
      .AddScoped<ISkillRepository, SkillRepository>();
}
