namespace Portfolio.Server.Controllers;

using Core.Contracts;
using Dto;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/skills")]
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

  [HttpDelete("delete/{skillId}")]
  public async Task<IActionResult> DeleteSkill(int skillId)
  {
    await _skillService.DeleteSkill(skillId);
    return NoContent();
  }

  [HttpGet("get")]
  public async Task<IActionResult> GetSkills()
  {
    var list = await _skillService.GetAllSkills();
    return Ok(list);
  }

  [HttpGet("get/{skillId}")]
  public async Task<IActionResult> GetSkill(int skillId)
  {
    var skill = await _skillService.GetSkillById(skillId);
    if (skill is null)
    {
      return NotFound();
    }

    return Ok(skill);
  }

  [HttpPut("update/{skillId}")]
  public async Task<IActionResult> UpdateSkill(int skillId, [FromBody] SkillDto skill)
  {
    if (!skillId.Equals(skill.Id))
    {
      return BadRequest("Ids do not match.");
    }

    await _skillService.UpdateSkill(skill.ToModel());
    return NoContent();
  }
}
