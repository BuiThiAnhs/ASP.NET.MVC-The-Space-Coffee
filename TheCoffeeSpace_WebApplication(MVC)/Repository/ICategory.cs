using TheCoffeeSpace_WebApplication_MVC_.Models;

namespace TheCoffeeSpace_WebApplication_MVC_.Repository
{
    public interface ICategory
    {
        TbNhomSanPham Add(TbNhomSanPham nhomSanPham);

        TbNhomSanPham Update(TbNhomSanPham nhomSanPham);

        TbNhomSanPham Delete(String maNhomSP);

        TbNhomSanPham GetCategory(String maNhomSP);

        IEnumerable<TbNhomSanPham> GetAllCategory();
    }
}
