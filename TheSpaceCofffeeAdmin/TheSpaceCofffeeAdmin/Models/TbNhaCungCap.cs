using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TheSpaceCofffeeAdmin.Models;

public partial class TbNhaCungCap
{
    public string MaNhaCungCap { get; set; } = null!;
    [RegularExpression(@"/^[a-zA-Z ,.'-]+$/i", ErrorMessage = "Sai định dạng, Yêu cầu không có số")]
    public string TenNhaCungCap { get; set; } = null!;

    public string DiaChi { get; set; } = null!;
    [RegularExpression(@"/^[0-9 ,.'-]+$/i", ErrorMessage = "Sai định dạng, Yêu cầu là có số")]
    public string? SoDienThoai { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<TbHoaDonNhap> TbHoaDonNhaps { get; } = new List<TbHoaDonNhap>();
}
