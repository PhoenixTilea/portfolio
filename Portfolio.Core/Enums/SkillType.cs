namespace Portfolio.Core.Enums;

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
  Practice,
  [Description("Soft Skill")]
  SoftSkill,
  Standard
}
