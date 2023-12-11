# RCG

VERY simple and fast to use tool that automates creating repetitive files with customized parts. No configuration required, only template files!

# Getting started

## What is RCG?

RCG was created to automate a repetitive files generation. Let’s say you are creating a new CRUD project. Often you’d have to copy the existing files like Controllers, Services, database Entities, Tests etc. and change the name of a file and some internal content to mach a new name. RCG can automate this proceses. You only need to create a template file with folder structure, replace content to rename it with a custome placeholders and fire up RCG whenever you'd like to create a new CRUD operation. RCG will ask you to provide necessary placeholder replacement, and will put those files in a proper places.

## Instalation

```
$ npm install -g repetitive-code-generator
```

## Setting up

Create a new folder `rcg` - this is where your templates will be stored.

Optionaly create a new file in a root directory of your project.

```
// rcg.json
{
  "templateFolder": "rcg",
  "entryTargetFolder": ""
}
```

`templateFolder` - name of the folder with templates. Default rcg.
`entryTargetFolder` - entry folder where the content should be generated. Default empty string (root directory).

## First template

You can have many templates configured for one project. RCG will ask you which template to use.
Create a new folder inside `rcg` folder. You can name it whatever you like. For example `crud`. This folder will contain all files you want to generate. Now, it's important, to recreate a folder structure of an existing project, so RCG knows where to put new files.
For example you want to create a controller, service and entity. Project structure:
![folder structure](https://i.ibb.co/hVwprhn/folder-structure.png)

`backend` is a folder where we want to add new files

`rcgTemplateFolder` is a folder where we have two templates: crud and someOtherTemplate

`crud` template contains the same folder structure as `backend`. The only difference is that there are only files which we want to generate. You can create a new folder (if you want to have folders generated with specific name), and as many files as you like.

`someOtherTemplate` is empty template folder, just for demonstration

Let's see some sample file:

```
//{{MainNamePlural}}Controller.cs
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
```

As you can see, we are using placeholders to replace them with some data lateron. Placeholder format: `{{placeholderName}}`. You can create as many placeholders as you want. The same placeholder can be used in folder and file names.

Now to generate new files just open the console and type: `rcg`.

![rcg console](https://i.ibb.co/bm5X30N/rcg-console.png)

Select templace and fill all placeholder values:

![rcg filled placeholders](https://i.ibb.co/nmyDJRT/rcg-console-finished.png)

In this example we create a new CRUD for Cities.
The result should be visible in our project:

![result](https://i.ibb.co/jzkKPQ5/folder-structure-generated.png)

And the controller content:

```
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
```

## That's it. Have fun with saving lots of time :)
