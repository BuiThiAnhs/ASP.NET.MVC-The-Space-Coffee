using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbSanPham
{
    public string MaSanPham { get; set; } = null!;

    [RegularExpression(@"/^[a-zA-Z ,.'-]+$/i", ErrorMessage = "Sai định dạng, Yêu cầu không có số")]
    public string TenSanPham { get; set; } = null!;

    public decimal? GiaBan { get; set; }

    [RegularExpression(@"?:png", ErrorMessage = "png la png")]
    public string? HinhAnh { get; set; }

    public string? GhiChu { get; set; }

    public string? Mota { get; set; }

    public int? Calories { get; set; }

    public int? TotalFat { get; set; }

    public int? SaturatedFat { get; set; }

    public int? Cholesterol { get; set; }

    public int? Sodium { get; set; }

    public int? TotalCarbohydrates { get; set; }

    public int? Sugars { get; set; }

    public int? Protein { get; set; }

    public string? Ingredients { get; set; }
   
    public string MaNhomSp { get; set; } = null!;

    public virtual TbNhomSanPham MaNhomSpNavigation { get; set; } = null!;

    public virtual ICollection<TbChiTietHdb> TbChiTietHdbs { get; } = new List<TbChiTietHdb>();

    public virtual ICollection<TbCuaHang> MaCuaHangs { get; } = new List<TbCuaHang>();
}
