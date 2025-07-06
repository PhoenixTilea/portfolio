namespace Portfolio.Server.Controllers;

using Core.Enums;
using Core.Extensions;
using Microsoft.AspNetCore.Mvc;

/// <summary>
/// A method to fetch static data from the backend so there is only one source of truth
/// for enums and other constants.
/// </summary>
[ApiController]
[Route("api/data")]
public sealed class DataController : ControllerBase
{
  [HttpGet("enums")]
  public IActionResult GetEnums()
  {
    var data = new
    {
      EmploymentTypes = EnumExtensions.ToDictionary<EmploymentType>(),
      LearnTypes = EnumExtensions.ToDictionary<Learned>(),
      Proficiencies = EnumExtensions.ToDictionary<Proficiency>(),
      SkillTypes = EnumExtensions.ToDictionary<SkillType>()
    };
    return Ok(data);
  }
}
