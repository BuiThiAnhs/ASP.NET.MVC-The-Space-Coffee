using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using TheSpaceCofffeeAdmin.Models;
using X.PagedList;
using System.Linq;
using X.PagedList.Mvc;
using System.Data.Entity;
using Azure;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace TheSpaceCofffeeAdmin.Controllers
{
    public class HomeController : Controller
    {
        QlkinhDoanhSpaceCoffeeContext db = new QlkinhDoanhSpaceCoffeeContext();
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }
//dashbroad
        public IActionResult Dashbroad(int? page)
        {
           
            return View();
        }
//StoreHouse
        public IActionResult StoreHouse(int? page)
        {
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;
            var lstStoreHouse = db.TbKhoVatTuChes.OrderBy(x => x.MaCuaHang);
            PagedList<TbKhoVatTuCh> lst = new PagedList<TbKhoVatTuCh>(lstStoreHouse, pageNumber, pageSize);
            return View(lst);
        }
        //findproductbystore
        public ActionResult FindStoreHouse(string searchNameStoreHouse, int? page )
        {
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;
            var store = db.TbKhoVatTuChes.Where(t => t.MaCuaHang.Contains(searchNameStoreHouse)).ToList();
            PagedList<TbKhoVatTuCh> lst = new PagedList<TbKhoVatTuCh>(store, pageNumber, pageSize);
            ViewBag.SearchName = searchNameStoreHouse;
            return View(lst);
        }
        //addstorehouse
        [HttpGet]
        public IActionResult AddStoreHouse()
        {
            ViewBag.MaCuaHang = new SelectList(db.TbCuaHangs.ToList(), "MaCuaHang", "TenCuaHang");
            ViewBag.MaVatTu = new SelectList(db.TbVatTus.ToList(), "MaVatTu", "TenVatTu");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddStoreHouse(TbKhoVatTuCh tbKhoVatTu)
        {
            if (ModelState.IsValid)
            {
                db.TbKhoVatTuChes.Add(tbKhoVatTu);
                db.SaveChanges();
                return RedirectToAction("StoreHouse");
            }
            return View(tbKhoVatTu);
        }
 //Store
        public IActionResult Store(int? page)
        {
            int pageSize = 2;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;
            var lstStore = db.TbCuaHangs.OrderBy(x => x.MaCuaHang);
            PagedList<TbCuaHang> lst = new PagedList<TbCuaHang>(lstStore, pageNumber, pageSize);
            return View(lst);
        }
        //findproductbystore
        public ActionResult FindStore(string searchNameStore)
        {
            var store = db.TbCuaHangs.Where(t => t.TenCuaHang.Contains(searchNameStore)).ToList();
            return View(store);
        }
        //addstore
        [HttpGet]
        public IActionResult AddStore() { 
            return View(); 
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddStore(TbCuaHang cuaHang)
        {
            if(ModelState.IsValid)
            {
                db.TbCuaHangs.Add(cuaHang);
                db.SaveChanges();
                return RedirectToAction("Store");
            }
            return View(cuaHang);
        }
        //editstore

        [HttpGet]
        public IActionResult EditStore(string IDCuaHang)
        {
            
            var stores = db.TbCuaHangs.Find(IDCuaHang);
            return View(stores);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditStore(TbCuaHang cuaHang)
        {
            if (ModelState.IsValid)
            {
                db.Update(cuaHang);
                db.SaveChanges();
                return RedirectToAction("Store");
            }
            return View(cuaHang);
        }
 //Product
        public IActionResult ListProducts(int? page)
        {
            int pageSize = 3;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;
            var lstProducts = db.TbSanPhams.OrderBy(x => x.GiaBan);
            PagedList<TbSanPham> lst = new PagedList<TbSanPham>(lstProducts, pageNumber, pageSize);
           // ViewBag.MaNhomSp = new SelectList(db.TbNhomSanPhams.ToList(), "MaNhomSp", "TenNhomSp");
            return View(lst);
        }
        //findproductbyname
        public ActionResult FindProduct(string searchNameProduct)
        {
            var product = db.TbSanPhams.Where(t => t.TenSanPham.Contains(searchNameProduct)).ToList();
            return View(product);
        }
        //addproduct
        [HttpGet]
        public IActionResult AddProduct()
        {
            ViewBag.MaNhomSP = new SelectList(db.TbNhomSanPhams.ToList(),"MaNhomSp","TenNhomSp");
            return View();

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddProduct(TbSanPham sp)
        {

            if (ModelState.IsValid)
            {
                db.TbSanPhams.Add(sp);
                db.SaveChanges();
                return RedirectToAction("ListProducts");
            }
            return View(sp);
        }
        //editproduct 
        
        [HttpGet]
        public IActionResult EditProduct(string IDProduct)
        {
            ViewBag.MaNhomSanPham = new SelectList(db.TbNhomSanPhams.ToList(),"MaNhomSp","TenNhomSp");
            var product = db.TbSanPhams.Find( IDProduct);
            return View(product);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditProduct(TbSanPham sp)
        {
            if (ModelState.IsValid)
            {
                db.TbSanPhams.Update(sp); 
                db.SaveChanges();
                return RedirectToAction("ListProduct");
            }
            return View(sp);
        }
//Topping
        public IActionResult Topping(int? page)
        {
            int pageSize = 3;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;
            var lstTopping = db.TbToppings.OrderBy(x => x.MaTopping);
            PagedList<TbTopping> lst = new PagedList<TbTopping>(lstTopping, pageNumber, pageSize);
            return View(lst);
        }
        //findtoppingbyname
        public ActionResult FindTopping(string searchNameTopping)
        {
            var topp= db.TbToppings.Where(t => t.TenTopping.Contains(searchNameTopping)).ToList();
            return View(topp);
        }

        //addtopping
        [HttpGet]
        public IActionResult AddTopping()
        {
            return View();

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddTopping(TbTopping topping)
        {
            if (ModelState.IsValid)
            {
                db.TbToppings.Add(topping);
                db.SaveChanges();
                return RedirectToAction("Topping");
            }
            return View(topping);
        }
        //edittoping

        [HttpGet]
        public IActionResult EditTopping(string IDTopping)
        {
            var topping = db.TbToppings.Find(IDTopping);
            return View(topping);

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult EditTopping(TbTopping topping)
        {
            if (ModelState.IsValid)
            {
                db.Update(topping);
                db.SaveChanges();
                return RedirectToAction("Topping");
            }
            return View(topping);
        }
        //deleteTopping

//PayAmount

        public IActionResult PayAmount(int? page)
        {
            List<HoaDonNhap> HoaDonNhap = new List<HoaDonNhap>();

            using (var db = new QlkinhDoanhSpaceCoffeeContext())
            {
                var query = from cthn in db.TbChiTietHdns
                            join hdn in db.TbHoaDonNhaps on cthn.MaHoaDonNhap equals hdn.MaHoaDonNhap
                            select new HoaDonNhap                            {
                                MaHoaDonNhap = cthn.MaHoaDonNhap,
                                MaVatTu = cthn.MaVatTu,
                                NgayLap = hdn.NgayLap,
                                SoLuongNhap = cthn.SoLuongNhap,
                                GiaNhap = cthn.GiaNhap,
                                MaNhaCungCap = hdn.MaNhaCungCap,
                                TongTien = cthn.GiaNhap * cthn.SoLuongNhap,
                            };

                HoaDonNhap = query.OrderBy(x => x.MaHoaDonNhap).ToList();
            }
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;

            var pageHoaDonNhap = HoaDonNhap.ToPagedList(pageNumber, pageSize);
            return View(pageHoaDonNhap);
        }
        //FindPayAmount
        public ActionResult FindPayAmount(DateTime searchDate, int ?page)
        {
            List<HoaDonNhap> HoaDonNhap = new List<HoaDonNhap>();

            using (var db = new QlkinhDoanhSpaceCoffeeContext())
            {
                var query = from cthn in db.TbChiTietHdns
                            join hdn in db.TbHoaDonNhaps on cthn.MaHoaDonNhap equals hdn.MaHoaDonNhap
                            select new HoaDonNhap
                            {
                                MaHoaDonNhap = cthn.MaHoaDonNhap,
                                MaVatTu = cthn.MaVatTu,
                                NgayLap = hdn.NgayLap,
                                SoLuongNhap = cthn.SoLuongNhap,
                                GiaNhap = cthn.GiaNhap,
                                MaNhaCungCap = hdn.MaNhaCungCap,
                                TongTien = cthn.GiaNhap * cthn.SoLuongNhap,
                            };

                HoaDonNhap = query.Where(x => x.NgayLap ==  searchDate).OrderBy(x => x.MaHoaDonNhap).ToList();
            }
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;

            var pageHoaDonNhap = HoaDonNhap.ToPagedList(pageNumber, pageSize);
            ViewBag.SearchName = searchDate;
            return View(pageHoaDonNhap);

        }
        //addpayamount
        [HttpGet]
        public IActionResult AddPayAmount()
        {

            ViewBag.MaNhaCungCap = new SelectList(db.TbNhaCungCaps.ToList(), "MaNhaCungCap", "TenNhaCungCap");
            ViewBag.MaVatTu = new SelectList(db.TbVatTus.ToList(), "MaVatTu", "TenVatTu");
            return View();

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddPayAmount(HoaDonNhap hoaDonNhap)
        {
            List<HoaDonNhap> HoaDonNhap = new List<HoaDonNhap>();
            if (ModelState.IsValid)
            {
                HoaDonNhap.Add(hoaDonNhap);
                db.SaveChanges();
                return RedirectToAction("PayAmount");
            }
            return View(hoaDonNhap);
        }
        //editpayamount

 //Payment
        public IActionResult Payment(int? page)
        {
            List<HoaDonBan> Hdban = new List<HoaDonBan>();

            using (var db = new QlkinhDoanhSpaceCoffeeContext())
            {
                var query = from cthb in db.TbChiTietHdbs
                            join hdb in db.TbHoaDonBans on cthb.MaHoaDonBan equals hdb.MaHoaDonBan
                            join sp in db.TbSanPhams on cthb.MaSanPham equals sp.MaSanPham
                            select new HoaDonBan
                            {
                                MaHoaDonBan = hdb.MaHoaDonBan,
                                MaKhachHang = hdb.MaKhachHang,
                                TenSanPham = sp.TenSanPham,
                                NgayBan = hdb.NgayBan,
                                SoLuong = cthb.SoLuong,
                                GiaBan = (int?)sp.GiaBan ,
                                MaKichThuoc = cthb.MaKichThuoc,
                                TongTien = (decimal)(cthb.SoLuong * sp.GiaBan * cthb.GiamGia), 
                            };

                Hdban = query.OrderBy(x => x.MaHoaDonBan).ToList();
            }
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;

            var pageHoaDonBan = Hdban.ToPagedList(pageSize, pageNumber);
            return View(pageHoaDonBan);
        }
        //findpayment
        public ActionResult FindPayment(DateTime searchDate, int? page)
        {
            List<HoaDonBan> Hdban = new List<HoaDonBan>();

            using (var db = new QlkinhDoanhSpaceCoffeeContext())
            {
                var query = from cthb in db.TbChiTietHdbs
                            join hdb in db.TbHoaDonBans on cthb.MaHoaDonBan equals hdb.MaHoaDonBan
                            join sp in db.TbSanPhams on cthb.MaSanPham equals sp.MaSanPham
                            select new HoaDonBan
                            {
                                MaHoaDonBan = hdb.MaHoaDonBan,
                                MaKhachHang = hdb.MaKhachHang,
                                TenSanPham = sp.TenSanPham,
                                NgayBan = hdb.NgayBan,
                                SoLuong = cthb.SoLuong,
                                GiaBan = (int?)sp.GiaBan,
                                MaKichThuoc = cthb.MaKichThuoc,
                                TongTien = (decimal)(cthb.SoLuong * sp.GiaBan * cthb.GiamGia),
                            };

                Hdban = query.Where(x => x.NgayBan == searchDate).OrderBy(x => x.MaHoaDonBan).ToList();
            }
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;

            var pageHoaDonBan = Hdban.ToPagedList(pageSize, pageNumber);
            return View(pageHoaDonBan);
        }

        //addpayment

        //ListItem
        public IActionResult ListItem(int? page)
        {
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;
            var lstFindStore = db.TbVatTus.OrderBy(x => x.MaVatTu);
            PagedList<TbVatTu> lstfind = new PagedList<TbVatTu>(lstFindStore, pageNumber, pageSize);
            return View(lstfind);
        }
   //ListSubItem
        public IActionResult ListSubItem()
        {
            return View();
        }
    //ListAddItem
        public IActionResult ListAddItem(int? page)
        {
            List<NhapKho> nhapKho = new List<NhapKho>();

            using (var db = new QlkinhDoanhSpaceCoffeeContext())
            {
                var query = from cthn in db.TbChiTietHdns
                            join hdn in db.TbHoaDonNhaps on cthn.MaHoaDonNhap equals hdn.MaHoaDonNhap
                            select new NhapKho
                            {
                                MaHoaDonNhap = cthn.MaHoaDonNhap,
                                SoLuongNhap = cthn.SoLuongNhap,
                                MaVatTu = cthn.MaVatTu,
                                NgayLap = hdn.NgayLap,
                            };

                nhapKho = query.OrderBy(x => x.MaHoaDonNhap).ToList();
            }
            int pageSize = 6;
            int pageNumber = page == null | page < 0 ? 1 : page.Value;
            
            var pageNhapKho = nhapKho.ToPagedList(pageNumber, pageSize);
            return View(pageNhapKho);
        }
        //addlistitem
        [HttpGet]
        public IActionResult AddListItem()
        {
            ViewBag.MaHoaDonNhap = new SelectList(db.TbHoaDonNhaps.ToList(), "MaHoaDonNhap","MaHoaDonNhap");
            ViewBag.MaVatTu = new SelectList(db.TbVatTus.ToList(),"MaVatTu","TenVatTu");
            return View();

        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult AddListItem(TbChiTietHdn cthdnhap)
        {
            if (ModelState.IsValid)
            {
                db.TbChiTietHdns.Add(cthdnhap);
                db.SaveChanges();
                return RedirectToAction("ListAddItem");
            }
            return View(cthdnhap);
        }
        public IActionResult Privacy()
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