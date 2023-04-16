using System;
using System.Collections.Generic;

namespace TheSpaceCofffeeAdmin.Models;

public partial class TbTinTuc
{
    public string MaTinTuc { get; set; } = null!;

    public string TieuDe { get; set; } = null!;

    public string NoiDung { get; set; } = null!;

    public DateTime NgayDang { get; set; }

    public virtual ICollection<TbCuaHang> MaCuaHangs { get; } = new List<TbCuaHang>();
}
