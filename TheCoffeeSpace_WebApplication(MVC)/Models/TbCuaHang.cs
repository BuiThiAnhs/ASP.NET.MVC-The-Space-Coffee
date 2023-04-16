using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbCuaHang
{
    public string MaCuaHang { get; set; } = null!;

    public string TenCuaHang { get; set; } = null!;

    public string DiaChi { get; set; } = null!;

    public string SoDienThoai { get; set; } = null!;

    public string? Email { get; set; }

    public string? Fanpage { get; set; }

    public virtual ICollection<TbKhoVatTuCh> TbKhoVatTuChes { get; } = new List<TbKhoVatTuCh>();

    public virtual ICollection<TbSanPham> MaSanPhams { get; } = new List<TbSanPham>();

    public virtual ICollection<TbTinTuc> MaTinTucs { get; } = new List<TbTinTuc>();
}
