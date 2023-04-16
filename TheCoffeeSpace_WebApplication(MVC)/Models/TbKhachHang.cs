using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbKhachHang
{
    public string MaKhachHang { get; set; } = null!;

    public string TenKhachHang { get; set; } = null!;

    public string? SoDienThoai { get; set; }

    public string? DiaChi { get; set; }

    public int Diem { get; set; }

    public string? Hang { get; set; }

    public string? MatKhau { get; set; }

    public virtual ICollection<TbHoaDonBan> TbHoaDonBans { get; } = new List<TbHoaDonBan>();
}
