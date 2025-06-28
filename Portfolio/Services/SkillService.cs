namespace Portfolio.Services;

using Contracts;
using Models;

public sealed class SkillService : ISkillService
{
  private readonly ISkillRepository _skillRepository;

  public SkillService(ISkillRepository skillRepository)
  {
    _skillRepository = skillRepository;
  }

  public async Task<Dictionary<int, Skill>> GetAllSkills()
  {
    var skills = await _skillRepository.Get();
    return skills.ToDictionary(
      s => s.Id,
      s => s
    );
  }
}
