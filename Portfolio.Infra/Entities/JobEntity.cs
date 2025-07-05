namespace Portfolio.Infra.Entities;

using Core.Enums;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

[EntityTypeConfiguration(typeof(JobEntityConfig))]
public sealed class JobEntity
{
  public int Id { get; set; }

  public DateTime? EndDate { get; set; }
  public EmployerEntity Employer { get; set; } = null!;
  public required string JobTitle { get; set; }
  public string Responsibilities { get; set; } = string.Empty;
  public List<SkillEntity> SkillsUsed { get; set; } = [];
  public required DateTime StartDate { get; set; }
  public EmploymentType Type { get; set; }
}

public sealed class JobEntityConfig : IEntityTypeConfiguration<JobEntity>
{
  public void Configure(EntityTypeBuilder<JobEntity> builder)
  {
    builder.HasOne(j => j.Employer)
      .WithMany();
    builder.HasMany(j => j.SkillsUsed)
      .WithMany();

    builder.Navigation(j => j.Employer).AutoInclude();
    builder.Navigation(j => j.SkillsUsed).AutoInclude();
  }
}

public static class JobEntityExtensions
{
  public static Job ToModel(this JobEntity entity) => new()
  {
    Id = entity.Id,
    Employer = entity.Employer.ToModel(),
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
