namespace Portfolio.Server.Dto;

using Core.Models;

public sealed class EmployerDto
{
  public int? Id { get; set; }
  public string? LinkedIn { get; set; }
  public string Name { get; set; } = string.Empty;
  public string? Phone { get; set; }
  public string? Website { get; set; }

  public static EmployerDto FromModel(Employer model) => new()
  {
    Id = model.Id,
    Name = model.Name,
    Phone = model.Phone,
    LinkedIn = model.LinkedIn,
    Website = model.Website
  };
}

public static class EmployerDtoExtensions
{
  public static Employer ToModel(this EmployerDto dto) => new()
  {
    Id = dto.Id ?? -1,
    Name = dto.Name.Trim(),
    Phone = dto.Phone?.Trim(),
    LinkedIn = dto.LinkedIn?.Trim(),
    Website = dto.Website?.Trim()
  };
}
