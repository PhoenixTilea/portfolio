using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;
using Portfolio.Contracts;
using Portfolio.Components;
using Portfolio.Data;
using Portfolio.Data.Repositories;
using Portfolio.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services
  .AddDbContext<PortfolioContext>(o => o.UseSqlite("Data/portfolio.db"))
  .AddScoped<IJobRepository, JobRepository>()
  .AddScoped<ISkillRepository, SkillRepository>()
  .AddScoped<IJobService, JobService>()
  .AddScoped<ISkillService, SkillService>();

builder.Services.AddRazorComponents()
  .AddInteractiveServerComponents();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
  app.UseExceptionHandler("/Error", createScopeForErrors: true);
  // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
  app.UseHsts();
}

app.UseHttpsRedirection();

app.UseAntiforgery();

app.MapStaticAssets();
app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();
