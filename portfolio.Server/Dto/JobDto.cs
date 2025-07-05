namespace Portfolio.Server.Dto;

using Core.Enums;
using Core.Models;

public sealed class JobDto
{
  public int? Id { get; set; }
  public DateTime? EndDate { get; set; }
  public int EmployerId { get; set; }
  public string JobTitle { get; set; } = string.Empty;
  public string Responsibilities { get; set; } = string.Empty;
  public HashSet<int> SkillsUsed { get; set; } = [];
  public DateTime StartDate { get; set; }
  public EmploymentType Type { get; set; }

  public static JobDto FromModel(Job model) => new()
  {
    Id = model.Id,
    EndDate = model.EndDate,
    JobTitle = model.JobTitle,
    Responsibilities = model.Responsibilities,
    SkillsUsed = model.SkillsUsed,
    StartDate = model.StartDate,
    Type = model.Type
  };
}

public static class JobExtensions
{
  public static Job ToModel(this JobDto dto, Employer employer) => new()
  {
    Id = dto.Id ?? -1,
    Employer = employer,
    JobTitle = dto.JobTitle.Trim(),
    Responsibilities = dto.Responsibilities.Trim(),
    Type = dto.Type,
    SkillsUsed = dto.SkillsUsed,
    StartDate = dto.StartDate,
    EndDate = dto.EndDate
  };
}
