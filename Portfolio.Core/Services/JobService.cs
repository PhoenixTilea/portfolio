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

  public async Task<Dictionary<int, Job>> GetAllJobs()
  {
    var jobs = await _jobRepository.Get();
    return jobs.ToDictionary(
      j => j.Id,
      j => j
    );
  }

  public async Task<Job> GetJobById(int id) =>
    (await _jobRepository.Get(id)) ?? throw new InvalidOperationException($"Job with ID {id} could not be found.");

  public Task UpdateJob(Job job) =>
    _jobRepository.Update(job);
}
