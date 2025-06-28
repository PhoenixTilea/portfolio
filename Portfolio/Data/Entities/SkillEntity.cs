namespace Portfolio.Data.Entities;

using System.Text.Json;
using Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Models;

[EntityTypeConfiguration(typeof(SkillEntityConfig))]
public sealed class SkillEntity
{
  public int Id { get; set; }

  public required List<Learned> LearnedBy { get; set; } = [];
  public required string Name { get; init; }
  public required SkillType Type { get; set; }
  public List<JobEntity> UsedAt { get; set; } = [];
  public int? YearLearned { get; set; }
}

public sealed class SkillEntityConfig : IEntityTypeConfiguration<SkillEntity>
{
  public void Configure(EntityTypeBuilder<SkillEntity> builder)
  {
    builder.HasMany(s => s.UsedAt)
      .WithMany(e => e.SkillsUsed);
    builder.Navigation(s => s.UsedAt).AutoInclude();

    builder.Property(s => s.LearnedBy)
      .HasConversion(
        v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
        v => JsonSerializer.Deserialize<List<Learned>>(v, (JsonSerializerOptions?)null) ?? new(),
        new ValueComparer<List<Learned>>(
          (c1, c2) => c1!.SequenceEqual(c2!),
          c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
          c => (List<Learned>)c.ToList()));
  }
}

public static class SkillEntityExtensions
{
  public static Skill ToModel(this SkillEntity entity) => new()
  {
    Id = entity.Id,
    Name = entity.Name,
    Type = entity.Type,
    LearnedBy = entity.LearnedBy,
    YearLearned = entity.YearLearned,
    UsedAt = entity.UsedAt
      .Select(e => e.Id)
      .ToHashSet()
  };
}
