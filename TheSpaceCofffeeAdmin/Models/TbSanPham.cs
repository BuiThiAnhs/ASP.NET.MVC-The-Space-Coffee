using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TheSpaceCofffeeAdmin.Models;

public partial class TbSanPham
{
    public string MaSanPham { get; set; } = null!;

    public string TenSanPham { get; set; } = null!;

    public decimal? GiaBan { get; set; }
    public string? HinhAnh { get; set; }

    public string? GhiChu { get; set; }

    public string MaNhomSp { get; set; } = null!;

    public virtual TbNhomSanPham MaNhomSpNavigation { get; set; } = null!;

    public virtual ICollection<TbChiTietHdb> TbChiTietHdbs { get; } = new List<TbChiTietHdb>();

    public virtual ICollection<TbCuaHang> MaCuaHangs { get; } = new List<TbCuaHang>();
}
