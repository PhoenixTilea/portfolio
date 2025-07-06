namespace Portfolio.Infra;

using System.IO;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

public class PortfolioContext() : DbContext()
{
  public DbSet<EmployerEntity> Employers { get; set; } = null!;
  public DbSet<JobEntity> Jobs { get; set; } = null!;
  public DbSet<SkillEntity> Skills { get; set; } = null!;

  protected override void OnConfiguring(DbContextOptionsBuilder builder)
  {
    var path = Path.Combine(Directory.GetCurrentDirectory(), "..", "Portfolio.Infra", "Portfolio.db");
    builder.UseSqlite($"Data Source = {path}");
  }
}
