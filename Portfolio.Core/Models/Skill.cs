namespace Portfolio.Core.Models;

using Enums;

public sealed class Skill
{
  public int Id { get; init; }
  public required List<Learned> LearnedBy { get; init; }
  public required string Name { get; init; }
  public required Proficiency Proficiency { get; init; }
  public required SkillType Type { get; init; }
  public int? YearLearned { get; init; }

  public override string ToString() => Name;
}
