using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbChiTietHdn
{
    public int SoLuongNhap { get; set; }

    public int GiaNhap { get; set; }

    public string MaHoaDonNhap { get; set; } = null!;

    public string MaVatTu { get; set; } = null!;

    public virtual TbHoaDonNhap MaHoaDonNhapNavigation { get; set; } = null!;

    public virtual TbVatTu MaVatTuNavigation { get; set; } = null!;
}
