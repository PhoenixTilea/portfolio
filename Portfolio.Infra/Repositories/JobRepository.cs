namespace Portfolio.Infra.Repositories;

using Core.Contracts;
using Core.Models;
using Entities;
using Microsoft.EntityFrameworkCore;

public sealed class JobRepository : IJobRepository
{
  private readonly PortfolioContext _context;

  public JobRepository(PortfolioContext context)
  {
    _context = context;
  }

  public async Task Add(Job model)
  {
    var entity = new JobEntity()
    {
      Employer = (await _context.Employers.FindAsync(model.Employer.Id))!,
      JobTitle = model.JobTitle,
      StartDate = model.StartDate,
      EndDate = model.EndDate,
      Type = model.Type,
      Responsibilities = model.Responsibilities,
      SkillsUsed = await _context.Skills
        .Where(s => model.SkillsUsed.Contains(s.Id))
        .ToListAsync()
    };

    _context.Add(entity);
    await _context.SaveChangesAsync();
  }

  public async Task Delete(int id)
  {
    var entity = await _context.Jobs.FindAsync(id);
    if (entity is not null)
    {
      _context.Remove(entity);
      await _context.SaveChangesAsync();
    }
  }

  public Task<List<Job>> Get() =>
    _context.Jobs
      .OrderByDescending(e => e.StartDate)
      .Select(e => e.ToModel())
      .ToListAsync();

  public async Task<Job?> Get(int id) =>
    (await _context.Jobs.FindAsync(id))?.ToModel();

  public async Task Update(Job model)
  {
    var job = _context.Jobs.Find(model.Id);
    if (job is not null)
    {
      job.JobTitle = model.JobTitle;
      job.Type = model.Type;
      job.StartDate = model.StartDate;
      job.EndDate = model.EndDate;
      job.Responsibilities = model.Responsibilities;
      job.SkillsUsed = await _context.Skills
        .Where(s => model.SkillsUsed.Contains(s.Id))
        .ToListAsync();

      if (model.Employer.Id != job.Employer.Id)
      {
        job.Employer = (await _context.Employers.FindAsync(model.Employer.Id))!;
      }

      await _context.SaveChangesAsync();
    }
  }
}
