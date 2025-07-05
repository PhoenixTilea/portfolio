namespace Portfolio.Core.Contracts;

using Models;

public interface IJobService
{
  Task AddNewJob(Job model);
  Task DeleteJob(int id);
  Task<List<Job>> GetAllJobs();
  Task<Job?> GetJobById(int id);
  Task UpdateJob(Job job);
}
