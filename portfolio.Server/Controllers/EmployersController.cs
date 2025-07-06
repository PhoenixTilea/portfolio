namespace Portfolio.Server.Controllers;

using Core.Contracts;
using Dto;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/employers")]
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

  [HttpDelete("delete/{employerId}")]
  public async Task<IActionResult> DeleteEmployer(int employerId)
  {
    await _employerService.DeleteEmployer(employerId);
    return NoContent();
  }

  [HttpGet("get")]
  public async Task<IActionResult> GetEmployers()
  {
    var list = await _employerService.GetAllEmployers();
    return Ok(list);
  }

  [HttpGet("get/{employerId}")]
  public async Task<IActionResult> GetEmployer(int employerId)
  {
    var emp = await _employerService.GetEmployerById(employerId);
    if (emp is null)
    {
      return NotFound();
    }

    return Ok(emp);
  }

  [HttpPut("update/{employerId}")]
  public async Task<IActionResult> UpdateEmployer(int employerId, [FromBody] EmployerDto employer)
  {
    if (!employerId.Equals(employer.Id))
    {
      return BadRequest("Ids do not match.");
    }

    await _employerService.UpdateEmployer(employer.ToModel());
    return NoContent();
  }
}
