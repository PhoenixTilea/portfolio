namespace Portfolio.Core.Services;

using Contracts;
using Models;

public sealed class SkillService : ISkillService
{
  private readonly ISkillRepository _skillRepository;

  public SkillService(ISkillRepository skillRepository)
  {
    _skillRepository = skillRepository;
  }

  public Task AddNewSkill(Skill newSkill) =>
    _skillRepository.Add(newSkill);

  public Task DeleteSkill(int id) =>
    _skillRepository.Delete(id);

  public Task<List<Skill>> GetAllSkills() =>
    _skillRepository.Get();

  public Task<Skill?> GetSkillById(int id) =>
    _skillRepository.Get(id);

  public Task UpdateSkill(Skill Skill) =>
    _skillRepository.Update(Skill);
}
