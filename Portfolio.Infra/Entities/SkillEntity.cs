namespace Portfolio.Infra.Entities;

using System.Text.Json;
using Core.Enums;
using Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

[EntityTypeConfiguration(typeof(SkillEntityConfig))]
public sealed class SkillEntity
{
  public int Id { get; set; }

  public required List<Learned> LearnedBy { get; set; } = [];
  public required string Name { get; set; }
  public required Proficiency Proficiency { get; set; }
  public required SkillType Type { get; set; }
  public int? YearLearned { get; set; }
}

public sealed class SkillEntityConfig : IEntityTypeConfiguration<SkillEntity>
{
  public void Configure(EntityTypeBuilder<SkillEntity> builder)
  {
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
    Proficiency = entity.Proficiency,
    YearLearned = entity.YearLearned
  };
}
