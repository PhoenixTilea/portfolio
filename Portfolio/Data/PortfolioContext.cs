namespace Portfolio.Data;

using Entities;
using Microsoft.EntityFrameworkCore;

public class PortfolioContext(DbContextOptions<PortfolioContext> options) : DbContext(options)
{
  public DbSet<JobEntity> Jobs { get; set; } = null!;
  public DbSet<ResponsibilityEntity> Responsibilities { get; set; } = null!;
  public DbSet<SkillEntity> Skills { get; set; } = null!;
}