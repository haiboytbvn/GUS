System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Shipping;
    return {
        setters: [],
        execute: function () {
            Shipping = (function () {
                function Shipping(Id, IsActive, Name, BuyerCode, Brand, Department, Division, Image, checked, Remark, ShippingType, Address, RegName, SearchName, Email, EndBuyer, Fax, Tel, City, Country, PostalCode, Contact) {
                    this.Id = Id;
                    this.IsActive = IsActive;
                    this.Name = Name;
                    this.BuyerCode = BuyerCode;
                    this.Brand = Brand;
                    this.Department = Department;
                    this.Division = Division;
                    this.Image = Image;
                    this.checked = checked;
                    this.Remark = Remark;
                    this.ShippingType = ShippingType;
                    this.Address = Address;
                    this.RegName = RegName;
                    this.SearchName = SearchName;
                    this.Email = Email;
                    this.EndBuyer = EndBuyer;
                    this.Fax = Fax;
                    this.Tel = Tel;
                    this.City = City;
                    this.Country = Country;
                    this.PostalCode = PostalCode;
                    this.Contact = Contact;
                }
                return Shipping;
            }());
            exports_1("Shipping", Shipping);
        }
    };
});
