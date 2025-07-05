namespace Portfolio.Server.Dto;

using Core.Enums;
using Core.Models;

public sealed class SkillDto
{
  public List<Learned> LearnedBy { get; set; } = [];
  public int? Id { get; set; }
  public string Name { get; set; } = string.Empty;
  public Proficiency Proficiency { get; set; }
  public SkillType Type { get; set; }
  public int? YearLearned { get; set; }

  public static SkillDto FromModel(Skill model) => new()
  {
    Id = model.Id,
    Name = model.Name,
    Proficiency = model.Proficiency,
    LearnedBy = model.LearnedBy,
    Type = model.Type,
    YearLearned = model.YearLearned
  };
}

public static class SkillDtoExtensions
{
  public static Skill ToModel(this SkillDto dto) => new()
  {
    Id = dto.Id ?? -1,
    Name = dto.Name.Trim(),
    Type = dto.Type,
    Proficiency = dto.Proficiency,
    LearnedBy = dto.LearnedBy,
    YearLearned = dto.YearLearned
  };
}
