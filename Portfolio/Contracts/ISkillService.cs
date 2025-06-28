namespace Portfolio.Contracts;

using Models;

public interface ISkillService
{
  Task<Dictionary<int, Skill>> GetAllSkills();
}
