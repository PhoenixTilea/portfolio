namespace Portfolio.Server.Controllers;

using Core.Contracts;
using Dto;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[Controller]")]
public sealed class EmployersController : ControllerBase
{
  private readonly IEmployerService _employerService;

  public EmployersController(IEmployerService employerService)
  {
    _employerService = employerService;
  }

  [HttpPost("add")]
  public async Task<IActionResult> AddEmployer(EmployerDto employer)
  {
    await _employerService.AddNewEmployer(employer.ToModel());
    return Created();
  }

  [HttpDelete("/delete/{id}")]
  public async Task<IActionResult> DeleteEmployer(int id)
  {
    await _employerService.DeleteEmployer(id);
    return NoContent();
  }

  [HttpGet("get")]
  public async Task<IActionResult> GetEmployers()
  {
    var list = await _employerService.GetAllEmployers();
    return Ok(list);
  }

  [HttpGet("get/{id}")]
  public async Task<IActionResult> GetEmployer(int id)
  {
    var emp = await _employerService.GetEmployerById(id);
    if (emp is null)
    {
      return NotFound();
    }

    return Ok(emp);
  }

  [HttpPut("update/{id}")]
  public async Task<IActionResult> UpdateEmployer(int id, [FromBody] EmployerDto employer)
  {
    if (!id.Equals(employer.Id))
    {
      return BadRequest("Ids do not match.");
    }

    await _employerService.UpdateEmployer(employer.ToModel());
    return NoContent();
  }
}
