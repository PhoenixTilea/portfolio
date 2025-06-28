namespace Portfolio.Enums;

using System.ComponentModel;
using EnumsNET;

public enum Learned
{
  [Description("Formal Education")]
  Formal,
  [Description("On-the-Job")]
  Job,
  [Description("Self-Taught")]
  Self
}
