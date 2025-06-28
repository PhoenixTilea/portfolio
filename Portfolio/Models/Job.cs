namespace Portfolio.Models;

using Enums;

public class Job
{
  public DateOnly? EndDate { get; init; }
  public required string EmployerName { get; init; }
  public required int Id { get; init; }
  public required string JobTitle { get; init; }
  public required string Responsibilities { get; init; }
  public required HashSet<int> SkillsUsed { get; init; }
  public required DateOnly StartDate { get; init; }
  public required EmploymentType Type { get; init; }

  public override string ToString() => EmployerName;
}
