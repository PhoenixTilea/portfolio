namespace Portfolio.Server.Controllers;

using Core.Contracts;
using Dto;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[Controller]")]
public sealed class JobsController : ControllerBase
{
  private readonly IEmployerService _employerService;
  private readonly IJobService _jobService;

  public JobsController(IEmployerService employerService, IJobService jobService)
  {
    _employerService = employerService;
    _jobService = jobService;
  }

  [HttpPost("add")]
  public async Task<IActionResult> AddJob(JobDto job)
  {
    var employer = await _employerService.GetEmployerById(job.EmployerId);
    if (employer is null)
    {
      return BadRequest($"No employer with ID {job.EmployerId} was found.");
    }

    await _jobService.AddNewJob(job.ToModel(employer));
    return Created();
  }

  [HttpDelete("/delete/{id}")]
  public async Task<IActionResult> DeleteJob(int id)
  {
    await _jobService.DeleteJob(id);
    return NoContent();
  }

  [HttpGet("get")]
  public async Task<IActionResult> GetJobs()
  {
    var list = await _jobService.GetAllJobs();
    return Ok(list);
  }

  [HttpGet("get/{id}")]
  public async Task<IActionResult> GetJob(int id)
  {
    var job = await _jobService.GetJobById(id);
    if (job is null)
    {
      return NotFound();
    }

    return Ok(job);
  }

  [HttpPut("update/{id}")]
  public async Task<IActionResult> UpdateJob(int id, [FromBody] JobDto job)
  {
    if (!id.Equals(job.Id))
    {
      return BadRequest("Ids do not match.");
    }

    var employer = await _employerService.GetEmployerById(job.EmployerId);
    if (employer is null)
    {
      return BadRequest($"Employer with ID {job.EmployerId} could not be found.");
    }

    await _jobService.UpdateJob(job.ToModel(employer));
    return NoContent();
  }
}
