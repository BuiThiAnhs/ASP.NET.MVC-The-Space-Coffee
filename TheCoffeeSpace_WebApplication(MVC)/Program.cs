using Microsoft.EntityFrameworkCore;
using TheCoffeeSpace_WebApplication_MVC_.Models;
using TheCoffeeSpace_WebApplication_MVC_.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

var connectionString = builder.Configuration.GetConnectionString("DataTheSpaceCoffeeContext");
builder.Services.AddDbContext<DataTheSpaceCoffeeContext>(x => x.UseSqlServer(connectionString));
builder.Services.AddScoped<ICategory, Category>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
