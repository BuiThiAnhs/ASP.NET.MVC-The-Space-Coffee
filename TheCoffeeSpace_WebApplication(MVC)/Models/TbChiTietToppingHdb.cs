using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbChiTietToppingHdb
{
    public int SoLuong { get; set; }

    public string MaTopping { get; set; } = null!;

    public string MaHoaDonBan { get; set; } = null!;

    public string MaSanPham { get; set; } = null!;

    public virtual TbChiTietHdb Ma { get; set; } = null!;

    public virtual TbTopping MaToppingNavigation { get; set; } = null!;
}
