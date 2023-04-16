using System;
using System.Collections.Generic;

namespace TheSpaceCofffeeAdmin.Models;

public partial class TbVatTu
{
    public string MaVatTu { get; set; } = null!;

    public string TenVatTu { get; set; } = null!;

    public string DonViTinh { get; set; } = null!;




    public string? GhiChu { get; set; }

    public virtual ICollection<TbChiTietHdn> TbChiTietHdns { get; } = new List<TbChiTietHdn>();

    public virtual ICollection<TbKhoVatTuCh> TbKhoVatTuChes { get; } = new List<TbKhoVatTuCh>();
}
