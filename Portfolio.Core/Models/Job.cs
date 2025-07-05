namespace Portfolio.Core.Models;

using Enums;

public class Job
{
  public DateTime? EndDate { get; init; }
  public required Employer Employer { get; init; }
  public required int Id { get; init; }
  public required string JobTitle { get; init; }
  public required string Responsibilities { get; init; }
  public required HashSet<int> SkillsUsed { get; init; }
  public required DateTime StartDate { get; init; }
  public required EmploymentType Type { get; init; }

  public override string ToString() => JobTitle;
}
