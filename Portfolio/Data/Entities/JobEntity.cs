namespace Portfolio.Data.Entities;

using Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

[EntityTypeConfiguration(typeof(JobEntityConfig))]
public sealed class JobEntity
{
  public int Id { get; set; }

  public DateOnly? EndDate { get; set; }
  public required string EmployerName { get; set; }
  public required string JobTitle { get; set; }
  public string Responsibilities { get; set; } = string.Empty;
  public List<SkillEntity> SkillsUsed { get; set; } = [];
  public required DateOnly StartDate { get; set; }
  public EmploymentType Type { get; set; }
}

public sealed class JobEntityConfig : IEntityTypeConfiguration<JobEntity>
{
  public void Configure(EntityTypeBuilder<JobEntity> builder)
  {
    builder.Navigation(e => e.SkillsUsed).AutoInclude();
  }
}

public static class JobEntityExtensions
{
  public static Job ToModel(this JobEntity entity) => new()
  {
    Id = entity.Id,
    EmployerName = entity.EmployerName,
    JobTitle = entity.JobTitle,
    StartDate = entity.StartDate,
    EndDate = entity.EndDate,
    Type = entity.Type,
    Responsibilities = entity.Responsibilities,
    SkillsUsed = entity.SkillsUsed
      .Select(s => s.Id)
      .ToHashSet()
  };
}
