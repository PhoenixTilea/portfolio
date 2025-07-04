namespace Portfolio.Infra.Repositories;

using Core.Contracts;
using Core.Models;
using Entities;
using Microsoft.EntityFrameworkCore;

public sealed class SkillRepository : ISkillRepository
{
  private readonly PortfolioContext _context;

  public SkillRepository(PortfolioContext context)
  {
    _context = context;
  }

  public async Task Add(Skill model)
  {
    var entity = new SkillEntity()
    {
      Name = model.Name,
      Type = model.Type,
      LearnedBy = model.LearnedBy,
      YearLearned = model.YearLearned,
      UsedAt = await _context.Jobs
        .Where(e => model.UsedAt.Contains(e.Id))
        .ToListAsync()
    };

    _context.Add(entity);
    await _context.SaveChangesAsync();
  }

  public async Task Delete(int id)
  {
    var entity = await _context.Skills.FindAsync(id);
    if (entity is not null)
    {
      _context.Remove(entity);
      await _context.SaveChangesAsync();
    }
  }

  public Task<List<Skill>> Get() =>
    _context.Skills
      .OrderBy(s => s.Name)
      .Select(s => s.ToModel())
      .ToListAsync();
}
