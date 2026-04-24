var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
// 1. Add Swagger services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); // Required for discovering endpoints
builder.Services.AddSwaggerGen();  

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();   // Serves the generated JSON document
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();


app.Run();
