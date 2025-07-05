namespace Portfolio.Core.Contracts;

using Models;

public interface ISkillService
{
  Task AddNewSkill(Skill model);
  Task DeleteSkill(int id);
  Task<List<Skill>> GetAllSkills();
  Task<Skill?> GetSkillById(int id);
  Task UpdateSkill(Skill model);
}
