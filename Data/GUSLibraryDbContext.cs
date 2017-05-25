using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using GUSLibrary.Data.User;
using GUSLibrary.Data.LibVendor;

namespace GUSLibrary.Data
{
    public class GUSLibraryDbContext : IdentityDbContext<ApplicationUser>
    {
        #region Constructor
        public GUSLibraryDbContext(DbContextOptions options) : base(options)
        {
        }
        new public DbSet<UserRole> Roles { get; set; }
        #endregion Constructor

        #region Methods
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // User Table
            modelBuilder.Entity<ApplicationUser>().ToTable("Users");
            modelBuilder.Entity<UserRole>().ToTable("AspNetRoles");
            modelBuilder.Entity<UserMatrix>().ToTable("UserMatrix");

            // Vendor Table
            modelBuilder.Entity<Vendor>().ToTable("Vendor");
            modelBuilder.Entity<VendorContact>().ToTable("VendorContact");
            modelBuilder.Entity<VendorProduct>().ToTable("VendorProduct");
            modelBuilder.Entity<VendorBankAccount>().ToTable("VendorBankAccount");
            modelBuilder.Entity<VendorType>().ToTable("VendorType");
            modelBuilder.Entity<VendorProductType>().ToTable("VendorProductType");

            // Code Table
            modelBuilder.Entity<LibCode>().ToTable("LibCode");

            // Library Table
            modelBuilder.Entity<LibColor>().ToTable("LibColor");
            modelBuilder.Entity<LibFabric>().ToTable("LibFabric");
            modelBuilder.Entity<LibAccessory>().ToTable("LibAccessory");
            modelBuilder.Entity<LibWash>().ToTable("LibWash");
            modelBuilder.Entity<LibSpec>().ToTable("LibSpec");
            modelBuilder.Entity<LibGraphic>().ToTable("LibGraphic");
            modelBuilder.Entity<LibGraphicType>().ToTable("LibGraphicType");
            modelBuilder.Entity<LibGraphicCategory>().ToTable("LibGraphicCategory");
            modelBuilder.Entity<LibGraphicProductName>().ToTable("LibGraphicProductName");
            modelBuilder.Entity<LibShipping>().ToTable("LibShipping");
            modelBuilder.Entity<LibTraining>().ToTable("LibTraining");
            modelBuilder.Entity<LibTrainingItem>().ToTable("LibTrainingItem");
            //modelBuilder.Entity<LibTrainingAndTrainingItem>().ToTable("LibTrainingAndTrainingItem");

            // General Data Table
            modelBuilder.Entity<LibAccessoryType>().ToTable("LibAccessoryType");
            modelBuilder.Entity<LibAccessoryCategory>().ToTable("LibAccessoryCategory");
            modelBuilder.Entity<LibAccessoryProductName>().ToTable("LibAccessoryProductName");
            modelBuilder.Entity<LibFabricsProductName>().ToTable("LibFabricsProductName");
            modelBuilder.Entity<LibDepartment>().ToTable("LibDepartment");
            modelBuilder.Entity<LibEndBuyer>().ToTable("LibEndBuyer");
            modelBuilder.Entity<LibFabricsCategory>().ToTable("LibFabricsCategory");
            modelBuilder.Entity<LibFabricsFibreContent>().ToTable("LibFabricsFibreContent");
            modelBuilder.Entity<LibFabricsFinishing>().ToTable("LibFabricsFinishing");
            modelBuilder.Entity<LibFabricsYarnCount>().ToTable("LibFabricsYarnCount");
            modelBuilder.Entity<LibPOM>().ToTable("LibPOM");
            modelBuilder.Entity<LibProductType>().ToTable("LibProductType");
            modelBuilder.Entity<LibReasonForAbortingProject>().ToTable("LibReasonForAbortingProject");
            modelBuilder.Entity<LibSeason>().ToTable("LibSeason");
            modelBuilder.Entity<LibShippingType>().ToTable("LibShippingType");
            modelBuilder.Entity<LibSizeRange>().ToTable("LibSizeRange");
            modelBuilder.Entity<LibWashCategory>().ToTable("LibWashCategory");
            modelBuilder.Entity<LibWashProductName>().ToTable("LibWashProductName");
            modelBuilder.Entity<LibWashType>().ToTable("LibWashType");
            modelBuilder.Entity<LibYear>().ToTable("LibYear");
            modelBuilder.Entity<LibDivision>().ToTable("LibDivision");
            modelBuilder.Entity<LibBrand>().ToTable("LibBrand");
            modelBuilder.Entity<LibFabricsType>().ToTable("LibFabricsType");
            modelBuilder.Entity<LibFabricWeight>().ToTable("LibFabricWeight");
            modelBuilder.Entity<LibApplication>().ToTable("LibApplication");
            modelBuilder.Entity<LibFabricProductType>().ToTable("LibFabricProductType");
            

