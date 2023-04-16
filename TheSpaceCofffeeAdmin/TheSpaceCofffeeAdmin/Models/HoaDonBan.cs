namespace TheSpaceCofffeeAdmin.Models
{
    public class HoaDonBan

    {
        public string MaHoaDonBan { get; set; } = null!;

        public DateTime NgayBan { get; set; }

        public string MaKhachHang { get; set; } = null!;

        public int SoLuong { get; set; }

        public int GiamGia { get; set; }

        public string TenSanPham { get; set; } = null!;
        public int GiaBan {
            get;
            set; }

    
        public string MaSanPham { get; set; } = null!;
        
        public string MaKichThuoc { get; set; } = null!;
        public decimal TongTien { get { return (decimal)(SoLuong * (int?)GiaBan * GiamGia); } set { } }

    }
}
