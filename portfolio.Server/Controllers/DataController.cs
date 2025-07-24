namespace Portfolio.Server.Controllers;

using Core.Enums;
using Core.Extensions;
using EnumsNET;
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
      EmploymentTypes = EnumExtensions.ToNameList<EmploymentType>(),
      LearnTypes = EnumExtensions.ToNameList<Learned>(),
      Proficiencies = EnumExtensions.ToNameList<Proficiency>(),
      SkillTypes = EnumExtensions.ToNameList<SkillType>()
    };
    return Ok(data);
  }
}
