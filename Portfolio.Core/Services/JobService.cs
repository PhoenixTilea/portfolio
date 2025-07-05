namespace Portfolio.Core.Services;

using Contracts;
using Models;

public sealed class JobService : IJobService
{
  private readonly IJobRepository _jobRepository;

  public JobService(IJobRepository jobRepository)
  {
    _jobRepository = jobRepository;
  }

  public Task AddNewJob(Job newJob) =>
    _jobRepository.Add(newJob);

  public Task DeleteJob(int id) =>
    _jobRepository.Delete(id);

  public Task<List<Job>> GetAllJobs() =>
    _jobRepository.Get();

  public Task<Job?> GetJobById(int id) =>
    _jobRepository.Get(id);

  public Task UpdateJob(Job Job) =>
    _jobRepository.Update(Job);
}
