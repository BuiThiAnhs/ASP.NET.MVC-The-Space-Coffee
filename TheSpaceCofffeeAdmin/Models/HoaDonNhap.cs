namespace TheSpaceCofffeeAdmin.Models
{
    public class HoaDonNhap
    {
        public string MaHoaDonNhap { get; set; } = null!;
        public string MaVatTu { get; set; } = null!;
        public string MaNhaCungCap { get; set; } = null!;
        public DateTime NgayLap { get; set; }


        public int GiaNhap { get; set; }
        public int SoLuongNhap { get; set; }
         public decimal TongTien { get { return GiaNhap * SoLuongNhap; } set { } }

    }
}
