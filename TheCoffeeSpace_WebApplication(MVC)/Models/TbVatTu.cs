using System;
using System.Collections.Generic;

namespace TheCoffeeSpace_WebApplication_MVC_.Models;

public partial class TbVatTu
{
    public string MaVatTu { get; set; } = null!;

    public string TenVatTu { get; set; } = null!;

    public string DonViTinh { get; set; } = null!;

    public string? GhiChu { get; set; }

    public virtual ICollection<TbChiTietHdn> TbChiTietHdns { get; } = new List<TbChiTietHdn>();

    public virtual ICollection<TbKhoVatTuCh> TbKhoVatTuChes { get; } = new List<TbKhoVatTuCh>();
}
