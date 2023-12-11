using API.Entities;
using API.Services.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class UsersController : ControllerBase
{
    [HttpGet]
    public async Task<User> Get(CancellationToken cancellationToken)
    {
        return new User();
    }

    [HttpPost]
    public async Task Create(User request, CancellationToken cancellationToken)
    {
        var service = new UserService();
        service.CreateUser(request);
    }

    [HttpPut("{userId}")]
    public async Task Update(long userId, User user, CancellationToken cancellationToken)
    {
        var userService = new UserService();
        userService.UpdateUser(user);
    }
}