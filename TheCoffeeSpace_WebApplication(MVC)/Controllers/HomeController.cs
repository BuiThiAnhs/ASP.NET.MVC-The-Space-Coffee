using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using TheCoffeeSpace_WebApplication_MVC_.Models;
using X.PagedList;

namespace TheCoffeeSpace_WebApplication_MVC_.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        DataTheSpaceCoffeeContext db = new DataTheSpaceCoffeeContext();

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            var list = db.TbSanPhams.AsNoTracking().OrderBy(x => x.MaSanPham).Take(6).ToList();
            return View(list);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Contact()
        {
            return View();
        }
        public IActionResult Menu(int? page, string target)
        {
            int pageSize = 12;
            int pageNumber = page == null || page < 0 ? 1 : page.Value;
            if (target == "all")
            {
                var listItem = db.TbSanPhams.AsNoTracking().OrderBy(x => x.MaSanPham).ToList();
                PagedList<TbSanPham> pagedListItem = new PagedList<TbSanPham>(listItem, pageNumber, pageSize);
                ViewBag.target = target;
                return View(pagedListItem);
            }
            else { 
                var listItem = db.TbSanPhams.AsNoTracking().Where(x => x.MaNhomSp == target).OrderBy(x => x.MaSanPham).ToList();
                PagedList<TbSanPham> pagedListItem = new PagedList<TbSanPham>(listItem, pageNumber, pageSize);
                ViewBag.target = target;
                return View(pagedListItem);
            }
        }
        public IActionResult Blog()
        {
            return View();
        }
        public IActionResult Services()
        {
            return View();
        }
        public IActionResult SignIn()
        {
            return View();
        }
        public IActionResult SignUp()
        {
            return View();
        }
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}