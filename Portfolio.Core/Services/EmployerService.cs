namespace Portfolio.Core.Services;

using Contracts;
using Models;

public sealed class EmployerService : IEmployerService
{
  private readonly IEmployerRepository _employerRepository;

  public EmployerService(IEmployerRepository employerRepository)
  {
    _employerRepository = employerRepository;
  }

  public Task AddNewEmployer(Employer newEmployer) =>
    _employerRepository.Add(newEmployer);

  public Task DeleteEmployer(int id) =>
    _employerRepository.Delete(id);

  public Task<List<Employer>> GetAllEmployers() =>
    _employerRepository.Get();

  public Task<Employer?> GetEmployerById(int id) =>
    _employerRepository.Get(id);

  public Task UpdateEmployer(Employer Employer) =>
    _employerRepository.Update(Employer);
}
