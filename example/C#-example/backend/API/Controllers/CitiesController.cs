using API.Entities;
using API.Services.Cities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CitiesController : ControllerBase
{
    [HttpGet]
    public async Task<City> Get(CancellationToken cancellationToken)
    {
        return new City();
    }

    [HttpPost]
    public async Task Create(City request, CancellationToken cancellationToken)
    {
        var service = new CityService();
        service.CreateCity(request);
    }

    [HttpPut("{cityId}")]
    public async Task Update(long cityId, City city, CancellationToken cancellationToken)
    {
        var cityService = new CityService();
        cityService.UpdateCity(city);
    }
}