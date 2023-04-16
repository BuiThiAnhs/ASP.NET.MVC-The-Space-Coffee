namespace TheSpaceCofffeeAdmin.Models
{
    public class NhapKho
    {
        public int SoLuongNhap { get; set; }

        public int GiaNhap { get; set; }

        public string MaHoaDonNhap { get; set; } = null!;

        public string MaVatTu { get; set; } = null!;

        public DateTime NgayLap { get; set; }
    }
}
