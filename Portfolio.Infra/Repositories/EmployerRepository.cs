namespace Portfolio.Infra.Repositories;

using Core.Contracts;
using Core.Models;
using Entities;
using Microsoft.EntityFrameworkCore;

public sealed class EmployerRepository : IEmployerRepository
{
  private readonly PortfolioContext _context;

  public EmployerRepository(PortfolioContext context)
  {
    _context = context;
  }

  public Task Add(Employer model)
  {
    _context.Add(new EmployerEntity()
    {
      Name = model.Name,
      Phone = model.Phone,
      LinkedIn = model.LinkedIn,
      Website = model.Website
    });
    return _context.SaveChangesAsync();
  }

  public async Task Delete(int id)
  {
    var entity = await _context.Employers.FindAsync(id);
    if (entity is not null)
    {
      _context.Remove(entity);
      await _context.SaveChangesAsync();
    }
  }

  public Task<List<Employer>> Get() =>
    _context.Employers
      .Select(e => e.ToModel())
      .ToListAsync();

  public async Task<Employer?> GetById(int id) =>
    (await _context.Employers.FindAsync(id))?.ToModel();

  public async Task Update(Employer model)
  {
    var emp = await _context.Employers.FindAsync(model.Id);
    if (emp is not null)
    {
      emp.Name = model.Name;
      emp.Phone = model.Phone;
      emp.LinkedIn = model.LinkedIn;
      emp.Website = model.Website;
      await _context.SaveChangesAsync();
    }
  }
}
