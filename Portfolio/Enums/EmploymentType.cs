namespace Portfolio.Enums;

using System.ComponentModel;

public enum EmploymentType
{
  [Description("Full-Time")]
  Full,
  [Description("Full-Time Contract")]
  FullContract,
  [Description("Part-Time")]
  Part,
  [Description("Part-Time Contract")]
  PartContract,
  [Description("Self-Employed")]
  Self
}
