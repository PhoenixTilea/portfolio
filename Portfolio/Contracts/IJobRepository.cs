namespace Portfolio.Contracts;

using Models;

public interface IJobRepository
{
  Task Add(Job model);
  Task Delete(int id);
  Task<List<Job>> Get();
  Task<Job?> Get(int id);
  Task Update(Job model);
}
