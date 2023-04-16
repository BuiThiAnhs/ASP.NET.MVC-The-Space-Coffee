using System;
using System.Collections.Generic;

namespace TheSpaceCofffeeAdmin.Models;

public partial class TbKhoVatTuCh
{
    public int SoLuong { get; set; }

    public string MaCuaHang { get; set; } = null!;

    public string MaVatTu { get; set; } = null!;

    public virtual TbCuaHang MaCuaHangNavigation { get; set; } = null!;

    public virtual TbVatTu MaVatTuNavigation { get; set; } = null!;
}
