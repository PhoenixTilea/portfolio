namespace Portfolio.Core.Extensions;

using Enums;
using EnumsNET;

public static class EnumExtensions
{
  public static List<string> ToNameList<TEnum>() where TEnum : struct, Enum =>
      Enums.GetValues<TEnum>()
        .Select(v => Enums.AsString<TEnum>(v, EnumFormat.Description, EnumFormat.Name) ?? string.Empty)
        .ToList();
}
