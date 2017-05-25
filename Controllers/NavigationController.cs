using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Classes;
using GUSLibrary.Data;
using GUSLibrary.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Nelibur.ObjectMapper;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace GUSLibrary.Controllers
{
    [Route("api/[controller]")]
    public class NavigationController : Controller
    {
        #region Private Fields
        protected GUSLibraryDbContext DbContext;
        #endregion Private Fields
        #region Common Properties
        /// <summary>
        /// Returns a suitable JsonSerializerSettings object 
        /// that can be used to generate the JsonResult return value 
        /// for this Controller's methods.
        /// </summary>
        protected JsonSerializerSettings DefaultJsonSettings => new JsonSerializerSettings()
        {
            Formatting = Formatting.Indented
        };

        #endregion Common Properties

        #region Constructor
        public NavigationController(GUSLibraryDbContext context)
        {
            DbContext = context;
        }
        #endregion Constructor
        // GET: /<controller>/
        [HttpGet("GetAccessoryLeftMenu")]
        public IActionResult GetAccessoryLeftMenu()
        {
            var result = new List<AncestorMenuItem>();
            var lstacctype = DbContext.AccessoryTypes.Where(x => x.IsLatest && !x.IsDeleted && x.IsActive).ToList();
            foreach (var type in lstacctype)
            {
                var ancestormenuitem = new AncestorMenuItem
                {
                    Text = type.Name,
                    Value = type.Id.ToString(),
                    Items = new List<ParentMenuItem>()
                };
                // get categoryitems
                var categories = DbContext.RelAccessoryTypeCategories.Where(x => x.TypeId == type.Id && x.IsLatest).ToList();
                foreach (var cate in categories)
                {
                    var acccate = DbContext.AccessoryCategories.FirstOrDefault(x => x.Id == cate.CategoryId);
                    if (acccate != null)
                    {

                        var parentmenuitem = new ParentMenuItem
                        {
                            Text = acccate.Name,
                            Value = acccate.Id.ToString(),
                            Items = new List<MenuItem>()
                        };

                        var productnames =
                            DbContext.RelAccCategoryProductNames.Where(x => x.AccCategoryId == acccate.Id && x.IsLatest);

                        foreach (var item in productnames)
                        {
                            var prn = DbContext.AccessoryProductNames.FirstOrDefault(x => x.Id == item.AccProductNameId);
                            if (prn != null)
                            {
                                var navitem = new MenuItem
                                {
                                    Text = prn.Name,
                                    Value = prn.Id.ToString()
                                };

                                parentmenuitem.Items.Add(navitem);
                            }
                        }
                        ancestormenuitem.Items.Add(parentmenuitem);
                    }


                }
                result.Add(ancestormenuitem);
            }

            return new JsonResult(result, DefaultJsonSettings);
        }

        [HttpGet("GetFabLeftMenu")]
        public IActionResult GetFabLeftMenu()
        {
            var result = new List<AncestorMenuItem>();
            var lstfabtype = DbContext.FabricsTypes.Where(x => x.IsLatest && !x.IsDeleted && x.IsActive).ToList();
            foreach (var type in lstfabtype)
            {
                var ancestormenuitem = new AncestorMenuItem
                {
                    Text = type.Name,
                    Value = type.Id.ToString(),
                    Items = new List<ParentMenuItem>()
                };
                // get categoryitems
                var categories = DbContext.RelFabricsTypeCategorys.Where(x => x.FabricsTypeId == type.Id && x.IsLatest).ToList();
                foreach (var cate in categories)
                {
                    var fabcate = DbContext.FabricsCategories.FirstOrDefault(x => x.Id == cate.FabricsCategoryId);
                    if (fabcate != null)
                    {

                        var parentmenuitem = new ParentMenuItem
                        {
                            Text = fabcate.Name,
                            Value = fabcate.Id.ToString(),
                            Items = new List<MenuItem>()
                        };

                        var productnames =
                            DbContext.RelFabricsCategoryProductNames.Where(x => x.CategoryId == fabcate.Id && x.IsLatest);

                        foreach (var item in productnames)
                        {
                            var prn = DbContext.FabricsProductNames.FirstOrDefault(x => x.Id == item.ProductNameId);
                            if (prn != null)
                            {
                                var navitem = new MenuItem
                                {
                                    Text = prn.Name,
                                    Value = prn.Id.ToString()
                                };

                                parentmenuitem.Items.Add(navitem);
                            }
                        }
                        ancestormenuitem.Items.Add(parentmenuitem);
                    }


                }
                result.Add(ancestormenuitem);
            }

            return new JsonResult(result, DefaultJsonSettings);
        }

        [HttpGet("GetWashLeftMenu")]
        public IActionResult GetWashLeftMenu()
        {
            var result = new List<AncestorMenuItem>();
            var lstfabtype = DbContext.WashTypes.Where(x => x.IsLatest && !x.IsDeleted && x.IsActive).ToList();
            foreach (var type in lstfabtype)
            {
                var ancestormenuitem = new AncestorMenuItem
                {
                    Text = type.Name,
                    Value = type.Id.ToString(),
                    Items = new List<ParentMenuItem>()
                };
                // get categoryitems
                var categories = DbContext.RelWashTypeCategorys.Where(x => x.WashTypeId == type.Id && x.IsLatest).ToList();
                foreach (var cate in categories)
                {
                    var fabcate = DbContext.WashCategories.FirstOrDefault(x => x.Id == cate.WashCategoryId);
                    if (fabcate != null)
                    {

                        var parentmenuitem = new ParentMenuItem
                        {
                            Text = fabcate.Name,
                            Value = fabcate.Id.ToString(),
                            Items = new List<MenuItem>()
                        };

                        var productnames =
                            DbContext.RelWashCategoryProductNames.Where(x => x.CategoryId == fabcate.Id && x.IsLatest);

                        foreach (var item in productnames)
                        {
                            var prn = DbContext.WashProductNames.FirstOrDefault(x => x.Id == item.ProductNameId);
                            if (prn != null)
                            {
                                var navitem = new MenuItem
                                {
                                    Text = prn.Name,
                                    Value = prn.Id.ToString()
                                };

                                parentmenuitem.Items.Add(navitem);
                            }
                        }
                        ancestormenuitem.Items.Add(parentmenuitem);
                    }


                }
                result.Add(ancestormenuitem);
            }

            return new JsonResult(result, DefaultJsonSettings);
        }
        [HttpGet("GetGraphicLeftMenu")]
        public IActionResult GetGraphicLeftMenu()
        {
            var result = new List<AncestorMenuItem>();
            var lstfabtype = DbContext.GraphicTypes.Where(x => x.IsLatest && !x.IsDeleted && x.IsActive).ToList();
            foreach (var type in lstfabtype)
            {
                var ancestormenuitem = new AncestorMenuItem
                {
                    Text = type.Name,
                    Value = type.Id.ToString(),
                    Items = new List<ParentMenuItem>()
                };
                // get categoryitems
                var categories = DbContext.RelGraphicTypeCategorys.Where(x => x.TypeId == type.Id && x.IsLatest).ToList();
                foreach (var cate in categories)
                {
                    var fabcate = DbContext.GraphicCategories.FirstOrDefault(x => x.Id == cate.CategoryId);
                    if (fabcate != null)
                    {

                        var parentmenuitem = new ParentMenuItem
                        {
                            Text = fabcate.Name,
                            Value = fabcate.Id.ToString(),
                            Items = new List<MenuItem>()
                        };

                        var productnames =
                            DbContext.RelGraphicCategoryProductNames.Where(x => x.CategoryId == fabcate.Id && x.IsLatest);

                        foreach (var item in productnames)
                        {
                            var prn = DbContext.GraphicProductNames.FirstOrDefault(x => x.Id == item.ProductNameId);
                            if (prn != null)
                            {
                                var navitem = new MenuItem
                                {
                                    Text = prn.Name,
                                    Value = prn.Id.ToString()
                                };

                                parentmenuitem.Items.Add(navitem);
                            }
                        }
                        ancestormenuitem.Items.Add(parentmenuitem);
                    }


                }
                result.Add(ancestormenuitem);
            }

            return new JsonResult(result, DefaultJsonSettings);
        }

     
    }
}

