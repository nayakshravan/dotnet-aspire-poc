using Projects;
using Aspire.Hosting;
using System.IO;

var builder = DistributedApplication.CreateBuilder(args);

var hospitalApi = builder.AddExecutable("hospital-api", "powershell", "../hospital.api")
    .WithArgs("-Command", "dotnet run")
    .WithUrl("http://localhost:5164");

var drugsApi = builder.AddExecutable("drugs-api", "powershell", "../drugs.api")
    .WithArgs("-Command", "dotnet run")
    .WithUrl("http://localhost:5203");

var uiFrontend = builder.AddNpmApp("ui-frontend", "../ui-frontend", "dev")
    .WithUrl("http://localhost:3000");

builder.Build().Run();