            // RelationShip Lib
            modelBuilder.Entity<RelAccessoryTypeCategory>().ToTable("RelAccessoryTypeCategory");
            modelBuilder.Entity<RelFabricsCategoryProductName>().ToTable("RelFabricsCategoryProductName");
            modelBuilder.Entity<RelWashCategoryProductName>().ToTable("RelWashCategoryProductName");
            modelBuilder.Entity<RelWashTypeCategory>().ToTable("RelWashTypeCategory");
            modelBuilder.Entity<RelSpecPOM>().ToTable("RelSpecPOM");
            modelBuilder.Entity<RelAccCategoryProductName>().ToTable("RelAccCategoryProductName");
            modelBuilder.Entity<RelGraphicCategoryProductName>().ToTable("RelGraphicCategoryProductName");
            modelBuilder.Entity<RelGraphicTypeCategory>().ToTable("RelGraphicTypeCategory");
            modelBuilder.Entity<RelFabricsTypeCategory>().ToTable("RelFabricsTypeCategory");


            //Project Table
            modelBuilder.Entity<ProProject>().ToTable("ProProject");
            modelBuilder.Entity<ProAccessory>().ToTable("ProAccessory");
            modelBuilder.Entity<ProColor>().ToTable("ProColor");
            modelBuilder.Entity<ProColorwayAccessory>().ToTable("ProColorwayAccessory");
            //modelBuilder.Entity<ProColorwayAccessory>().HasOne(i => i.ProColorItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            //modelBuilder.Entity<ProColorwayAccessory>().HasOne(i => i.ProAccessoryItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ProColorwayEmbroidery>().ToTable("ProColorwayEmbroidery");
            //modelBuilder.Entity<ProColorwayEmbroidery>().HasOne(i => i.ProColorItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            //modelBuilder.Entity<ProColorwayEmbroidery>().HasOne(i => i.ProEmbroideryItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ProColorwayFabric>().ToTable("ProColorwayFabric");
            //modelBuilder.Entity<ProColorwayFabric>().HasOne(i => i.ProColorItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            //modelBuilder.Entity<ProColorwayFabric>().HasOne(i => i.ProFabricItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ProColorwayPrint>().ToTable("ProColorwayPrint");
            //modelBuilder.Entity<ProColorwayPrint>().HasOne(i => i.ProColorItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            //modelBuilder.Entity<ProColorwayPrint>().HasOne(i => i.ProPrintItem).WithOne().OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<ProEmbroidery>().ToTable("ProEmbroidery");
            modelBuilder.Entity<ProFabric>().ToTable("ProFabric");
            modelBuilder.Entity<ProPrint>().ToTable("ProPrint");
            modelBuilder.Entity<ProWash>().ToTable("ProWash");
            modelBuilder.Entity<ProProjectViewing>().ToTable("ProProjectViewing");
            modelBuilder.Entity<ProImageGallery>().ToTable("ProImageGallery");
        }
        #endregion Methods

        #region Properties
        public DbSet<UserMatrix> UserMatrixes { get; set; }
        public DbSet<LibCode> Codes { get; set; }
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorContact> VendorContacts { get; set; }
        public DbSet<VendorProduct> VendorProducts { get; set; }
        public DbSet<VendorBankAccount> VendorBankAccounts { get; set; }
        public DbSet<VendorType> VendorTypes { get; set; }
        public DbSet<VendorProductType> VendorProductTypes { get; set; }

