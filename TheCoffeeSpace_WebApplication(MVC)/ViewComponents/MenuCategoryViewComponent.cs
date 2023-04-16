using Microsoft.AspNetCore.Mvc;
using TheCoffeeSpace_WebApplication_MVC_.Repository;

namespace TheCoffeeSpace_WebApplication_MVC_.ViewComponents
{
    public class MenuCategoryViewComponent : ViewComponent
    {
        private readonly ICategory iCategory;

        public MenuCategoryViewComponent(ICategory iCategory)
        {
            this.iCategory = iCategory;
        }

        public IViewComponentResult Invoke()
        {
            var allCategory = iCategory.GetAllCategory().OrderBy(x => x.MaNhomSp).ToList();
            return View(allCategory);
        }
    }
}
