namespace Portfolio.Data.Entities;

public sealed class ResponsibilityEntity
{
  public int Id { get; set; }

  public required JobEntity Employment { get; set; }
  public required string Description { get; set; }
}
