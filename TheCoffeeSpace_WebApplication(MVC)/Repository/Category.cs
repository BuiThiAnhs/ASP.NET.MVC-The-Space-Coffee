using TheCoffeeSpace_WebApplication_MVC_.Models;

namespace TheCoffeeSpace_WebApplication_MVC_.Repository
{
    public class Category : ICategory
    {
        private readonly DataTheSpaceCoffeeContext db = new DataTheSpaceCoffeeContext();

        public Category(DataTheSpaceCoffeeContext db)
        {
            this.db = db;
        }

        public TbNhomSanPham Add(TbNhomSanPham nhomSanPham)
        {
            throw new NotImplementedException();
        }

        public TbNhomSanPham Delete(string maNhomSP)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TbNhomSanPham> GetAllCategory()
        {
            return db.TbNhomSanPhams;
        }

        public TbNhomSanPham GetCategory(string maNhomSP)
        {
            return db.TbNhomSanPhams.Find(maNhomSP);
        }

        public TbNhomSanPham Update(TbNhomSanPham nhomSanPham)
        {
            throw new NotImplementedException();
        }
    }
}
