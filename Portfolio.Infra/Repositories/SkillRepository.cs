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
      Proficiency = model.Proficiency,
      YearLearned = model.YearLearned
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

  public async Task<Skill?> Get(int id) =>
    (await _context.Skills.FindAsync(id))?.ToModel();

  public async Task Update(Skill model)
  {
    var skill = await _context.Skills.FindAsync(model.Id);
    if (skill is not null)
    {
      skill.Name = model.Name;
      skill.LearnedBy = model.LearnedBy;
      skill.Type = model.Type;
      skill.Proficiency = model.Proficiency;
      skill.YearLearned = model.YearLearned;

      await _context.SaveChangesAsync();
    }
  }
}
