namespace Portfolio.Components.Admin;

using Contracts;
using FormModels;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Forms;
using Models;

public partial class JobForm
{
  private readonly IJobService _jobService;
  private readonly ISkillService _skillService;
  private readonly NavigationManager _navigation;

  public JobForm(
    IJobService jobService,
    ISkillService skillService,
    NavigationManager navigation
  )
  {
    _jobService = jobService;
    _skillService = skillService;
    _navigation = navigation;
  }

  [Parameter]
  public int? JobId { get; set; }
  [Parameter, EditorRequired]
  public EventCallback CloseForm { get; set; }

  private Dictionary<int, Skill> AllSkills = new();
  private EditContext EditContext = null!;

  [SupplyParameterFromForm]
  public JobFormModel Model { get; set; } = new();

  protected override async Task OnInitializedAsync()
  {
    if (JobId.HasValue)
    {
      Job job;
      try
      {
        job = await _jobService.GetJobById(JobId.Value);
        Model = JobFormModel.From(job);
      }
      catch (Exception)
      {
        // TODO: Log this
        _navigation.NavigateTo("/admin/jobs");
        return;
      }
    }

    EditContext = new(Model);
    AllSkills = await _skillService.GetAllSkills();
  }

  public void UpdateSkillsUsed(List<int> skills)
  {
    Model.SkillsUsed = skills;
    StateHasChanged();
  }

  private async Task Submit()
  {
    if (JobId.HasValue)
    {
    }
    else
    {
      await _jobService.AddNewJob(Model.ToJob());
    }

    await CloseForm.InvokeAsync();
  }
}
