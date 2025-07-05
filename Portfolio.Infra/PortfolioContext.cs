namespace Portfolio.Infra;

using Entities;
using Microsoft.EntityFrameworkCore;

public class PortfolioContext(DbContextOptions<PortfolioContext> options) : DbContext(options)
{
  public DbSet<EmployerEntity> Employers { get; set; } = null!;
  public DbSet<JobEntity> Jobs { get; set; } = null!;
  public DbSet<SkillEntity> Skills { get; set; } = null!;
}
