using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using GUSLibrary.Data;
using System;
using System.Linq;
using System.Threading.Tasks;
using GUSLibrary.Data.User;
using GUSLibrary.Classes;

public class DbSeeder
{
    #region Private Members
    private GUSLibraryDbContext DbContext;
    private RoleManager<UserRole> RoleManager;
    private UserManager<ApplicationUser> UserManager;
    #endregion Private Members

    #region Constructor
    public DbSeeder(GUSLibraryDbContext dbContext, RoleManager<UserRole> roleManager, UserManager<ApplicationUser> userManager)
    {
        DbContext = dbContext;
        RoleManager = roleManager;
        UserManager = userManager;
    }
    #endregion Constructor

    #region Public Methods
    public async Task SeedAsync()
    {
        // Create the Db if it doesn’t exist
        DbContext.Database.EnsureCreated();

        // Create default Users
        if (await DbContext.Users.CountAsync() == 0) await CreateUsersAsync();
        if (await DbContext.Codes.CountAsync() == 0) CreateCodes();

    }
    #endregion Public Methods

    #region Seed Methods
    private void CreateCodes()
    {
        var libTypeList = Enum.GetNames(typeof(EnumHelper.LibType)).ToList();

        foreach (var i in libTypeList)
        {
            LibCode libCode = new LibCode();
            libCode.Id = Guid.NewGuid();
            libCode.CodeNumber = 1;
            libCode.LibType = i;

            DbContext.Add(libCode);
        }

        DbContext.SaveChanges();
    }
    private async Task CreateUsersAsync()
    {
        // local variables
        DateTime createdDate = new DateTime(2016, 03, 01, 12, 30, 00);
        DateTime lastModifiedDate = DateTime.Now;
        string role_Administrators = "Administrators";
        string role_Registered = "Registered";
        string role_Vendor = "Vendor";

        //Create Roles (if they doesn't exist yet)
        UserRole admin = new UserRole(role_Administrators);
        UserRole register = new UserRole(role_Registered);
        UserRole vendor = new UserRole(role_Vendor);
        if (!await RoleManager.RoleExistsAsync(role_Administrators))
            await RoleManager.CreateAsync(admin);
        if (!await RoleManager.RoleExistsAsync(role_Registered))
            await RoleManager.CreateAsync(register);
        if (!await RoleManager.RoleExistsAsync(role_Vendor))
            await RoleManager.CreateAsync(vendor);

        // using the role id to create user matrix
        CreateUserMatrix(DbContext, new Guid(admin.Id));
        CreateUserMatrix(DbContext, new Guid(register.Id));


        // Create the "Admin" ApplicationUser account (if it doesn't exist already)
        var user_Admin = new ApplicationUser()
        {
            UserName = "admin",
            Email = "admin@admin.com",
            IsActive = true,
            LastAccess = lastModifiedDate,
            DateCreated = createdDate,
            DateModified = lastModifiedDate,
            UserCode = "AdminCode",
            Slug = SlugHelper.GenerateSlug("admin"),
            Version = 0,
            CompanyId = Guid.Empty,
            RoleId = new Guid(admin.Id),
            FirstName = "firstName",
            LastName = "lastName"
        };

        // Insert "Admin" into the Database and also assign the "Administrator" role to him.
        if (await UserManager.FindByIdAsync(user_Admin.Id) == null)
        {
            await UserManager.CreateAsync(user_Admin, "Pass4Admin");
            await UserManager.AddToRoleAsync(user_Admin, role_Administrators);
            // Remove Lockout and E-Mail confirmation.
            user_Admin.EmailConfirmed = true;
            user_Admin.LockoutEnabled = false;
        }
#if DEBUG
        // Create some sample registered user accounts (if they don't exist already)
        var user_Ryan = new ApplicationUser()
        {
            UserName = "Ryan",
            Email = "ryan@opengamelist.com",
            IsActive = true,
            LastAccess = lastModifiedDate,
            DateCreated = createdDate,
            DateModified = lastModifiedDate,
            UserCode = "RyanCode",
            Slug = SlugHelper.GenerateSlug("Ryan"),
            Version = 0,
            CompanyId = Guid.Empty,
            RoleId = new Guid(register.Id),
            FirstName = "firstName",
            LastName = "lastName",
            EmailConfirmed = true,
            LockoutEnabled = false
        };
        var user_Solice = new ApplicationUser()
        {
            UserName = "Solice",
            Email = "solice@opengamelist.com",
            IsActive = true,
            LastAccess = lastModifiedDate,
            DateCreated = createdDate,
            DateModified = lastModifiedDate,
            UserCode = "SoliceCode",
            Slug = SlugHelper.GenerateSlug("Solice"),
            Version = 0,
            CompanyId = Guid.Empty,
            RoleId = new Guid(register.Id),
            FirstName = "firstName",
            LastName = "lastName",
            EmailConfirmed = true,
            LockoutEnabled = false
        };
        var user_Vodan = new ApplicationUser()
        {
            UserName = "Vodan",
            Email = "vodan@opengamelist.com",
            IsActive = true,
            LastAccess = lastModifiedDate,
            DateCreated = createdDate,
            DateModified = lastModifiedDate,
            UserCode = "VodanCode",
            Slug = SlugHelper.GenerateSlug("Vodan"),
            Version = 0,
            CompanyId = Guid.Empty,
            RoleId = new Guid(register.Id),
            FirstName = "firstName",
            LastName = "lastName",
            EmailConfirmed = true,
            LockoutEnabled = false
        };

        // Insert sample registered users into the Database and also assign the "Registered" role to him.
        if (await UserManager.FindByIdAsync(user_Ryan.Id) == null)
        {
            await UserManager.CreateAsync(user_Ryan, "Pass4User");
            await UserManager.AddToRoleAsync(user_Ryan, role_Registered);
            // Remove Lockout and E-Mail confirmation.
            user_Ryan.EmailConfirmed = true;
            user_Ryan.LockoutEnabled = false;
        }
        if (await UserManager.FindByIdAsync(user_Solice.Id) == null)
        {
            await UserManager.CreateAsync(user_Solice, "Pass4User");
            await UserManager.AddToRoleAsync(user_Solice, role_Registered);
            // Remove Lockout and E-Mail confirmation.
            user_Solice.EmailConfirmed = true;
            user_Solice.LockoutEnabled = false;
        }
        if (await UserManager.FindByIdAsync(user_Vodan.Id) == null)
        {
            await UserManager.CreateAsync(user_Vodan, "Pass4User");
            await UserManager.AddToRoleAsync(user_Vodan, role_Registered);
            // Remove Lockout and E-Mail confirmation.
            user_Vodan.EmailConfirmed = true;
            user_Vodan.LockoutEnabled = false;
        }
#endif
        await DbContext.SaveChangesAsync();
    }
    private void CreateUserMatrix(GUSLibraryDbContext dbContext, Guid userRoleId)
    {
        // Front end
        UserMatrix um1 = new UserMatrix(userRoleId, "ProjectSetup", 31);
        UserMatrix um2 = new UserMatrix(userRoleId, "Colorway", 31);
        UserMatrix um3 = new UserMatrix(userRoleId, "Fabrics", 31);
        UserMatrix um4 = new UserMatrix(userRoleId, "Accessories", 31);
        UserMatrix um5 = new UserMatrix(userRoleId, "PEW", 31);
        UserMatrix um6 = new UserMatrix(userRoleId, "GuidedSpec", 31);
        UserMatrix um7 = new UserMatrix(userRoleId, "ColorDetails", 31);
        UserMatrix um8 = new UserMatrix(userRoleId, "Techpack", 31);
        UserMatrix um9 = new UserMatrix(userRoleId, "SampleVendor", 31);


        // Backend end
        UserMatrix um10 = new UserMatrix(userRoleId, "GeneralLib", 15);
        UserMatrix um10_1 = new UserMatrix(userRoleId, "ColorLib", 15);
        UserMatrix um10_2 = new UserMatrix(userRoleId, "FabricLib", 15);
        UserMatrix um10_3 = new UserMatrix(userRoleId, "AccessoryLib", 15);
        UserMatrix um10_4 = new UserMatrix(userRoleId, "GraphicLib", 15);
        UserMatrix um10_5 = new UserMatrix(userRoleId, "WashLib", 15);
        UserMatrix um10_6 = new UserMatrix(userRoleId, "ShippingLib", 15);
        UserMatrix um10_7 = new UserMatrix(userRoleId, "SpecLib", 15);
        UserMatrix um10_8 = new UserMatrix(userRoleId, "TechpackLib", 15);


        // User Access
        UserMatrix um12 = new UserMatrix(userRoleId, "CreateUser", 3);
        UserMatrix um13 = new UserMatrix(userRoleId, "EditUser", 3);
        UserMatrix um14 = new UserMatrix(userRoleId, "DeleteUser", 3);
        UserMatrix um15 = new UserMatrix(userRoleId, "AssignUserToRole", 3);
        UserMatrix um16 = new UserMatrix(userRoleId, "VendorSupplierManagement", 3);

        dbContext.Add(um1);
        dbContext.Add(um2);
        dbContext.Add(um3);
        dbContext.Add(um4);
        dbContext.Add(um5);
        dbContext.Add(um6);
        dbContext.Add(um7);
        dbContext.Add(um8);
        dbContext.Add(um9);
        dbContext.Add(um10);
        dbContext.Add(um10_1);
        dbContext.Add(um10_2);
        dbContext.Add(um10_3);
        dbContext.Add(um10_4);
        dbContext.Add(um10_5);
        dbContext.Add(um10_6);
        dbContext.Add(um10_7);
        dbContext.Add(um10_8);
        dbContext.Add(um12);
        dbContext.Add(um13);
        dbContext.Add(um14);
        dbContext.Add(um15);
        dbContext.Add(um16);
        dbContext.SaveChanges();
    }
    #endregion Seed Methods


}
