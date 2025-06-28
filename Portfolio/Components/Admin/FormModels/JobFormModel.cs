namespace Portfolio.Components.Admin.FormModels;

using System.ComponentModel.DataAnnotations;
using Enums;
using Models;

public class JobFormModel : IValidatableObject
{
  [Required, RegularExpression(@"^[A-Z][A-Za-z -]{9,}$")]
  public string JobTitle { get; set; } = string.Empty;
  [Required, MinLength(3)]
  public string EmployerName { get; set; } = string.Empty;
  public EmploymentType Type { get; set; }
  [Required, Range(1, 12)]
  public int StartMonth { get; set; }
  [Required]
  public int StartYear { get; set; }
  [Range(1, 12)]
  public int? EndMonth { get; set; }
  public int? EndYear { get; set; }
  [Required, MinLength(100)]
  public string Responsibilities { get; set; } = string.Empty;
  public List<int> SkillsUsed { get; set; } = [];

  public Job ToJob(int? id = null) => new()
  {
    Id = id.HasValue ? id.Value : -1,
    JobTitle = JobTitle.Trim(),
    EmployerName = EmployerName.Trim(),
    Type = Type,
    StartDate = new DateOnly(StartYear, StartMonth, 1),
    EndDate = EndYear.HasValue && EndMonth.HasValue
      ? new DateOnly(EndYear.Value, EndMonth.Value, 1)
      : null,
    Responsibilities = Responsibilities.Trim(),
    SkillsUsed = SkillsUsed.ToHashSet()
  };

  public IEnumerable<ValidationResult> Validate(ValidationContext _)
  {
    var year = DateTime.Now.Year;
    var results = new List<ValidationResult>();
    if (StartYear < 2020 || StartYear > year)
    {
      results.Add(new($"{nameof(StartYear)} must be between 2020 and {year}."));
    }
    if (EndYear.HasValue && EndYear < 2020 || EndYear > year)
    {
      results.Add(new($"{nameof(EndYear)} must be between 2020 and {year}."));
    }
    if (EndMonth.HasValue != EndYear.HasValue)
    {
      results.Add(new($"{nameof(EndMonth)} and {nameof(EndYear)} must both be set or both be null."));
    }
    else if (EndYear.HasValue)
    {
      var fromDate = new DateOnly(StartYear, StartMonth, 1);
      var toDate = new DateOnly(EndYear.Value, EndMonth!.Value, 1);
      if (fromDate > toDate)
      {
        results.Add(new($"Start date must come before end date."));
      }
    }

    return results;
  }

  public static JobFormModel From(Job model) => new()
  {
    JobTitle = model.JobTitle,
    EmployerName = model.EmployerName,
    Type = model.Type,
    StartMonth = model.StartDate.Month,
    StartYear = model.StartDate.Year,
    EndMonth = model.EndDate?.Month,
    EndYear = model.EndDate?.Year,
    Responsibilities = model.Responsibilities,
    SkillsUsed = model.SkillsUsed.ToList()
  };
}
