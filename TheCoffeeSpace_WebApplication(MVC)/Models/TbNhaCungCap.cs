using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbNhaCungCap
{
    public string MaNhaCungCap { get; set; } = null!;

    public string TenNhaCungCap { get; set; } = null!;

    public string DiaChi { get; set; } = null!;

    public string? SoDienThoai { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<TbHoaDonNhap> TbHoaDonNhaps { get; } = new List<TbHoaDonNhap>();
}
