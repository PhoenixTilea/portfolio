namespace Portfolio.Server.Controllers;

using Core.Contracts;
using Dto;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[Controller]")]
public sealed class SkillsController : ControllerBase
{
  private readonly ISkillService _skillService;

  public SkillsController(ISkillService skillService)
  {
    _skillService = skillService;
  }

  [HttpPost("add")]
  public async Task<IActionResult> AddSkill(SkillDto skill)
  {
    await _skillService.AddNewSkill(skill.ToModel());
    return Created();
  }

  [HttpDelete("/delete/{id}")]
  public async Task<IActionResult> DeleteSkill(int id)
  {
    await _skillService.DeleteSkill(id);
    return NoContent();
  }

  [HttpGet("get")]
  public async Task<IActionResult> GetSkills()
  {
    var list = await _skillService.GetAllSkills();
    return Ok(list);
  }

  [HttpGet("get/{id}")]
  public async Task<IActionResult> GetSkill(int id)
  {
    var skill = await _skillService.GetSkillById(id);
    if (skill is null)
    {
      return NotFound();
    }

    return Ok(skill);
  }

  [HttpPut("update/{id}")]
  public async Task<IActionResult> UpdateSkill(int id, [FromBody] SkillDto skill)
  {
    if (!id.Equals(skill.Id))
    {
      return BadRequest("Ids do not match.");
    }

    await _skillService.UpdateSkill(skill.ToModel());
    return NoContent();
  }
}
