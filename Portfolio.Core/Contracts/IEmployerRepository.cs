namespace Portfolio.Core.Contracts;

using Models;

public interface IEmployerRepository
{
  Task Add(Employer model);
  Task Delete(int id);
  Task<List<Employer>> Get();
  Task<Employer?> Get(int id);
  Task Update(Employer model);
}
