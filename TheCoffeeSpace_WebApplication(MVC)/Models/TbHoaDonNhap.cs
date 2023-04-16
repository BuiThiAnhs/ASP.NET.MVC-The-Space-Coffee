using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbHoaDonNhap
{
    public string MaHoaDonNhap { get; set; } = null!;

    public DateTime NgayLap { get; set; }

    public string MaNhaCungCap { get; set; } = null!;

    public virtual TbNhaCungCap MaNhaCungCapNavigation { get; set; } = null!;

    public virtual ICollection<TbChiTietHdn> TbChiTietHdns { get; } = new List<TbChiTietHdn>();
}
