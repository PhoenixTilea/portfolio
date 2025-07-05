namespace Portfolio.Core.Models;

public class Employer
{
  public int Id { get; init; }
  public string? LinkedIn { get; init; }
  public required string Name { get; init; }
  public string? Phone { get; init; }
  public string? Website { get; init; }

  public override string ToString() => Name;
}
