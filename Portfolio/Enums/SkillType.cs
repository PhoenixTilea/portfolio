namespace Portfolio.Enums;

using System.ComponentModel;
using EnumsNET;

public enum SkillType
{
  Application,
  [Description("Cloud Service")]
  Cloud,
  Database,
  [Description("Developer Tool")]
  DevTool,
  Framework,
  Language,
  Library,
  Pattern,
  [Description("Soft Skill")]
  SoftSkill,
  Standard
}
