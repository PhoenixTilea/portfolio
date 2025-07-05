namespace Portfolio.Core.Contracts;

using Models;

public interface IEmployerService
{
  Task AddNewEmployer(Employer model);
  Task DeleteEmployer(int id);
  Task<Employer?> GetEmployerById(int id);
  Task<List<Employer>> GetAllEmployers();
  Task UpdateEmployer(Employer model);
}