        public DbSet<LibColor> Colors { get; set; }
        public DbSet<LibFabric> Fabrics { get; set; }
        public DbSet<LibAccessory> Accessories { get; set; }
        public DbSet<LibWash> Washes { get; set; }
        public DbSet<LibSpec> Specs { get; set; }
        public DbSet<LibGraphic> Graphics { get; set; }
        public DbSet<LibGraphicType> GraphicTypes { get; set; }
        public DbSet<LibGraphicCategory> GraphicCategories { get; set; }
        public DbSet<LibGraphicProductName> GraphicProductNames { get; set; }
        public DbSet<LibShipping> Shippings { get; set; }
        public DbSet<LibTraining> Trainings { get; set; }
        public DbSet<LibTrainingItem> TrainingItems { get; set; }
        //public DbSet<LibTrainingAndTrainingItem> TrainingAndTrainingItems { get; set; }

        public DbSet<LibAccessoryType> AccessoryTypes { get; set; }
        public DbSet<LibAccessoryCategory> AccessoryCategories { get; set; }
        public DbSet<LibAccessoryProductName> AccessoryProductNames { get; set; }
        public DbSet<LibDepartment> Departments { get; set; }
        public DbSet<LibEndBuyer> EndBuyers { get; set; }
        public DbSet<LibFabricsCategory> FabricsCategories { get; set; }
        public DbSet<LibFabricsFibreContent> FabricsFibreContents { get; set; }
        public DbSet<LibFabricsFinishing> FabricsFinishings { get; set; }
        public DbSet<LibFabricsYarnCount> FabricsYarnCounts { get; set; }
        public DbSet<LibPOM> POMs { get; set; }
        public DbSet<LibProductType> ProductTypes { get; set; }
        public DbSet<LibReasonForAbortingProject> ReasonForAbortingProjects { get; set; }
        public DbSet<LibSeason> Seasons { get; set; }
        public DbSet<LibShippingType> ShippingTypes { get; set; }
        public DbSet<LibSizeRange> SizeRanges { get; set; }
        public DbSet<LibWashCategory> WashCategories { get; set; }
        public DbSet<LibWashProductName> WashProductNames { get; set; }
        public DbSet<LibWashType> WashTypes { get; set; }
        public DbSet<LibBrand> Brands { get; set; }
        public DbSet<LibDivision> Divisions { get; set; }
        public DbSet<LibYear> Years { get; set; }
        public DbSet<LibApplication> Applications { get; set; }
        public DbSet<LibFabricsType> FabricsTypes { get; set; }

        public DbSet<RelAccessoryTypeCategory> RelAccessoryTypeCategories { get; set; }
        public DbSet<RelFabricsCategoryProductName> RelFabricsCategoryProductNames { get; set; }
        public DbSet<RelWashCategoryProductName> RelWashCategoryProductNames { get; set; }
        public DbSet<RelWashTypeCategory> RelWashTypeCategorys { get; set; }
        public DbSet<RelSpecPOM> RelSpecPoMs { get; set; }
        public DbSet<RelAccCategoryProductName> RelAccCategoryProductNames { get; set; }
        public DbSet<RelFabricsTypeCategory> RelFabricsTypeCategorys { get; set; }
        public DbSet<RelGraphicTypeCategory> RelGraphicTypeCategorys { get; set; }
        public DbSet<RelGraphicCategoryProductName> RelGraphicCategoryProductNames { get; set; }
        public DbSet<LibFabricProductType> FabricProductTypes { get; set; }
        public DbSet<LibFabricsProductName> FabricsProductNames { get; set; }
        public DbSet<LibFabricWeight> FabricWeights { get; set; }
        

        //Project
        public DbSet<ProProject> ProProjects { get; set; }
        public DbSet<ProAccessory> ProAccessorys { get; set; }
        public DbSet<ProColor> ProColors { get; set; }
        public DbSet<ProColorwayAccessory> ProColorwayAccessorys { get; set; }
        public DbSet<ProColorwayEmbroidery> ProColorwayEmbroiderys { get; set; }
        public DbSet<ProColorwayFabric> ProColorwayFabrics { get; set; }
        public DbSet<ProColorwayPrint> ProColorwayPrints { get; set; }
        public DbSet<ProEmbroidery> ProEmbroiderys { get; set; }
        public DbSet<ProFabric> ProFabrics { get; set; }
        public DbSet<ProPrint> ProPrints { get; set; }
        public DbSet<ProWash> ProWashs { get; set; }
        public DbSet<ProProjectViewing> ProProjectViewings { get; set; }
        public DbSet<ProCollaborator> ProCollaborators { get; set; }
        public DbSet<ProImageGallery> ProImageGallerys { get; set; }
        #endregion Properties
    }
}
