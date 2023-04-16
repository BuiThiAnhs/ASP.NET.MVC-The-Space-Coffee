using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbHoaDonBan
{
    public string MaHoaDonBan { get; set; } = null!;

    public DateTime NgayBan { get; set; }

    public string MaKhachHang { get; set; } = null!;

    public virtual TbKhachHang MaKhachHangNavigation { get; set; } = null!;

    public virtual ICollection<TbChiTietHdb> TbChiTietHdbs { get; } = new List<TbChiTietHdb>();
}
