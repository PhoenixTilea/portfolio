namespace Portfolio.Core.Extensions;

using Enums;
using EnumsNET;

public static class EnumExtensions
{
  public static Dictionary<T, string> ToDictionary<T>() where T : struct, System.Enum =>
    Enum.GetValues<T>()
      .ToDictionary(
        v => v,
        v => Enums.AsString<T>(v, EnumFormat.Description, EnumFormat.Name) ?? v.ToString()
      );
}
