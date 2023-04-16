using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbChiTietHdb
{
    public int SoLuong { get; set; }

    public int GiamGia { get; set; }

    public string MaHoaDonBan { get; set; } = null!;

    public string MaSanPham { get; set; } = null!;

    public string MaKichThuoc { get; set; } = null!;

    public virtual TbHoaDonBan MaHoaDonBanNavigation { get; set; } = null!;

    public virtual TbKichThuoc MaKichThuocNavigation { get; set; } = null!;

    public virtual TbSanPham MaSanPhamNavigation { get; set; } = null!;

    public virtual ICollection<TbChiTietToppingHdb> TbChiTietToppingHdbs { get; } = new List<TbChiTietToppingHdb>();
}
