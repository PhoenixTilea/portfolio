namespace Portfolio.Contracts;

using Models;

public interface ISkillRepository
{
  Task Add(Skill model);
  Task Delete(int id);
  Task<List<Skill>> Get();
}
