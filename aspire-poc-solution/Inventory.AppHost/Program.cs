using Projects;
using Aspire.Hosting;
using System.IO;

var builder = DistributedApplication.CreateBuilder(args);

var hospitalApi = builder.AddProject<hospital_api>("hospital-api");
var drugsApi = builder.AddProject<drugs_api>("drugs-api");

var uiFrontend = builder.AddNpmApp("ui-frontend","../ui-frontend" ,"dev")
    .WithUrl("http://localhost:3000")
    .WithReference(hospitalApi)
    .WithReference(drugsApi);

builder.Build().Run();
