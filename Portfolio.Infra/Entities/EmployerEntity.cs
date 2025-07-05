namespace Portfolio.Infra.Entities;

using Core.Models;

public sealed class EmployerEntity
{
  public int Id { get; set; }

  public string? LinkedIn { get; set; }
  public required string Name { get; set; }
  public string? Phone { get; set; }
  public string? Website { get; set; }
}

public static class EmployerEntityExtensions
{
  public static Employer ToModel(this EmployerEntity entity) => new()
  {
    Id = entity.Id,
    Name = entity.Name,
    LinkedIn = entity.LinkedIn,
    Phone = entity.Phone,
    Website = entity.Website
  };
}
