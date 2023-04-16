using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbNhomSanPham
{
    public string MaNhomSp { get; set; } = null!;

    public string TenNhomSp { get; set; } = null!;

    public virtual ICollection<TbSanPham> TbSanPhams { get; } = new List<TbSanPham>();
}
