using API.Entities;
using API.Services.{{MainNamePlural}};
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class {{MainNamePlural}}Controller : ControllerBase
{
    [HttpGet]
    public async Task<{{MainName}}> Get(CancellationToken cancellationToken)
    {
        return new {{MainName}}();
    }

    [HttpPost]
    public async Task Create({{MainName}} request, CancellationToken cancellationToken)
    {
        var service = new {{MainName}}Service();
        service.Create{{MainName}}(request);
    }

    [HttpPut("{{{mainName}}Id}")]
    public async Task Update(long {{mainName}}Id, {{MainName}} {{mainName}}, CancellationToken cancellationToken)
    {
        var {{mainName}}Service = new {{MainName}}Service();
        {{mainName}}Service.Update{{MainName}}({{mainName}});
    }
}